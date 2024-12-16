// В файле api.js описаны функции для взаимодействия с сервером

import { checkResponse } from "./components/utils";

const config = {
  baseUrl: "https://nomoreparties.co/v1/wff-cohort-28",
  headers: {
    authorization: "010b9d85-95a5-4fed-a625-d6c4cf6dd8aa",
    "Content-Type": "application/json",
  },
};

// Загрузка информации о пользователе с сервера
async function getCurrentUser() {
  const url = `${config.baseUrl}/users/me`;
  const response = await fetch(url, {
    headers: config.headers,
  });
  const data = await checkResponse(response);
  return data;
}

// Загрузка информации о карточках с сервера
async function getCards() {
  const url = `${config.baseUrl}/cards`;
  const response = await fetch(url, {
    headers: config.headers,
  });
  const data = await checkResponse(response);
  return data;
}

// Редактирование профиля
async function updateUser(name, about) {
  const url = `${config.baseUrl}/users/me`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      name,
      about,
    }),
  });
  await checkResponse(response);
}

// Добавление новой карточки
async function addNewCard(name, link) {
  const url = `${config.baseUrl}/cards`;
  const response = await fetch(url, {
    method: "POST",
    headers: config.headers,
    body: JSON.stringify({
      name,
      link,
    }),
  });
  const data = await checkResponse(response);
  return data;
}

// Постановка лайка карточки
async function likeCard(cardId) {
  const url = `${config.baseUrl}/cards/likes/${cardId}`;
  const response = await fetch(url, {
    method: "PUT",
    headers: config.headers,
    body: JSON.stringify(data),
  });
  const data = await checkResponse(response);
  return data;
}

// Снятие лайка карточки
async function dislikeCard(cardId) {
  const url = `${config.baseUrl}/cards/likes/${cardId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify(data),
  });
  const data = await checkResponse(response);
  return data;
}

// Удаление карточки
async function deleteCard(cardId) {
  const url = `${config.baseUrl}/cards/${cardId}`;
  const response = await fetch(url, {
    method: "DELETE",
    headers: config.headers,
    body: JSON.stringify(data),
  });
  const data = await checkResponse(response);
  return data;
}

// Обновление аватара пользователя
async function updateAvatar(avatar) {
  const url = `${config.baseUrl}/users/me/avatar`;
  const response = await fetch(url, {
    method: "PATCH",
    headers: config.headers,
    body: JSON.stringify({
      avatar,
    }),
  });
  const data = await checkResponse(response);
  return data;
}

const api = {
  getCurrentUser,
  getCards,
  updateUser,
  addNewCard,
  likeCard,
  dislikeCard,
  deleteCard,
  updateAvatar,
};
export { api };
