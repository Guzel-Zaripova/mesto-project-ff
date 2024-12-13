// В файле api.js описаны функции для взаимодействия с сервером

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-28",
  headers: {
    authorization: "010b9d85-95a5-4fed-a625-d6c4cf6dd8aa",
    "Content-Type": "application/json",
  },
};

// Загрузка информации о пользователе с сервера
async function getCurrentUser() {
  try {
    const url = `${config.baseUrl}/users/me`;
    const response = await fetch(url, {
      headers: config.headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

// Загрузка информации о карточках с сервера
async function getCards() {
  try {
    const url = `${config.baseUrl}/cards`;
    const response = await fetch(url, {
      headers: config.headers,
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

// Редактирование профиля
async function updateUser(name, about) {
  try {
    const url = `${config.baseUrl}/users/me`;
    const response = await fetch(url, {
      method: "PATCH",
      headers: config.headers,
      body: JSON.stringify({
        name,
        about,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

// Добавление новой карточки
async function addNewCard(name, link) {
  try {
    const url = `${config.baseUrl}/cards`;
    const response = await fetch(url, {
      method: "POST",
      headers: config.headers,
      body: JSON.stringify({
        name,
        link,
      }),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

// Постановка лайка карточки
async function likeCard(cardId) {
  try {
    const url = `${config.baseUrl}/cards/likes/${cardId}`;
    const response = await fetch(url, {
      method: "PUT",
      headers: config.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

// Снятие лайка карточки
async function dislikeCard(cardId) {
  try {
    const url = `${config.baseUrl}/cards/likes/${cardId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: config.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

// Удаление карточки
async function deleteCard(cardId) {
  try {
    const url = `${config.baseUrl}/cards/${cardId}`;
    const response = await fetch(url, {
      method: "DELETE",
      headers: config.headers,
      body: JSON.stringify(data),
    });
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Ошибка при получении данных:", error);
  }
}

const api = {
  getCurrentUser,
  getCards,
  updateUser,
  addNewCard,
  likeCard,
  dislikeCard,
  deleteCard,
};
export { api };
