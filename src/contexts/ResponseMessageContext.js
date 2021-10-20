import { createContext } from "react";
import { responseErrorMessages } from "../utils/constants";

export const ResponseMessageContext = createContext();

// проверка, является ли переданное сообщение сообщением об ошибке
export const compareWithErrorMessages = (message) => {
  for (let key in responseErrorMessages) {
    if (responseErrorMessages[key] === message) {
      return true;
    }
  }
};
