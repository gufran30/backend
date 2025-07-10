
### 🗓️ Day - 5 & 6: Folder Structure, Databases, Schemas & Models

---

## 🗂️ Folder Structure in Real-World Projects

Folder structure refers to how you organize your project files and directories. It becomes **very important and complex** as the project grows.

### 🔍 Why is it Important?
- Helps in managing large codebases  
- Makes collaboration easier in teams  
- Improves maintainability and scalability  

### 📁 Common Folder Structure Example in Node.js Projects
```
project-root/
│
├── node_modules/       # Installed dependencies
├── src/                # Source code
│   ├── controllers/    # Business logic
│   ├── models/         # Mongoose models
│   ├── routes/         # API routes
│   ├── utils/          # Utility/helper functions
│   └── app.js          # Main app logic
│
├── .env                # Environment variables
├── .gitignore
├── package.json
└── server.js           # Entry point
```

---

## 🗃️ What is a Database (DB)?

A **Database** is a system that stores and manages your application's persistent data.

### 📌 Key Concepts:
- Supports **CRUD** operations:
  - **Create** – add data
  - **Read** – fetch data
  - **Update** – modify data
  - **Delete** – remove data

### 🛢️ Types of Databases:
- **Relational (SQL)** – MySQL, PostgreSQL  
- **Non-relational (NoSQL)** – MongoDB, CouchDB  

---

## 🧱 What is a Schema?

A **Schema** defines the structure, fields, and data types for documents in a MongoDB collection.

### 🧰 Why Schema is Needed?
- Ensures **data consistency**
- Validates the type of data
- Works like a **blueprint** for each document

#### 📄 Example (Mongoose):
```js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    age: Number,
    email: { type: String, unique: true, required: true },
    isActive: { type: Boolean, default: true }
});
```

---

## 📦 What is a Model?

A **Model** is a wrapper for the schema. It allows you to interact with the collection in the database.

### 🔁 Why Models are Important?
- Represent collections like "Users", "Orders", etc.
- Perform all **CRUD operations** like:
  - `create()`, `find()`, `updateOne()`, `deleteOne()`

#### 📄 Example:
```js
const User = mongoose.model('User', userSchema);

User.create({ name: "John", email: "john@example.com" });
User.find({});
User.findByIdAndUpdate("id", { name: "Jane" });
User.findByIdAndDelete("id");
```

---

## 🔄 CRUD Summary

| Operation | Method                   | Purpose                         |
|-----------|--------------------------|----------------------------------|
| Create    | `create()`               | Add new document to DB          |
| Read      | `find()`, `findById()`   | Fetch documents from DB         |
| Update    | `updateOne()`, `findByIdAndUpdate()` | Modify existing document |
| Delete    | `deleteOne()`, `findByIdAndDelete()` | Remove a document         |

---

## 📘 Final Tips
- Always validate incoming data against your schema.
- Structure your folder and codebase from Day 1.
- Use environment variables for DB URLs and secrets.
- Modularize your code for maintainability.
