# Spring AI Chat Predict

A full-stack application that predicts the next few words for a user’s text input using Spring AI and a React frontend. The backend exposes a REST endpoint that sends the prompt to an LLM provider, while the frontend provides a simple chat-style experience for entering text and displaying predictions.

## Features

- React + Vite frontend for entering text and viewing predictions
- Spring Boot backend with a REST API
- Spring AI integration for LLM-powered text prediction
- Supports local Ollama-based model inference
- CORS configured for frontend-to-backend communication

## Quick View

Watch a short demo video here:

- [Demo video](./springai-chat-predict/video/Spring-ai-chat-predict.mp4)

## Tech Stack

- Backend: Java, Spring Boot, Spring Web MVC, Spring AI
- Frontend: React, Vite, Axios
- Model runtime: Ollama (default configuration)

## Project Structure

- backend logic in src/main/java
- REST controller and request/response models in the main Java package
- frontend source in frontend/src
- configuration in src/main/resources/application.properties

## Prerequisites

Before running the project, make sure you have:

- Java 25
- Maven or the provided Maven wrapper
- Node.js and npm
- Ollama installed and running locally (for the default configuration)

## Running the Backend

1. Start Ollama locally if you are using the default model configuration.
2. From the project root, run:

```bash
./mvnw spring-boot:run
```

The backend will start on port 8081 by default.

## Running the Frontend

1. Open a new terminal and navigate to the frontend folder:

```bash
cd frontend
npm install
npm run dev
```

2. Open the local Vite URL shown in the terminal.

## API Usage

The backend exposes this endpoint:

```http
POST /predict
Content-Type: application/json
```

Example request body:

```json
{
  "text": "The weather today is"
}
```

Example response:

```json
{
  "prediction": "sunny and warm"
}
```

## Configuration

The application settings are defined in src/main/resources/application.properties.

By default, the project is configured to use Ollama:

```properties
spring.ai.ollama.chat.model=llama3.2:latest
spring.ai.ollama.base-url=http://localhost:11434
```

If you want to use Google GenAI instead, update the properties and uncomment the relevant configuration entries.

## Build Commands

### Backend build

```bash
./mvnw clean package
```

### Frontend build

```bash
cd frontend
npm run build
```

## Notes

- The frontend expects the backend to be available at the configured API endpoint.
- If you change the backend port or host, update the frontend API configuration accordingly.

## License

This project is for demonstration and development purposes.
