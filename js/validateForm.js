export function validateInput(
  callback,
  domEl,
  errMessage,
  succMessage = ` <p class="success-message" ><i class="fa-regular fa-square-check";"></i> Done <p>`
) {
  const errorDiv = document.createElement("span");
  errorDiv.classList.add("error");
  domEl.insertAdjacentElement("afterEnd", errorDiv);
  domEl.addEventListener("blur", () => {
    errorDiv.innerHTML = callback(domEl.value) ? succMessage : errMessage;
  });
}
