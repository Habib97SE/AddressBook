/**
 *
 * @param {object} api : The API object to fetch data from the server
 * @returns : An array of users fetched from the server
 */
export async function fetchUsers(api) {
    try {
        return await api.getUsers();
    } catch (error) {
        console.error("Error fetching users:", error);
    }
}

/**
 *
 * @param {object} api : The API object to fetch data from the server
 * @returns : An array of addresses fetched from the server
 */
export async function fetchAddresses(api) {
    try {
        return await api.getAddresses();
    } catch (error) {
        console.error("Error fetching addresses:", error);
    }
}

/**
 *
 * @param {Array} addresses : The array of addresses to populate the table with
 * @param {} tableBody
 */
export function populateAddressTable(addresses, tableBody) {
    tableBody.innerHTML = "";
    addresses.forEach((address) => {
        console.log(address);
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${address.id}</td>
            <td>${address.fullName}</td>
            <td>${address.address}</td>
            <td><a href="mailto:${address.email}">${address.email}</a></td>
            <td><a href="tel:${address.phoneNumber}">${address.phoneNumber}</a></td>
            <td class="capitalize">${address.addressType.name}</td>
            <td>
                <button class="openUpdateModalBtn btn btn-warning m-1">Update</button>
                <button class="openDeleteModalBtn btn btn-danger m-1">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
    if (addresses.length === 0) {
        const row = document.createElement("tr");
        row.innerHTML = "<td colspan='6'>No addresses found</td>";
        tableBody.appendChild(row);
    }
}

export function openAddModal(
    addAddressModal,
    updateUserDropdownList,
    populateAddressTypes
) {
    addAddressModal.style.display = "block";
    updateUserDropdownList();
    populateAddressTypes();
}

export function closeAddModal(addAddressModal) {
    addAddressModal.style.display = "none";
}

export function handleAddNewUser(
    e,
    validation,
    api,
    updateUserDropdownList,
    users
) {
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

    if (validation.validateUser(user)) {
        api.addNewUser(user).then((data) => {
            if (data) {
                validation.showMessage(
                    "addNewUserMesssageBox",
                    "User added successfully",
                    ["alert", "alert-success"]
                );
                users.push(data);
                updateUserDropdownList();
                firstNameInput.value = "";
                lastNameInput.value = "";
                emailInput.value = "";
                phoneInput.value = "";
            }
        });
    }
}

export function handleAddNewAddress(
    e,
    validation,
    api,
    addresses,
    populateAddressTable,
    clearAddressForm
) {
    e.preventDefault();
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

    if (validation.validateAddressData(address)) {
        api.addNewAddress(address).then((data) => {
            if (data) {
                validation.showMessage(
                    "addNewAddressMessageBox",
                    "Address added successfully",
                    ["alert", "alert-success"]
                );
                addresses.push(data);
                populateAddressTable();
                clearAddressForm();
            } else {
                validation.showMessage(
                    "addNewAddressMessageBox",
                    "Failed to add address",
                    ["alert", "alert-danger"]
                );
            }
        });
    } else {
        validation.showMessage(
            "addNewAddressMessageBox",
            "Invalid address input",
            ["alert", "alert-danger"]
        );
    }
}

export function openUpdateModal(event, updateAddressModal, api, users) {
    const row = event.target.closest("tr");
    const addressId = row.querySelector("td").textContent;
    populateUpdateAddressForm(addressId, api, users);
    updateAddressModal.style.display = "block";
    // Populate update modal with row data if needed
}

export async function populateUpdateAddressForm(addressId, api, users) {
    const updateAddressId = document.getElementById("updateAddressId");
    const address = await api.getAddressById(addressId);
    const addressOneInput = document.getElementById("updateAddress1");
    const addressTwoInput = document.getElementById("updateAddress2");
    const postalCodeInput = document.getElementById("updatePostalCode");
    const cityInput = document.getElementById("updateCity");
    const stateInput = document.getElementById("updateState");
    const countryInput = document.getElementById("updateCountry");
    const addressTypeInput = document.getElementById("updateAddressType");
    const phoneNumberInput = document.getElementById(
        "updatePhoneNumberAddress"
    );

    updateAddressId.value = address.id;
    addressOneInput.value = address.addressOne;
    addressTwoInput.value = address.addressTwo;
    postalCodeInput.value = address.postalCode;
    cityInput.value = address.city;
    stateInput.value = address.state;
    countryInput.value = address.country;
    phoneNumberInput.value = address.phoneNumber;
    populateAddressTypes(api, "#updateAddressType");
    populateUsersDropDown(api, users, "#existingUsersUpdate");
    renderTable(users);
}

export function closeUpdateModal(updateAddressModal) {
    updateAddressModal.style.display = "none";
}

/**
 *
 * Delete modal functions
 *
 */
export function openDeleteModal(event, deleteConfirmModal) {
    const rowToDelete = event.target.closest("tr");
    deleteConfirmModal.style.display = "block";
    return rowToDelete;
}

export function closeDeleteModal(deleteConfirmModal) {
    deleteConfirmModal.style.display = "none";
}

export function confirmDelete(
    rowToDelete,
    deleteConfirmModal,
    api,
    addresses,
    updateTableCallback
) {
    const addressId = rowToDelete.querySelector("td").textContent;

    api.deleteAddress(addressId).then((response) => {
        // If the address was deleted successfully, remove it from the addresses array and update the table
        if (response) {
            addresses = addresses.filter((address) => address.id !== addressId);
            updateTableCallback(addresses);
            deleteConfirmModal.style.display = "none";
            renderTable(addresses);
        } else {
            // Show an error message if the address was not deleted
            console.error(`Failed to delete address with id ${addressId}`);
        }
    });
}

export function cancelDelete(deleteConfirmModal) {
    deleteConfirmModal.style.display = "none";
}

/**
 *
 * Search Results Modal Functions
 *
 */

export function openSearchResultsModal(
    searchQueryInput,
    searchQuery,
    searchResultsModal,
    addresses,
    populateSearchResultsTable
) {
    searchQuery = searchQueryInput.value;
    const showSearchQuery = document.getElementById("showSearchQuery");
    showSearchQuery.textContent = searchQuery;
    searchResultsModal.style.display = "block";
    populateSearchResultsTable(searchQuery, addresses);
}

export function closeSearchResultsModal(searchResultsModal) {
    searchResultsModal.style.display = "none";
}

export function populateSearchResultsTable(searchQuery, addresses) {
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
            <td><a href="${address.phoneNumber}">${address.phoneNumber}</a></td>
            <td>
                <button class="openUpdateModalBtn btn btn-warning m-1">Update</button>
                <button class="openDeleteModalBtn btn btn-danger m-1">Delete</button>
            </td>
        `;
        searchResultTBody.appendChild(row);
    });
}

export function toggleUserDropdown(e) {
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
}

export function toggleUserForm(e) {
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
}

export function toggleUpdateDropdown(e) {
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
}

export function toggleUpdateForm(e) {
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
}

export function handleWindowClick(event, modals) {
    if (modals.includes(event.target)) {
        event.target.style.display = "none";
    }
}

export function handleKeyDown(event) {
    if (event.key === "Escape") {
        document.querySelectorAll(".modal").forEach((modal) => {
            modal.style.display = "none";
        });
    }
}

/**
 *
 * @param {object} api : The API object to fetch data from the server
 * @param {Array} users : The array to store the users fetched from the server
 * @param {String} identifier : The identifier of the dropdown list to update
 */
export async function populateUsersDropDown(api, users, identifier) {
    const dropdown = document.querySelector(identifier);
    dropdown.innerHTML = "";
    users = await fetchUsers(api);
    const defaultOption = document.createElement("option");
    defaultOption.value = "all";
    defaultOption.textContent = "All";
    dropdown.appendChild(defaultOption);
    users.forEach((user) => {
        const option = document.createElement("option");
        option.value = user.id;
        option.textContent = `${user.firstName} ${user.lastName}`;
        dropdown.appendChild(option);
    });
}

export async function populateAddressTypes(api, identifier) {
    const addAddressTypes = document.querySelector(identifier);
    addAddressTypes.innerHTML = "";
    const data = await getAddressTypes(api);

    data.forEach((addressType) => {
        const option = document.createElement("option");
        option.value = addressType.id;
        option.textContent = addressType.name;
        option.classList.add("capitalize");
        addAddressTypes.appendChild(option);
    });
}

export function clearAddressForm() {
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

    addAddressOneInput.value = "";
    addAddressTwoInput.value = "";
    addPostalCodeInput.value = "";
    addCityInput.value = "";
    addStateInput.value = "";
    addCountryInput.value = "";
    addPhoneNumberInput.value = "";
    addAddressTypeInput.value = "";
}

// Sort the addresses by date they were created
export function sortAddressesByDate(addresses) {
    addresses.sort((a, b) => {
        return new Date(b.createdDate) - new Date(a.createdDate);
    });
}

export function renderTable(addresses) {
    // Check if addresses is empty
    if (addresses.length === 0) {
        document.getElementById("viewAddressesTable").innerHTML =
            '<tr class="text-danger"><td colspan="7">No addresses found</td></tr>';
        return;
    }
    const tableBody = document.getElementById("viewAddressesTable");
    tableBody.innerHTML = ""; // Clear existing rows
    addresses.forEach((address) => {
        const row = document.createElement("tr");
        row.innerHTML = `
                <td>${address.id}</td>
                <td>${address.fullName}</td>
                <td>${address.address}</td>
                <td>${address.email}</td>
                <td>${address.phoneNumber}</td>
                <td>${address.addressType}</td>
                <td>
                    <button class="openUpdateModalBtn btn btn-warning m-1">Update</button>
                    <button class="openDeleteModalBtn btn btn-danger m-1">Delete</button>
                </td>
            `;
        tableBody.appendChild(row);
    });

    // Re-attach event listeners for the new rows
    document.querySelectorAll(".openUpdateModalBtn").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const row = event.target.closest("tr");
            updateAddressModal.style.display = "block";
            // Populate update modal with row data if needed
        });
    });

    document.querySelectorAll(".openDeleteModalBtn").forEach((btn) => {
        btn.addEventListener("click", (event) => {
            const rowToDelete = event.target.closest("tr");
            deleteConfirmModal.style.display = "block";
        });
    });
}

export async function getAddressTypes(api) {
    return await api.getAddressTypes();
}

export async function handleUpdateFormSubmission(
    addressId,
    updatedAddress,
    api,
    validation
) {
    try {
        // validate the form data
        if (validation.validateAddressData(updatedAddress)) {
            const response = await api.updateAddress(addressId, updatedAddress);
            if (response) {
                validation.showMessage(
                    "updateAddressMessageBox",
                    "Address updated successfully",
                    ["alert", "alert-success"]
                );
                // update the addresses array with the updated address
                const index = addresses.findIndex(
                    (address) => address.id === addressId
                );
                addresses[index] = response;
                // update the table with the new data
                renderTable(addresses);
            } else {
                validation.showMessage(
                    "updateAddressMessageBox",
                    "Failed to update address",
                    ["alert", "alert-danger"]
                );
            }
        } else {
            validation.showMessage(
                "updateAddressMessageBox",
                "Invalid address input",
                ["alert", "alert-danger"]
            );
        }
    } catch {
        validation.showMessage(
            "updateAddressMessageBox",
            "Failed to update address",
            ["alert", "alert-danger"]
        );
    }
}
