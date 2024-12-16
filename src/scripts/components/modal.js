// Работа с модальным окнами
// Функции openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие

function openModal(element) {
  element.classList.add("popup_is-opened");
  element.addEventListener("click", handleModalClose);
  document.addEventListener("keydown", handleKeydown);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  element.removeEventListener("click", handleModalClose);
  document.removeEventListener("keydown", handleKeydown);
}

function handleModalClose(event) {
  if (
    event.target === event.currentTarget ||
    event.target.classList.contains("popup__close")
  ) {
    closeModal(event.currentTarget);
  }
}

function handleKeydown(event) {
  if (event.key === "Escape") {
    const openedModal = document.querySelector(".popup_is-opened");
    closeModal(openedModal);
  }
}

export { openModal, closeModal, handleModalClose };
