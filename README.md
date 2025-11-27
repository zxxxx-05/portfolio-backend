# Portfolio & Blog API

A secure, robust, and scalable RESTful API built with Node.js, Express, and MongoDB. This API serves as the backend for a personal portfolio website with blog functionality.

## Live Demo

- **API URL**: [Your deployed API URL here]
- **Frontend URL**: [Your deployed frontend URL here]

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

### Projects
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/projects` | Get all projects | Public |
| GET | `/api/projects/:id` | Get single project | Public |
| POST | `/api/projects` | Create a project | Protected |
| PUT | `/api/projects/:id` | Update a project | Protected |
| DELETE | `/api/projects/:id` | Delete a project | Protected |

### Blog Posts
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog` | Get all blog posts | Public |
| GET | `/api/blog/:id` | Get single post with comments | Public |
| POST | `/api/blog` | Create a blog post | Protected |
| PUT | `/api/blog/:id` | Update a blog post | Protected (Author only) |
| DELETE | `/api/blog/:id` | Delete a blog post | Protected (Author only) |

### Comments
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| GET | `/api/blog/:postId/comments` | Get comments for a post | Public |
| POST | `/api/blog/:postId/comments` | Create a comment | Protected |
| DELETE | `/api/blog/:postId/comments/:commentId` | Delete a comment | Protected (Author only) |

### Contact
| Method | Endpoint | Description | Access |
|--------|----------|-------------|--------|
| POST | `/api/contact` | Send a contact message | Public |
| GET | `/api/contact` | Get all messages | Protected |
| DELETE | `/api/contact/:id` | Delete a message | Protected |

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
git clone <repository-url>
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

## Request Examples

### Register User
```bash
POST /api/users/register
Content-Type: application/json

{
  "username": "johndoe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login User
```bash
POST /api/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Project (Protected)
```bash
POST /api/projects
Authorization: Bearer <your_jwt_token>
Content-Type: application/json

{
  "title": "My Project",
  "description": "A cool project",
  "technologies": ["React", "Node.js"],
  "repoUrl": "https://github.com/user/repo"
}
```

## Deployment

This API can be deployed to platforms like:
- Render
- Heroku
- Railway
- DigitalOcean

Make sure to set all environment variables in your deployment platform.

## License

ISC
