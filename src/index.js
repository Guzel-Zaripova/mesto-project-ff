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

const popupProfileEdit = document.querySelector(".popup_type_edit");
const buttonProfileEdit = document.querySelector(".profile__edit-button");
const formProfileEdit = document.forms["edit-profile"];
const nameProfileEdit = formProfileEdit.elements.name;
const descriptionProfileEdit = formProfileEdit.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

const popupNewCard = document.querySelector(".popup_type_new-card");
const popupShowImage = document.querySelector(".popup_type_image");
const buttonPopupClose = document.querySelector(".popup__close");

// openModal(popupProfileEdit);
// closeModal(popupProfileEdit);

// Открытие модального окна "Редактировать профиль" по нажатию кнопки "Редактировать"
// Заполнение полей значениями, указанными на странице
buttonProfileEdit.addEventListener("click", function (event) {
  nameProfileEdit.value = profileTitle.textContent;
  descriptionProfileEdit.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

// Открытие модального окна "Редактировать профиль" по клике по крестику в правом верхнем углу
buttonPopupClose.addEventListener("click", function (event) {
  closeModal(popupProfileEdit);
});

// Обработчик «отправки» формы
function handleFormSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameProfileEdit.value;
  profileDescription.textContent = descriptionProfileEdit.value;
  closeModal(popupProfileEdit);
}

formProfileEdit.addEventListener("submit", handleFormSubmit);
