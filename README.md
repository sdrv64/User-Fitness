https://github.com/sdrv64/User-Fitness/releases

[![Releases](https://img.shields.io/badge/Releases-Download-FF69B4?logo=github&logoColor=white)](https://github.com/sdrv64/User-Fitness/releases)

# User-Fitness: Full-Stack Health Tracker with React and Node 🏃‍♀️💪

<img src="https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg" alt="React logo" width="34" height="34" style="vertical-align: middle; margin-right: 6px;">
<img src="https://www.chartjs.org/img/chartjs-logo.png" alt="Chart.js logo" width="40" height="40" style="vertical-align: middle; margin-right: 6px;">
<img src="https://webassets.mongodb.com/_com_assets/cms/mms/mongodb_logo.png" alt="MongoDB logo" width="40" height="40" style="vertical-align: middle; margin-right: 6px;">
<img src="https://nodejs.org/static/images/logo.svg" alt="Node.js logo" width="38" height="38" style="vertical-align: middle;">
<img src="https://tailwindcss.com/img/tailwindcss-logo.svg" alt="Tailwind CSS logo" width="38" height="38" style="vertical-align: middle;">

User-Fitness is a full-stack app for tracking reps, calories, and weight. It blends a snappy React frontend with a solid Node.js backend. The app stores user data in MongoDB and uses charts to visualize progress over time. It aims to be simple to set up, easy to extend, and friendly to beginners while staying practical for power users.

This repository holds a complete stack that covers user authentication, form validation, data validation, API routing, and responsive UI. It leverages modern tooling and best practices to give you a solid foundation for your own fitness projects or for building a personal health tracker.

Overview
- Client: React with hooks, React Router, and Tailwind CSS for fast, responsive UI.
- Server: Express-based API with REST endpoints, CORS support, and environment-driven configuration.
- Data: MongoDB with Mongoose for solid data modeling and validation.
- UI/UX: Chart.js for visual progress, React Hook Form for intuitive forms, and Toastify for friendly notifications.

The project is designed to be a learning platform as well as a practical starter kit. It demonstrates how to structure a modern full-stack project, how to manage state across client and server, and how to handle common tasks like authentication, data validation, and error handling.

Visuals and assets
- The UI showcases a clean dashboard, daily/weekly progress charts, and a detailed log of workouts, calories, and weight.
- Icons and visuals emphasize clarity and ease of use.
- You will see charts updating as data changes, reflecting the user’s fitness journey in real time.

Key features
- User authentication and account management
- CRUD operations for workouts, meals, and weight records
- Reps, calories, and weight tracking with intuitive units
- Data validation at both client and server sides
- Consistent API design with clear endpoints
- Client-side routing for a smooth single-page app experience
- Interactive charts to visualize trends and progress
- Form validation with meaningful feedback
- Notifications to confirm user actions and highlight issues
- Responsive design that adapts to phones, tablets, and desktops
- Themeable UI with Tailwind CSS for fast customization
- Secure secret management via environment variables

Tech stack and dependencies
- Frontend: React, React Router, React Hook Form, axios for HTTP requests, Chart.js for charts, Tailwind CSS for styling, React Toastify for notifications, and simple accessibility features.
- Backend: Node.js with Express, CORS for cross-origin requests, dotenv for environment management, JSON handling, and RESTful routes.
- Database: MongoDB with Mongoose for data modeling and validation.
- Validation: validator library for input validation and safety checks.
- Build and tooling: npm scripts, linting with ESLint, and testing hooks to ensure code quality.

Project structure
- client/
  - src/
    - components/ reusable UI blocks (widgets, cards, charts)
    - pages/ routes (Dashboard, Profile, Log, Settings)
    - hooks/ custom React hooks
    - services/ API wrappers using axios
    - styles/ Tailwind-based styling and custom CSS
    - utils/ helpers (validation, formatting)
  - public/ static assets
- server/
  - src/
    - controllers/ request handlers
    - models/ Mongoose schemas
    - routes/ API endpoints
    - middleware/ authentication, error handling, logging
    - config/ environment setup
  - tests/ unit and integration tests
- shared/ common types and interfaces
- scripts/ automation tools (seed data, migrations)

Getting started
- Prerequisites
  - Node.js and npm (or pnpm)
  - MongoDB instance (local or cloud)
  - Basic knowledge of the command line
- Quick start steps
  1) Clone the repository
     - git clone https://github.com/sdrv64/User-Fitness.git
  2) Install dependencies
     - cd User-Fitness
     - npm install
  3) Set up environment
     - Copy the example env file from server/.env.example to server/.env
     - Provide database connection string, JWT secret, and other necessary variables
  4) Run the server and client
     - Start the backend: npm run dev:server
     - Start the frontend: npm run dev:client
  5) Open the app
     - Visit http://localhost:3000 (default port) to interact with the dashboard
