import { createContext } from 'react';

export const ResponseMessageContext = createContext();

export const responseSuccessMessages = {
  successUpdateMessage: 'Изменения сохранены!',
}

export const responseErrorMessages = {
  incorrectDataMessage: 'Переданы некорректные данные',
  sameEmailMessage: 'Пользователь с указанным E-mail уже зарегистрирован',
  notAuthorizedMessage: 'Необходимо авторизоваться',
  incorrectCredentialsMessage: 'Неверные логин или пароль',
  somethingWentWrong: 'Что-то пошло не так',
}

// проверка, является ли переданное сообщение сообщением об ошибке

export const compareWithErrorMessages = (message) => {
  for (let key in responseErrorMessages) {
    if (responseErrorMessages[key] === message) {
      return true;
    }
  }
}
