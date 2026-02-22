# Support Ticket System

A full-stack Support Ticket Management System built using Django REST Framework and React.js.  
Includes AI-based ticket classification (Mock LLM), status management, and Docker containerization.

---

## 🚀 Features

- Create Support Tickets
- AI-based Category & Priority Suggestion (Mock AI)
- Update Ticket Status (Open / In Progress / Resolved)
- Delete Tickets
- REST API Backend
- Dockerized Backend
- React Frontend UI

---

## 🛠 Tech Stack

### Backend
- Python
- Django
- Django REST Framework

### Frontend
- React.js
- Bootstrap

### DevOps
- Docker
- Docker Compose

---

## 📦 Setup Instructions

### Run Backend (Docker)

docker-compose up --build

### Backend runs at:
http://localhost:8000

### How to Run Frontend
cd frontend
npm install
npm start

## Frontend runs at:
http://localhost:3000

# API Endpoints

GET /api/tickets/

POST /api/tickets/

PATCH /api/tickets/{id}/

DELETE /api/tickets/{id}/

POST /api/tickets/classify/

### Author

Pritam Shamrao Gangurde


---


# “LLM Used?”

Implemented AI-based ticket classification (Mock LLM). Real OpenAI integration available with API key configuration.

---

