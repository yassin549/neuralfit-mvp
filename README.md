# NeuralFit - Mental Health Platform

A modern mental health platform combining AI-powered therapy with community support.

## 🚀 Deployment Guide

### 📱 Frontend (Netlify)
1. Create a new Netlify project
2. Connect to GitHub repository
3. Configure build settings:
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. Set environment variables:
   - `REACT_APP_API_URL`: Backend URL
   - `REACT_APP_HUGGINGFACE_API_KEY`: HuggingFace API key

### 🚀 Backend (Docker)
1. Build and run containers:
   ```bash
   docker-compose up -d
   ```
2. Environment variables will be loaded from `.env` files
3. Access the application:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3001

### 📡 Database (PostgreSQL)
1. Database will be automatically initialized by Docker
2. Default credentials:
   - User: postgres
   - Password: (from .env file)
   - Database: neuralfit
3. Connection URL: postgres://postgres:password@localhost:5432/neuralfit

### 🤖 AI Model (Local)
1. Model runs locally within the backend container
2. GPU support is available if CUDA is installed
3. Configuration is handled via environment variables

## 🛠️ Development Setup

### Prerequisites
- Node.js >= 16.0.0
- Docker and Docker Compose
- Git

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Create environment files:
   - backend/.env
   - frontend/.env

4. Start development servers:
   ```bash
   docker-compose up
   ```

## 📝 License

MIT License
