# UOWD Tech Club Website

Welcome to the UOWD Tech Club website repository! This project is managed and created by the Web Dev Team. The website serves as the online hub for the club, providing information about events, resources, and opportunities for the UOWD tech community.

## Table of Contents

- [Overview](#overview)
- [Tech Stack](#tech-stack)
- [Setup Instructions](#setup-instructions)
- [Workflow](#workflow)
- [Labels and Conventions](#labels-and-conventions)
- [Code Guidelines](#code-guidelines)
    - [Commit Message Guidelines](#commit-message-guidelines)
    - [CSS Guidelines](#css-guidelines)
    - [React Guidelines](#react-guidelines)

## Overview

The UOWD Tech Club website is built as a full-stack web application using React for the frontend and Express with Postgres for the backend. The primary objective is to create a responsive, dynamic, and user-friendly platform that showcases the club's activities and engages the community.

## Tech Stack

- **Frontend:** React, Vite, CSS Modules
- **Backend:** Node.js, Express, Postgres
- **Version Control:** Git, GitHub
- **CI/CD:** GitHub Actions, Husky
- **Linting & Formatting:** ESLint, Prettier

## Setup Instructions

### Prerequisites

- **Node.js & npm/yarn:** Ensure you have Node.js (v18 or later) and npm/yarn installed.

### Installation

1. **Clone the Repository:**

    ```bash
    https://github.com/UOWD-Tech-Club/Tech-Club-Website.git
    cd Tech-Club-Website
    ```

2. **Install Dependencies:**

    - For the frontend:

        ```bash
        cd client
        npm install
        ```

    - For the backend:

        ```bash
        cd server
        npm install
        ```

3. **Start the Application:**

    - Start the backend:

        ```bash
        cd server
        npm run dev
        ```

    - Start the frontend:

        ```bash
        cd client
        npm run dev
        ```


## Workflow

1. **Create an Issue**

    When starting a new task, create an issue in GitHub. Describe the task clearly, including any relevant details and acceptance criteria. Add appropriate labels based on the task type and status.

    Or assign an available issue to yourself from the **Project Board**.

2. **Update the Project Board**

    Newly created issues are automatically added to the "Backlog" column in the project board. Update the status of the issue regularly and do not forget to add start/end dates.

3. **Create a Branch**

    Inside the issue, use the option to create a branch which will automatically link the issue with the created branch.

    Follow the branch naming convention based on the issue type:
    - Feature: `feat/issue-number-brief-description`
    - Bug Fix: `bug/issue-number-brief-description`
    - Maintenance: `maintain/issue-number-brief-description`

    Example: `feat/123-add-login-page`

4. **Develop the Feature**

    Implement the feature in the created branch. Follow the [Code Guidelines](#code-guidelines) for best practices.

    On each commit, the pre-commit hook will run through Husky to ensure no errors are present. Read the terminal output carefully to resolve any issues.

5. **Push Changes**

    Once all changes are made you can commit and push your changes to the remote repository:

    ```bash
    git push origin feature/123-add-login-page
    ```
    Commit messages must follow the convention detailed in [Code Guidelines](#code-guidelines).

6. **Create a Pull Request**

    Create a PR from your feature branch to the main branch. Link the PR to the relevant issue using `Closes #issue-number`. Ensure all checks pass, including linting, tests, and formatting.

7. **Review & Merge**

    Assign reviewers and get approval before merging the PR. Once approved, merge the PR into main. This will automatically move the issue to the "Done" column in the project board and close the linked issue.

8. **Automated Deployment**

    Merging into main triggers the CI/CD pipeline, which runs tests and deploys the application to the staging/production environment.


## Labels and Conventions

### Labels for Issues and PRs

- **Status:**
    - `available`: The issue is open and ready to be picked up.
    - `in progress`: The issue is being worked on.
    - `on hold`: The issue is blocked or waiting for feedback.
    - `review needed`: The pull request is ready for code review.
    - `revision needed`: The pull request needs revisions.
    - `completed`: The issue or pull request is completed and closed.

- **Type:**
    - `bug`: Issues related to bugs in the application.
    - `feature`: Feature requests and new functionality.
    - `maintenance`: Refactoring, technical debt, or dependencies updates.

### Applying Labels

Remember to apply and update labels regularly during the development process to make collaboration more seamless and track overall project progress.

## Code Guidelines

### Commit Message Guidelines

We follow a specific format for commit messages to maintain clarity and consistency. Each commit message should be structured as follows:

#### Format

```php
<type>(<scope>): <description>
```

#### Types

- **feat**: A new feature
- **fix**: A bug fix
- **docs**: Documentation changes
- **style**: Changes that do not affect code meaning (white-space, formatting, etc.)
- **refactor**: Code changes that neither fix bugs nor add features
- **test**: Adding or modifying tests
- **chore**: Changes to the build process, dependencies, or project configuration

#### Example

```scss
feat(auth): add login page with form validation
fix(button): resolve hover state issue on mobile devices
docs(readme): update installation instructions
```

#### Guidelines

- Use the imperative mood in the description (e.g., "add" not "added" or "adds").
- Limit the subject line to 50 characters.
- Capitalize the subject line.
- Do not end the subject line with a period.
- Include a brief explanation in the commit body if necessary.

### CSS Guidelines

#### CSS Modules

We use CSS Modules for styling components. This allows for scoped, modular CSS that reduces the risk of style conflicts.

Create a `.module.css` file for each component. For example, `Button.module.css`.

Import and use styles in your components like this:

```jsx
import styles from './Button.module.css';

function Button({ label }) {
    return <button className={styles.button}>{label}</button>;
}

export default Button;
```

#### BEM Methodology

Apply BEM naming within CSS Modules:

```css
/* Button.module.css */
.button {
    /* block */
}
.button__icon {
    /* element */
}
.button--primary {
    /* modifier */
}
```

### React Guidelines

#### Component Definition

Use regular function declarations for component definitions:

```jsx
function UserProfile({ user }) {
    return (
        <div>
            <h1>{user.name}</h1>
            <p>{user.bio}</p>
        </div>
    );
}

export default UserProfile;
```

#### Component Logic

Use arrow functions for inline functions and handlers:

```jsx
import React, { useState } from 'react';

function Counter() {
    const [count, setCount] = useState(0);

    const increment = () => setCount(count + 1);

    return (
        <div>
            <p>{count}</p>
            <button onClick={increment}>Increment</button>
        </div>
    );
}

export default Counter;
```
#### Hooks

Use React hooks (`useState`, `useEffect`, `useContext`, etc.) for state and side-effects management.

---
