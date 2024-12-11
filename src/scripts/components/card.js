// Функции для работы с карточками проекта Mesto
// Функции, обрабатывающие события лайка и удаления карточки

const cardTemplate = document.querySelector("#card-template");
function createCard({ name, link, likes }, onLike, onDelete, onView) {
  const node = cardTemplate.content.cloneNode(true);

  const cardTitle = node.querySelector(".card__title");
  cardTitle.textContent = name;

  const cardImage = node.querySelector(".card__image");
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  cardImage.addEventListener("click", onView);

  const likeButton = node.querySelector(".card__like-button");
  likeButton.addEventListener("click", onLike);

  const likesCount = node.querySelector(".card__likes-count");
  likesCount.textContent = likes.length || "";

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

export { createCard, handleLikeCard, handleDeleteCard };
