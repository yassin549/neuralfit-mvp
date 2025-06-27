import os
import sys

print("--- Starting Model Loader Test ---")

try:
    print("Step 1: Importing torch...")
    import torch
    print("Step 1: torch imported successfully.")
except Exception as e:
    print(f"ERROR during torch import: {e}")
    sys.exit(1)

try:
    print("Step 2: Importing transformers...")
    from transformers import AutoTokenizer, AutoModelForCausalLM
    print("Step 2: transformers imported successfully.")
except Exception as e:
    print(f"ERROR during transformers import: {e}")
    sys.exit(1)

def load_model_test():
    # Get the directory of the current script
    script_dir = os.path.dirname(os.path.realpath(__file__))
    MODEL_DIR = os.path.join(script_dir, "models", "mentallama-chat-7b")

    print(f"Model directory is: {MODEL_DIR}")
    if not os.path.exists(MODEL_DIR):
        print(f"ERROR: Model directory does not exist at {MODEL_DIR}")
        return

    print("Loading tokenizer...")
    try:
        tokenizer = AutoTokenizer.from_pretrained(MODEL_DIR, local_files_only=True)
        print("Tokenizer loaded successfully.")
    except Exception as e:
        print(f"Failed to load tokenizer: {e}")
        import traceback
        traceback.print_exc()
        return

    print("Loading model...")
    try:
        model = AutoModelForCausalLM.from_pretrained(
            MODEL_DIR,
            local_files_only=True,
            torch_dtype=torch.bfloat16,
            device_map="auto"
        )
        print("Model loaded successfully.")
    except Exception as e:
        print(f"Failed to load model: {e}")
        import traceback
        traceback.print_exc()
        return

if __name__ == "__main__":
    load_model_test()
