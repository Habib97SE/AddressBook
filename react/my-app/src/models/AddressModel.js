import axios from "axios";

class AddressModel {
    constructor() {
        this.baseUrl = "http://localhost:8080/api/v1/addresses";
    }

    async getAddresses() {
        const response = await axios.get(this.baseUrl);
        return response.data;
    }

    async getAddressById(id) {
        const response = await axios.get(this.baseUrl + id);
        return response.data;
    }

    async createAddress(address) {
        const response = await axios.post(
            (url = this.baseUrl),
            (data = address)
        );
        return response.data;
    }

    async updateAddress(address, id) {
        const response = await axios.put(
            (url = this.baseUrl + id),
            (data = address)
        );
        return response.data;
    }

    async deleteAddress(id) {
        const response = await axios.delete((url = this.baseUrl + id));
        return response.data;
    }
}

export default AddressModel;
