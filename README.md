# Veterinary Clinic API

Backend API for managing clients, pets, and employees in a veterinary clinic using Express, Sequelize, and PostgreSQL.

## Requirements

- Node.js 18+
- PostgreSQL 14+ (or Docker)

## Setup

1. Install dependencies:

```bash
npm install
```

2. Configure environment variables:

```bash
cp .env.example .env
```

3. Start PostgreSQL with Docker (optional):

```bash
docker compose up -d
```

4. Start the API:

```bash
npm start
```

The API initializes database tables automatically on startup.

## Base URL

`http://localhost:3000/api`

## Endpoints

### Health

- `GET /health`

### API Status

- `GET /api`

### Clients

- `GET /api/clients`
- `GET /api/clients/:id`
- `POST /api/clients`
- `PUT /api/clients/:id`
- `DELETE /api/clients/:id`

Body example:

```json
{
  "full_name": "Ana Perez",
  "phone": "+1-555-0123",
  "email": "ana@example.com"
}
```

### Employees

- `GET /api/employees`
- `GET /api/employees/:id`
- `POST /api/employees`
- `PUT /api/employees/:id`
- `DELETE /api/employees/:id`

Body example:

```json
{
  "full_name": "Dr. Sofia Diaz",
  "role": "Veterinarian",
  "phone": "+1-555-9876",
  "email": "sofia@example.com",
  "hire_date": "2024-04-12"
}
```

### Pets

- `GET /api/pets`
- `GET /api/pets/:id`
- `POST /api/pets`
- `PUT /api/pets/:id`
- `DELETE /api/pets/:id`

Body example:

```json
{
  "name": "Luna",
  "species": "Dog",
  "breed": "Labrador",
  "birth_date": "2022-01-10",
  "owner_id": 1
}
```
