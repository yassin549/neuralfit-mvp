# ---------- FRONTEND BUILD STAGE ----------
FROM node:18-alpine AS frontend-build
WORKDIR /app/frontend
COPY frontend/package.json ./
COPY frontend/package-lock.json ./
RUN npm ci --only=production
COPY frontend .
RUN npm run build

# ---------- BACKEND BUILD STAGE ----------
FROM node:18-alpine AS backend-build
WORKDIR /app/backend
COPY backend/package.json ./
COPY backend/package-lock.json ./
RUN npm ci --only=production
COPY backend .
RUN npm run build

# ---------- PYTHON AI BUILD STAGE ----------
FROM python:3.11-slim AS python-ai-build
WORKDIR /app/python-ai
COPY backend/src/ai/requirements.txt ./
RUN pip install --no-cache-dir -r requirements.txt
COPY backend/src/ai .

# ---------- FRONTEND RUNTIME ----------
FROM node:18-alpine AS frontend-runtime
WORKDIR /app/frontend
ENV NODE_ENV=production
COPY --from=frontend-build /app/frontend/.next ./.next
COPY --from=frontend-build /app/frontend/public ./public
COPY --from=frontend-build /app/frontend/package.json ./
COPY --from=frontend-build /app/frontend/node_modules ./node_modules
EXPOSE 3000
CMD ["npx", "next", "start", "-p", "3000"]

# ---------- BACKEND RUNTIME ----------
FROM node:18-alpine AS backend-runtime
WORKDIR /app/backend
ENV NODE_ENV=production
COPY --from=backend-build /app/backend/dist ./dist
COPY --from=backend-build /app/backend/package.json ./
COPY --from=backend-build /app/backend/node_modules ./node_modules
COPY --from=backend-build /app/backend/.env.production ./.env.production
EXPOSE 3001
CMD ["node", "dist/index.js"]

# ---------- PYTHON AI RUNTIME ----------
FROM python:3.11-slim AS python-ai-runtime
WORKDIR /app/python-ai
COPY --from=python-ai-build /usr/local/lib/python3.11/site-packages /usr/local/lib/python3.11/site-packages
COPY --from=python-ai-build /app/python-ai .
EXPOSE 8000
CMD ["uvicorn", "app:app", "--host", "0.0.0.0", "--port", "8000", "--workers", "2"]

# NOTE: Each service should use its own target in docker-compose.yml
# - frontend-runtime for frontend
# - backend-runtime for backend
# - python-ai-runtime for AI service
