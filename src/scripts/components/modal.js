// Работа с модальным окнами
// Функции openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие

function openModal(element) {
  element.classList.add("popup_is-animated");
  const waitingForAnimation = 60;
  setTimeout(function () {
    element.classList.add("popup_is-opened");
  }, waitingForAnimation);

  element.addEventListener("click", hanleOverlay);

  function handleKeydown(event) {
    if (event.key === "Escape") {
      closeModal(element);
    }
    document.removeEventListener("keydown", handleKeydown);
  }
  document.addEventListener("keydown", handleKeydown);
}

function closeModal(element) {
  element.classList.remove("popup_is-opened");
  element.removeEventListener("click", hanleOverlay);
}

function hanleOverlay(event) {
  if (
    event.target === event.currentTarget ||
    event.target.classList.contains("popup__close")
  ) {
    closeModal(event.currentTarget);
  }
}

export { openModal, closeModal };
