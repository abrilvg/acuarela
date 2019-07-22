/**
 * Validate if values follow pattern
 */
const ValidatorHelper = {
    notEmptyValue: () => {
        return {
            isValid: (value) => {
                return value? true: false;
            },
            getMessage: () => 'Not allowed to be an empty value'
        }
    },
    //strings
    notEmptyText: () => {
        return {
            isValid: (value) => {
                return value !== "";
            },
            getMessage: () => 'Not allowed to be an empty string'
        }
    },
    isString : () => {
        return {
            isValid: (value) => {
                let type = typeof value;
                return type === "string";
            },
            getMessage: () => `Only allowed text in here`
        }
    },
    maxLength: (max) => {
        return {
            isValid: (value) => {
                return value? value.length <= max: true;
            },
            getMessage: () => `Not allowed size to be more than ${max} characteres`
        }
    },
    minLength: (min) => {
        return {
            isValid: (value) => {
                return value? value.length >= min: true;
            },
            getMessage: () => `Not allowed size to be less than ${min} characteres`
        }
    },
    //numbers
    isNumber: () => {
        return {
            isValid: (value) => {
                let type = typeof parseInt(value);
                return value? type === "number": true;
            },
            getMessage: () => `Only allowed numbers in here`
        }
    },
    max: (max) => {
        return {
            isValid: (value) => {
                return value? parseInt(value) <= max: true;
            },
            getMessage: () => `Not allowed number to be more than ${max}`
        }
    },
    min: (min) => {
        return {
            isValid: (value) => {
                return value? parseInt(value) >= min: true;
            },
            getMessage: () => `Not allowed number to be less than ${min}`
        }
    },
    //email
    matchEmail: () => {
        return {
            isValid: (value) => {
                return /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/.test(value);
            },
            getMessage: () => `Email should match pattern example@gmail.com`
        }
    },
    //argentina phone number pattern
    matchPhoneNumber: () => {
        return {
            isValid: (value) => {
                return value? /^((\(?\d{3}\)? \d{4})|(\(?\d{4}\)? \d{3})|(\(?\d{5}\)? \d{2}))-\d{4}$/.test(value) : true;
            },
            getMessage: () => `
                Phone number should follow pattern
                Area Code could be 3 to 5 digits
                Prefix could be 2 to 4 digits.
                Area Code + Prefix is 7 digits long.
                Sufix is always 4 digits long
                Total digits are 11. Example (011) 4740-5000
            `
        }
    },
    //mix
    matchSome: (items) => {
        return {
            isValid: (value) => {
                return items.find(item => item === value) != null;
            },
            getMessage: () => `Not allowed other countries which are not on the list`
        }
    },
    //validate all list of validators
    validate: (value, validators) => {
        const errors = [];
        validators.forEach(validator => {
            if(!validator.isValid(value)) {
                errors.push(validator.getMessage());
            }
        });
        return errors;
    }
};

export default ValidatorHelper;
