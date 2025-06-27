# Create the target directory if it doesn't exist
$targetDir = "$PSScriptRoot/../backend/src/ai/models/MentaLLaMA-chat-7B"
if (-not (Test-Path -Path $targetDir)) {
    New-Item -ItemType Directory -Path $targetDir -Force
}

# Source directory containing the model files
$sourceDir = "$PSScriptRoot/../MentaLLaMA-chat-7B"

# Copy all files from source to target
Write-Host "Copying model files from $sourceDir to $targetDir..."
Copy-Item -Path "$sourceDir/*" -Destination $targetDir -Recurse -Force

Write-Host "Model files copied successfully!"
