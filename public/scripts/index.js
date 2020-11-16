// Initial page setup
const cardsSection = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template");

const initialCards = [
  {
    name: "Yosemite Valley",
    link: "https://code.s3.yandex.net/web-code/yosemite.jpg",
  },
  {
    name: "Lake Louise",
    link: "https://code.s3.yandex.net/web-code/lake-louise.jpg",
  },
  {
    name: "Bald Mountains",
    link: "https://code.s3.yandex.net/web-code/bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://code.s3.yandex.net/web-code/latemar.jpg",
  },
  {
    name: "Vanoise National Park",
    link: "https://code.s3.yandex.net/web-code/vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://code.s3.yandex.net/web-code/lago.jpg",
  },
];

function createCardNode(cardDatum) {
  const cardNode = cardTemplate.content.cloneNode(true).children[0];
  cardNode.querySelector(".card__title").textContent = cardDatum.name;
  cardNode.querySelector(".card__image").setAttribute("src", cardDatum.link);
  const deleteButton = cardNode.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", () => cardNode.remove());
  return cardNode;
}

function populateCards(cardData) {
  const cardNodes = cardData.map(createCardNode);
  cardsSection.append(...cardNodes);
}

populateCards(initialCards);

// Set up event listeners

const profileName = document.querySelector(".profile__name");
const profileDescription = document.querySelector(".profile__description");
const profileEditButton = document.querySelector(".profile__edit-button");

const popups = document.querySelectorAll(".popup");
const editProfilePopup = document.querySelector("#profile-edit-popup");
const addCardPopup = document.querySelector("#add-card-popup");

const popupCloseButtons = document.querySelectorAll(".popup__close-button");
const popupNameInput = document.querySelector(".popup__input[name='name']");
const popupDescriptionInput = document.querySelector(
  ".popup__input[name='description']"
);

function openPopup(popup) {
  popup.classList.add("popup_opened");
}

function closePopup() {
  popups.forEach((popup) => popup.classList.remove("popup_opened"));
}

profileEditButton.addEventListener("click", function (event) {
  popupNameInput.value = profileName.textContent;
  popupDescriptionInput.value = profileDescription.textContent;
  openPopup(editProfilePopup);
});

popups.forEach((popup) =>
  popup.addEventListener("click", closeIfClickedOutside(popup))
);
function closeIfClickedOutside(popup) {
  return function (event) {
    if (
      event.target == popup ||
      Array.from(popupCloseButtons).includes(event.target)
    ) {
      // We clicked the backdrop or X button, not the content
      closePopup();
    }
  };
}

popupCloseButtons.forEach((popup) =>
  popup.addEventListener("click", closePopup)
);

const popupSaveButtons = document.querySelectorAll(".popup__save-button");
const popupForms = document.querySelectorAll(".popup__form");
const profileEditForm = document.querySelector(
  "#profile-edit-popup .popup__form"
);
const addCardForm = document.querySelector("#add-card-popup .popup__form");
const addCardInputs = addCardForm.querySelectorAll(".popup__input");

popupForms.forEach((popupForm) =>
  popupForm.addEventListener("submit", function (event) {
    event.preventDefault();
    new FormData(popupForm);
  })
);

profileEditForm.addEventListener("formdata", function (event) {
  event.preventDefault();
  const data = event.formData;
  const name = data.get("name");
  const description = data.get("description");

  profileName.textContent = name;
  profileDescription.textContent = description;

  closePopup();
});

addCardForm.addEventListener("formdata", function (event) {
  event.preventDefault();
  const data = event.formData;
  const title = data.get("title");
  const url = data.get("url");

  // initialCards.unshift({
  //   name: title,
  //   link: url,
  // });

  const newCardNode = createCardNode({
    name: title,
    link: url,
  });
  cardsSection.prepend(newCardNode);

  closePopup();
});

const addButton = document.querySelector(".profile__add-button");
const newCardPopup = addButton.addEventListener("click", function (event) {});

addButton.addEventListener("click", (event) => {
  openPopup(addCardPopup);
  addCardInputs.forEach((input) => {
    input.value = "";
  });
});

// Delete button

// Gets hooked up in createCardNode
function deleteCard(event) {
  event.currentTarget.closest(".card").remove();
}
