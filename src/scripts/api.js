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

const api = { getCurrentUser, getCards, updateUser };
export { api };
