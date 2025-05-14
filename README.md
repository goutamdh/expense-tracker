# Expense Tracker

## Project Folder Structure
├── backend/
│   ├── src/
│   │   ├── config/
│   │   ├── controllers/
│   │   ├── middleware/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   ├── tests/
│   │   ├── utils/
│   │   ├── app.js
│   │   ├── swagger.json
│   │   └── server.js
├── frontend/
│   ├── src/
│   │   ├── app/
│   │   │   ├── core/
│   │   │   ├── modules/
│   │   │   ├── shared/
│   │   │   ├── auth/
│   │   │   ├── expenses/
│   │   │   └── dashboard/
│   ├── jest.config.js
│   ├── angular.json
│   └── package.json
├── README.md
└── .gitignore

---

## GitHub Instructions

- Commit code regularly with meaningful commit messages.
- Example:
  ```sh
  git add .
  git commit -m "Add expense filtering and search functionality"
  git push origin main
  ```
- Ensure your repository is public or provide access if private.

---

## Development Setup

### 1. Clone the Repository

```sh
git clone https://github.com/your-username/expense-tracker.git
cd expense-tracker
```

### 2. Install Dependencies

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd ../frontend
npm install
```

---

## Running in Development Mode

### Backend

```sh
cd backend
npm run dev
```

### Frontend

```sh
cd frontend
npm start
```

---

## Building the Application

### Frontend

```sh
cd frontend
npm run build
```

---

## Running the Built Code

You can serve the built frontend using a static server (e.g., [serve](https://www.npmjs.com/package/serve)):

```sh
npm install -g serve
serve -s dist/
```

---

## Running Tests

### Backend

```sh
cd backend
npm test
```

### Frontend

```sh
cd frontend
npm test
```

---

## Notes

- API docs: [http://localhost:3000/api-docs](http://localhost:3000/api-docs)
- Update environment variables as needed in `.env` files.