- Asset download and execution
  - This repository uses a Releases page to provide distribution artifacts. Since the link includes a path, download the release asset from this page and run it to install or execute the app binary as appropriate for your platform. You can find the release assets at this page: https://github.com/sdrv64/User-Fitness/releases. For the latest assets, use the same link to locate the intended file and follow the on-page instructions to download and run it.

How to run locally: a deeper guide
- Backend setup
  - Create a local MongoDB instance or connect to a hosted one
  - Ensure the database URL is configured in server/.env
  - Run the server in development mode to see detailed logs
  - Use environment variables to toggle features (e.g., debug mode, allowed origins)
- Frontend setup
  - Tailwind CSS is configured for rapid styling
  - Forms are built with React Hook Form and validated with a mix of UI validation and server-side checks
  - Charts render data from API endpoints; you can experiment with different time ranges
- Common workflows
  - Adding a workout entry
  - Recording calories or weight
  - Generating progress charts over a chosen period
  - Importing or exporting data (CSV/JSON) for personal records
- Debugging tips
  - Check console logs in the browser for UI issues
  - Inspect network requests in the browser's developer tools to verify API responses
  - Review server logs for authentication or database errors
  - Validate environment variables when the app fails to connect to the database

API design and endpoints
- Base URL
  - The API adheres to REST principles and uses clear resource-oriented routes
- Core resources
  - Users: create, authenticate, fetch profile, update profile
  - Workouts: create, read, update, delete; supports time-based queries
  - Calories: track daily intake with time stamps and notes
  - Weight: capture weight entries with optional body fat % and notes
  - Settings: user preferences, theme, and notification options
- Request patterns
  - JSON payloads for create and update
  - Validated on the server with Mongoose schemas
  - Validation errors return 400 with a descriptive message
- Security considerations
  - JWT-based authentication
  - Protected routes require a valid token
  - Input validation to prevent injection and XSS
  - CORS configured to only allow trusted origins in production

Data models and validation
- User model
  - Fields: email, password hash, name, createdAt, settings
  - Validation: email format, password strength, unique email
- Workout model
  - Fields: userId, date, type (e.g., push-ups, squats), reps, weight, notes
  - Validation: required fields for date and type; numeric ranges for reps and weight
- Calories model
  - Fields: userId, date, calories, mealDetails
  - Validation: calories must be a positive integer
- Weight model
  - Fields: userId, date, weight, bodyFat
  - Validation: realistic ranges for weight; optional bodyFat
- Relationships
  - Each record is linked to a user via userId
  - Aggregations and charts rely on these relations for daily, weekly, and monthly views

Security and privacy
- Data handling
  - Personal information is stored securely in MongoDB
  - Passwords are hashed and never stored in plain text
  - Sensitive settings are protected by authentication
- Environment separation
  - Different settings for development, staging, and production
  - Secrets stored safely in environment variables
- Access control
  - Only authenticated users can access profile and health data
  - Public endpoints are kept to a minimum and strictly read-only when possible

Testing and quality assurance
- Unit tests
  - Target core utilities and data validation logic
  - Mock external services to ensure deterministic tests
- Integration tests
  - Validate end-to-end flows from API to database
  - Ensure security and authentication behave as expected
- Linting and formatting
  - ESLint rules enforce consistent code style
  - Prettier formats code in a consistent manner
- Continuous integration
  - Tests run on push and pull requests to main branches
  - Linting, building, and tests are automated in CI
- Performance checks
  - Lightweight benchmarks for API responses
  - Basic profiling for front-end rendering speed

Accessibility and internationalization
- Keyboard navigation
  - All interactive elements support focus management
  - Logical tab order and visible focus styles
- Semantic markup
  - Accessible components with appropriate roles and ARIA labels
- Internationalization
  - Simple i18n hooks and translation files
  - Ready to add more languages with minimal code changes

Build, deployment, and distribution
- Local builds
  - Client and server builds can be started in development mode
  - Hot reloading helps speed up iteration
- Production deployment
  - Build artifacts are served by a Node.js server
  - Environment-driven configuration supports multiple environments
