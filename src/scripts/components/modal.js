// Работа с модальным окнами
// Функции openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие

function openModal(element) {
  element.classList.add("popup_is-animated");
  const waitingForAnimation = 60;
  setTimeout(function () {
    element.classList.add("popup_is-opened");
  }, waitingForAnimation);

  const closeButton = element.querySelector(".popup__close");
  function handleClick() {
    closeModal(element);
    closeButton.removeEventListener("click", handleClick);
  }
  closeButton.addEventListener("click", handleClick);

  function hanleOverlay(event) {
    if (event.target === element) {
      closeModal(element);
      element.removeEventListener("click", hanleOverlay);
    }
  }
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
}

export { openModal, closeModal };
