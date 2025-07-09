# Candidate Referral Management System – API Documentation

## Base URL
`http://localhost:5000/api`

---

## Endpoints

### 1. Register User
- **POST** `/auth/register`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  { "_id": "...", "email": "user@example.com" }
  ```

### 2. Login User
- **POST** `/auth/login`
- **Body:**
  ```json
  {
    "email": "user@example.com",
    "password": "yourpassword"
  }
  ```
- **Response:**
  ```json
  { "token": "JWT_TOKEN" }
  ```

### 3. Add Candidate
- **POST** `/candidates`
- **Headers:** `Content-Type: multipart/form-data`
- **Body:**
  - `name` (string, required)
  - `email` (string, required)
  - `phone` (string, required)
  - `jobTitle` (string, required)
  - `resume` (file, optional, PDF only)
- **Response:**
  ```json
  {
    "_id": "...",
    "name": "...",
    "email": "...",
    "phone": "...",
    "jobTitle": "...",
    "status": "Pending",
    "resumeUrl": "..."
  }
  ```

### 4. Get All Candidates
- **GET** `/candidates`
- **Response:**
  ```json
  [
    { "_id": "...", "name": "...", ... },
    ...
  ]
  ```

### 5. Update Candidate Status
- **PUT** `/candidates/:id/status`
- **Body:**
  ```json
  { "status": "Reviewed" }
  ```
- **Response:**
  ```json
  { "_id": "...", "status": "Reviewed", ... }
  ```

### 6. Delete Candidate (Optional)
- **DELETE** `/candidates/:id`
- **Response:**
  ```json
  { "message": "Candidate deleted" }
  ```

---

## Error Responses
- **400:** Invalid input (e.g., invalid email, phone, or file type)
- **404:** Not found
- **500:** Server error

---

## Notes & Tips
- All endpoints return JSON.
- Resume uploads must be in PDF format only.
- If authentication is enabled, send your JWT token in the `Authorization` header as `Bearer <token>`.
- For any issues or questions, check the backend logs for more details.
- Make sure your backend server is running before testing the API.
- You can use tools like Postman or Insomnia to test these endpoints easily.

---

**Happy coding! If you spot any issues or have suggestions, feel free to update this doc.**
