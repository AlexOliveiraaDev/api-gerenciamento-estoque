# **Inventory Management API**

![Node.js](https://img.shields.io/badge/Node.js-%3E%3D%2016.0.0-green)
![MySQL](https://img.shields.io/badge/MySQL-%3E%3D%208.0-blue)
![Express](https://img.shields.io/badge/Express-%3E%3D%204.0-blue)
![Status](https://img.shields.io/badge/status-active-brightgreen)
![Serverless](https://img.shields.io/badge/Serverless-orange)

A RESTful API designed for managing inventory products, built using Node.js, Express, MySQL, and Serverless for deployment. This application allows users to perform CRUD operations (Create, Read, Update, Delete) on an inventory of products in a MySQL database.

This project is ready for deployment on **Netlify** and can be easily integrated into your own projects or used as a standalone service. I created this API because I use it in multiple projects and decided to share it with the community.

## **Table of Contents**
- [Technologies](#technologies)
- [Features](#features)
- [Installation](#installation)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [License](#license)

## **Technologies**

- **Node.js**: JavaScript runtime for building scalable applications.
- **Express.js**: Web framework for creating RESTful APIs.
- **MySQL**: Relational database management system for storing product data.
- **Serverless Framework**: For deploying the app in a serverless environment.
- **dotenv**: For managing environment variables.

## **Features**

- 🚀 **CRUD Operations**: Create, Read, Update, and Delete products in the database.
- 🔒 **Error Handling**: Handles errors gracefully and returns appropriate HTTP status codes.
- 🌐 **Cross-Origin Resource Sharing (CORS)**: Enabled for client-side access.
- ⚡ **Fast and Scalable**: Designed for high performance and scalability.
- 🛠️ **Environment Configuration**: Configurable through environment variables.
- 🌍 **Ready for Netlify**: This project is ready to be deployed on Netlify with minimal setup.

## **Installation**

### 1. Clone the repository:
```bash
git clone https://github.com/yourusername/inventory-management-api.git
```

### 2. Navigate to the project directory:
```bash
cd inventory-management-api
```

### 3. Install dependencies:
```bash
npm install
```

### 4. Set up environment variables by creating a `.env` file:
```bash
DB_HOST=your-database-host
DB_PORT=your-database-port
DB_USER=your-database-username
DB_PASSWORD=your-database-password
DB_DATABASE=your-database-name
```

### 5. Run the application locally:
```bash
npm start
```

### 6. Deploy to **Netlify** or another serverless environment:
1. Ensure you have the **Serverless Framework** installed.
2. Run:
   ```bash
   serverless deploy
   ```

## **Environment Variables**

Make sure to set up the following environment variables in your `.env` file:

- `DB_HOST`: Database host address (e.g., localhost or cloud provider address).
- `DB_PORT`: Port number for the MySQL database (e.g., 3306).
- `DB_USER`: MySQL database username.
- `DB_PASSWORD`: MySQL database password.
- `DB_DATABASE`: Name of the MySQL database.

## **API Endpoints**

### **GET** `/api/produtos`
Fetches all products from the database.

**Response:**
```json
[
    {
        "id": 1,
        "produto": "Product A",
        "categoria": "Category 1",
        "quantidade": 100,
        "preco": 20.99,
        "localizacao": "A1"
    },
    ...
]
```

### **POST** `/api/produtos`
Creates a new product in the database.

**Request body:**
```json
{
    "produto": "Product B",
    "categoria": "Category 2",
    "quantidade": 50,
    "preco": 15.99,
    "localizacao": "B2"
}
```

**Response:**
```json
{
    "id": 2,
    "produto": "Product B"
}
```

### **PUT** `/api/produtos/:id`
Updates an existing product by its ID.

**Request body:**
```json
{
    "produto": "Updated Product",
    "categoria": "Updated Category",
    "quantidade": 120,
    "preco": 18.99,
    "localizacao": "C3"
}
```

**Response:**
```json
{
    "message": "Produto atualizado com sucesso"
}
```

### **DELETE** `/api/produtos/:id`
Deletes a product by its ID.

**Response:**
```json
{
    "message": "Produto apagado com sucesso"
}
```

## **License**

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
