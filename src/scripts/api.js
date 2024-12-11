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
  const url = `${config.baseUrl}/users/me`;
  const response = await fetch(url, {
    headers: config.headers,
  });
  const data = await response.json();
  return data;
}

// fetch("https://mesto.nomoreparties.co/v1/wff-cohort-28/cards", {
//   headers: {
//     authorization: "010b9d85-95a5-4fed-a625-d6c4cf6dd8aa",
//   },
// })
//   .then((res) => res.json())
//   .then((result) => {
//     console.log(result);
//   });

export { getCurrentUser };
