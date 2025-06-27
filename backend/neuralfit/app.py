from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import torch
from transformers import AutoModelForCausalLM, AutoTokenizer
import uvicorn

# --- Configuration ---
MODEL_NAME = "klyang/MentaLLaMA-chat-7B-hf"

# --- FastAPI App ---
app = FastAPI(
    title="MentaLLaMA Chat API",
    description="An API for generating text with the MentaLLaMA-chat-7B model.",
    version="1.0.0",
)

# --- CORS Middleware ---
# This allows your frontend (running on localhost) to communicate with this backend.
origins = [
    "http://localhost",
    "http://localhost:3006",
    # In the future, you would add your deployed frontend's URL here
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"], # Allows all methods (GET, POST, etc.)
    allow_headers=["*"], # Allows all headers
)

# --- Pydantic Models ---
class GenerationRequest(BaseModel):
    message: str
    max_new_tokens: int = 256
    temperature: float = 0.7

class GenerationResponse(BaseModel):
    text: str

# --- Model Loading ---
try:
    print(f"Loading tokenizer: {MODEL_NAME}")
    tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
    print("Tokenizer loaded successfully.")

    print(f"Loading model: {MODEL_NAME} in float16 on CPU")
    # Load model in float16 to fit in memory on the CPU.
    # 8-bit quantization (bitsandbytes) is not supported on the free tier CPU hardware.
    model = AutoModelForCausalLM.from_pretrained(
        MODEL_NAME,
        torch_dtype=torch.float16,
        device_map="cpu", # Explicitly set to CPU
    )
    print("Model loaded successfully.")
    model.eval() # Set model to evaluation mode

except Exception as e:
    print(f"Error loading model: {e}")
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
        # device_map handles moving inputs to the correct device, so .to(DEVICE) is not needed
        inputs = tokenizer(request.message, return_tensors="pt")

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
