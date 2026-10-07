# CableInternetUSA

Next.js application (JavaScript + Tailwind CSS) with MongoDB authentication.

## Setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and set your MongoDB connection string:

```env
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/cable-internet-usa
JWT_SECRET=your-secret-key
```

3. Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home page (`pages/index.js`) — original design preserved |
| `/login` | User login |
| `/register` | User registration |

## API Routes

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | Create a new user |
| `/api/auth/login` | POST | Authenticate and receive JWT |

### Register body

```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "secret123"
}
```

### Login body

```json
{
  "email": "john@example.com",
  "password": "secret123"
}
```
