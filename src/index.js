// useBuiltIns: "entry" означает, что вы будете импортировать полифилы в вашем коде.
// import "core-js/stable";

// добавление импорта главного файла стилей и скриптов js в dist/main.js
import "./styles/index.css";
import {
  createCard,
  handleLikeCard,
  handleDeleteCard,
} from "./scripts/components/card.js";
import { openModal, closeModal } from "./scripts/components/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/components/validation.js";
import { api } from "./scripts/api.js";

const placesContainer = document.querySelector(".places__list");

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
  const profileForm = popupProfileEdit.querySelector(
    validationConfig.formSelector
  );
  clearValidation(profileForm, validationConfig);
  nameProfileEdit.value = profileTitle.textContent;
  descriptionProfileEdit.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

// Обработчик «отправки» формы "Редактировать профиль"
async function handleProfileSubmit(event) {
  event.preventDefault();
  const button = popupProfileEdit.querySelector(".popup__button");
  const buttonText = button.textContent;
  button.textContent = "Сохранение...";
  button.disabled = true;
  button.classList.add(validationConfig.inactiveButtonClass);

  const name = nameProfileEdit.value;
  const about = descriptionProfileEdit.value;
  await api.updateUser(name, about);

  profileTitle.textContent = name;
  profileDescription.textContent = about;
  closeModal(popupProfileEdit);

  button.textContent = buttonText;
  button.disabled = false;
  button.classList.remove(validationConfig.inactiveButtonClass);
}
formProfileEdit.addEventListener("submit", handleProfileSubmit);

// Открытие модального окна "Добавление карточки" по нажатию кнопки "Добавить"
openNewCard.addEventListener("click", function () {
  const profileForm = popupNewCard.querySelector(validationConfig.formSelector);
  clearValidation(profileForm, validationConfig);
  openModal(popupNewCard);
  nameNewCard.value = "";
  linkNewCard.value = "";
});

// Обработчик «отправки» формы "Добавление карточки"
// Удаление карточки изображения
async function handleCardSubmit(event) {
  event.preventDefault();
  const name = nameNewCard.value;
  const link = linkNewCard.value;
  const data = await api.addNewCard(name, link);
  const _id = data._id;
  const owner = data.owner;
  const currentUserId = owner._id;

  const card = createCard(
    { name, link, _id, owner },
    handleLikeCard,
    handleDeleteCard,
    handleViewCard,
    currentUserId
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

enableValidation(validationConfig);

async function initPage() {
  const [user, cards] = await Promise.all([
    api.getCurrentUser(),
    api.getCards(),
  ]);
  initCurrentUser(user);
  const currentUserId = user._id;
  appendCards(cards, currentUserId);
}

// Заполнение информации о пользователе данными, полученными с сервера
function initCurrentUser(user) {
  const profileImage = document.querySelector(".profile__image");
  profileImage.style.backgroundImage = `url("${user.avatar}")`;
  const profileTitle = document.querySelector(".profile__title");
  profileTitle.textContent = user.name;
  const profileDescription = document.querySelector(".profile__description");
  profileDescription.textContent = user.about;
}

function appendCards(cards, currentUserId) {
  for (const item of cards) {
    const card = createCard(
      item,
      handleLikeCard,
      handleDeleteCard,
      handleViewCard,
      currentUserId
    );
    placesContainer.append(card);
  }
}

initPage();
