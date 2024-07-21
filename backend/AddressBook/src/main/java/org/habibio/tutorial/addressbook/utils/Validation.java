package org.habibio.tutorial.addressbook.utils;

import org.habibio.tutorial.addressbook.DTO.AddressRequest;
import org.habibio.tutorial.addressbook.DTO.UserRequest;

import java.time.LocalDate;
import java.time.format.DateTimeParseException;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Map;
import java.util.Set;

public class Validation {
    private final Set<String> COUNTRIES = new HashSet<>(Arrays.asList(
            "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Argentina", "Armenia", "Australia",
            "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium",
            "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei",
            "Bulgaria", "Burkina Faso", "Burundi", "Cabo Verde", "Cambodia", "Cameroon", "Canada", "Central African Republic",
            "Chad", "Chile", "China", "Colombia", "Comoros", "Congo, Democratic Republic of the", "Congo, Republic of the",
            "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", "Denmark", "Djibouti", "Dominica", "Dominican Republic",
            "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", "Eritrea", "Estonia", "Eswatini", "Ethiopia",
            "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada",
            "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland", "India", "Indonesia",
            "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati",
            "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia",
            "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives", "Mali",
            "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", "Micronesia", "Moldova", "Monaco", "Mongolia",
            "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands", "New Zealand",
            "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", "Oman", "Pakistan", "Palau", "Panama", "Papua New Guinea",
            "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis",
            "Saint Lucia", "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia",
            "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia",
            "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", "Taiwan",
            "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey",
            "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", "Uruguay",
            "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
    ));

    private final String EMAIL_REGEX = "^[a-zA-Z0-9+_.-]+[a-zA-Z0-9_.-]*@[a-zA-Z0-9]+([a-zA-Z0-9-]*[a-zA-Z0-9])?(\\.[a-zA-Z]{2,})+$";
    private final String PHONE_REGEX = "^\\+?[0-9]{1,3}[0-9]{3,14}$";
    private final String NAME_REGEX = "^[a-zA-Z]+([\\s-'][a-zA-Z]+)*[.]?$";
    private final String STATE_REGEX = "^[a-zA-Z]+([\\s-'][a-zA-Z]+)*[.]?$";
    private final String CITY_REGEX = "^[a-zA-Z]+([\\s-'][a-zA-Z]+)*[.]?$";
    private static final String ADDRESS_REGEX = "^[a-zA-Z0-9\\s,.'-]{3,}$";

    public boolean isEmailValid(String email) {
        email = email.trim().toLowerCase();
        return email.matches(EMAIL_REGEX);
    }

    public boolean isNameValid(String name) {
        return name.matches(NAME_REGEX);
    }

    public boolean isCountryValid(String country) {
        country = country.trim().toLowerCase();
        // make first character uppercase
        country = country.substring(0, 1).toUpperCase() + country.substring(1);

        return COUNTRIES.contains(country);
    }

    public boolean isStateValid(String state) {
        return state.matches(STATE_REGEX);
    }

    public boolean isAddressValid(String address) {
        return address.matches(ADDRESS_REGEX);
    }

    public boolean isCityValid(String city) {
        return city.matches(CITY_REGEX);
    }


    public boolean isDateValid(String date) {
        try {
            LocalDate.parse(date);
            return true;
        } catch (DateTimeParseException ex) {
            return false;
        }
    }

    public boolean isPhoneValid(String phone) {
        return phone.matches(PHONE_REGEX);
    }

    public boolean isUserRequestValid(UserRequest userRequest) {
        return (isNameValid(userRequest.getFirstName()) &&
                isNameValid(userRequest.getLastName()) &&
                isEmailValid(userRequest.getEmail()) &&
                isPhoneValid(userRequest.getMobilePhone()));

    }

    public boolean isAddressRequestValid(AddressRequest addressRequest) {
        return (isAddressValid(addressRequest.getAddressOne()) &&
                isAddressValid(addressRequest.getAddressTwo()) &&
                isCityValid(addressRequest.getCity()) &&
                isStateValid(addressRequest.getState()) &&
                isCountryValid(addressRequest.getCountry()) &&
                isPhoneValid(addressRequest.getPhoneNumber()));
    }


}
