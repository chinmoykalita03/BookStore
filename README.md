## 🛠️ Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Create a `.env` file and add the following:**
   ```env
   PORT=5000
   MONGO_URI=mongodb://localhost:27017/your-db-name
   JWT_SECRET=your-secret-key
   ```

4. **Start the server:**
   ```bash
   npm run dev     # For development mode
   npm start       # For production mode
   ```

---

## 📱 API Endpoints & Sample Requests

> 🔐 All `/api/books` routes require a valid JWT token in the request header:
```
Authorization: Bearer <your_token_here>
```

### 🔐 Authentication

- **POST** `/api/auth/signup`  
  Request:
  ```json
  {
    "email": "user@gmail.com",
    "password": "987653232"
  }
  ```

- **POST** `/api/auth/login`  
  Request:
  ```json
  {
    "email": "user@gmail.com",
    "password": "987653232"
  }
  ```  
  Response:
  ```json
  {
    "token": "your_jwt_token_here"
  }
  ```

---

### 📚 Books

- **GET** `/api/books`  
  Optional query parameters: `author`, `category`, `rating`, `title`, `sort`, `page`, `limit`  
  Example:
  ```
  /api/books?author=Rowling&category=Fiction&rating=4&sort=price
  ```

- **POST** `/api/books`  
  Request:
  ```json
  {
    "title": "Example Book",
    "author": "Jane Doe",
    "category": "Fiction",
    "price": 15.99,
    "rating": 4.5,
    "publishedDate": "2024-01-01"
  }
  ```

- **GET** `/api/books/:id`

- **PUT** `/api/books/:id`

- **DELETE** `/api/books/:id`

---

## ✅ Assumptions & Enhancements

### Assumptions
- Rating is a number between 0 to 5.
- Titles can be searched via partial matches.
- Each book has one category.

### Enhancements
- Filtering, sorting, pagination, and searching capabilities.
- Proper error handling with HTTP status codes.


