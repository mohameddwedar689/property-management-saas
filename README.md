# Property Management SaaS

## Introduction
Property Management SaaS is a web-based application designed to simplify property management for landlords and tenants. It provides features for landlords to manage properties, tenants, and rent payments, while tenants can view their rent payment history. The application uses role-based access control to ensure secure and appropriate access to resources.

## Features
- **Landlord Features:**
  - Add and manage properties.
  - Add and manage tenants.
  - Record rent payments.
  - View rent payment summaries (total collected and pending amounts).

- **Tenant Features:**
  - View rent payment history.

- **Authentication:**
  - Secure login using JSON Web Tokens (JWT).
  - Role-based access control for landlords and tenants.

## Prerequisites
Before setting up the project, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (v14 or higher)
- [npm](https://www.npmjs.com/) (Node Package Manager)

## Setup Instructions
1. Clone the repository:
```bash
git clone https://github.com/mohameddwedar689/property-management-saas.git
cd property-management-saas
```

2. Install dependencies:
```bash
npm install 
```

3. Create a `.env` file in the root directory and add the following environment variables:
```bash
PORT = 8000
JWT_SECRET = your_jwt_secret
```

4. Start the server:
```bash
nodemon server
```

5. The server will run on `http://localhost:8000`

## How Login Works

1. A user (landlord or tenant) sends a `POST` request to `/api/auth/login` with their email and password.

2. The server verifies the credentials against the `users` data.

3. f valid, a `JWT` is generated containing the user's `id` and `role` and returned to the client.

4. The client includes the token

## API Examples

1. **Authentication**

- Login
```bash
POST /api/auth/login
Content-Type: application/json
{
  "email": "tenant@example.com",
  "password": "123456"
}
```

2. **Tenants APIs**

- View Rent Payments
```bash
GET /api/tenant/my-rent
Authorization: Bearer <token>
``` 

3. **Landloard APIs**

- Add property
```bash
POST /api/landloard/properties/add
Authorization: Bearer <token>
Content-Type: application/json
{
  "address": "456 example St"
}
```

- Get Properties
```bash
GET /api/landloard/properties
Authorization: Bearer <token>
```

- Add Tenants
```bash
POST /api/landloard/tenants/add
Authorization: Bearer <token>
Content-Type: application/json
{
  "name": "Jane Smith",
  "email": "jane@example.com",
  "propertyId": "<property-id>"
}
```

- Record Rent Payment
```bash
POST /api/landloard/rent-payments
Authorization: Bearer <token>
Content-Type: application/json
{
  "tenantId": "<tenant-id>",
  "propertyId": "<property-id>",
  "amount": 1200,
  "status": "paid",
  "dueDate": "2024-01-01"
}
```

- Get Rent Summary
```bash
GET /api/landloard/rent-summary
Authorization: Bearer <token>
```

## PostMan Documentation
- [URL for published documentation](https://documenter.getpostman.com/view/27167186/2sB2j68pfP)

## 🔗 Reach me out!
[![linkedin](https://img.shields.io/badge/linkedin-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/mohamed-dwedar/)