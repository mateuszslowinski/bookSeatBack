import {ValidationError} from "./error";

export const validateEmail = (email: string) => {
    return String(email)
        .toLowerCase()
        .match(
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
}

export const validatePassword = (password: string) => {
    return (password).match(/^(?=[^A-Z\n]*[A-Z])(?=[^a-z\n]*[a-z])(?=[^0-9\n]*[0-9])(?=[^#?!@$%^&*\n-]*[#?!@$%^&*-]).{8,}$/)
}

export const validateLengthOfString = (value: string, min: number, max: number, descOfError: string) => {
    if (!value || typeof value !== "string" || value.length < min || value.length > max) {
        throw new ValidationError(descOfError)
    }
}

export const validateNumber = (value: number, descOfError: string) => {
    if (typeof value !== "number" || value <= 0) {
        throw new ValidationError(descOfError)
    }
}


export const validateForRestaurant = (name: string,
                                      description: string,
                                      street: string,
                                      buildingNumber: string,
                                      zipCode: string,
                                      city: string,
                                      availableSeats: number,
                                      lat: number,
                                      lon: number
) => {
    validateLengthOfString(name, 3, 40, 'The restaurant name must be a string of characters, cannot be empty and have' +
        ' a minimum of 3 and a maximum of 40 characters.');
    validateLengthOfString(description, 1, 2000, 'The restaurant description must be a string of characters, cannot' +
        ' be empty and have a minimum of 1 and a maximum of 2000 characters.');
    validateLengthOfString(street, 1, 100, 'The street address name must be a string of characters, cannot be' +
        ' empty and have a minimum of 1 and a maximum of 100 characters.');
    validateLengthOfString(buildingNumber, 1, 5, 'The building number address name must be a string of' +
        ' characters,cannot be empty and have a minimum of 1 and a maximum of 5 characters.');
    validateLengthOfString(zipCode, 1, 10, 'The zip code address name must be a string of characters,' +
        ' cannot be empty and have a minimum of 1 and a maximum of 10 characters.');
    validateLengthOfString(city, 1, 50, 'The city address name must be a string of characters,' +
        ' cannot be empty and have a minimum of 1 and a maximum of 50 characters.');
    validateNumber(availableSeats, 'Available spaces must be a number and be greater than 0');
    validateNumber(lat, 'Latitude must be a number and be greater than 0');
    validateNumber(lon, 'Longitude must be a number and be greater than 0');
}

export const validateForUserData = (username: string, firstName: string, lastName: string) => {
    validateLengthOfString(username, 3, 15, 'The user name must be a string of characters, cannot be empty and have a minimum of 3 and a maximum of 15 characters.')
    validateLengthOfString(firstName, 3, 30, 'The first name must be a string of characters, cannot be empty and' +
        ' have a' +
        ' minimum of 3 and a maximum of 30 characters.')
    validateLengthOfString(lastName, 3, 50, 'The last name must be a string of characters, cannot be empty and have' +
        ' a minimum of 3 and a maximum of 50 characters.')
}