const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");

const popup = document.querySelector(".popup");
const popupCloseButton = document.querySelector(".popup__close-button");
const popupNameInput = document.querySelector(".popup__input[name='name']");
const popupDescriptionInput = document.querySelector(
  ".popup__input[name='description']"
);

function openPopup() {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popup.classList.remove("popup_opened");
}

profileEditButton.addEventListener("click", function (event) {
  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
  openPopup();
});

popup.addEventListener("click", function (event) {
  if (event.target == popup || event.target == popupCloseButton) {
    // We clicked the backdrop, not the content
    closePopup();
  }
});
popupCloseButton.addEventListener("click", closePopup);

const popupSaveButton = document.querySelector(".popup__save-button");
const popupForm = document.querySelector(".popup__form");

popupForm.addEventListener("submit", function (event) {
  event.preventDefault();
  new FormData(popupForm);
});

popupForm.addEventListener("formdata", function (event) {
  event.preventDefault();
  const data = event.formData;
  const name = data.get("name");
  const description = data.get("description");

  profileName.textContent = name;
  profileDescription.textContent = description;

  popup.classList.remove("popup_opened");
});
