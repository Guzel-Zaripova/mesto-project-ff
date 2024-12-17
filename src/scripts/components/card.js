// Функции для работы с карточками проекта Mesto
// Функции, обрабатывающие события лайка и удаления карточки

const cardTemplate = document.querySelector("#card-template");

function createCard(
  { name, link, likes = [], _id, owner },
  onLike,
  onDelete,
  onView,
  currentUserId,
  api
) {
  const node = cardTemplate.content.cloneNode(true);

  const card = node.querySelector(".card");
  card.setAttribute("data-id", _id);

  const cardTitle = node.querySelector(".card__title");
  cardTitle.textContent = name;

  const cardImage = node.querySelector(".card__image");
  cardImage.setAttribute("src", link);
  cardImage.setAttribute("alt", name);
  cardImage.addEventListener("click", () => onView(name, link));

  const likeButton = node.querySelector(".card__like-button");
  likeButton.addEventListener("click", function (event) {
    onLike(event, api);
  });

  const isLike = likes.some((user) => user._id === currentUserId);
  if (isLike) {
    card.setAttribute("data-is-liked", "1");
    likeButton.classList.add("card__like-button_is-active");
  } else {
    card.setAttribute("data-is-liked", "0");
  }

  const likesCount = node.querySelector(".card__likes-count");
  likesCount.textContent = likes.length;

  const deleteButton = node.querySelector(".card__delete-button");
  if (owner._id === currentUserId) {
    deleteButton.addEventListener("click", function (event) {
      onDelete(event, api);
    });
  } else {
    deleteButton.remove();
  }

  return node;
}

async function handleLikeCard(event, api) {
  const card = event.target.closest(".card");
  const cardId = card.getAttribute("data-id");
  const isLiked = card.getAttribute("data-is-liked");
  const likesCount = card.querySelector(".card__likes-count");
  if (isLiked === "1") {
    try {
      const data = await api.dislikeCard(cardId);
      card.setAttribute("data-is-liked", "0");
      event.target.classList.remove("card__like-button_is-active");
      likesCount.textContent = data.likes.length;
    } catch (error) {
      console.error("Ошибка:", error);
    }
  } else {
    try {
      const data = await api.likeCard(cardId);
      card.setAttribute("data-is-liked", "1");
      event.target.classList.add("card__like-button_is-active");
      likesCount.textContent = data.likes.length;
    } catch (error) {
      console.error("Ошибка:", error);
    }
  }
}

async function handleDeleteCard(event, api) {
  try {
    const card = event.target.closest(".card");
    const cardId = card.getAttribute("data-id");
    await api.deleteCard(cardId);
    card.remove();
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
}

export { createCard, handleLikeCard, handleDeleteCard };
