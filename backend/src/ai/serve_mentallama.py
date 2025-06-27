# FastAPI server for MentaLLaMA-chat-7B inference
# Place this script in backend/src/ai/serve_mentallama.py

from fastapi import FastAPI, Request
from pydantic import BaseModel
from fastapi.responses import JSONResponse
from transformers import AutoModelForCausalLM, AutoTokenizer
import torch
import uvicorn
import os

MODEL_NAME = "klyang/MentaLLaMA-chat-7B"

app = FastAPI()

# Load model and tokenizer at startup
model = None
tokenizer = None

def load_model():
    global model, tokenizer
    if model is None or tokenizer is None:
        tokenizer = AutoTokenizer.from_pretrained(MODEL_NAME)
        model = AutoModelForCausalLM.from_pretrained(
            MODEL_NAME,
            torch_dtype=torch.float16,
            device_map='auto'
        )
        model.eval()

class ChatRequest(BaseModel):
    message: str
    max_new_tokens: int = 128
    temperature: float = 0.7

@app.on_event("startup")
def startup_event():
    load_model()

@app.post("/generate")
async def generate(request: ChatRequest):
    try:
        input_ids = tokenizer.encode(request.message, return_tensors="pt")
        with torch.no_grad():
            output = model.generate(
                input_ids,
                max_new_tokens=request.max_new_tokens,
                temperature=request.temperature,
                pad_token_id=tokenizer.eos_token_id
            )
        response = tokenizer.decode(output[0], skip_special_tokens=True)
        return {"response": response}
    except Exception as e:
        return JSONResponse(status_code=500, content={"error": str(e)})

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8008)
