# Veterinary Clinic API

Backend API for managing clients, pets, employees, vaccines, and medications in a veterinary clinic using Express, Sequelize, and PostgreSQL.

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

5. Run automated tests:

```bash
npm test
```

The API runs tracked database migrations automatically on startup.

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
- `GET /api/pets/:id/vaccines`
- `POST /api/pets/:id/vaccines`
- `PUT /api/pets/:id/vaccines/:vaccineId`
- `DELETE /api/pets/:id/vaccines/:vaccineId`
- `GET /api/pets/:id/medications`
- `POST /api/pets/:id/medications`
- `PUT /api/pets/:id/medications/:medicationId`
- `DELETE /api/pets/:id/medications/:medicationId`
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
  "client_id": 1
}
```

Vaccine body example:

```json
{
  "name": "Rabies",
  "application_date": "2026-03-20",
  "next_due_date": "2027-03-20",
  "notes": "Annual booster"
}
```

Medication body example:

```json
{
  "name": "Amoxicillin",
  "dosage": "50mg twice daily",
  "start_date": "2026-03-25",
  "end_date": "2026-04-01",
  "notes": "Give after meals"
}
```
