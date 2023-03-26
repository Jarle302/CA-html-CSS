import { validateInput } from "./validateForm.js";

const testtwo = document.querySelector("#name--contact");
validateInput(
  (value) => {
    console.log(testtwo);
    return value.trim().length >= 2 ? true : false;
  },
  testtwo,
  "please input your name min 2 chars"
);

validateInput(
  (value) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) ? true : false;
  },
  document.querySelector("#email--contact"),
  "please input a valid email"
);
validateInput(
  (value) => {
    return value.trim().length >= 20 ? true : false;
  },
  document.querySelector("#message--contact"),
  "please input a message min 20 chars"
);
