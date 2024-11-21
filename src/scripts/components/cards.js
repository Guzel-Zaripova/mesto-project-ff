// Функции для работы с карточками проекта Mesto
// Функции, обрабатывающие события лайка и удаления карточки

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

const cardTemplate = document.querySelector("#card-template");
function createCard({ name, link }, onLike, onDelete, onView) {
  const node = cardTemplate.content.cloneNode(true);

  const cardTitle = node.querySelector(".card__title");
  cardTitle.textContent = name;

  const cardImage = node.querySelector(".card__image");
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  cardImage.addEventListener("click", onView);

  const likeButton = node.querySelector(".card__like-button");
  likeButton.addEventListener("click", onLike);

  const deleteButton = node.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", onDelete);

  return node;
}

function handleLikeCard(event) {
  event.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(event) {
  const placesItem = event.target.closest(".places__item");
  placesItem.remove();
}

export { initialCards, createCard, handleLikeCard, handleDeleteCard };
