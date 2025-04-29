## Restful Users API

This project is a RESTful API for managing user data. It's built using Node.js, Express and it integrates Swagger for API documentation.

## Features

- User management: Retrieve, count, and add users.
- Swagger documentation: Interactive API documentation available at '/api-docs'.
- Endpoints:
  - GET /: Welcome message.
  - GET /users: Retrieve all users, also by their name, email or age range.
    - Query examples:
      - `/users?name=Patryk` — retrieves users with the name "Patryk".
      - `/users?minAge=20&maxAge=30` — retrieves users aged between 20 and 30.
  - GET /countusers: Count all users.
  - GET /countwomen: Count all female users.
  - GET /user: Retrieves users by their id or their email domain name.
    - Query examples:
      - `/user?id=5` — retrieves the user with ID 5.
      - `/user?domain=mail` — retrieves users whose email domain contains "mail".
  - POST /adduser: Add new users.
  - DELETE /user: Deletes a user of a given id.
 
## Prerequisites

- Node.js (v14 or higher)
- npm (v6 or higher)
- Docker (optional, for container deployment)

## Installation

1. Clone the repository:
```bash
   git clone https://github.com/pawelbubacz/restful-users
   cd restful-users
```

2. Install dependencies:
```bash
   npm install
```

## Database Setup

This project uses PostgreSQL as the database for storing user data. Ensure you have PostgreSQL installed and running on your system.

1. Install PostgreSQL:
- On macOS, you can use Homebrew:
```bash     
  brew install postgresql
  brew services start postgresql
```

2. Configure Database Credentials:
- Create a `.env` file in your project root with the following content:
```
DB_USER=your_user
DB_PASSWORD=your_password
DB_HOST=your_host(localhost usually)
DB_PORT=your_port(5432 usually)
DB_NAME=users
```
- The application and migration scripts will automatically use these environment variables.

3. Run the Migration Script:
- This will automatically create the users database (if it does not exist), create the required tables, and fill them with data.
- Then run the migration:
```bash
npx ts-node infrastructure/migrations/migrations.ts
```
- If you see a message that the database already exists, the script will continue and apply the migrations.

4. Verify the Connection:
- To verify there is a connection you can start the server:
```bash
  npm start
```
  - Or you can run tests using:
```bash
  npm test
```

## Usage
- The API will be available at `http://localhost:3000`.
After starting the server, it's recommended that you interact with the API using tools like Postman or Insomnia. Below are some example requests:
- Retrieve all users:
```bash
  GET /users
```
- Retrieve a user by ID:
```bash
  GET /user?id=4
```

## Testing
- To run the tests for this project, use the following command:
```bash
  npm test
```

## Docker

This project includes a `Dockerfile` and a `docker-compose.yml` for easy containerized setup.

1. Start the Application with Docker Compose

To build and start the API and PostgreSQL database together, run:

```bash
docker-compose up --build
```

- This command will build the Docker images and start both the API and the database.
- The API will be available at `http://localhost:3000`.

2. Stop the Application

To stop the running containers, press `Ctrl+C` in the terminal where Docker Compose is running, then run:

```bash
docker-compose down
```

- This will stop and remove the containers, but your database data will be preserved in the Docker volume.
