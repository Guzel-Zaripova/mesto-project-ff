// Работа с модальным окнами
// Функции openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие

function openModal(element) {
  element.classList.add("popup_is-animated");
  const waitingForAnimation = 60;
  setTimeout(function () {
    element.classList.add("popup_is-opened");
  }, waitingForAnimation);

  element.addEventListener("click", hanleOverlay);
  document.addEventListener("keydown", handleKeydown);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  element.removeEventListener("click", hanleOverlay);
  document.removeEventListener("keydown", handleKeydown);
}

function hanleOverlay(event) {
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

export { openModal, closeModal };
