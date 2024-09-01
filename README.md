### THIS PROJECT IS STILL UNDER DEVELOPMENT
# Study Planner API/App

## Overview
Study planner API is designed to help users create and manage their study schedules efficiently. The application facilitates user authentication, course management, and dynamic study plan creation. It integrates with popular calendar services like Google Calendar and Outlook to keep users on track with their deadlines and study sessions.

## Features
- User authentication (login/signup).
- Integration with Google Calendar and Outlook for event management.
- Input for courses, deadlines, and available study time.
- Dynamic schedule creation based on user inputs.
- Break and study session suggestions.
- Notification and reminder system to keep users informed.

## Minimum Viable Product (MVP)
The MVP focuses on essential features such as:
- User registration and login.
- Input for courses and deadlines.
- Basic scheduling functionalities.

## Technologies Used
### Backend
- **Programming Language**: Nodejs
- **Framework**: Express
- **Database**: mongoDB

### Frontend
- **Framework**: [React/Angular/Vue.js]

### Authentication
- OAuth for calendar integrations.
- JWT (JSON Web Tokens) for user authentication.

## API Endpoints
The backend API provides the following endpoints:

### Authentication
- `POST /api/auth/signup` - Registers a new user.
- `POST /api/auth/login` - Authenticates an existing user.

### Calendar Management
- `GET /api/calendar` - Retrieves all calendar events.
- `POST /api/calendar` - Creates a new calendar event.
- `PUT /api/calendar/:id` - Updates an existing calendar event by ID.
- `DELETE /api/calendar/:id` - Deletes a calendar event by ID.

### Course Management
- `GET /api/courses` - Retrieves all courses.
- `POST /api/courses` - Creates a new course.
- `PUT /api/courses/:id` - Updates an existing course by ID.
- `DELETE /api/courses/:id` - Deletes a course by ID.

### Study Plan Management
- `GET /api/study-plans` - Retrieves all study plans.
- `POST /api/study-plans` - Creates a new study plan.
- `PUT /api/study-plans/:id` - Updates an existing study plan by ID.
- `DELETE /api/study-plans/:id` - Deletes a study plan by ID.

## Installation
To run the project locally, follow these steps:

1. Clone the repository:
   ```bash
   git clone https://github.com/flxs007/study-planner-app.git
   ```

2. Navigate to the backend directory and install dependencies:
   ```bash
   cd study-planner-app/backend
   npm install
   ```

3. Set up your database and environment variables in the `config/settings.js` file.

4. Start the backend server:
   ```bash
   npm start
   ```

5. Navigate to the frontend directory and install dependencies:
   ```bash
   cd ../frontend
   npm install
   ```

6. Start the frontend development server:
   ```bash
   npm start
   ```

## Documentation
The API documentation can be found in the `docs` directory or generated using Swagger/OpenAPI. This will help users understand how to interact with the API and include examples of requests and responses.

## Deployment
The application can be deployed using platforms such as Heroku, AWS, or DigitalOcean. Ensure to configure environment variables securely for API keys and database connections.

## Future Enhancements
- Implement machine learning algorithms for personalized study recommendations.
- Track user progress and analytics.
- Add user preferences for different study methods.
- Consider mobile app integration in future versions.

## License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
