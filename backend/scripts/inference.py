#!/usr/bin/env python3
"""
Python script to handle MentaLLaMA model inference.
This script is called by the Node.js backend to generate responses.
"""
import os
import sys
import json
import time
from pathlib import Path
from transformers import AutoModelForCausalLM, AutoTokenizer, pipeline

def load_model():
    """Load the model and tokenizer."""
    model_path = os.getenv('MODEL_PATH', './models/MentaLLaMA-chat-7B')
    device = os.getenv('DEVICE', 'cpu')
    
    print(f"Loading model from {model_path} on {device}...")
    
    try:
        tokenizer = AutoTokenizer.from_pretrained(model_path, trust_remote_code=True)
        model = AutoModelForCausalLM.from_pretrained(
            model_path,
            trust_remote_code=True,
            device_map="auto" if device == 'cuda' else None,
            torch_dtype='auto'
        )
        
        pipe = pipeline(
            "text-generation",
            model=model,
            tokenizer=tokenizer,
            device=0 if device == 'cuda' else -1
        )
        
        return pipe
    except Exception as e:
        print(f"Error loading model: {str(e)}", file=sys.stderr)
        raise

def generate_response(prompt, pipe):
    """Generate a response using the loaded model."""
    max_new_tokens = int(os.getenv('MAX_NEW_TOKENS', '200'))
    temperature = float(os.getenv('TEMPERATURE', '0.7'))
    top_p = float(os.getenv('TOP_P', '0.9'))
    repetition_penalty = float(os.getenv('REPETITION_PENALTY', '1.2'))
    
    try:
        messages = [
            {"role": "user", "content": prompt}
        ]
        
        # Format the prompt according to the model's expected format
        formatted_prompt = pipe.tokenizer.apply_chat_template(
            messages,
            tokenize=False,
            add_generation_prompt=True
        )
        
        # Generate response
        outputs = pipe(
            formatted_prompt,
            max_new_tokens=max_new_tokens,
            temperature=temperature,
            top_p=top_p,
            repetition_penalty=repetition_penalty,
            do_sample=True,
            pad_token_id=pipe.tokenizer.eos_token_id
        )
        
        # Extract the generated text
        response = outputs[0]['generated_text'][len(formatted_prompt):].strip()
        return response
        
    except Exception as e:
        print(f"Error generating response: {str(e)}", file=sys.stderr)
        raise

def main():
    if len(sys.argv) < 2:
        print("Error: No prompt provided", file=sys.stderr)
        sys.exit(1)
    
    prompt = sys.argv[1]
    
    try:
        # Load the model
        pipe = load_model()
        
        # Generate response
        start_time = time.time()
        response = generate_response(prompt, pipe)
        end_time = time.time()
        
        # Print the response (will be captured by Node.js)
        print(response)
        
        # Print timing info to stderr
        print(f"\nGeneration took {end_time - start_time:.2f} seconds", file=sys.stderr)
        
    except Exception as e:
        print(f"Error: {str(e)}", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    main()
