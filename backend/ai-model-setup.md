# MentaLLaMA Model Setup Guide

This guide will help you set up and use the MentaLLaMA model for the NeuralFit therapy application.

## Prerequisites

- Node.js (v16 or higher)
- Python 3.8 or higher
- pip (Python package manager)
- Git LFS (for handling large model files)
- Sufficient disk space (at least 10GB free)

## Installation

1. **Install Python Dependencies**
   ```bash
   pip install torch torchvision torchaudio
   pip install transformers sentencepiece
   pip install huggingface-hub
   ```

2. **Install Git LFS**
   - Windows: Download from [git-lfs.github.com](https://git-lfs.github.com/)
   - macOS: `brew install git-lfs`
   - Linux: `sudo apt-get install git-lfs`

## Downloading the Model

Run the following command to download the MentaLLaMA model:

```bash
# From the backend directory
node scripts/download-model.js
```

This will:
1. Create a `models` directory if it doesn't exist
2. Download the MentaLLaMA model files
3. Place them in the correct directory structure

## Environment Variables

Create a `.env` file in the backend directory with the following variables:

```env
# Model Configuration
MODEL_PATH=./models/MentaLLaMA-chat-7B
MODEL_REPO=Felladrin/mentallama-chat-7b

# Device Configuration
# Use 'cuda' for GPU or 'cpu' for CPU only
DEVICE=cuda

# Performance Settings
MAX_CONTEXT_LENGTH=4096
MAX_NEW_TOKENS=512
TEMPERATURE=0.7
TOP_P=0.9
REPETITION_PENALTY=1.2
```

## API Endpoints

### Start a New Conversation
```http
POST /api/chat/conversations
Content-Type: application/json

{
  "title": "First Therapy Session"
}
```

### List Conversations
```http
GET /api/chat/conversations
```

### Get Conversation
```http
GET /api/chat/conversations/{conversationId}
```

### Send Message
```http
POST /api/chat
Content-Type: application/json

{
  "conversationId": "123e4567-e89b-12d3-a456-426614174000",
  "message": "I've been feeling anxious lately"
}
```

### Check Service Status
```http
GET /api/chat/status
```

## Troubleshooting

### Model Not Loading
- Ensure you have enough disk space
- Check that Git LFS is properly installed with `git lfs install`
- Verify the model files are in the correct directory

### Performance Issues
- Reduce `MAX_CONTEXT_LENGTH` if experiencing memory issues
- Lower `TEMPERATURE` for more focused responses
- Decrease `MAX_NEW_TOKENS` for shorter responses

## License

This project uses the MentaLLaMA model, which is licensed under the [LICENSE](). Please review the license terms before use.
