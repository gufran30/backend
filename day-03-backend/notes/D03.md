
### 🗓️ Day - 3: REST APIs and HTTP Methods

---

## 🌐 What are REST APIs?
- **REST (Representational State Transfer)** is a **type of API** that follows **specific rules and guidelines** for communication.
- It uses **HTTP methods** like:
  - `GET`
  - `POST`
  - `PUT`
  - `DELETE`
- It defines **fixed standards** for how requests and responses should be structured.

---

## 📨 Ways to Send Data in Requests

### 1. `req.body`
- Hidden in the request payload.
- Best for **larger**, **sensitive**, or **complex** data (like passwords).
- Typically used in `POST`, `PUT`, and `PATCH` requests.

### 2. `req.query`
- Data sent in the URL after `?` as key-value pairs.
- Ideal for **small**, **optional parameters**.
- Avoid using it for **sensitive or complex data**.
- Example:
  ```
  GET /search?gender=male&age=24
  ```

### 3. `req.params`
- Data sent as part of the API path.
- Commonly used for identifying **specific resources**.
- Example: 
  ```
  GET /user/ankur_bit_io
  ```
- Accessed in code as:
  ```js
  req.params.username
  ```

---

## 🧾 REST API Methods

| Method   | Purpose                                      |
|----------|----------------------------------------------|
| **GET**     | Retrieve data from the server.               |
| **POST**    | Send new data to the server (create).        |
| **PATCH**   | Update existing data on the server.          |
| **DELETE**  | Remove/delete data from the server.          |

---

💡 Example Use Case:  
A social media app like `x.com` may use:
- `req.params` to fetch user profiles (`/user/:username`)
- `req.query` to filter search results (`/search?gender=male`)
- `req.body` for login forms or post creation
