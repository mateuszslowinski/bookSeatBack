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
