# Book Store API

A RESTful API for managing a book store with features like user authentication, book management, and search functionality.

## Features

- User Authentication (JWT)
- Book Management (CRUD operations)
- Search Books by title, author, and genre
- Pagination support

## Setup Instructions

1. Clone the repository:
```bash
git clone [repository-url]
cd book-store-api
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file with the following variables:
```
JWT_SECRET=your-secret-key
PORT=3000
```

4. Start the server:
```bash
npm start
```

The server will run on `http://localhost:3000`

## API Endpoints

### Authentication

- `POST /api/user/register` - Register a new user
- `POST /api/user/login` - Login and get JWT token

### Books (Protected Routes - Requires Authentication)

- `GET /api/books` - Get all books (with search and pagination)
  - Query parameters:
    - `title` - Search by book title
    - `author` - Search by author name
    - `genre` - Search by genre
    - `page` - Page number (default: 1)
    - `limit` - Items per page (default: 10)

- `GET /api/books/:id` - Get book details
- `POST /api/books` - Create a new book
- `PUT /api/books/:id` - Update a book
- `DELETE /api/books/:id` - Delete a book

## Testing Endpoints

### Using Postman

1. Create a new request
2. Set the appropriate HTTP method
3. Add the base URL: `http://localhost:3000`
4. For protected routes:
   - Go to Authorization tab
   - Select "Bearer Token"
   - Enter your JWT token in the token field

### Request Body Formats

#### Authentication

1. **Register User**
   - Endpoint: `POST /api/user/register`
   - Headers: 
     ```json
     {
       "Content-Type": "application/json"
     }
     ```
   - Body:
     ```json
     {
       "email": "user@example.com",
       "password": "your-password"
     }
     ```

2. **Login**
   - Endpoint: `POST /api/user/login`
   - Headers: 
     ```json
     {
       "Content-Type": "application/json"
     }
     ```
   - Body:
     ```json
     {
       "email": "user@example.com",
       "password": "your-password"
     }
     ```

#### Books (Protected Routes)

1. **Create Book**
   - Endpoint: `POST /api/books`
   - Headers: 
     ```json
     {
       "Content-Type": "application/json",
       "Authorization": "Bearer your-jwt-token"
     }
     ```
   - Body:
     ```json
     {
       "title": "Book Title",
       "author": "Author Name",
       "genre": "Genre",
       "publishedYear": 2023
     }
     ```

2. **Update Book**
   - Endpoint: `PUT /api/books/:id`
   - Headers: 
     ```json
     {
       "Content-Type": "application/json",
       "Authorization": "Bearer your-jwt-token"
     }
     ```
   - Body:
     ```json
     {
       "title": "Updated Title",
       "author": "Updated Author",
       "genre": "Updated Genre",
       "publishedYear": 2024
     }
     ```

3. **Get Books with Search**
   - Endpoint: `GET /api/books`
   - Headers: 
     ```json
     {
       "Authorization": "Bearer your-jwt-token"
     }
     ```
   - Query Parameters:
     ```
     ?title=javascript&page=1&limit=10
     ```

4. **Get Single Book**
   - Endpoint: `GET /api/books/:id`
   - Headers: 
     ```json
     {
       "Authorization": "Bearer your-jwt-token"
     }
     ```

5. **Delete Book**
   - Endpoint: `DELETE /api/books/:id`
   - Headers: 
     ```json
     {
       "Authorization": "Bearer your-jwt-token"
     }
     ```