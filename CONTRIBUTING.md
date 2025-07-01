Contributing to Dentora Frontend
================================

We welcome contributions to Dentora Pro! Whether you're fixing bugs, adding features, or improving documentation, your help is appreciated. Please follow these guidelines to ensure smooth collaboration.

Coding Standards
----------------

-   **Naming Conventions**:
    -   **Components**: Use PascalCase (e.g., AppointmentList).
    -   **Variables and Functions**: Use camelCase (e.g., fetchAppointments).
    -   **Files**: Use kebab-case for non-component files (e.g., fetch-server-api.ts).
-   **Folder Structure**:
    -   src/app: Contains Next.js App Router pages and layouts.
    -   src/components: Houses reusable React components.
    -   src/models: Defines TypeScript types and interfaces for appointments and users.
-   **Best Practices**:
    -   Write clean, readable code with comments where necessary.
    -   Use TypeScript for type safety.
    -   Follow the [React documentation](https://react.dev/) and [Next.js best practices](https://nextjs.org/docs).

Git Workflow
------------

-   **Branching**:
    -   Create a new branch for each feature or bugfix (e.g., feature/add-login-form or bugfix/appointment-date).
-   **Commits**:
    -   Write clear, descriptive commit messages (e.g., "Add validation to login form").
-   **Pull Requests**:
    1.  Push your branch to GitHub.
    2.  Open a pull request (PR) against the develop branch.
    3.  Include a description of your changes and link any related issues.
    4.  Ensure all tests pass and the code builds successfully.

Testing
-------

-   **Running Tests**:
    -   If tests are implemented, run them with:

        npm run test

-   **Adding Tests**:
    -   Write tests for new features or bug fixes when possible.

Documentation
-------------

-   **Storybook**:
    -   Update Storybook with new components or changes:

        npm run storybook

    -   Ensure each component has a corresponding story for documentation and testing.
    
-   **Markdown Files**:
    -   Keep README.md and project-context.md up to date with your changes.
    -   Document new features, API integrations, or architectural decisions.

Questions?
----------

If you have any questions or need clarification, feel free to reach out to the team or open an issue on GitHub.