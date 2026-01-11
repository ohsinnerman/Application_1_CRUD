# MERN Real-Time Chat Application

A production-grade, real-time chat application built with the MERN stack (MongoDB, Express, React, Node.js), PostgreSQL, Redis, and Socket.IO.

**Recently Overhauled: Now features a modern, Aesthetic Light Mode UI.**

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

- **Aesthetic Light Mode**: A clean, modern UI with indigo/pink gradients, glassmorphism, and soft shadows.
- **Authentication**: JWT-based auth with beautifully designed Login/Register pages.
- **Real-time Messaging**: Instant messaging using Socket.IO with "Chat Bubble" interface.
- **Modern Dashboard**: Clean sidebar navigation with integrated search and user profile.
- **Role-Based Access**: Secure endpoints protected by RBAC.
- **Persistence**: Messages are saved in MongoDB, User profiles in PostgreSQL.

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

2.  **Access**:
    Check your cloud provider's external IP assignment:
    ```bash
    kubectl get services
    ```
