"use strict";

import { API } from "./API_Requests.js";
import { Validation } from "./Validation.js";

const api = new API("http://localhost:8090/api/v1");
const validation = new Validation();

document.addEventListener("DOMContentLoaded", async () => {
    // Table body element
    const tableBody = document.getElementById("viewAddressesTable");

    const openAddModalBtn = document.getElementById("openAddModalBtn");
    const closeAddModalBtn = document.getElementById("closeAddModalBtn");
    const addAddressModal = document.getElementById("addAddressModal");
    const addNewUserSubmitButton = document.getElementById(
        "addNewUserSubmitButton"
    );
    /** Add New address IDs */
    const addNewAddressButton = document.getElementById("addNewAddressButton");
    const addNewAddressMessageBox = document.getElementById(
        "addNewAddressMessageBox"
    );

    const openUpdateModalBtns = document.querySelectorAll(
        ".openUpdateModalBtn"
    );
    const closeUpdateModalBtn = document.getElementById("closeUpdateModalBtn");
    const updateAddressModal = document.getElementById("updateAddressModal");

    const openDeleteModalBtns = document.querySelectorAll(
        ".openDeleteModalBtn"
    );
    const closeDeleteModalBtn = document.getElementById("closeDeleteModalBtn");
    const deleteConfirmModal = document.getElementById("deleteConfirmModal");
    const confirmDeleteBtn = document.getElementById("confirmDeleteBtn");
    const cancelDeleteBtn = document.getElementById("cancelDeleteBtn");

    const searchResultsModalBtn = document.getElementById(
        "searchResultsModalBtn"
    );
    const searchResultsModal = document.getElementById("searchResultsModal");
    const closeSearchResultsModalBtn = document.getElementById(
        "closeSearchResultsModalBtn"
    );
    const searchQueryInput = document.getElementById("searchQueryInput");

    const showDropdown = document.getElementById("showDropdown");
    const showForm = document.getElementById("showForm");
    const userForm = document.getElementById("userForm");
    const userDropdown = document.getElementById("userDropdown");

    const showUpdateDropdown = document.getElementById("showUpdateDropdown");
    const showUpdateForm = document.getElementById("showUpdateForm");
    const updateUserForm = document.getElementById("updateUserForm");
    const updateUserDropdown = document.getElementById("updateUserDropdown");

    let searchQuery;
    let rowToDelete;
    let users;
    let addresses;

    // Fetch users from the API
    const fetchUsers = async () => {
        try {
            users = await api.getUsers();
        } catch (error) {
            console.error("Error fetching users:", error);
        }
    };
    await fetchUsers();

    // Fetch addresses from the API
    const fetchAddresses = async () => {
        try {
            addresses = await api.getAddresses();
        } catch (error) {
            console.error("Error fetching addresses:", error);
        }
    };
    await fetchAddresses();

    // Loop through the addresses and display them in the table
    addresses.forEach((address) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${address.id}</td>
            <td>${address.fullName}</td>
            <td>${address.address}</td>
            <td>${address.email}</td>
            <td>${address.phoneNumber}</td>
            <td>
                <button class="openUpdateModalBtn btn btn-warning m-1">Update</button>
                <button class="openDeleteModalBtn btn btn-danger m-1">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    // if addresses is empty, display a message
    if (addresses.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = "<td colspan='6'>No addresses found</td>";
        tableBody.appendChild(row);
    }

    // Event listener for addNewAddressButton
    addNewAddressButton.addEventListener("click", (e) => {
        e.preventDefault(); // Prevent the form from submitting the default way
        const addAddressOneInput = document.getElementById("addAddress1");
        const addAddressTwoInput = document.getElementById("addAddress2");
        const addPostalCodeInput = document.getElementById("addPostalCode");
        const addCityInput = document.getElementById("addCity");
        const addStateInput = document.getElementById("addState");
        const addCountryInput = document.getElementById("addCountry");
        const addPhoneNumberInput = document.getElementById(
            "addPhoneNumberAddress"
        );
        const addAddressTypeInput = document.getElementById("addAddressType");
        const userId = document.getElementById("existingUsers").value;

        console.log(addPhoneNumberInput.value); // Ensure this logs correctly

        const address = {
            addressOne: addAddressOneInput.value,
            addressTwo: addAddressTwoInput.value,
            postalCode: addPostalCodeInput.value,
            city: addCityInput.value,
            state: addStateInput.value,
            country: addCountryInput.value,
            phoneNumber: addPhoneNumberInput.value,
            addressTypeId: parseInt(addAddressTypeInput.value),
            userId: parseInt(userId),
        };

        // validate address input
        if (validation.validateAddressData(address)) {
            console.log("Address is valid");
            // add new address
            api.addNewAddress(address).then((data) => {
                // check if address was added successfully
                console.log("Address from if statement in script.js:");
                console.log(data);
                if (data) {
                    validation.showMessage(
                        "addNewAddressMessageBox",
                        "Address added successfully",
                        ["alert", "alert-success"]
                    );
                } else {
                    validation.showMessage(
                        "addNewAddressMessageBox",
                        "Failed to add address",
                        ["alert", "alert-danger"]
                    );
                }

                // clear form fields
                addAddressOneInput.value = "";
                addAddressTwoInput.value = "";
                addPostalCodeInput.value = "";
                addCityInput.value = "";
                addStateInput.value = "";
                addCountryInput.value = "";
                addPhoneNumberInput.value = "";
                addAddressTypeInput.value = "";
            });
        } else {
            console.log("Address is invalid");
            validation.showMessage(
                "addNewAddressMessageBox",
                "Invalid address input",
                ["alert", "alert-danger"]
            );
        }
    }); // End of addNewAddressButton event listener

    // Function to update user dropdown
    const updateUserDropdownList = async () => {
        const existingUsers = document.getElementById("existingUsers");
        existingUsers.innerHTML = ""; // Clear existing options
        await fetchUsers();
        users.forEach((user) => {
            const option = document.createElement("option");
            option.value = user.id;
            option.textContent = user.firstName + " " + user.lastName;
            option.classList.add("capitalize");
            existingUsers.appendChild(option);
        });
    };

    showDropdown.addEventListener("click", (e) => {
        e.preventDefault();
        userForm.classList.add("fade");
        setTimeout(() => {
            userForm.classList.add("hidden");
            userDropdown.classList.remove("hidden");
            userDropdown.classList.add("fade");
            setTimeout(() => {
                userDropdown.classList.remove("fade");
                userDropdown.classList.add("show");
            }, 50);
        }, 500);
    });

    showForm.addEventListener("click", (e) => {
        e.preventDefault();
        userDropdown.classList.add("fade");
        setTimeout(() => {
            userDropdown.classList.add("hidden");
            userForm.classList.remove("hidden");
            userForm.classList.add("fade");
            setTimeout(() => {
                userForm.classList.remove("fade");
                userForm.classList.add("show");
            }, 50);
        }, 500);
    });

    showUpdateDropdown.addEventListener("click", (e) => {
        e.preventDefault();
        updateUserForm.classList.add("fade");
        setTimeout(() => {
            updateUserForm.classList.add("hidden");
            updateUserDropdown.classList.remove("hidden");
            updateUserDropdown.classList.add("fade");
            setTimeout(() => {
                updateUserDropdown.classList.remove("fade");
                updateUserDropdown.classList.add("show");
            }, 50);
        }, 500);
    });

    showUpdateForm.addEventListener("click", (e) => {
        e.preventDefault();
        updateUserDropdown.classList.add("fade");
        setTimeout(() => {
            updateUserDropdown.classList.add("hidden");
            updateUserForm.classList.remove("hidden");
            updateUserForm.classList.add("fade");
            setTimeout(() => {
                updateUserForm.classList.remove("fade");
                updateUserForm.classList.add("show");
            }, 50);
        }, 500);
    });

    /**
     * DOM manipulation for modals Add New Address
     */
    openAddModalBtn.addEventListener("click", async () => {
        addAddressModal.style.display = "block";
        await updateUserDropdownList();

        /* Populate the address types with retrieved data from addresstypes table */
        const addAddressTypes = document.querySelector("#addAddressType");
        addAddressTypes.innerHTML = ""; // Clear existing options
        api.getAddressTypes().then((data) => {
            data.forEach((addressType) => {
                const option = document.createElement("option");
                option.value = addressType.id;
                option.textContent = addressType.name;
                option.classList.add("capitalize");
                addAddressTypes.appendChild(option);
            });
        });
    });

    addNewUserSubmitButton.addEventListener("click", (e) => {
        e.preventDefault();
        const firstNameInput = document.getElementById("addFirstName");
        const lastNameInput = document.getElementById("addLastName");
        const emailInput = document.getElementById("addEmail");
        const phoneInput = document.getElementById("addPhoneNumber");

        const user = {
            firstName: firstNameInput.value,
            lastName: lastNameInput.value,
            email: emailInput.value,
            mobilePhone: phoneInput.value,
        };

        // validate user input
        if (validation.validateUser(user)) {
            // add new user
            api.addNewUser(user).then((data) => {
                // check if user was added successfully
                if (data) {
                    validation.showMessage(
                        "addNewUserMesssageBox",
                        "User added successfully",
                        ["alert", "alert-success"]
                    );
                }

                users.push(data);

                // clear form fields
                firstNameInput.value = "";
                lastNameInput.value = "";
                emailInput.value = "";
                phoneInput.value = "";

                // Update the dropdown with the new user
                updateUserDropdownList();
            });
        }
    });

    closeAddModalBtn.addEventListener("click", () => {
        addAddressModal.style.display = "none";
    });

    openUpdateModalBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const row = event.target.closest("tr");
            updateAddressModal.style.display = "block";
            // Populate update modal with row data if needed
        });
    });

    closeUpdateModalBtn.addEventListener("click", () => {
        updateAddressModal.style.display = "none";
    });

    openDeleteModalBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            rowToDelete = event.target.closest("tr");
            deleteConfirmModal.style.display = "block";
        });
    });

    closeDeleteModalBtn.addEventListener("click", () => {
        deleteConfirmModal.style.display = "none";
    });

    confirmDeleteBtn.addEventListener("click", () => {
        // delete address
        if (rowToDelete) {
            rowToDelete.remove();
            rowToDelete = null;
            deleteConfirmModal.style.display = "none";
        }
    });

    cancelDeleteBtn.addEventListener("click", () => {
        deleteConfirmModal.style.display = "none";
    });

    searchResultsModalBtn.addEventListener("click", () => {
        searchQuery = searchQueryInput.value;
        console.log(searchQuery);
        const showSearchQuery = document.getElementById("showSearchQuery");
        showSearchQuery.textContent = searchQuery;
        searchResultsModal.style.display = "block";

        // populate the table in the search result modal
        const searchResultTBody = document.getElementById("searchResultTBody");
        const searchResults = addresses.filter((address) => {
            return (
                address.fullName.includes(searchQuery) ||
                address.address.includes(searchQuery) ||
                address.email.includes(searchQuery) ||
                address.phoneNumber.includes(searchQuery)
            );
        });

        searchResultTBody.innerHTML = "";

        searchResults.forEach((address) => {
            const row = document.createElement("tr");
            row.innerHTML = `
            <td>${address.id}</td>
            <td>${address.fullName}</td>
            <td>${address.address}</td>
            <td>${address.email}</td>
            <td>${address.phoneNumber}</td>
            <td>
                <button class="openUpdateModalBtn btn btn-warning m-1">Update</button>
                <button class="openDeleteModalBtn btn btn-danger m-1">Delete</button>
            </td>
        `;
            searchResultTBody.appendChild(row);
        });
    });

    closeSearchResultsModalBtn.addEventListener("click", () => {
        searchResultsModal.style.display = "none";
    });

    window.addEventListener("click", (event) => {
        // close modals when clicked outside or on close button or ESC key
        if (event.target == addAddressModal) {
            addAddressModal.style.display = "none";
        } else if (event.target == updateAddressModal) {
            updateAddressModal.style.display = "none";
        } else if (event.target == deleteConfirmModal) {
            deleteConfirmModal.style.display = "none";
        } else if (event.target == searchResultsModal) {
            searchResultsModal.style.display = "none";
        }
    });

    window.addEventListener("keydown", (event) => {
        if (event.key === "Escape") {
            document.querySelectorAll(".modal").forEach((modal) => {
                modal.style.display = "none";
            });
        }
    });
});
