function checkResponse(response) {
  if (!response.ok) {
    return Promise.reject(`Ошибка ${res.status}`);
  }
  return response.json();
}

export { checkResponse };
