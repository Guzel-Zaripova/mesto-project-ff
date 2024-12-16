function checkResponse(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка ${res.status}`);
  }
  return response.json();
}

// Уведомление пользователя о процессе загрузки
function renderLoading(isLoading, button, buttonText) {
  if (isLoading) {
    button.textContent = "Сохранение...";
    button.disabled = true;
  } else {
    button.textContent = buttonText;
    button.disabled = false;
  }
}

export { checkResponse, renderLoading };
