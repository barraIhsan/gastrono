# Gastrono

Gastrono is a full-stack CRUD application that allows users to create, read, update, and delete their own recipes, including uploading images.

---

## Getting Started

To run the project locally, follow the steps below.

### Installation

1. Clone the repo
   ```sh
   git clone https://github.com/barraIhsan/gastrono.git gastrono
   cd gastrono
   ```
2. Install dependencies for both backend and frontend
   ```sh
   cd backend && pnpm install
   cd ../frontend && pnpm install
   ```
3. Add environment variables by copying `.env.example`
   ```sh
   cd ..
   cp backend/.env.example backend/.env
   cp frontend/.env.example frontend/.env
   ```
4. Start development servers  
   Backend:
   ```sh
   cd backend
   pnpm start
   ```
   Frontend:
   ```sh
   cd ../frontend
   pnpm dev
   ```

### Importing the Database

A SQL dump file is included in the project for quick setup. _yea ik i shouldve used prisma, but this is for assignment's purposes_  
Make sure you already created a MariaDB/MySQL database. I'll assume you're using `mariadb`, change if necessary

1. Login to MariaDB

   ```sh
   mariadb -u root -p
   ```

2. Create the database (if not already created)

   ```sql
   CREATE DATABASE gastrono;
   ```

3. Exit MariaDB and import the dump
   ```sh
   mariadb -u root -p gastrono < ./gastrono.sql
   ```

After importing, the database will contain all required tables.

## Usage

1. Visit the frontend in your browser:

   ```
   http://localhost:3001
   ```

2. Register an account and log into it

3. You can now use it for:
   - Create recipes
   - Upload recipe images
   - Edit and delete recipes
   - View your recipe collection

## License

Distributed under the GPL-v3 License. See `LICENSE` for more information.
