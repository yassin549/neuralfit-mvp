import torch
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from transformers import AutoModelForCausalLM, AutoTokenizer
import uvicorn

# --- Configuration ---
MODEL_NAME = "mental/mentallama-chat-7b"
# Hugging Face Spaces will use GPU if available, otherwise fallback to CPU
DEVICE = "cuda" if torch.cuda.is_available() else "cpu"

# --- FastAPI App ---
app = FastAPI(
    title="MentaLLaMA Chat API",
    description="An API for generating text with the MentaLLaMA-chat-7B model.",
    version="1.0.0",
)

# --- Pydantic Models ---
class GenerationRequest(BaseModel):
    message: str
    max_new_tokens: int = 256
    temperature: float = 0.7

class GenerationResponse(BaseModel):
    text: str

# --- Model Loading ---
# This will be run once when the application starts.
# Hugging Face Spaces will cache the model for faster startups.
try:
    print(f"Loading tokenizer: {MODEL_NAME}")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    print("Tokenizer loaded successfully.")

    print(f"Loading model: {MODEL_NAME} to device: {DEVICE}")
    # Use bfloat16 for GPU for better performance, float32 for CPU
    model_dtype = torch.bfloat16 if torch.cuda.is_available() and torch.cuda.is_bf16_supported() else torch.float32
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        torch_dtype=model_dtype,
    ).to(DEVICE)
    print("Model loaded successfully.")
    model.eval() # Set model to evaluation mode

except Exception as e:
    print(f"Error loading model: {e}")
    # We raise an error to prevent the app from starting with a broken model.
    raise RuntimeError(f"Failed to load model or tokenizer: {e}") from e


# --- API Endpoints ---
@app.get("/", summary="Health Check")
def read_root():
    """Health check endpoint to confirm the server is running."""
    return {"status": "ok"}

@app.post("/generate", response_model=GenerationResponse, summary="Generate Text")
def generate_text(request: GenerationRequest):
    """
    Generates a response from the MentaLLaMA model based on the input message.
    """
    try:
        print(f"Received generation request: {request.message}")
        inputs = tokenizer(request.message, return_tensors="pt").to(DEVICE)

        with torch.no_grad():
            outputs = model.generate(
                **inputs,
                max_new_tokens=request.max_new_tokens,
                temperature=request.temperature,
                pad_token_id=tokenizer.eos_token_id, # Suppress padding token warning
                do_sample=True, # Enable sampling for temperature to have an effect
            )

        # Decode the generated text, skipping special tokens
        response_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
        print(f"Generated response: {response_text}")

        return GenerationResponse(text=response_text)

    except Exception as e:
        print(f"Error during text generation: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# This part is for local testing and not strictly needed for Hugging Face Spaces,
# as they use their own server configuration.
if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8000)
