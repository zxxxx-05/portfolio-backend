# Portfolio & Blog API

A secure, robust, and scalable RESTful API built with Node.js, Express, and MongoDB. This API serves as the backend for a personal portfolio website with blog functionality.

## Live Demo

- **API URL**: https://portfolio-backend-hgygo4lip-wqeqweqweqweqs-projects.vercel.app
- **Frontend URL**: https://portfolio-frontend-p0m1ix0bl-wqeqweqweqweqs-projects.vercel.app

## Features

- User authentication with JWT
- Password hashing with bcrypt
- CRUD operations for Projects, Blog Posts, and Comments
- Contact form message handling
- Authorization middleware for protected routes
- Central error handling
- Security headers with Helmet
- CORS support

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB Atlas
- **ODM**: Mongoose
- **Authentication**: JWT (JSON Web Tokens)
- **Security**: bcrypt, helmet, cors

## API Endpoints

### Authentication

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/users/register` | Register a new user | Public |
| POST | `/api/users/login` | Login and get JWT token | Public |
| GET | `/api/users/profile` | Get user profile | Protected |

#### Register User
```http
POST /api/users/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "username": "johndoe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

#### Login User
```http
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response:**
```json
{
  "_id": "user_id",
  "username": "johndoe",
  "email": "john@example.com",
  "token": "jwt_token"
}
```

### Projects

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create a project | Protected |
| PUT | `/api/projects/:id` | Update a project | Protected |
| DELETE | `/api/projects/:id` | Delete a project | Protected |

#### Create Project (Protected)
```http
POST /api/projects
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "My Project",
  "description": "A cool project description",
  "imageUrl": "https://example.com/image.jpg",
  "repoUrl": "https://github.com/user/repo",
  "liveUrl": "https://myproject.com",
  "technologies": ["React", "Node.js", "MongoDB"]
}
```

#### Update Project (Protected)
```http
PUT /api/projects/:id
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "Updated Project Title",
  "description": "Updated description"
}
```

### Blog Posts

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog` | Get all blog posts | Public |
| GET | `/api/blog/:id` | Get single post with comments | Public |
| POST | `/api/blog` | Create a blog post | Protected |
| PUT | `/api/blog/:id` | Update a blog post | Protected (Author only) |
| DELETE | `/api/blog/:id` | Delete a blog post | Protected (Author only) |

#### Create Blog Post (Protected)
```http
POST /api/blog
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "title": "My Blog Post",
  "content": "Full content of the blog post...",
  "excerpt": "Short summary of the post",
  "coverImage": "https://example.com/cover.jpg",
  "tags": ["tech", "programming"]
}
```

### Comments

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog/:postId/comments` | Get comments for a post | Public |
| POST | `/api/blog/:postId/comments` | Create a comment | Protected |
| DELETE | `/api/blog/:postId/comments/:commentId` | Delete a comment | Protected (Author only) |

#### Create Comment (Protected)
```http
POST /api/blog/:postId/comments
Authorization: Bearer <jwt_token>
Content-Type: application/json

{
  "body": "This is a great post!"
}
```

### Contact

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Send a contact message | Public |
| GET | `/api/contact` | Get all messages | Protected |
| DELETE | `/api/contact/:id` | Delete a message | Protected |

#### Send Contact Message
```http
POST /api/contact
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "message": "Hello, I would like to get in touch!"
}
```

### Health Check

| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/health` | Check API status | Public |

## Data Models

### User
```javascript
{
  username: String (required, unique),
  email: String (required, unique),
  password: String (required, min 6 chars)
}
```

### Project
```javascript
{
  title: String (required),
  description: String (required),
  imageUrl: String,
  repoUrl: String,
  liveUrl: String,
  technologies: [String],
  user: ObjectId (ref: User)
}
```

### BlogPost
```javascript
{
  title: String (required),
  content: String (required),
  excerpt: String,
  coverImage: String,
  tags: [String],
  author: ObjectId (ref: User)
}
```

### Comment
```javascript
{
  body: String (required),
  author: ObjectId (ref: User),
  post: ObjectId (ref: BlogPost)
}
```

### Message
```javascript
{
  name: String (required),
  email: String (required),
  message: String (required)
}
```

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- MongoDB Atlas account or local MongoDB instance

### Installation

1. Clone the repository:
```bash
git clone https://github.com/zxxxx-05/portfolio-backend.git
cd portfolio-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory:
```env
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
NODE_ENV=development
FRONTEND_URL=http://localhost:5173
```

4. Start the server:
```bash
# Development
npm run dev

# Production
npm start
```

The API will be running at `http://localhost:5000`

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PORT` | Server port | No (default: 5000) |
| `MONGODB_URI` | MongoDB connection string | Yes |
| `JWT_SECRET` | Secret key for JWT signing | Yes |
| `NODE_ENV` | Environment (development/production) | No |
| `FRONTEND_URL` | Frontend URL for CORS | No |

## Authentication

Protected routes require a valid JWT token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Tokens are obtained by registering or logging in. Tokens expire after 30 days.

## Error Handling

The API returns consistent error responses:

```json
{
  "message": "Error description",
  "stack": "Stack trace (development only)"
}
```

Common HTTP status codes:
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `401` - Unauthorized
- `404` - Not Found
- `500` - Server Error

## Deployment

This API is deployed on Vercel.

### Deploy to Vercel

1. Install Vercel CLI: `npm i -g vercel`
2. Run: `vercel`
3. Set environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET`
   - `NODE_ENV`
   - `FRONTEND_URL`

## License

ISC
