
# Study Planner App API Documentation

## Overview
This API allows for the management of users, courses, calendar events, and study plans. It supports user authentication and can integrate with external calendar services.

### Base URL
```
UNDEFINED FOR NOW
```

## Authentication

### Register a New User

- **Endpoint**: `POST /api/auth/signup`
- **Request Body**:
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **201 Created**
  ```json
  {
    "message": "User registered successfully"
  }
  ```

### Authenticate an Existing User

- **Endpoint**: `POST /api/auth/login`
- **Request Body**:
  ```json
  {
    "email": "string",
    "password": "string"
  }
  ```
- **Response**:
  - **200 OK**
  ```json
  {
    "token": "string"
  }
  ```

## Calendar Management

### Retrieve All Calendar Events

- **Endpoint**: `GET /api/calendar`
- **Response**:
  - **200 OK**
  ```json
  [
    {
      "id": "string",
      "title": "string",
      "date": "string",
      "time": "string",
      "description": "string"
    }
  ]
  ```

### Create a New Calendar Event

- **Endpoint**: `POST /api/calendar`
- **Request Body**:
  ```json
  {
    "title": "string",
    "date": "string",
    "time": "string",
    "description": "string"
  }
  ```
- **Response**:
  - **201 Created**
  ```json
  {
    "message": "Calendar event created successfully",
    "eventId": "string"
  }
  ```

### Update an Existing Calendar Event

- **Endpoint**: `PUT /api/calendar/:id`
- **Request Body**:
  ```json
  {
    "title": "string",
    "date": "string",
    "time": "string",
    "description": "string"
  }
  ```
- **Response**:
  - **200 OK**
  ```json
  {
    "message": "Calendar event updated successfully"
  }
  ```

### Delete a Calendar Event

- **Endpoint**: `DELETE /api/calendar/:id`
- **Response**:
  - **204 No Content**

## Course Management

### Retrieve All Courses

- **Endpoint**: `GET /api/courses`
- **Response**:
  - **200 OK**
  ```json
  [
    {
      "id": "string",
      "name": "string",
      "description": "string",
      "credits": "number"
    }
  ]
  ```

### Create a New Course

- **Endpoint**: `POST /api/courses`
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "credits": "number"
  }
  ```
- **Response**:
  - **201 Created**
  ```json
  {
    "message": "Course created successfully",
    "courseId": "string"
  }
  ```

### Update an Existing Course

- **Endpoint**: `PUT /api/courses/:id`
- **Request Body**:
  ```json
  {
    "name": "string",
    "description": "string",
    "credits": "number"
  }
  ```
- **Response**:
  - **200 OK**
  ```json
  {
    "message": "Course updated successfully"
  }
  ```

### Delete a Course

- **Endpoint**: `DELETE /api/courses/:id`
- **Response**:
  - **204 No Content**

## Study Plan Management

### Retrieve All Study Plans

- **Endpoint**: `GET /api/study-plans`
- **Response**:
  - **200 OK**
  ```json
  [
    {
      "id": "string",
      "courseId": "string",
      "studyDate": "string",
      "studyTime": "number",
      "notes": "string"
    }
  ]
  ```

### Create a New Study Plan

- **Endpoint**: `POST /api/study-plans`
- **Request Body**:
  ```json
  {
    "courseId": "string",
    "studyDate": "string",
    "studyTime": "number",
    "notes": "string"
  }
  ```
- **Response**:
  - **201 Created**
  ```json
  {
    "message": "Study plan created successfully",
    "studyPlanId": "string"
  }
  ```

### Update an Existing Study Plan

- **Endpoint**: `PUT /api/study-plans/:id`
- **Request Body**:
  ```json
  {
    "courseId": "string",
    "studyDate": "string",
    "studyTime": "number",
    "notes": "string"
  }
  ```
- **Response**:
  - **200 OK**
  ```json
  {
    "message": "Study plan updated successfully"
  }
  ```

### Delete a Study Plan

- **Endpoint**: `DELETE /api/study-plans/:id`
- **Response**:
  - **204 No Content**

---

## Error Responses
Common error responses are as follows:

- **400 Bad Request**
  ```json
  {
    "error": "string"
  }
  ```

- **401 Unauthorized**
  ```json
  {
    "error": "Authentication token is missing or invalid"
  }
  ```

- **404 Not Found**
  ```json
  {
    "error": "Resource not found"
  }
  ```

- **500 Internal Server Error**
  ```json
  {
    "error": "An error occurred while processing your request"
  }
  ```
