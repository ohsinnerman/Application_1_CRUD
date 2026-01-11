# MERN Real-Time Chat Application

A production-grade, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js), PostgreSQL, Redis, and Socket.IO.

## Prerequisites

Before running the application, ensure you have the following installed:

1.  **Node.js** (v18+)
2.  **Docker Desktop** (Required for databases)

## Getting Started

### 1. Start Infrastructure (Databases)

The application uses PostgreSQL (User/Chat data), MongoDB (Message history), and Redis (Presence/Sessions). Start them using Docker Compose:

```bash
docker-compose up -d
```

### 2. Install Dependencies

Install dependencies for both the server and client:

```bash
# Server
cd server
npm install

# Client
cd ../client
npm install
```

### 3. Run the Application

You need to run the server and client in separate terminals.

**Terminal 1: Server**
```bash
cd server
npm run dev
```
*The server will start on port 5000 and connect to the databases automatically.*

**Terminal 2: Client**
```bash
cd client
npm run dev
```
*The client will start on http://localhost:5173.*

## Features

- **Authentication**: JWT-based auth with Register/Login.
- **Real-time Messaging**: Instant messaging using Socket.IO.
- **Private Chats**: Create 1-on-1 chats with other users.
- **Search**: Find users by username.
- **Persistence**: Messages are saved in MongoDB, User profiles in PostgreSQL.

## Troubleshooting

- **Database Connection Errors**: Ensure Docker is running and containers are up (`docker ps`).
- **Build Errors**: Try deleting `node_modules` and running `npm install` again.

## Deployment

### Option 1: Docker Compose (Single Server / VPS)
Ideal for simple deployments on AWS EC2, DigitalOcean, or a local server.

1.  **Build and Start Services**:
    ```bash
    docker-compose up -d --build
    ```
    This will start Nginx, Server, Client, Postgres, Mongo, and Redis containers.
    The app will be accessible at `http://localhost` (or your server's IP) on port 80.

### Option 2: Kubernetes (Scalable Cluster)
Ideal for production environments like AWS EKS, Google GKE, or Azure AKS.

1.  **Apply Manifests**:
    Ensure you have `kubectl` configured for your cluster.
    ```bash
    kubectl apply -f deploy/k8s/
    ```
    This creates Deployments and Services for all components.

2.  **Access**:
    The generic manifests use `LoadBalancer` for the client service. Check your cloud provider's external IP assignment:
    ```bash
    kubectl get services
    ```
