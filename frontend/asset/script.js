"use strict";

import { API } from "./API_Requests.js";
import { Validation } from "./Validation.js";
import * as handlers from "./domHandlers.js";

const api = new API("http://localhost:8090/api/v1");
const validation = new Validation();

document.addEventListener("DOMContentLoaded", async () => {
    const tableBody = document.getElementById("viewAddressesTable");

    // The Sort By Dropdown Element for the Table
    const sortAddressByCreatedDate = document.getElementById(
        "sortAddressByCreatedDate"
    );

    // The Filter By Dropdown Element for the Table
    const filterByAddressTypes = document.getElementById(
        "filterByAddressTypes"
    );

    const openAddModalBtn = document.getElementById("openAddModalBtn");
    const closeAddModalBtn = document.getElementById("closeAddModalBtn");
    const addAddressModal = document.getElementById("addAddressModal");
    const addNewUserSubmitButton = document.getElementById(
        "addNewUserSubmitButton"
    );
    const addNewAddressButton = document.getElementById("addNewAddressButton");

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
    let users = await handlers.fetchUsers(api);
    let addresses = await handlers.fetchAddresses(api);

    // Populate the address table with all addresses
    handlers.renderTable(addresses);

    // Sort the table by created date in ascending/descending order
    sortAddressByCreatedDate.addEventListener("change", () => {
        const sortOrder = sortAddressByCreatedDate.value;
        if (sortOrder === "oldToNew") {
            addresses.sort(
                (a, b) => new Date(a.createdDate) - new Date(b.createdDate)
            );
            handlers.renderTable(addresses);
            return;
        }
        if (sortOrder === "newToOld") {
            addresses.sort(
                (a, b) => new Date(b.createdDate) - new Date(a.createdDate)
            );
            handlers.renderTable(addresses);
            return;
        }
        if (sortOrder === "default") {
            handlers.renderTable(addresses);
            return;
        }
        // if sortOrder is alphabetical order (A-Z)
        if (sortOrder === "aToZ") {
            addresses.sort((a, b) => a.address.localeCompare(b.address));
            handlers.renderTable(addresses);
            return;
        }
        // if sortOrder is reverse alphabetical order (Z-A)
        if (sortOrder === "zToA") {
            addresses.sort((a, b) => b.address.localeCompare(a.address));
            handlers.renderTable(addresses);
            return;
        }
        x``;
    });

    // Populate the address types dropdown
    filterByAddressTypes.innerHTML = handlers.populateAddressTypes(
        api,
        "#filterByAddressTypes"
    );

    // Filter by users
    const filterByUsers = document.getElementById("filterByUsers");
    handlers.populateUsersDropDown(api, users, "#filterByUsers");
    filterByUsers.addEventListener("change", () => {
        if (filterByUsers.value === "all") {
            handlers.renderTable(addresses);
            return;
        }

        let chosenUser = users.find(
            (user) => user.id === parseInt(filterByUsers.value)
        );
        let filteredAddresses = addresses.filter(
            (address) =>
                address.fullName ===
                chosenUser.firstName + " " + chosenUser.lastName
        );

        handlers.renderTable(filteredAddresses);
    });

    // Filter the table by address type
    filterByAddressTypes.addEventListener("change", () => {
        // check if all addresses should be displayed
        if (filterByAddressTypes.value === "all") {
            handlers.renderTable(addresses); // Re-render the table with all data
            return;
        }
        const filteredAddresses = addresses.filter(
            (address) => address.addressType === filterByAddressTypes.value
        );
        handlers.renderTable(filteredAddresses); // Re-render the table with filtered data
    });

    openAddModalBtn.addEventListener("click", () =>
        handlers.openAddModal(
            addAddressModal,
            () => handlers.populateUsersDropDown(api, users, "#existingUsers"),
            () => handlers.populateAddressTypes(api, "#addAddressType")
        )
    );
    closeAddModalBtn.addEventListener("click", () =>
        handlers.closeAddModal(addAddressModal)
    );
    addNewUserSubmitButton.addEventListener("click", (e) =>
        handlers.handleAddNewUser(
            e,
            validation,
            api,
            () => handlers.updateUserDropdownList(api, users),
            users
        )
    );
    addNewAddressButton.addEventListener("click", (e) =>
        handlers.handleAddNewAddress(
            e,
            validation,
            api,
            addresses,
            () => handlers.populateAddressTable(addresses, tableBody),
            handlers.clearAddressForm
        )
    );

    closeUpdateModalBtn.addEventListener("click", () =>
        handlers.closeUpdateModal(updateAddressModal)
    );

    openDeleteModalBtns.forEach((btn) => {
        btn.addEventListener("click", (event) => {
            rowToDelete = handlers.openDeleteModal(event, deleteConfirmModal);
        });
    });
    closeDeleteModalBtn.addEventListener("click", () =>
        handlers.closeDeleteModal(deleteConfirmModal)
    );

    cancelDeleteBtn.addEventListener("click", () =>
        handlers.cancelDelete(deleteConfirmModal)
    );

    confirmDeleteBtn.addEventListener("click", () =>
        handlers.confirmDelete(
            rowToDelete,
            deleteConfirmModal,
            api,
            addresses,
            handlers.renderTable
        )
    );

    searchResultsModalBtn.addEventListener("click", () =>
        handlers.openSearchResultsModal(
            searchQueryInput,
            searchQuery,
            searchResultsModal,
            addresses,
            handlers.populateSearchResultsTable
        )
    );
    closeSearchResultsModalBtn.addEventListener("click", () =>
        handlers.closeSearchResultsModal(searchResultsModal)
    );

    showDropdown.addEventListener("click", handlers.toggleUserDropdown);
    showForm.addEventListener("click", handlers.toggleUserForm);
    showUpdateDropdown.addEventListener("click", handlers.toggleUpdateDropdown);
    showUpdateForm.addEventListener("click", handlers.toggleUpdateForm);

    window.addEventListener("click", (event) =>
        handlers.handleWindowClick(event, [
            addAddressModal,
            updateAddressModal,
            deleteConfirmModal,
            searchResultsModal,
        ])
    );
    window.addEventListener("keydown", handlers.handleKeyDown);

    tableBody.addEventListener("click", (event) => {
        if (event.target.classList.contains("openDeleteModalBtn")) {
            rowToDelete = handlers.openDeleteModal(event, deleteConfirmModal);
        }
        if (event.target.classList.contains("openUpdateModalBtn")) {
            handlers.openUpdateModal(event, updateAddressModal, api, users);
        }
    });

    // handle the update address form submission
    document
        .getElementById("updateAddressSubmissionButton")
        .addEventListener("click", (e) => {
            e.preventDefault();
            const addressId = document.getElementById("updateAddressId").value;

            const address = {
                id: addressId,
                addressOne: document.getElementById("updateAddress1").value,
                addressTwo: document.getElementById("updateAddress2").value,
                city: document.getElementById("updateCity").value,
                state: document.getElementById("updateState").value,
                postalCode: document.getElementById("updatePostalCode").value,
                country: document.getElementById("updateCountry").value,
                phoneNumber: document.getElementById("updatePhoneNumberAddress")
                    .value,
                addressType: document.getElementById("updateAddressType").value,
                userId: document.getElementById("existingUsersUpdate").value,
            };
            console.log(address);
            handlers.handleUpdateFormSubmission(
                addressId,
                address,
                api,
                validation
            );
        }); // end of update address form submission
});
