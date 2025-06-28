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

### 🚀 Backend (Render)
1. Create a new Render web service
2. Connect to GitHub repository
3. Configure environment variables:
   - `NODE_ENV`: production
   - `PORT`: 3001
   - `DB_HOST`: Supabase database host
   - `DB_PORT`: 5432
   - `DB_USERNAME`: Supabase username
   - `DB_PASSWORD`: Supabase password
   - `DB_NAME`: Supabase database name
   - `JWT_SECRET`: Your JWT secret
   - `HUGGINGFACE_API_KEY`: HuggingFace API key

### 📡 Database (Supabase)
1. Create a new Supabase project
2. Configure database:
   - Import migrations
   - Set up security rules
   - Configure backups
3. Update database connection in Render

### 🤖 AI Model (Hugging Face)
1. Create a new Hugging Face Space
2. Deploy model
3. Configure API endpoints
4. Set up rate limiting

## 🛠️ Development Setup

### Prerequisites
- Node.js >= 16.0.0
- PostgreSQL
- Git

### Setup
1. Clone the repository
2. Install dependencies:
   ```bash
   cd backend
   npm install
   cd ../frontend
   npm install
   ```

3. Create environment files:
   - backend/.env
   - frontend/.env

4. Start development servers:
   ```bash
   # Backend
   cd backend
   npm run dev

   # Frontend
   cd frontend
   npm run dev
   ```

## 📝 License

MIT License
