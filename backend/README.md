# NeuralFit Backend

This is the backend server for the NeuralFit application, featuring AI-powered therapy chat capabilities using the MentaLLaMA model.

## 🚀 Features

- **AI-Powered Therapy Chat**: Engage in natural conversations with an AI therapist
- **Conversation Management**: Track and manage therapy sessions
- **Secure Authentication**: JWT-based authentication system
- **RESTful API**: Well-documented endpoints for frontend integration
- **Scalable Architecture**: Built with TypeScript and Express

## 🛠️ Prerequisites

- Node.js 16+ and npm
- Python 3.8+ (for AI model inference)
- Git LFS (for downloading the model)
- At least 15GB free disk space (for the AI model)

## 🚀 Quick Start

### 1. Clone the repository

```bash
git clone https://github.com/yourusername/neuralfit.git
cd neuralfit/backend
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up Python environment (Windows)

Run the setup script in PowerShell (as Administrator):

```powershell
.\scripts\setup-python.ps1
```

### 4. Download the AI model

```bash
npm run model:download
```

This will download the MentaLLaMA model (about 13GB) to the `models/` directory.

### 5. Set up environment variables

Copy the example environment file and update the values:

```bash
cp .env.example .env
```

Edit `.env` with your configuration.

### 6. Start the development server

```bash
npm run dev
```

The server will start at `http://localhost:8000`.

## 📂 Project Structure

```
backend/
├── src/
│   ├── ai/                  # AI model and services
│   ├── config/              # Configuration files
│   ├── controllers/         # Route controllers
│   ├── entities/            # Database entities
│   ├── middleware/          # Express middleware
│   ├── routes/              # API routes
│   ├── services/            # Business logic
│   └── utils/               # Utility functions
├── scripts/                 # Utility scripts
├── .env.example             # Example environment variables
├── package.json             # Project dependencies
└── tsconfig.json            # TypeScript configuration
```

## 🤖 AI Model Configuration

The following environment variables can be used to configure the AI model:

- `MODEL_PATH`: Path to the model directory (default: `./models/MentaLLaMA-chat-7B`)
- `MODEL_REPO`: Hugging Face model repository (default: `Felladrin/mentallama-chat-7b`)
- `AI_DEVICE`: Device to run the model on (`cpu` or `cuda`)
- `AI_MAX_CONTEXT_LENGTH`: Maximum context length (default: 4096)
- `AI_MAX_NEW_TOKENS`: Maximum number of new tokens to generate (default: 200)
- `AI_TEMPERATURE`: Sampling temperature (default: 0.7)
- `AI_TOP_P`: Nucleus sampling parameter (default: 0.9)
- `AI_REPETITION_PENALTY`: Penalty for repeating tokens (default: 1.2)
- `AI_DO_SAMPLE`: Whether to use sampling (default: true)
- `AI_TOP_K`: Number of highest probability tokens to consider (default: 50)

## 📚 API Documentation

### Authentication

All protected routes require a valid JWT token in the `Authorization` header.

```
Authorization: Bearer <token>
```

### Endpoints

#### Chat

- `POST /api/chat` - Send a message to the AI
- `GET /api/chat/conversations` - Get all conversations
- `GET /api/chat/conversations/:id` - Get a specific conversation
- `GET /api/chat/status` - Check AI service status

#### Authentication

- `POST /api/auth/register` - Register a new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh access token
- `POST /api/auth/logout` - Logout user

## 🚀 Deployment

### Production

1. Build the application:

```bash
npm run build
```

2. Start the production server:

```bash
npm start
```

### Docker

```bash
docker build -t neuralfit-backend .
docker run -p 8000:8000 --env-file .env neuralfit-backend
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- [MentaLLaMA](https://huggingface.co/Felladrin/mentallama-chat-7b) - The AI model used for therapy conversations
- [Hugging Face](https://huggingface.co/) - For hosting the model and providing the Transformers library
- [Express](https://expressjs.com/) - Web framework for Node.js
- [TypeORM](https://typeorm.io/) - Database ORM for TypeScript

## 🚀 Features

- User authentication (JWT)
- Role-based access control
- AI-powered therapy conversations
- Conversation history management
- Rate limiting
- Input validation
- Error handling
- Database migrations
- TypeScript support
- Environment-based configuration
- CORS enabled
- Secure HTTP headers
- Request logging

## 🛠 Prerequisites

- Node.js (v18 or later)
- npm (v9 or later)
- PostgreSQL (v14 or later)
- Python 3.8 or later (for model download)
- Git
- Git LFS (for handling large model files)
- CUDA Toolkit (recommended for GPU acceleration)

## 🚀 Quick Start

1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/neuralfit-backend.git
   cd neuralfit-backend
   ```

