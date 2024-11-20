// Работа с модальным окнами
// Функции openModal и closeModal, принимающие в качестве аргумента DOM-элемент модального окна, с которым нужно произвести действие

function openModal(element) {
  element.classList.add("popup_is-opened");

  const closeButton = element.querySelector(".popup__close");
  function handleClick() {
    closeModal(element);
    closeButton.removeEventListener("click", handleClick);
  }
  closeButton.addEventListener("click", handleClick);

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

// TODO: добавить анимацию для popup

export { openModal, closeModal };
