Task 5 — REST API (CRUD) + Front-end
--------------------------------------------

How to run:
1. Open terminal inside Task_5
2. npm install
3. npm start
4. Open http://localhost:3002 in your browser

What it includes:
- A complete Express.js REST API supporting CRUD operations
- Endpoints for creating, reading, updating, and deleting items
- Front-end interface that uses fetch() to communicate with the API
- In-memory storage (temporary). Can be replaced with MongoDB or any database for persistence.

API Documentation:
- GET    /api/items          -> returns all items
- GET    /api/items/:id      -> returns a single item by ID
- POST   /api/items          -> creates a new item { title, description }
- PUT    /api/items/:id      -> updates an existing item
- DELETE /api/items/:id      -> deletes an item by ID

Notes:
- This project demonstrates essential backend concepts: routing, middleware, and request handling.
- The included front-end showcases how to integrate a UI with an API using fetch().
- Database support can be added for long-term data storage.
