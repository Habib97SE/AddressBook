// fetch data from server:
const baseURL = "http://localhost:8080/api/v1";

/**
 * Retrieve all addresses stored in the database
 */
function getAddresses() {
  const endpoint = `${baseURL}/addresses`;
}

/**
 * Retrieve addresses that belong to provided userId
 * @param {number} userId : Given userId to filter data by
 */
function getAddressesByUserId(userId) {
  const endpoint = `${baseURL}/addresses/${userId}`;
}

/**
 * Search in the database and retrieve data that are relevant to the search query.
 * @param {string} query : A phrase or keyword to search the database
 */
function searchAddress(query) {
  const endpoint = `${baseURL}/addresses/search/${query}`;
}

/**
 * Make a post request to add new address into the database.
 * @param {object} address : An object that contains the address class.
 */
function addNewAddress(address) {
  const endpoint = `${baseURL}/addresses`;
}

/**
 * Make a PUT call to update an existing address.
 * @param {number} addressId : Id of given address for updating
 * @param {object} newAddress : updated address object
 */
function updateAddress(addressId, newAddress) {
  const endpoint = `${baseURL}/addresses/${addressId}`;
}

/**
 * Make a DELETE call to delete an existing address.
 * @param {number} addressId : Id of given address for deletion
 */
function deleteAddress(addressId) {
  const endpoint = `${baseURL}/addresses/${addressId}`;
}

/**
 * Retrieve all address types
 */
function getAddressTypes() {
  const endpoint = `${baseURL}/address-types`;
}

/**
 * Retrieive a specific address type with provided addressTypeId
 * @param {number} addressTypeId : ID of address type to retrieve
 */
function getAddressType(addressTypeId) {
  const endpoint = `${baseURL}/address-types/${addressTypeId}`;
}

/**
 * Add a new address type into the database
 * @param {string} addressType : New address type to add
 */
function addNewAddressType(addressType) {
  const endpoint = `${baseURL}/address-types`;
}

/**
 * Update an existing address type in the database
 * @param {number} addressTypeId : ID of address type to update
 * @param {object} addressType : Updated address type object
 */
function updateAddressType(addressTypeId, addressType) {
  const endpoint = `${baseURL}/address-types/${addressTypeId}`;
}

/**
 * Delete an existing address type from the database
 * @param {number} addressTypeId : ID of address type to delete
 */
function deleteAddressType(addressTypeId) {
  const endpoint = `${baseURL}/address-types/${addressTypeId}`;
}

/**
 * Retrieve all users from the database
 */
function getUsers() {
  const endpoint = `${baseURL}/users`;
}

/**
 * Retrieve a specific user with provided userId
 * @param {number} userId : ID of user to retrieve
 */
function getUserById(userId) {
  const endpoint = `${baseURL}/users/${userId}`;
}

/**
 * Search for users in the database
 * @param {string} query : A phrase or keyword to search the database
 */
function addNewUser(user) {
  const endpoint = `${baseURL}/users`;
}

/**
 * Update an existing user in the database
 * @param {number} userId : ID of user to update
 * @param {object} user : Updated user object
 */
function updateUser(userId, user) {
  const endpoint = `${baseURL}/users/${userId}`;
}

/**
 * Delete an existing user from the database
 * @param {number} userId : ID of user to delete
 * @param {object} user : User object to delete
 */
function deleteUser(userId, user) {
  const endpoint = `${baseURL}/users/${userId}`;
}