- Release assets
  - The project provides assets via the Releases page. Since the link includes a path, download the release asset from this page and run it. For the latest asset, visit the Releases page at the linked URL. You can also check the same link again to locate the appropriate installer or binary for your platform: https://github.com/sdrv64/User-Fitness/releases

Developer experience and conventions
- Coding standards
  - Clear, concise function names and descriptive variable names
  - Small, focused modules with single responsibilities
- Directory layout
  - A predictable structure makes onboarding faster
  - Shared utilities and types reduce duplication
- Documentation approach
  - Inline comments explain non-obvious logic
  - API docs outline endpoints, request shapes, and responses
- Git practices
  - Feature branches, small commits, meaningful messages
  - Pull requests include tests and documentation updates

Directory and file conventions
- client/
  - src/
    - components/ common UI elements
    - pages/ route-based views
    - hooks/ reusable logic
    - services/ API access
    - styles/ Tailwind-based styles
  - public/ static assets
- server/
  - src/
    - controllers/ HTTP handlers
    - models/ Mongoose schemas
    - routes/ API endpoints
    - middleware/ auth and error handling
    - config/ environment management
  - tests/ test suites
- shared/
  - TypeScript types and shared utilities
- scripts/
  - Data seeding and migration helpers

Troubleshooting and common issues
- Dev server won’t start
  - Verify Node.js version compatibility
  - Check that MongoDB is running or the connection string is correct
  - Ensure environment variables are defined in server/.env
- API requests failing
  - Confirm the server is listening on the correct port
  - Check CORS settings for the frontend origin
  - Validate auth tokens and user permissions
- UI not rendering or charts not showing
  - Inspect console for JavaScript errors
  - Confirm API responses match expected data formats
  - Ensure Chart.js receives valid data arrays

Migration and data management
- Seeding
  - A seed script can populate initial data for testing
  - Use seed data to quickly spin up realistic scenarios
- Migrations
  - When data models change, create migrations to adapt existing data
  - Maintain backward compatibility where feasible
- Backups
  - Regular backups for the MongoDB instance are recommended
  - Store backups securely and test restoration procedures

Contributing guidelines
- How to contribute
  - Start from an issue or feature request
  - Open a feature branch with a clear name
  - Implement tests for new functionality
  - Run linting and tests locally before submitting a PR
- Code quality
  - Keep functions small and focused
  - Document complex logic with comments
  - Favor readability over cleverness
- Review process
  - Pull requests are reviewed for correctness, style, and tests
  - Feedback is actionable and aimed at improving the codebase
- Licensing and attribution
  - Respect licenses of dependencies
  - Credit external ideas and code as needed

Roadmap and future enhancements
- Short-term goals
  - Improve onboarding and setup experience
  - Add more workout types and nutrition tracking
  - Enhance charts with interactive filters and export options
- Medium-term goals
  - Implement offline mode with local caching
  - Support multiple users on a single device with profiles
  - Introduce more analytics and insights
- Long-term vision
  - Provide a complete health dashboard with goal setting and reminders
  - Integrate with third-party fitness services and devices
  - Offer data export in common formats for personal records

License and attribution
- This project uses a permissive license that supports broad usage and modification
- See the LICENSE file in the repository for full terms

Acknowledgments
- Thanks to the open-source community for the libraries and tools that power this project
- Special mention to contributors who helped shape the design and architecture

Releases and asset notes
- The repository distributes builds and installers through the Releases page. Since the link includes a path, download the latest release asset from the page and run it on your system to install or start the app. For convenience, you can visit the same page to locate the correct asset for your platform: https://github.com/sdrv64/User-Fitness/releases
- If you need to locate the latest assets again, check the Releases page: https://github.com/sdrv64/User-Fitness/releases

Appendix: glossary of terms
- API: Application Programming Interface, a set of rules that lets different software components talk to each other.
- CRUD: Create, Read, Update, Delete — the basic operations for data management.
- DTO: Data Transfer Object, a simple object used to transfer data between layers.
- UI: User Interface, the part of the app users interact with.
- UX: User Experience, how users feel when using the app.
- REST: Representational State Transfer, a style for building web APIs.
- JWT: JSON Web Token, a compact token used for authentication.
- ODM/ORM: Object-Document Mapper/Object Relational Mapper, tools for mapping data to code objects.

Notes
- This README reflects a comprehensive guide for a full-stack fitness tracker project built with React, Node, and MongoDB. It emphasizes clarity, maintainability, and practical workflows. It is designed to help new contributors understand the project quickly and to assist users in running and extending the app. The content adheres to a straightforward style with a focus on actionable steps and concrete details.