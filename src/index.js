// useBuiltIns: "entry" означает, что вы будете импортировать полифилы в вашем коде.
// import "core-js/stable";

// добавление импорта главного файла стилей и скриптов js в dist/main.js
import "./styles/index.css";
import {
  createCard,
  handleLikeCard,
  handleDeleteCard,
} from "./scripts/components/card.js";
import {
  openModal,
  closeModal,
  handleModalClose,
} from "./scripts/components/modal.js";
import {
  enableValidation,
  clearValidation,
  validationConfig,
} from "./scripts/components/validation.js";
import { api } from "./scripts/api.js";
import { renderLoading } from "./scripts/components/utils.js";

const placesContainer = document.querySelector(".places__list");

// Переменные модального окна "Редактировать профиль"
const openProfileEdit = document.querySelector(".profile__edit-button");
const popupProfileEdit = document.querySelector(".popup_type_edit");
const formProfileEdit = document.forms["edit-profile"];
const nameProfileEdit = formProfileEdit.elements.name;
const descriptionProfileEdit = formProfileEdit.elements.description;
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");

// Переменные модального окна "Обновить аватар"
const profileImage = document.querySelector(".profile__image");
const popupAvatarEdit = document.querySelector(".popup_update_avatar");
const formAvatarEdit = document.forms["update-avatar"];
const linkAvatarEdit = formAvatarEdit.elements.link;

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
  clearValidation(formProfileEdit, validationConfig);
  nameProfileEdit.value = profileTitle.textContent;
  descriptionProfileEdit.value = profileDescription.textContent;
  openModal(popupProfileEdit);
});

// Обработчик «отправки» формы "Редактировать профиль"
async function handleProfileSubmit(event) {
  event.preventDefault();
  const button = event.submitter;
  const buttonText = button.textContent;
  try {
    renderLoading(true, button);

    const name = nameProfileEdit.value;
    const about = descriptionProfileEdit.value;
    await api.updateUser(name, about);

    profileTitle.textContent = name;
    profileDescription.textContent = about;
    closeModal(popupProfileEdit);
  } catch (error) {
    console.error("Произошла ошибка:", error);
  } finally {
    renderLoading(false, button, buttonText);
  }
}
formProfileEdit.addEventListener("submit", handleProfileSubmit);

// Открытие модального окна "Обновить аватар" по нажатию на аватарку
profileImage.addEventListener("click", function () {
  clearValidation(formAvatarEdit, validationConfig);
  openModal(popupAvatarEdit);
  linkAvatarEdit.value = "";
});

// Обработчик «отправки» формы "Обновить аватар"
async function handleAvatarSubmit(event) {
  event.preventDefault();
  const button = event.submitter;
  const buttonText = button.textContent;
  try {
    renderLoading(true, button);

    const avatar = linkAvatarEdit.value;
    const user = await api.updateAvatar(avatar);

    profileImage.style.backgroundImage = `url("${user.avatar}")`;
    closeModal(popupAvatarEdit);
  } catch (error) {
    console.error("Произошла ошибка:", error);
  } finally {
    renderLoading(false, button, buttonText);
  }
}
formAvatarEdit.addEventListener("submit", handleAvatarSubmit);

// Открытие модального окна "Добавление карточки" по нажатию кнопки "Добавить"
openNewCard.addEventListener("click", function () {
  formNewCard.reset();
  clearValidation(formNewCard, validationConfig);
  openModal(popupNewCard);
});

// Обработчик «отправки» формы "Добавление карточки"
// Удаление карточки изображения
async function handleCardSubmit(event) {
  event.preventDefault();
  const button = event.submitter;
  const buttonText = button.textContent;
  try {
    renderLoading(true, button);

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
      currentUserId,
      api
    );
    placesContainer.prepend(card);
    closeModal(popupNewCard);
    formNewCard.reset();
  } catch (error) {
    console.error("Произошла ошибка:", error);
  } finally {
    renderLoading(false, button, buttonText);
  }
}
formNewCard.addEventListener("submit", handleCardSubmit);

// Обработчик открытие модального окна "Просмотр изображения" по нажатию на карточку изображения
function handleViewCard(name, link) {
  popupCardImage.src = link;
  popupCardImage.alt = name;
  popupCardCaption.textContent = name;
  openModal(popupViewImage);
}

const closeButtons = document.querySelectorAll(".popup__close");
closeButtons.forEach(function (item) {
  item.addEventListener("click", handleModalClose);
});

enableValidation(validationConfig);

async function initPage() {
  try {
    const [user, cards] = await Promise.all([
      api.getCurrentUser(),
      api.getCards(),
    ]);
    initCurrentUser(user);
    const currentUserId = user._id;
    appendCards(cards, currentUserId);
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

// Заполнение информации о пользователе данными, полученными с сервера
function initCurrentUser(user) {
  profileImage.style.backgroundImage = `url("${user.avatar}")`;
  profileTitle.textContent = user.name;
  profileDescription.textContent = user.about;
}

function appendCards(cards, currentUserId) {
  for (const item of cards) {
    const card = createCard(
      item,
      handleLikeCard,
      handleDeleteCard,
      handleViewCard,
      currentUserId,
      api
    );
    placesContainer.append(card);
  }
}

initPage();
