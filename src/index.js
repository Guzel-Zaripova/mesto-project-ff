// useBuiltIns: "entry" означает, что вы будете импортировать полифилы в вашем коде.
// import "core-js/stable";

// добавление импорта главного файла стилей и скриптов js в dist/main.js
import "./styles/index.css";
import {
  initialCards,
  createCard,
  handleDeleteCard,
} from "./scripts/components/cards.js";
import { openModal, closeModal } from "./scripts/components/modal.js";

const placesContainer = document.querySelector(".places__list");

function appendCards() {
  for (const item of initialCards) {
    const card = createCard(item, handleDeleteCard);
    placesContainer.append(card);
  }
}

appendCards();

const openProfileEdit = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const formProfileEdit = document.forms["edit-profile"];
const nameProfileEdit = formProfileEdit.elements.name;
const descriptionProfileEdit = formProfileEdit.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const openNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");

const popupShowImage = document.querySelector(".popup_type_image");

// Открытие модального окна "Редактировать профиль" по нажатию кнопки "Редактировать"
// Заполнение полей значениями, указанными на странице
openProfileEdit.addEventListener("click", function () {
  nameProfileEdit.value = profileTitle.textContent;
  descriptionProfileEdit.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

// Обработчик «отправки» формы "Редактировать профиль"
function handleFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameProfileEdit.value;
  profileDescription.textContent = descriptionProfileEdit.value;
  closeModal(popupProfileEdit);
}
formProfileEdit.addEventListener("submit", handleFormSubmit);

// Открытие модального окна "Добавление карточки" по нажатию кнопки "Добавить"
openNewCard.addEventListener("click", function () {
  openModal(popupNewCard);
});
