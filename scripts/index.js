const placesContainer = document.querySelector(".places__list");
const cardTemplate = document.querySelector("#card-template");

function createCard({ name, link }, onDelete) {
  const node = cardTemplate.content.cloneNode(true);

  const cardTitle = node.querySelector(".card__title");
  cardTitle.textContent = name;

  const cardImage = node.querySelector(".card__image");
  cardImage.setAttribute("src", link);

  const deleteButton = node.querySelector(".card__delete-button");
  deleteButton.addEventListener("click", onDelete);

  return node;
}

function handleDeleteCard(event) {
  const placesItem = event.target.closest(".places__item");
  placesItem.remove();
}

function appendCards() {
  for (const item of initialCards) {
    const card = createCard(item, handleDeleteCard);
    placesContainer.append(card);
  }
}

appendCards();
