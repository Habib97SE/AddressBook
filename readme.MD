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

## Installation

-   Prerequisites:

    1. Java 11+
    2. Maven
    3. MySQL

-   Backend Setup
    1. Clone the repository:
    ```bash
    git clone https://github.com/Habib97SE/AddressBook.git
    ```
    2. Configure the **application.properties**
    ```properties
    spring.datasource.url=jdbc:mysql://localhost:3306/addressbook_db
    spring.datasource.username=your-username
    spring.datasource.password=your-password
    ```
    3. Build and run the application:
    ```bash
    mvn clean install
    mvn spring-boot:run
    ```
-   Frontend setup
    1. Open the index.html file located in the frontend/ folder in a browser.
    2. Ensure the backend is running to handle API requests.

**If your backend server runs on a port other than 8080, then you have to change the default address to that port number. The default address is: http://localhost:8080**

### Usage

-   Launch the application and view the homepage where you can search and filter addresses.
-   Use the Add New button to open the modal and add a new address. The form is validated before submission.
-   Manage users and assign them addresses from the dropdown.
-   Click Update or Delete buttons to edit or remove addresses.

### Validations

-   **Unique Email Validation**: Ensures no two users can register with the same email address.
-   **Form Validations**: All forms are validated before submission (e.g., required fields, valid email format).

## Future Improvements

### Add pagination to handle large datasets.

### Implement user authentication for added security.

### Improve the UI/UX by adding more styles and enhancing mobile responsiveness.
