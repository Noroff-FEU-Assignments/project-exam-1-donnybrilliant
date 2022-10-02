const form = document.querySelector("form");
const nameInput = document.querySelector("input#your-name");
const email = document.querySelector("input#your-email");
const subject = document.querySelector("input#your-subject");
const message = document.querySelector("textarea#your-message");
const button = document.querySelector("button#submit");

function validateEmail(email) {
  const regEx = /\S+@\S+\.\S+/;
  const patternMatches = regEx.test(email);
  return patternMatches;
}

form.addEventListener("keyup", function () {
  if (
    nameInput.value.trim().length > 5 &&
    subject.value.trim().length > 15 &&
    message.value.trim().length > 25 &&
    validateEmail(email.value.trim())
  ) {
    button.disabled = false;
  } else {
    button.disabled = true;
  }
});

const sendForm = (event) => {
  event.preventDefault();

  const form = event.target,
    { action, method } = form,
    body = new FormData(form);

  fetch(action, {
    method,
    body,
  })
    .then((response) => response.json())
    .then((response) => {
      form.innerHTML += response.message;
      form.reset();
    })
    .catch((error) => {
      form.innerHTML +=
        "There was an error.. See the console for more information.";
      console.log(error);
    });
};

form.addEventListener("submit", sendForm);

/* async function sendForm() {
  const url =
    "https://vierweb.no/project-exam-1/wp-json/contact-form-7/v1/contact-forms/162/feedback";
  try {
    const response = await fetch(url, {
      method: "POST",
      body: new FormData(form),
    });
    console.log(response);
  } catch (error) {
    blogContainer.innerHTML =
      "There was an error.. See the console for more information.";
    console.log(error);
  }
}

form.addEventListener("submit", function (event) {
  event.preventDefault();
  sendForm();
  form.innerHTML = "";
  form.innerText = "Your message has been sent.";
  form.reset();
});
 */
