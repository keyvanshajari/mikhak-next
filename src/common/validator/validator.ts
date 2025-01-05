import Joi from "joi";
import { EmailRegex } from "../constants/constants";
import ErrorMessages from "../constants/error-messages";
import { PhoneNumberUtil } from "google-libphonenumber";

export const phoneUtil = PhoneNumberUtil.getInstance();

export const isPhone = (username: string) => {
  try {
    const phone = phoneUtil.parse(username);
    return phoneUtil.isValidNumber(phone);
  } catch (error) {
    return false;
  }
};

const phoneValidator = (value: any, helpers: any) => {
  try {
    const isValidNumber = phoneUtil.isValidNumber(value);
    if (isValidNumber) {
      return value;
    }

    return helpers.error("any.invalid");
  } catch (error) {
    return helpers.error("any.invalid");
  }
};

export const UsernameSchemaError = Joi.object({
  username: Joi.any()
    .required()
    .messages({
      "string.empty": "ورود نام کاربری اجباری است.",
      "any.required": "ورود نام کاربری اجباری است.",
    })
    .custom((value, helpers) => {
      if (EmailRegex.test(value)) {
        return value;
      }
      const number = phoneUtil.parse(value);
      return phoneValidator(number, helpers);
    })
    .messages({
      "any.invalid": ErrorMessages.username.notValid,
    }),
});

export const UsernameWithOtpSchemaError = Joi.object({
  username: Joi.any()
    .required()
    .messages({
      "string.empty": "ورود نام کاربری اجباری است.",
      "any.required": "ورود نام کاربری اجباری است.",
    })
    .custom((value, helpers) => {
      if (EmailRegex.test(value)) {
        return value;
      }
      const number = phoneUtil.parse(value);
      return phoneValidator(number, helpers);
    })
    .messages({
      "any.invalid": ErrorMessages.username.notValid,
    }),
  otp: Joi.number().required().min(100000).max(999999).message(ErrorMessages.otp),
});

export const PhoneSchemaError = Joi.object({
  phone: Joi.any().required().custom(phoneValidator).messages({
    "string.empty": ErrorMessages.phone.required,
    "any.required": ErrorMessages.phone.required,
    "any.invalid": ErrorMessages.phone.notValid,
    "string.pattern.base": ErrorMessages.phone.notValid,
  }),
});

export const EmailSchemaError = Joi.object({
  email: Joi.string().required().pattern(EmailRegex).messages({
    "string.empty": ErrorMessages.email.required,
    "any.required": ErrorMessages.email.required,
    "string.pattern.base": ErrorMessages.email.notValid,
  }),
});

export const OtpSchemaError = Joi.object({
  otp: Joi.number().required().min(100000).max(999999).messages({
    "number.min": ErrorMessages.otp,
    "number.max": ErrorMessages.otp,
    "number.required": ErrorMessages.otp,
  }),
});

export const PhoneAndOtpSchemaError = Joi.object({
  phone: Joi.any().required().custom(phoneValidator).messages({
    "string.empty": ErrorMessages.phone.required,
    "any.required": ErrorMessages.phone.required,
    "any.invalid": ErrorMessages.phone.notValid,
    "string.pattern.base": ErrorMessages.phone.notValid,
  }),
  otp: Joi.number().required().min(100000).max(999999).message(ErrorMessages.otp),
});

export const EmailAndOtpSchemaError = Joi.object({
  email: Joi.string().required().pattern(EmailRegex).messages({
    "string.empty": ErrorMessages.email.required,
    "any.required": ErrorMessages.email.required,
    "string.pattern.base": ErrorMessages.email.notValid,
  }),
  otp: Joi.number().required().min(100000).max(999999).message(ErrorMessages.otp),
});

export const PersonalInformationSchemaError = Joi.object({
  firstname: Joi.string().required().messages({
    "string.empty": ErrorMessages.firstname.required,
    "any.required": ErrorMessages.firstname.required,
  }),
  lastname: Joi.string().required().messages({
    "string.empty": ErrorMessages.lastname.required,
    "any.required": ErrorMessages.lastname.required,
  }),
  nationalCode: Joi.string().required().messages({
    "string.empty": ErrorMessages.nationalCode.required,
    "any.required": ErrorMessages.nationalCode.required,
  }),
  birthday: Joi.date().required().messages({
    "string.empty": ErrorMessages.birthday.required,
    "any.required": ErrorMessages.birthday.required,
  }),
});

export const IrNationalCodeValidator = (val: string): boolean => {
  var allDigitEqual = [
    "0000000000",
    "1111111111",
    "2222222222",
    "3333333333",
    "4444444444",
    "5555555555",
    "6666666666",
    "7777777777",
    "8888888888",
    "9999999999",
  ];
  const codeMelliPattern = /^([0-9]{10})+$/;
  if (allDigitEqual.indexOf(val) != -1 || !codeMelliPattern.test(val)) {
    return false;
  }
  var chArray = Array.from(val);
  var num0 = parseInt(chArray[0]) * 10;
  var num2 = parseInt(chArray[1]) * 9;
  var num3 = parseInt(chArray[2]) * 8;
  var num4 = parseInt(chArray[3]) * 7;
  var num5 = parseInt(chArray[4]) * 6;
  var num6 = parseInt(chArray[5]) * 5;
  var num7 = parseInt(chArray[6]) * 4;
  var num8 = parseInt(chArray[7]) * 3;
  var num9 = parseInt(chArray[8]) * 2;
  var a = parseInt(chArray[9]);
  var b = num0 + num2 + num3 + num4 + num5 + num6 + num7 + num8 + num9;
  var c = b % 11;
  return (c < 2 && a == c) || (c >= 2 && 11 - c == a);
};
