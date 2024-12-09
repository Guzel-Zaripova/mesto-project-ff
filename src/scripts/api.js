// В файле api.js описаны функции для взаимодействия с сервером
const token = "010b9d85-95a5-4fed-a625-d6c4cf6dd8aa";

// Загрузка информации о пользователе с сервера
async function getUser(userId) {
  const url = `https://nomoreparties.co/v1/${userId}/users/me`;
  const response = await fetch(url, {
    headers: {
      authorization: token,
    },
  });
  const data = await response.json();

  const profileImage = document.querySelector(".profile__image");
  profileImage.style.backgroundImage = `url("${data.avatar}")`;
  const profileTitle = document.querySelector(".profile__title");
  profileTitle.textContent = data.name;
  const profileDescription = document.querySelector(".profile__description");
  profileDescription.textContent = data.about;
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

export { getUser };
