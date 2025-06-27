#!/usr/bin/env python3
"""
Script to download the MentaLLaMA model from Hugging Face Hub.
"""
import os
import sys
from huggingface_hub import snapshot_download

def main():
    # Get model path from environment variable or use default
    model_path = os.environ.get("AI_MODEL_PATH", "./models/MentaLLaMA-chat-7B")
    model_repo = os.environ.get("AI_MODEL_REPO", "Felladrin/mentallama-chat-7b")
    
    print(f"🚀 Starting download of {model_repo} to {model_path}")
    
    # Create model directory if it doesn't exist
    os.makedirs(model_path, exist_ok=True)
    
    try:
        # Download the model
        snapshot_download(
            repo_id=model_repo,
            local_dir=model_path,
            local_dir_use_symlinks=False,
            ignore_patterns=["*.h5", "*.ot", "*.msgpack"],
            cache_dir=os.path.join(model_path, ".cache"),
            resume_download=True
        )
        print("✅ Model downloaded successfully!")
        return 0
    except Exception as e:
        print(f"❌ Error downloading model: {str(e)}")
        return 1

if __name__ == "__main__":
    sys.exit(main())
