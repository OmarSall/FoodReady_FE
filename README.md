# FoodReady Frontend

Frontend monorepo for the FoodReady project, built with **React**, **TypeScript**, and **Vite**, using **npm workspaces**.

The monorepo clearly separates:
- an authenticated **customer portal**
- a public **order tracking** application

This setup allows independent development, build, and deployment of both applications while keeping shared tooling and conventions in a single repository.

---

## 📁 Project structure
```text
apps/
    customer-portal/    # Authenticated dashboard (employees, orders, companies)
    order-tracking/     # Public order tracking app (QR / tracking link)
    
packages/               # Reserved for shared code (types, api contracts, utils)
```


---

## 🧱 Applications

### apps/customer-portal

Authenticated application for internal users (owners, employees).

Responsibilities:
- authentication
- order management
- order status updates
- QR code generation
- generating links to the public order tracking app

---

### apps/order-tracking

Public application for customers.

Responsibilities:
- order status tracking
- real-time or near-real-time updates
- no authentication required
- accessible via QR code or direct tracking link

---

## 🚀 Development

Run the customer portal:
```bash
npm run dev:portal
```
Run the order tracking app:
```bash
npm run dev:tracking
```
Each application runs on its own Vite development server and can be developed independently.

# Build

Build the customer portal:
```bash
npm run build:portal
```
Build the order tracking app:
```bash
npm run build:tracking
```
# 📦 Tooling & stack
- React
- TypeScript
- Vite
- npm workspaces
- ESLint
- Prettier
- SWC (used in the order-tracking app)

# 🔗 Application integration
Integration happens via a shared backend API

URL linking from the customer portal to the order tracking app

This separation keeps the public tracking flow isolated from authenticated user flows.

# Notes
Dependencies are managed at the workspace level using a single root node_modules and package-lock.json.

Each app can be built and deployed independently.