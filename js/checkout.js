import { validateInput } from "./validateForm.js";

const validationEmail = document.querySelector("#email--checkout");
const validationFirstName = document.querySelector("#first-name--checkout");
const validationLastName = document.querySelector("#last-name--checkout");
const validationShippingAdress = document.querySelector(
  "#shipping-adress--checkout"
);
const validationCreditCard = document.querySelector(
  "#creditcardnumber--checkout"
);
const validationCardOwner = document.querySelector("#card-owner--checkout");
const validationCardExpires = document.querySelector("#expires--checkout");
const validationCvc = document.querySelector("#cvc--checkout");

validateInput(
  (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : false;
  },
  validationEmail,
  "please input a valid email"
);

validateInput(
  (value) => {
    return value.trim().length >= 2 ? true : false;
  },
  validationFirstName,
  "Type in first name min 2 characters"
);
validateInput(
  (value) => {
    return value.trim().length >= 2 ? true : false;
  },
  validationLastName,
  "Type in last name min 2 characters"
);
validateInput(
  (value) => {
    return value.trim().length >= 20 ? true : false;
  },
  validationShippingAdress,
  "Type in adress min 20 characters"
);
validateInput(
  (value) => {
    return value.trim().length === 16 ? true : false;
  },
  validationCreditCard,
  "Type in a valid creditcardnumber"
);

validateInput(
  (value) => {
    return value.trim().length >= 2 ? true : false;
  },
  validationCardOwner,
  "Type in the name on the creditcard"
);
validateInput(
  (value) => {
    return value.trim().length === 4 ? true : false;
  },
  validationCardExpires,
  "Type in when your card expires format ddmm"
);
validateInput(
  (value) => {
    return value.trim().length === 3 ? true : false;
  },
  validationCvc,
  "Type in your cvc 3 digits"
);
