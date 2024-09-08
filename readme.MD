# Address Book Management

An interactive and user-friendly Address Book Management web application that allows users to manage their addresses, filter and search through records, and manage users via an intuitive interface. Built using JavaScript (frontend), Spring Boot (backend), and connected to a MySQL database.

## Features

-   Add, Update, and Delete Addresses: Users can perform full CRUD operations on addresses with ease.

-   User Management: Manage users, including assigning them addresses.
-   Search and Filter: Search through addresses by various fields like address, email, phone number, or user name. Filter addresses by type, user, or creation date.
-   Modal Windows: Use of modal windows to input, update, and delete addresses.
-   Validation: Form validations ensure all inputs are correct (including email uniqueness and proper formatting).
-   Sorting: Users can sort addresses by creation date or alphabetical order (A-Z, Z-A).

## Tech Stack

### Frontend

-   **HTML, CSS**: Provides the structure and styling of the application.
-   **JavaScript (ES6+)**: Handles client-side functionality.
-   **Modular Design**: Organized into different JS modules for better maintainability.

### Backend

-   **Spring Boot**: Serves as the backend framework.
-   **MySQL**: Database management for storing addresses and users.
-   **JPA (Java Persistence API)**: For ORM and database operations.

## Dependencies

-   **Font Awesome**: Provides icon support for buttons and actions.
-   **Validation.js**: Custom JavaScript validation for the forms.

## Important Files

-   **index.html**: The main HTML file of the project.
-   **script.js**: The main JavaScript file that handles frontend logic.
-   **domHandlers.js**: Separate file for handling DOM manipulation and event listeners.
-   **API_Requests.js**: Manages all HTTP requests between the frontend and backend.
    Validation.js: Custom validation methods for form inputs.

## API Endpoints

### Address Management

-   GET **/api/v1/addresses**: Retrieve all addresses.
-   POST **/api/v1/addresses**: Add a new address.
-   PUT **/api/v1/addresses/{id}**: Update an existing address.
-   DELETE **/api/v1/addresses/{id}**: Delete an address.

### User Management

-   GET **/api/v1/users**: Retrieve all users.
-   POST **/api/v1/users**: Add a new user.
