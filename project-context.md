Dentora Frontend Project Context
================================

This document provides a general overview at the Dentora frontend's architecture, tech stack, and key decisions. It serves as a guide for developers to understand the project's structure and technical choices.

Architecture
------------

-   **Next.js App Router**: The project uses Next.js 15's **App Router**, a modern file-based routing system located under the `app/` directory. It enables nested layouts, server components, and improved routing structure for scalable applications (e.g., `/appointments`, `/login`).
-   **Component Modularity**: React components are organized in src/app/components for reusability (e.g., SignInForm, SignUpForm).
-   **Server Actions**: API interactions with the backend are handled via server actions (e.g., fetchAPI), ensuring secure and efficient data operations.

Tech Stack
----------

-   **Next.js**: A React framework that enables server-side rendering and static site generation for performance and SEO.
-   **React**: The core library for building dynamic and interactive user interfaces.
-   **TypeScript**: Provides static typing to catch errors early and improve code quality.
-   **Material-UI**: A popular component library for consistent and responsive design.
-   **Tailwind CSS**: A utility-first CSS framework for rapidly building modern, custom UIs with minimal styling overhead.
-   **Formik**: A form library for managing form state, validation, and submission in React applications.
-   **Yup**: A schema builder used with Formik to perform robust and declarative form validation.
-   **Storybook**: Used for developing, testing, and documenting UI components in isolation.

Authentication
--------------

-   **JWT-Based**: Authentication is managed using JSON Web Tokens (JWT), with the jwt_token cookie set by the backend upon successful login.
-   **Login Flow**:
    1.  The user submits credentials to the backend via the loginAction server action.
    2.  The backend returns a JWT, which is stored in an HTTP-only cookie.
    3.  The frontend redirects to /appointments upon successful authentication.
-   **Protected Routes**: Middleware ensures that only authenticated users can access routes like /appointments.

API Interactions
----------------

-   **Backend Communication**: The frontend uses server actions (e.g., fetchAPI) to make API calls to the backend, ensuring token-based authentication and secure data fetching.

-   **Error Handling**: API calls are wrapped in try-catch blocks to handle errors gracefully, ensuring the UI remains functional even when data fetching fails.
