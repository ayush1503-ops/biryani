# DUM Backend — Biryani & Bar API (Supabase)

Production-ready Node.js + Express backend backed by Supabase (PostgreSQL + Auth), with JWT authentication, full CRUD for menu items and orders, and seeded sample data.

## Stack

- **Node.js + Express** — REST API server
- **Supabase** — PostgreSQL database, Auth, auto REST, Realtime
- **@supabase/supabase-js** — Supabase client (service role for server-side)
- **helmet / cors / morgan** — security, CORS, logging

## Folder Structure

```
backend/
├── .env.example          # Copy to .env and fill in your Supabase keys
├── .gitignore
├── database.sql          # Run this in Supabase SQL Editor first
├── package.json
├── README.md
├── seed.js               # Seeds menu + creates admin + customer users
└── src/
    ├── app.js            # Express app, middleware, routes, health check
    ├── config/
    │   └── supabase.js   # Supabase service-role client
    ├── controllers/
    │   ├── authController.js   # register, login, profile (Supabase Auth)
    │   ├── menuController.js   # menu CRUD
    │   └── orderController.js  # order CRUD
    ├── middleware/
    │   ├── authMiddleware.js   # protect (verify Supabase JWT), admin guard
    │   └── errorMiddleware.js  # notFound, errorHandler
    └── routes/
        ├── authRoutes.js
        ├── menuRoutes.js
        └── orderRoutes.js
```

## Setup

### 1. Create a Supabase project

1. Go to [https://app.supabase.com](https://app.supabase.com) and create a new project.
2. In the project dashboard, go to **Settings → API** and copy:
   - Project URL → `SUPABASE_URL`
   - `anon public` key → `SUPABASE_ANON_KEY`
   - `service_role` secret key → `SUPABASE_SERVICE_ROLE_KEY` (keep secret, never expose to browser)

### 2. Install dependencies

```bash
cd backend
npm install
```

### 3. Configure environment

```bash
cp .env.example .env
```

Fill in `.env`:

| Variable | Where to find it |
|----------|------------------|
| `SUPABASE_URL` | Supabase Settings → API → Project URL |
| `SUPABASE_ANON_KEY` | Supabase Settings → API → anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase Settings → API → service_role secret key |
| `CORS_ORIGIN` | Your frontend URL (e.g. `http://localhost:5173`) |
| `PORT` | Server port (default `4000`) |

### 4. Create the database schema

Open the **SQL Editor** in your Supabase project, paste the entire contents of `database.sql`, and run it.

This creates:
- `menu_items` table
- `orders` table
- `order_items` table
- Row Level Security policies
- Realtime publication

### 5. Seed the database

```bash
npm run seed
```

Creates 12 menu items plus two users:

| Role | Email | Password |
|------|-------|----------|
| Admin | `admin@dum.delhi` | `Admin123!` |
| Customer | `customer@dum.delhi` | `Customer123!` |

### 6. Start the server

```bash
# Development
npm run dev

# Production
npm start
```

Server runs on `http://localhost:4000`. Health check: `GET /api/health`

## API Reference

All mutating endpoints (menu writes, order writes, order reads) require a valid Supabase JWT in the `Authorization: Bearer <token>` header. The token comes from `/api/auth/login` (`access_token`).

### Auth

| Method | Endpoint | Body | Access | Description |
|--------|----------|------|--------|-------------|
| POST | `/api/auth/register` | `{ name, email, password, phone? }` | Public | Register new user (admin-created via service role) |
| POST | `/api/auth/login` | `{ email, password }` | Public | Login, returns `access_token` |
| GET | `/api/auth/profile` | — | Private | Get current user profile |

### Menu

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| GET | `/api/menu` | Public | List items (`?category=biryani&isAvailable=true`) |
| GET | `/api/menu/:id` | Public | Get single item |
| POST | `/api/menu` | Private/Admin | Create item |
| PUT | `/api/menu/:id` | Private/Admin | Update item |
| DELETE | `/api/menu/:id` | Private/Admin | Delete item |

### Orders

| Method | Endpoint | Access | Description |
|--------|----------|--------|-------------|
| POST | `/api/orders` | Private | Create order (with items) |
| GET | `/api/orders/myorders` | Private | My orders |
| GET | `/api/orders/:id` | Private | Get order by ID (owner or admin) |
| GET | `/api/orders` | Private/Admin | All orders |
| PUT | `/api/orders/:id/status` | Private/Admin | Update status |
| PUT | `/api/orders/:id/pay` | Private/Admin | Update payment status |

### Example: Login

```bash
curl -X POST http://localhost:4000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@dum.delhi","password":"Admin123!"}'
```

### Example: Create order (with auth token)

```bash
curl -X POST http://localhost:4000/api/orders \
  -H "Authorization: Bearer <ACCESS_TOKEN>" \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      { "menuItemId": "<uuid>", "name": "Hyderabadi Kacchi Biryani", "price": 360, "quantity": 2 }
    ],
    "totalAmount": 720,
    "deliveryAddress": { "street": "189/A Gali Qasim Jaan", "city": "New Delhi", "pincode": "110013", "phone": "011 4102 7788" }
  }'
```

## Row Level Security (RLS)

The `database.sql` enables RLS on all tables:
- **menu_items**: public read, service-role write
- **orders / order_items**: users see their own rows; service-role manages all

The Express server uses the `service_role` key, which bypasses RLS. The frontend should use the `anon` key so RLS applies.

## Connecting to the frontend

Set `CORS_ORIGIN` in `.env` to your frontend's URL so the browser allows cross-origin requests from the DUM site.
