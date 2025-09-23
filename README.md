# Vercel Serverless Redis Integration

This project demonstrates a Vercel Serverless application with two API endpoints for interacting with Redis:
- `/api/set`: Sets a key-value pair in Redis.
- `/api/get`: Retrieves the value for a given key from Redis.

## Setup

1.  **Clone the repository**:
    ```bash
    git clone <your-repo-url>
    cd vercel-redis-serverless
    ```

2.  **Install dependencies**:
    ```bash
    npm install
    ```

3.  **Configure Redis Connection**:
    Create a `.env.local` file in the root of the project and add your Redis connection URL:
    ```
    REDIS_URL=your_redis_connection_string
    ```
    Replace `your_redis_connection_string` with your actual Redis URL (e.g., from Upstash, Redis Labs, etc.).

## API Endpoints

### 1. Set Redis Value

-   **URL**: `/api/set`
-   **Method**: `POST`
-   **Request Body (JSON)**:
    ```json
    {
      "key": "mykey",
      "value": "myvalue"
    }
    ```
-   **Example using `curl`**:
    ```bash
    curl -X POST -H "Content-Type: application/json" -d '{"key": "testkey", "value": "testvalue"}' http://localhost:3000/api/set
    ```
    (When deployed, replace `http://localhost:3000` with your Vercel deployment URL)

### 2. Get Redis Value

-   **URL**: `/api/get`
-   **Method**: `GET`
-   **Query Parameter**: `key`
-   **Example using `curl`**:
    ```bash
    curl http://localhost:3000/api/get?key=testkey
    ```
    (When deployed, replace `http://localhost:3000` with your Vercel deployment URL)

## Deployment

This project can be deployed to Vercel directly. Make sure to set the `REDIS_URL` environment variable in your Vercel project settings.

1.  **Install Vercel CLI** (if you haven't already):
    ```bash
    npm i -g vercel
    ```

2.  **Deploy to Vercel**:
    ```bash
    vercel --prod
    ```

## Local Development

To run the project locally:

```bash
vercel dev
```

This will start a local development server, typically on `http://localhost:3000`.