Cognifyz_Task_5 — REST API (CRUD) + Front-end
--------------------------------------------

How to run:
1. Open terminal in Cognifyz_Task_5 folder
2. npm install
3. npm start
4. Open http://localhost:3002

What it includes:
- Express REST API: GET/POST/PUT/DELETE at /api/items
- Front-end that performs fetch() requests to the API
- In-memory storage (temporary). To persist data, replace with MongoDB or other DB.

API quick doc:
- GET  /api/items          -> returns list
- GET  /api/items/:id      -> returns single item
- POST /api/items          -> create { title, description }
- PUT  /api/items/:id      -> update fields
- DELETE /api/items/:id    -> delete item

Internship PDF (local path): /mnt/data/FULL STACK DEVELOPMENT (1).pdf
