# Setup script for Python environment on Windows
# Run this script in PowerShell with admin privileges

# Check if Python is installed
$pythonVersion = python --version 2>&1
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Python is not installed or not in PATH"
    Write-Host "Please install Python 3.8 or later from https://www.python.org/downloads/"
    Write-Host "Make sure to check 'Add Python to PATH' during installation"
    exit 1
}

Write-Host "✅ Found $pythonVersion"

# Upgrade pip
Write-Host "🚀 Upgrading pip..."
python -m pip install --upgrade pip

# Install required Python packages
$packages = @(
    "torch",
    "transformers",
    "sentencepiece",
    "huggingface-hub"
)

foreach ($pkg in $packages) {
    Write-Host "📦 Installing $pkg..."
    pip install $pkg
    if ($LASTEXITCODE -ne 0) {
        Write-Host "⚠️  Failed to install $pkg, trying with --user flag..."
        pip install --user $pkg
        if ($LASTEXITCODE -ne 0) {
            Write-Host "❌ Failed to install $pkg"
            exit 1
        }
    }
}

Write-Host "✨ Python environment setup completed successfully!"
Write-Host "You can now run 'npm run model:download' to download the model"
