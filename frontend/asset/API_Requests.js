"use strict";
/**
 * API class to interact with the backend server
 * @param {string} this.baseUrl : Base URL of the backend server (e.g. http://localhost:3000/api/v1)
 *
 * The class contains methods to interact with the backend server to perform CRUD operations on the database for the following entities:
 *
 * <ul>
 *   <li>Addresses: CRUD operations on addresses in the database
 *     <ul>
 *       <li>getAddresses: Retrieve all addresses stored in the database</li>
 *       <li>getAddressesByUserId: Retrieve addresses that belong to provided userId</li>
 *       <li>searchAddress: Search in the database and retrieve data that are relevant to the search query</li>
 *       <li>addNewAddress: Add new address into the database</li>
 *       <li>updateAddress: Update an existing address in the database</li>
 *       <li>deleteAddress: Delete an existing address from the database</li>
 *     </ul>
 *   </li>
 *   <li>Address Types: CRUD operations on address types in the database
 *     <ul>
 *       <li>getAddressTypes: Retrieve all address types</li>
 *       <li>getAddressType: Retrieve a specific address type with provided addressTypeId</li>
 *       <li>addNewAddressType: Add a new address type into the database</li>
 *       <li>updateAddressType: Update an existing address type in the database</li>
 *       <li>deleteAddressType: Delete an existing address type from the database</li>
 *     </ul>
 *   </li>
 *   <li>Users: CRUD operations on users in the database
 *     <ul>
 *       <li>getUsers: Retrieve all users from the database</li>
 *       <li>getUserById: Retrieve a specific user with provided userId</li>
 *       <li>addNewUser: Add a new user into the database</li>
 *       <li>updateUser: Update an existing user in the database</li>
 *       <li>deleteUser: Delete an existing user from the database</li>
 *     </ul>
 *   </li>
 * </ul>
 */
export class API {
    constructor(baseUrl) {
        this.baseUrl = baseUrl;
    }

    async searchAddress(query) {
        try {
            const endpoint = `${this.baseUrl}/addresses/search/${query}`;
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.statusText}`
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
        }
    }

    /**
     * Retrieve all addresses stored in the database
     */
    async getAddresses() {
        try {
            console.log("Fetching addresses from the server...");
            console.log("Base URL:", this.baseURL);
            const response = await fetch(`${this.baseUrl}/addresses`);
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.statusText}`
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
        }
    }

    /**
     * Retrieve addresses that belong to provided userId
     * @param {number} userId : Given userId to filter data by
     */
    async getAddressesByUserId(userId) {
        const endpoint = `${this.baseUrl}/addresses/${userId}`;
        await fetch(endpoint, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }

    /**
     * Search in the database and retrieve data that are relevant to the search query.
     * @param {string} query : A phrase or keyword to search the database
     */
    async searchAddress(query) {
        const endpoint = `${this.baseUrl}/addresses/search/${query}`;
        await fetch(endpoint, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }

    /**
     * Make a post request to add new address into the database.
     * @param {object} address : An object that contains the address class.
     */
    async addNewAddress(address) {
        const endpoint = `${this.baseUrl}/addresses`;
        try {
            const response = await fetch(endpoint, {
                method: "POST",
                body: JSON.stringify(address),
                headers: {
                    "Content-Type": "application/json",
                },
            });

            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.statusText}`
                );
            }

            // console.log the whole response from server
            console.log("Response from server:", response);

            // Parse the response as JSON
            const data = await response.json();

            // Return the data
            return data;
        } catch (error) {
            console.error("Error in addNewAddress:", error);
            throw error; // Re-throw the error to handle it in the caller
        }
    }

    /**
     * Make a PUT call to update an existing address.
     * @param {number} addressId : Id of given address for updating
     * @param {object} newAddress : updated address object
     * @returns {object} : updated address object
     */
    async updateAddress(addressId, newAddress) {
        const endpoint = `${this.baseUrl}/addresses/${addressId}`;
        await fetch(endpoint, {
            method: "PUT",
            body: JSON.stringify(newAddress),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }

    /**
     * Make a DELETE call to delete an existing address.
     * @param {number} addressId : Id of given address for deletion
     * @returns {object} : deleted address object
     */
    async deleteAddress(addressId) {
        const endpoint = `${this.baseUrl}/addresses/${addressId}`;
        await fetch(endpoint, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }

    /**
     * Retrieve all address types
     */
    async getAddressTypes() {
        try {
            const endpoint = `${this.baseUrl}/address-types`;
            const response = await fetch(endpoint);
            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.statusText}`
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
        }
    }

    /**
     * Retrieive a specific address type with provided addressTypeId
     * @param {number} addressTypeId : ID of address type to retrieve
     */
    async getAddressType(addressTypeId) {
        const endpoint = `${this.baseUrl}/address-types/${addressTypeId}`;
        await fetch(endpoint, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }
    /**
     * Add a new address type into the database
     * @param {string} addressType : New address type to add
     */
    async addNewAddressType(addressType) {
        const endpoint = `${this.baseUrl}/address-types`;
        await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(addressType),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }

    /**
     * Update an existing address type in the database
     * @param {number} addressTypeId : ID of address type to update
     * @param {object} addressType : Updated address type object
     */
    async updateAddressType(addressTypeId, addressType) {
        const endpoint = `${this.baseUrl}/address-types/${addressTypeId}`;
        await fetch(endpoint, {
            method: "PUT",
            body: JSON.stringify(addressType),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }

    /**
     * Delete an existing address type from the database
     * @param {number} addressTypeId : ID of address type to delete
     */
    async deleteAddressType(addressTypeId) {
        const endpoint = `${this.baseUrl}/address-types/${addressTypeId}`;
        await fetch(endpoint, {
            method: "DELETE",
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }

    /**
     * Retrieve all users from the database
     */
    async getUsers() {
        const endpoint = `${this.baseUrl}/users`;
        try {
            const response = await fetch(endpoint);

            if (!response.ok) {
                throw new Error(
                    `Network response was not ok: ${response.statusText}`
                );
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error(
                "There has been a problem with your fetch operation:",
                error
            );
        }
    }
    /**
     * Retrieve a specific user with provided userId
     * @param {number} userId : ID of user to retrieve
     */
    async getUserById(userId) {
        const endpoint = `${this.baseUrl}/users/${userId}`;
        await fetch(endpoint, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }
    /**
     * Search for users in the database
     * @param {string} query : A phrase or keyword to search the database
     */
    async addNewUser(user) {
        const endpoint = `${this.baseUrl}/users`;
        await fetch(endpoint, {
            method: "POST",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }

    /**
     * Update an existing user in the database
     * @param {number} userId : ID of user to update
     * @param {object} user : Updated user object
     */
    async updateUser(userId, user) {
        const endpoint = `${this.baseUrl}/users/${userId}`;
        await fetch(endpoint, {
            method: "PUT",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }
    /**
     * Delete an existing user from the database
     * @param {number} userId : ID of user to delete
     * @param {object} user : User object to delete
     */
    async deleteUser(userId, user) {
        const endpoint = `${this.baseUrl}/users/${userId}`;
        await fetch(endpoint, {
            method: "DELETE",
            body: JSON.stringify(user),
            headers: {
                "Content-Type": "application/json",
            },
        })
            .then((response) => response.json())
            .then((data) => {
                return data;
            });
    }
}
