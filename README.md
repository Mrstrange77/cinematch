```markdown
# CineMatch Backend

Express and MongoDB backend for the CineMatch application. It provides authentication, movie, and user-related API routes with CORS support for local development and the production frontend.

## Features

- Express.js HTTP server
- MongoDB integration with Mongoose
- Environment-based configuration
- JSON request parsing
- CORS support
- Authentication, movie, and user API routes

## Requirements

- Node.js 18+
- npm
- MongoDB database
- CineMatch frontend, if testing the complete application

## Installation

```bash
cd backend
npm install
```

Create a `.env` file in the `backend` directory:

```env
MONGO_URI=mongodb://127.0.0.1:27017/cinematch
PORT=5000
```

For MongoDB Atlas, use your Atlas connection string instead:

```env
MONGO_URI=mongodb+srv://<username>:<password>@<cluster>/<database>
PORT=5000
```

## Running the Server

### Development

```bash
node `server.js`
```

The API will be available at:

```text
http://localhost:5000
```

If a development script is configured in `package.json`, you can also run:

```bash
npm run dev
```

### Production

```bash
npm start
```

## API Routes

| Route | Description |
|---|---|
| `/api/auth` | User authentication and account operations |
| `/api/movies` | Movie-related operations |
| `/api/user` | User profile and preference operations |

Refer to the route files in `backend/routes` for the available endpoints, HTTP methods, request bodies, and authentication requirements.

## Project Structure

```text
backend/
├── routes/
│   ├── auth.js
│   ├── movies.js
│   └── user.js
├── `server.js`
├── package.json
├── package-lock.json
└── .env
```

## CORS Configuration

The server currently permits requests from:

- `http://localhost:5173`
- `https://cinematch-jbgl.vercel.app`

To add another frontend origin, update the `origin` array in `server.js`.

## Troubleshooting

### MongoDB connection failed

Verify that:

- MongoDB is running locally, or the Atlas cluster is accessible.
- `MONGO_URI` is correctly defined in `.env`.
- Your Atlas IP allowlist and database credentials are configured correctly.

### Port already in use

Change the port in `.env`:

```env
PORT=5001
```

Then restart the server.

### Frontend cannot connect

Confirm that:

- The backend is running.
- The frontend uses the correct API URL.
- The frontend origin is included in the CORS configuration.

## Security Notes

- Never commit `.env` to version control.
- Add `.env` to `.gitignore`.
- Use strong database credentials.
- Restrict MongoDB Atlas network access in production.
- Configure production CORS origins explicitly.

## License

This project is intended for the CineMatch application. Add the applicable license information here.
```
