# BloX App

## Tech Stack

- **Frontend Framework**: React.js with Next.js
- **UI Library**: Ant Design
- **Styling**: Tailwind CSS
- **Language**: TypeScript
- **API Calls**: Axios and TanStack Query
- **Charting**: ECharts
- **Data Source**: GoRest API (https://gorest.co.in/)

## Project Structure

The project follows a well-organized structure to enhance maintainability and scalability.

```
├── app
│   ├── (auth)
│   │   └── login
│   │       └── page.tsx           // Login page
│   └── (main)
│       ├── layout.tsx             // Main application layout (header, sidebar)
│       ├── page.tsx               // Dashboard page
│       ├── create-post
│       │   └── page.tsx           // Create Post page
│       └── create-user
│           └── page.tsx           // Create User page
├── components
│   ├── Footer.tsx                 // Application Footer
│   ├── Header.tsx                 // Application Header
│   ├── Navbar.tsx                 // Sidebar Navigation
│   ├── PageHeader.tsx             // Reusable page header component
│   ├── dashboard
│   │   ├── Card.tsx               // Dashboard summary cards
│   │   ├── DataTable.tsx          // Generic data table component
│   │   ├── Modal.tsx              // Reusable modal component
│   │   ├── Statistic.tsx          // Statistic display component (including charts)
│   │   ├── Table.tsx              // Base table structure
│   │   ├── TableAction.tsx        // Table action buttons (edit, delete)
│   │   ├── TableFilter.tsx        // Table filtering inputs
│   │   ├── charts
│   │   │   ├── BlogCharts.tsx
│   │   │   ├── Charts.tsx         // Base chart component
│   │   │   ├── GenderDistributionCharts.tsx
│   │   │   └── UserStatusCharts.tsx
│   │   └── columns
│   │       ├── ColumnPost.tsx     // Column definitions for Post table
│   │       └── ColumnUser.tsx     // Column definitions for User table
│   ├── form
│   │   ├── FormLogin.tsx          // Login form component
│   │   ├── FormPost.tsx           // Create/Edit Post form
│   │   └── FormUser.tsx           // Create/Edit User form
│   └── icons
│       ├── ChatIcon.tsx
│       ├── ChevronDownIcon.tsx
│       ├── ChevronLeftIcon.tsx
│       ├── DashboardIcon.tsx
│       ├── DotsHorizontal.tsx
│       ├── MenuDownIcon.tsx
│       └── UserIcon.tsx
├── theme
│   └── themeConfig.ts             // Ant Design theme configuration
├── types
│   ├── auth.ts
│   ├── post.ts
│   ├── statistic.ts
│   └── user.ts
└── libs
├── utils.ts                   // Utility functions
├── api                        // API integration logic
│   ├── auth
│   │   ├── login-api.ts
│   │   └── login-query.ts
│   ├── post
│   │   ├── post-api.ts
│   │   └── post-query.ts
│   ├── statistic
│   │   ├── statistic-api.ts
│   │   └── statistic-query.ts
│   └── user
│       ├── user-api.ts
│       └── user-query.ts
├── hooks                      // Custom React hooks
│   ├── use-auth.ts
│   └── use-debounced-value.ts
└── services                   // Service configurations
├── axios.ts               // Axios instance configuration
├── providers.tsx          // React Query provider
└── queryClient.tsx        // React Query client
```

## Getting Started (for Interviewer)

To examine the code and run the application:

### Prerequisites

Ensure you have the following installed:

- **Node.js**: v16.20.2 or higher
- **npm**: v8.19.4 or higher

### Installation & Setup

1.  **Clone the repository:**

    ```bash
    git clone <your-repository-url>
    cd synapsis # or your project folder name
    ```

2.  **Install dependencies:**

    ```bash
    yarn install
    ```

3.  **GoRest API Token:**
    This application consumes data from the GoRest API. You'll need a free access token:

    - Visit: `https://gorest.co.in/`
    - Register for a free account.
    - Obtain your personal access token.

4.  **Configure Environment Variables:**
    Create a `.env.local` file in the root of the project:

    ```
    NEXT_PUBLIC_API_TOKEN=<YOUR_GOREST_ACCESS_TOKEN>
    ```

    Replace `<YOUR_GOREST_ACCESS_TOKEN>` with the token obtained from GoRest.

    ```
    NEXT_PUBLIC_API_URL=https://gorest.co.in
    ```

### Running the Application

1.  **Start the development server:**

    ```bash
    yarn dev
    ```

    The application will be accessible at `http://localhost:3000`.

---

## Acceptance Criteria Checklist

This project was developed to meet the following requirements. Each item has been implemented and tested:

### BloX App — Login Page

- [x] Users get a **success feedback message** from the system when they successfully log in with correct credentials and are redirected to the dashboard page.
- [x] Users get **error message feedback (immediately)** for every input, when users enter the wrong email or access token.
- [x] Users can use the **"remember me" feature** to remember user data credentials when successfully logged in.

### BloX App — Layout (Header & Navbar)

- [x] In the **header layout (sticky behavior)**, users can see the BloX logo and profile of the logged-in account.
- [x] In the **sidebar layout (sticky behavior)**, users can toggle to open and close the sidebar.
- [x] Users can see two groups, **Dashboard and Blog Management**, when the sidebar is opened. The dashboard group has a child/item named Dashboard, and the second group has two children/items named Create User and Create Post.

### BloX App — Dashboard Page (Statistics)

- [x] Users should be able to see the **total summary of User, Post, User Status, and User Gender data**. Total data for User Status and User Gender is only data per page (not all data).
- [x] Users can see **3 statistical charts** including charts for Blog Post Quantity, User Status, and User Gender.

### BloX App — Dashboard Page (User List)

- [x] Users can see **tables for User Data and Post Data**. Each table has 2 inputs for filter and search, then can do sorting and pagination.
- [x] Users can **update and delete data** on user data and post data.

### BloX App — Create User/Blog

- [x] Users can **add User/Blog Data (author) using the Form Feature** provided.
- [x] Users can see a **success or error feedback message** if there is an error in filling in user data.

### Deployment

- [x] Project is **structured for easy deployment** to hosting platforms (e.g., Vercel).

---
