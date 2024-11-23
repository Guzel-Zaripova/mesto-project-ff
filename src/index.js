// useBuiltIns: "entry" означает, что вы будете импортировать полифилы в вашем коде.
// import "core-js/stable";

// добавление импорта главного файла стилей и скриптов js в dist/main.js
import "./styles/index.css";
import { initialCards } from "./scripts/components/cards.js";
import {
  createCard,
  handleLikeCard,
  handleDeleteCard,
} from "./scripts/components/card.js";
import { openModal, closeModal } from "./scripts/components/modal.js";

const placesContainer = document.querySelector(".places__list");

function appendCards() {
  for (const item of initialCards) {
    const card = createCard(
      item,
      handleLikeCard,
      handleDeleteCard,
      handleViewCard
    );
    placesContainer.append(card);
  }
}

appendCards();

// Переменные модального окна "Редактировать профиль"
const openProfileEdit = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const formProfileEdit = document.forms["edit-profile"];
const nameProfileEdit = formProfileEdit.elements.name;
const descriptionProfileEdit = formProfileEdit.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Переменнные модального окна "Добавление карточки"
const openNewCard = document.querySelector(".profile__add-button");
const popupNewCard = document.querySelector(".popup_type_new-card");
const formNewCard = document.forms["new-place"];
const nameNewCard = formNewCard.elements["place-name"];
const linkNewCard = formNewCard.elements.link;

// Переменные модального окна "Просмотр изображения"
const popupViewImage = document.querySelector(".popup_type_image");
const popupCardImage = document.querySelector(
  ".popup_type_image .popup__image"
);
const popupCardCaption = document.querySelector(
  ".popup_type_image .popup__caption"
);

// Открытие модального окна "Редактировать профиль" по нажатию кнопки "Редактировать"
// Заполнение полей значениями, указанными на странице
openProfileEdit.addEventListener("click", function () {
  nameProfileEdit.value = profileTitle.textContent;
  descriptionProfileEdit.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

// Обработчик «отправки» формы "Редактировать профиль"
function handleProfileSubmit(event) {
  event.preventDefault();
  profileTitle.textContent = nameProfileEdit.value;
  profileDescription.textContent = descriptionProfileEdit.value;
  closeModal(popupProfileEdit);
}
formProfileEdit.addEventListener("submit", handleProfileSubmit);

// Открытие модального окна "Добавление карточки" по нажатию кнопки "Добавить"
openNewCard.addEventListener("click", function () {
  openModal(popupNewCard);
});

// Обработчик «отправки» формы "Добавление карточки"
// Удаление карточки изображения
function handleCardSubmit(event) {
  event.preventDefault();
  const name = nameNewCard.value;
  const link = linkNewCard.value;
  const card = createCard(
    { name, link },
    handleLikeCard,
    handleDeleteCard,
    handleViewCard
  );
  placesContainer.prepend(card);
  closeModal(popupNewCard);
  formNewCard.reset();
}
popupNewCard.addEventListener("submit", handleCardSubmit);

// Обработчик открытие модального окна "Просмотр изображения" по нажатию на карточку изображения
function handleViewCard(event) {
  popupCardImage.src = event.target.src;
  popupCardImage.alt = event.target.alt;
  popupCardCaption.textContent = event.target.alt;
  openModal(popupViewImage);
}

// Кнопка закрытия
function handlePopupCloseClick(event) {
  const popup = event.target.closest(".popup");
  closeModal(popup);
}
const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach(function (item) {
  item.addEventListener("click", handlePopupCloseClick);
});
