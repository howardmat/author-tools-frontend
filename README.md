# Author Tools

A modern web application designed to help authors organize and manage their creative writing projects. Author Tools provides a centralized platform for tracking characters, locations, and world-building details across multiple story universes and book series.

## 🎯 Features

- **Story Universe Management**: Organize multiple book series and standalone stories in separate universes
- **Character Tracking**: Maintain detailed character profiles, relationships, and development arcs
- **Location/Setting Database**: Document and reference settings, locations, and world-building elements
- **Secure Authentication**: Protected workspace with user-specific data management

## 🏗️ Architecture

This is the frontend application for Author Tools. The backend API is maintained in a separate repository:

**Backend Repository**: [author-tools-backend](https://github.com/howardmat/author-tools-backend)

The application follows a client-server architecture where:
- **Frontend (this repo)**: React SPA handling UI/UX, authentication, and client-side state management
- **Backend**: RESTful API providing data persistence, business logic, and server-side operations

## 🚀 Tech Stack

### Core Technologies

- **[React 19](https://react.dev/)**: Latest version of React with improved performance and new features
- **[TypeScript](https://www.typescriptlang.org/)**: Type-safe development with enhanced IDE support and code quality
- **[Vite 7](https://vite.dev/)**: Lightning-fast build tool with Hot Module Replacement (HMR) for optimal developer experience

### UI & Styling

- **[shadcn/ui](https://ui.shadcn.com/)**: High-quality, accessible component library built on [Radix UI](https://www.radix-ui.com/) primitives
- **[Tailwind CSS 4](https://tailwindcss.com/)**: Utility-first CSS framework for rapid UI development with the latest performance optimizations
- **[Lucide React](https://lucide.dev/)**: Beautiful, consistent icon library

### State Management & Data Fetching

- **[TanStack Query](https://tanstack.com/query)** (formerly React Query): Powerful data synchronization and caching library for seamless server state management
- **[React Hook Form](https://react-hook-form.com/)**: Performant, flexible and extensible forms with easy-to-use validation and minimal re-renders

### Validation & Authentication

- **[Zod](https://zod.dev/)**: TypeScript-first schema validation library for robust form and data validation
- **[Clerk](https://clerk.com/)**: Complete authentication and user management solution with modern security practices

## 🔐 Authentication

This application uses Clerk for authentication, providing:
- Secure user sign-up and sign-in
- Social authentication options
- Session management
- User profile management

## 🎨 Component Library

The UI is built using shadcn/ui components, which provides:
- Fully accessible components following WAI-ARIA standards
- Customizable design system with Tailwind CSS
- Type-safe component APIs
- Dark mode support
- Responsive design patterns

## 📱 Responsive Design

Author Tools is fully responsive and optimized for:
- Desktop workstations
- Tablets
- Mobile devices

## 📋 Prerequisites

- **Node.js**: >= 22.0.0
- **npm**: >= 10.8.2
- **Backend API**: Running instance of [author-tools-backend](https://github.com/howardmat/author-tools-backend)

## 🚦 Getting Started

1. Clone the repository:
```bash
git clone https://github.com/howardmat/author-tools-frontend.git
cd author-tools-frontend
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
# Create a .env file in the root directory
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_publishable_key
VITE_API_URL=your_api_url
```

4. Start the development server:
```bash
npm run dev
```

## 🚀 Deployment

This project is configured for deployment to Azure Static Web Apps with automated CI/CD via GitHub Actions.

## 📄 License

This project is licensed under GNU General Public License v3.0 - see the COPYING file for details.

## 👤 Author

Mat Howard - [GitHub Profile](https://github.com/howardmat)