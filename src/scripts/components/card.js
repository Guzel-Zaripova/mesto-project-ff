// Функции для работы с карточками проекта Mesto
// Функции, обрабатывающие события лайка и удаления карточки

import { api } from "../api";

const cardTemplate = document.querySelector("#card-template");

// TODO: добавить входной параметр currentUserId
function createCard({ name, link, likes = [], _id }, onLike, onDelete, onView) {
  const node = cardTemplate.content.cloneNode(true);

  const card = node.querySelector(".card");
  card.setAttribute("data-id", _id);

  const cardTitle = node.querySelector(".card__title");
  cardTitle.textContent = name;

  const cardImage = node.querySelector(".card__image");
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  cardImage.addEventListener("click", onView);

  const likeButton = node.querySelector(".card__like-button");
  likeButton.addEventListener("click", onLike);

  const likesCount = node.querySelector(".card__likes-count");
  likesCount.textContent = likes.length;

  const deleteButton = node.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", onDelete);

  return node;
}

function handleLikeCard(event) {
  const userId = "1";
  const card = event.target.closest(".places__item");
  const cardId = card.getAttribute("data-id");
  console.log(cardId);
  // event.target.classList.toggle("card__like-button_is-active");
}

function handleDeleteCard(event) {
  const card = event.target.closest(".places__item");
  card.remove();
}

export { createCard, handleLikeCard, handleDeleteCard };
