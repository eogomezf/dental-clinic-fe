# Dentora Pro

Dentora Pro is a front-end Next.js application designed for managing dental appointments. It offers a user-friendly interface for viewing, creating, deleting and editing appointments, seamlessly integrated with the Dentora Backend API for data operations.

* * * * *

Setup
-----

### Prerequisites

-   **Node.js**: Version 18 or higher
-   **npm** or **yarn**: Package manager
-   **Dentora Backend**

### Installation

1.  Clone the repository:

    git clone https://github.com/AlvisonHunterArnuero/dentora-pro.git

    cd dentora-pro

2.  Install dependencies:

    npm install


### Environment Variables

Create a .env.local file in the root directory with the following:

env

NEXT_PUBLIC_API_URL=http://localhost:4000


* * * * *

Running the App
---------------

Start the development server:

npm run dev


Open <http://localhost:3000> in your browser to see the app.

* * * * *

Storybook
---------

To explore and test UI components:

npm run storybook

Access Storybook at <http://localhost:6006>.

* * * * *

Usage
-----

-   **Login**: Go to / and log in with your credentials.
-   **Appointments**: Manage appointments at /appointments.
-   **Key Features**:
    -   View existing appointments.
    -   Create or edit appointments using intuitive forms.
    -   Delete appointments.

* * * * *

Additional Resources
--------------------

-   **CONTRIBUTING.md**: Guidelines for contributing to the project.
-   **project-context.md**: Details on the project's architecture and tech stack.
-   [Next.js Documentation](https://nextjs.org/docs): Learn more about Next.js features and APIs.
-   [Learn Next.js](https://nextjs.org/learn): An interactive Next.js tutorial.

* * * * *

Deployment
----------

Deploy your app effortlessly on the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js. See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.