## Resttful Users API

This project is a RESTful API for managing user data. It's built using Node.js, Express and it integrates Swagger for API documentation.

## Features

- User management: Retrieve, count, and add users.
- Swagger documentation: Interactive API documentation available at '/api-docs'.
- Endpoints:
  - GET /: Welcome message.
  - GET /users: Retrieve all users, is also a queryable get.
  - GET /countusers: Count all users.
  - GET /countwomen: Count all female users.
  - GET /user: Retrieves users by their id or their email domain name.
  - 'POST /addusers': Add new users.
 
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

## Database Setup

This project uses PostgreSQL as the database for storing user data. Ensure you have PostgreSQL installed and running on your system.

1. Install PostgreSQL:
- On macOS, you can use Homebrew:
```bash     
  brew install postgresql
  brew services start postgresql
```

2. Create a Database and table:
- Access the PostgreSQL shell:
```bash
  psql postgres
```

- Create a new database for the project:
```sql
  CREATE DATABASE restful_users;
```
   
- Connect to the newly created database:
```sql
  \c restful_users
```

- Create a table named 'user_data' with the required columns:
```sql
  CREATE TABLE user_data (
   id SERIAL PRIMARY KEY,
   name VARCHAR(255) NOT NULL,
   email VARCHAR(255) UNIQUE NOT NULL,
   age INT NOT NULL
   );
```

- Fill the table with records using:
```sql
  INSERT INTO user_data (name, email, age) VALUES
  ('Jan Kowalski', 'jan.kowalski@example.com', 30)
  ...
```

3. Configure the Database:
- Create the database connection settings in the configuration file located at src/data/db.ts:
```typescript
  import { Pool } from 'pg';

  const pool = new Pool({
   user: 'test_user',
   host: 'localhost',
   database: 'test_db',
   password: 'test_password',
   port: 5432
  });

  export default pool;
```

5. Verify the Connection:
- To verify there is a connection you can start the server:
```bash
  npm start
```

  - Or you can run tests using:
```bash
  npm test
```

## Usage
After starting the server, it's recommended that you interact with the API using tools like Postman or Insomnia. Below are some example requests:
- Retrieve all users:
```bash
  GET /users
```
- Retrieve a user by ID:
```bash
  GET /userbyid/1
```

## Testing
- To run the tests for this project, use the following command:
```bash
  npm test
```