# Event Ticketing System Frontend

A React-based frontend for an event ticketing system, built as part of a technical challenge to demonstrate frontend development skills.

## 🎯 Project Overview

This project implements a basic UI for a ticketing system where users can:

- Browse events with sessions
- View different zones for each session
- Filter events by date range
- View event details and pricing

## 🛠 Technical Stack

- **Framework**: React + Vite
- **Language**: TypeScript (migrated from JavaScript)
- **UI Library**: Material-UI (MUI)
- **State Management**: React Hooks
- **Styling**: CSS-in-JS (via MUI)
- **Date Handling**: react-datepicker library

## 📚 Learning Journey

### Initial Approach

As a backend engineer, I approached this frontend challenge with the following mindset:

1. Learning and refreshing concepts since it was a loooong time I did any frontend 🥹
2. Focus on component reusability(e.g. extracting as many meaningful components as possible)
3. Focus on separation of concerns(e.g. extracting functions into dedicated files under `/lib`)
4. Implement proper state management patterns
5. Follow frontend best practices and patterns
6. Ensure type safety and data consistency

### Key Learnings

1. **Component Architecture**

   - Learned to break down complex UIs into reusable components
   - Learned how to pass data between components efficiently and combine them into larger features
   - Discovered the importance of component hierarchy

2. **State Management**

   - First experience with React Hooks (useState)
   - Implemented pagination and filtering logic
   - Used a top-down approach: managing state at the App level and passing it down through props, rather than lifting state up from child components

3. **UI/UX Considerations**

   - Implemented loading states and basic error handling
   - Leveraged Material-UI's built-in components for consistent styling and responsive design

4. **Frontend Development Tools**

   - Gained experience with Vite and its benefits to quickly set a green React project.
   - Learned about Material-UI component library
   - Discovered frontend development tools and workflows(e.g. linters)
   - Learned to customize npm scripts to automate development tasks (e.g. combining format and lint into a single validate command)

5. **TypeScript Migration**
   - Successfully migrated the project from JavaScript to TypeScript
   - Learned about TypeScript interfaces and type definitions
   - Improved code maintainability and developer experience
   - Added type safety to API responses and component props

### Challenges Faced

1. **Component State Management**

   - Had trouble deciding where to put my state - should it be in the parent component and passed down, or should I use a global state solution? 🤔

2. **UI/UX Implementation**

   - CSS not my cup of tea 🥵
   - Responsive design principles
   - Discovered the importance of loading states

3. **Frontend Development Workflow**

   - Adapted to frontend-specific tools and practices
   - Learned about component-based architecture

4. **API calls**

   - Faced some issues when doing local requests to the other service.
   - Vite has nice configurable proxy setup I used to overcome this.
     A proxy server in Vite serves as a middleware between the frontend and backend API. Its purpose is to bypass CORS restrictions

5. **TypeScript Migration**
   - Had to carefully map API responses to TypeScript interfaces
   - Learned to handle optional fields and type unions
   - Improved error handling with type checking

## 🚀 Next Steps

1. **Technical Improvements**

   - [x] Migrate to TypeScript for better type safety
   - [ ] Add testing
   - [ ] Install React Developer Tools for debugging.
   - [ ] Implement shopping cart functionality
   - [ ] Improve error handling and loading states

2. **Feature Enhancements**
   - [ ] Add search functionality
   - [ ] Add proper navigation for the navbar component
   - [ ] Implement ticket purchasing flow
   - [ ] Add user authentication
   - [ ] Implement responsive design improvements
   - [ ] Add Git pre commit hooks to validate changes

## 🏗 Project Structure

```
src/
├── components/     # Reusable UI components
├── pages/         # Page-level components
├── utils/         # Utility functions and API calls
├── hooks/         # Custom React hooks
├── assets/        # Static assets
├── types/         # TypeScript type definitions
└── theme.ts       # MUI theme configuration
```

## 🚀 Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Start the ticketing API Server:

   ```bash
   git clone git@github.com:virgi1974/ticket-integration-api.git

   make all
   ```

Each of the projects run under diifferent ports, so they'll find each other without problems 🤞

## 📝 Development Notes

- Watched several tutorials to get a feeling of the tooling and options adopted by the React community:
  - Vite setup and configuration
  - Material-UI basics and theming
  - React Hooks fundamentals
  - TypeScript with React best practices
- Used ChatGPT and GitHub Copilot to:

  - Brainstorm technical decisions
  - Debug issues
  - Get code examples
  - Understand best practices

- Used Material-UI for rapid development and consistent design
- Implemented date range filtering for better user experience
- Focused on component reusability and maintainability
- Prioritized clean code and proper documentation
- Successfully migrated from JavaScript to TypeScript for better type safety

## 🤝 Contributing

This is a technical challenge project, but feedback and suggestions are welcome!
