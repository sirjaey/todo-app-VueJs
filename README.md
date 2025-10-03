# Vuejs Todo Application

A modern, accessible Todo application built with VueJs and Tailwindcss, featuring real-time search, filtering, and offline support.

## Features

- ✅ Email/Password Authentication
- ✅ Sign Up with validation
- ✅ Sign In
- ✅ Sign Out
- ✅ Protected routes
- ✅ Loading states
- ✅ Error handling
- ✅ Responsive design matching your UI theme
- ✅ Gradient buttons and styling consistent 
- 📝 CRUD operations for todos
- 🏷️ Status tracking (Complete/Pending)
- 📱 Responsive design
- ♿ Accessibility features
- 🔄 Offline support with localStorage
- 🔍 Real-time search and filtering

## Tech Stack

- Vue v3
- Tailwind v4
- firebase
- Tanstack Query v5 / Axios v1
- Vite
- ESLint
- pnpm



```

## Getting Started

1. Clone the repository:

```bash
git clone <repository-url>
cd my-app
```

2. Install dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

The application will be available at `http://localhost:3001`.

## Available Scripts

- `pnpm run dev` - Runs the app in development mode
- `pnpm run build` - Builds the app for production (creates a `dist` directory)
- `pnpm run preview` - Previews the production build (must run `build` first)
- `pnpm run lint` - Runs ESLint

## Development

### Prerequisites

- Node.js (v18 )
- pnpm (v8)

### Environment Setup

1. Install pnpm if you haven't already:

```bash
npm install -g pnpm
```

2. Install project dependencies:

```bash
pnpm install
```

3. Start the development server:

```bash
pnpm run dev
```

### Production Build

To create a production build and preview it:

1. Build the project:

```bash
pnpm run build
```

2. Preview the production build:

```bash
pnpm run preview
```

The preview will be available at `http://localhost:4173`.

## Features in Detail

### Todo Management

- Create, read, update, and delete todos
- Mark todos as complete/incomplete
- Real-time search functionality
- Filter todos by status (All/Active/Completed)

### UI/UX

- Responsive design for all screen sizes
- Material-UI components for consistent look and feel
- Smooth transitions
- Intuitive user interface

### Accessibility

- Keyboard navigation support
- ARIA labels and roles
- Focus management
- Screen reader compatibility

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Acknowledgments

- Tailwindcss for the component library
- Vite for the build tooling
- Vue-router for navigation
- Axios for implementing endpoint

## API Documentation

### Base URL

```
https://dummyjson.com/todos
```

### Authentication

This API is public and does not require authentication.

### Data Persistence

- Data is persisted in localStorage for offline support
- Changes are synced with the API when online

## Known Issues and Limitations

### Current Limitations

- Limited to single user operations
- No due dates or reminders
- Offline mode has limited functionality for complex operations

### Technical Limitations

- No server-side validation

### Planned Features

- [ ] Due dates and reminders
- [ ] Categories and tags
- [ ] Dark mode support




### UI/UX Improvements

- [ ] Improve overall design

## License

This project is licensed under the MIT License.