2. Install dependencies
   ```bash
   npm install
   ```

3. Set up environment variables
   ```bash
   cp .env.example .env
   ```
   Update the `.env` file with your configuration.

4. Install Python dependencies
   ```bash
   pip install torch torchvision torchaudio
   pip install transformers sentencepiece
   pip install huggingface-hub
   ```

5. Download the AI model
   ```bash
   npm run model:download
   ```
   Note: This will download approximately 10GB of model files.

6. Start the development server
   ```bash
   npm run dev
   ```

7. The server will be running at `http://localhost:3001`

8. Check the AI service status
   ```bash
   npm run model:status
   ```
   Should return `{"status":"ready"}` when everything is working.

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory with the following variables:

```env
# Server
PORT=3001
NODE_ENV=development

# Database
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=postgres
DB_PASSWORD=postgres
DB_NAME=neuralfit

# JWT
JWT_SECRET=your-super-secret-jwt-key
JWT_EXPIRES_IN=7d

# Frontend URL (for CORS)
FRONTEND_URL=http://localhost:3000

# Rate limiting
RATE_LIMIT_WINDOW_MS=900000 # 15 minutes
RATE_LIMIT_MAX=100 # requests per window
```

## 🗄 Database Setup

1. Make sure PostgreSQL is installed and running
2. Create a new database:
   ```sql
   CREATE DATABASE neuralfit;
   ```
3. The application will automatically create tables on startup (synchronize: true in development)

For production, use migrations:
```bash
# Generate a new migration
npm run migration:generate -- src/migrations/InitialMigration

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

## 📚 API Documentation

### Authentication

#### Register a new user

```http
POST /api/auth/register
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123",
  "fullName": "John Doe"
}
```

#### Login

```http
POST /api/auth/login
Content-Type: application/json

{
  "email": "user@example.com",
  "password": "password123"
}
```

#### Get current user

```http
GET /api/auth/me
Authorization: Bearer <token>
```

#### Logout

```http
POST /api/auth/logout
Authorization: Bearer <token>
```

### Users

#### Get all users (admin only)

```http
GET /api/users
Authorization: Bearer <token>
```

#### Get user by ID

```http
GET /api/users/:id
Authorization: Bearer <token>
```

#### Update user

```http
PUT /api/users
Authorization: Bearer <token>
Content-Type: application/json

{
  "fullName": "New Name",
  "email": "newemail@example.com"
}
```

#### Delete user

```http
DELETE /api/users
Authorization: Bearer <token>
```

## 🧪 Testing

```bash
# Run tests
npm test

# Run tests in watch mode
npm test -- --watch
```

## 🤖 AI Model Configuration

The application uses the MentaLLaMA-chat-7B model for therapy conversations. Here's how to configure it:

### Performance Tuning

- **GPU Acceleration**: Set `AI_DEVICE=cuda` if you have a compatible NVIDIA GPU with CUDA installed.
- **Memory Usage**: Reduce `AI_MAX_CONTEXT_LENGTH` if you encounter out-of-memory errors.
- **Response Length**: Adjust `AI_MAX_NEW_TOKENS` to control response length.
- **Creativity**: Adjust `AI_TEMPERATURE` (0.1-1.0) - higher values make output more random.

## 🚀 Deployment

### Production Build

```bash
# Install production dependencies
npm ci --only=production

# Build the application
npm run build

# Start the server
npm start
```

### Using PM2

```bash
# Install PM2 globally
npm install -g pm2

# Start the application
pm2 start dist/index.js --name "neuralfit-backend"

# Save the process list
pm2 save

# Set up startup script
pm2 startup

# Monitor logs
pm2 logs neuralfit-backend
```

## 🛡 Security

- All passwords are hashed using bcrypt
- JWT tokens are used for authentication
- Rate limiting is enabled
- CORS is configured to only allow requests from the frontend
- Secure HTTP headers are set
- Input validation is implemented

## 🤝 Contributing

1. Fork the repository
2. Create a new branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

Your Name - [@yourtwitter](https://twitter.com/yourtwitter) - email@example.com

Project Link: [https://github.com/yourusername/neuralfit-backend](https://github.com/yourusername/neuralfit-backend)

## 🙏 Acknowledgments

- [TypeORM](https://typeorm.io/)
- [Express](https://expressjs.com/)
- [JWT](https://jwt.io/)
- [Node.js](https://nodejs.org/)
- [TypeScript](https://www.typescriptlang.org/)
