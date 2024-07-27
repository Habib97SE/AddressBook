export class Validation {
    /**
     * Validate email address
     * @param {string} email : Email address to validate
     */
    validateEmail(email) {
        const emailRegex = /\S+@\S+\.\S+/;
        return emailRegex.test(email);
    }

    /**
     * Validate phone number
     * @param {string} phone : Phone number to validate
     */
    validatePhone(phone) {
        // check if phone number contains only digits and optional spaces, hyphens, and parentheses and plus sign
        const phoneRegex = /^[\d\s-()+]+$/;
        return phoneRegex.test(phone);
    }

    /**
     * Validate name
     * @param {string} name : Name to validate
     */
    validateName(name) {
        const nameRegex = /^[a-zA-Z]+$/;
        return nameRegex.test(name);
    }

    /**
     * Validate address
     * @param {string} address : Address to validate
     */
    validateAddress(address) {
        // Address can contain spaces, hyphens, and apostrophes, azAZ and 0-9 åäöÅÄÖ
        const addressRegex = /^[a-zA-Z0-9\s,'-åäöÅÄÖ]*$/;
        return addressRegex.test(address);
    }

    /**
     * Validate city
     * @param {string} city : City to validate
     */
    validateCity(city) {
        // City name can contain spaces, hyphens, and apostrophes, azAZ
        const cityRegex = /^[a-zA-Z\s,'-åäöÅÄÖ]*$/;
        return cityRegex.test(city);
    }

    /**
     * Validate state
     * @param {string} state : State to validate
     */
    validateState(state) {
        const stateRegex = /^[a-zA-Z\s,'-åäöÅÄÖ]*$/;
        return stateRegex.test(state);
    }

    /**
     * Validate zip code
     * @param {string} zip : Zip code to validate
     */
    validateZip(zip) {
        // zip code can be 3 digits with optional space and 2 more digits e.g. 123 45 or 12345
        const zipRegex = /^\d{3}\s?\d{2}$/;
        return zipRegex.test(zip);
    }

    validateUser(user) {
        if (!this.validateEmail(user.email)) {
            this.showMessage("addNewUserMesssageBox", "Invalid email address", [
                "alert",
                "alert-danger",
            ]);
            return false;
        }
        if (!this.validatePhone(user.mobilePhone)) {
            this.showMessage("addNewUserMesssageBox", "Invalid phone number", [
                "alert",
                "alert-danger",
            ]);
            return false;
        }
        if (!this.validateName(user.firstName)) {
            this.showMessage("addNewUserMesssageBox", "Invalid first name", [
                "alert",
                "alert-danger",
            ]);
            return false;
        }
        if (!this.validateName(user.lastName)) {
            this.showMessage("addNewUserMesssageBox", "Invalid last name", [
                "alert",
                "alert-danger",
            ]);
            return false;
        }
        return true;
    }

    /**
     *
     * @param {object} address : Address object to be validated, the following properties are rquired to be checked: addressOne, addressTwo, postalCode, city, state, country, userId, addressTypeId, phoneNumber
     */
    validateAddressData(address) {
        console.log(address);
        if (!this.validateAddress(address.addressOne)) {
            console.log("Invalid address one");
            console.log(address.addressOne);
            this.showMessage("addNewAddressMessageBox", "Invalid address", [
                "alert",
                "alert-danger",
            ]);
            return false;
        }
        if (!this.validateAddress(address.addressTwo)) {
            console.log("Invalid address two");
            console.log(address.addressTwo);
            this.showMessage("addNewAddressMessageBox", "Invalid address", [
                "alert",
                "alert-danger",
            ]);
            return false;
        }
        if (!this.validateZip(address.postalCode)) {
            console.log("Invalid zip code");
            console.log(address.postalCode);
            this.showMessage("addNewAddressMessageBox", "Invalid zip code", [
                "alert",
                "alert-danger",
            ]);
            return false;
        }
        if (!this.validateCity(address.city)) {
            console.log("Invalid city");
            console.log(address.city);
            this.showMessage("addNewAddressMessageBox", "Invalid city", [
                "alert",
                "alert-danger",
            ]);
            return false;
        }
        if (!this.validateState(address.state)) {
            console.log("Invalid state");
            console.log(address.state);
            this.showMessage("addNewAddressMessageBox", "Invalid state", [
                "alert",
                "alert-danger",
            ]);
            return false;
        }
        if (!this.validateName(address.country)) {
            console.log("Invalid country");
            console.log(address.country);
            this.showMessage("addNewAddressMessageBox", "Invalid country", [
                "alert",
                "alert-danger",
            ]);
            return false;
        }
        if (!this.validatePhone(address.phoneNumber)) {
            console.log("Invalid phone number");
            console.log(address.phoneNumber);
            this.showMessage(
                "addNewAddressMessageBox",
                "Invalid phone number",
                ["alert", "alert-danger"]
            );
            return false;
        }
        return true;
    }

    /**
     *
     * @param {string} messageBoxId : ID of the message box to display the message
     * @param {string} message : Message to display in the message box
     * @param {Array} classNames : Array of classes to add to the message box
     */
    showMessage(messageBoxId, message, classNames = []) {
        // show message
        const messageBox = document.getElementById(messageBoxId);
        messageBox.textContent = message;
        messageBox.classList.add(...classNames);
    }
}
