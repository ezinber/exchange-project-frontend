import { memo, useContext, useEffect } from 'react';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import {
  ResponseMessageContext,
  compareWithErrorMessages,
} from '../../contexts/ResponseMessageContext';
import './Form.css';

function Form({ children, title, buttonName, onSubmit, isValid }) {
  const {responseMessage, handleResetResponseMessage} = useContext(ResponseMessageContext);
  const isLoading = useContext(IsLoadingContext);

  const isResponseError = compareWithErrorMessages(responseMessage);

  useEffect(() => {
    return () => handleResetResponseMessage();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="form__title">
        {title}
      </h1>

      {children}

      <span className={`form__message${responseMessage ? ' form__message_visible' : ''}${isResponseError ? ' form__message_type_error' : ''}`}>
        {responseMessage}
      </span>
      <button
        className={`form__submit-button ${!isValid || isLoading ? 'form__submit-button_disabled ' : ''}`}
        type="submit"
        disabled={!isValid || isLoading}
      >
        {isLoading ? 'Подождите...' : buttonName}
      </button>
    </form>
  )
}

export default memo(Form);
