import { memo, useContext, useEffect } from 'react';
import { IsLoadingContext } from '../../contexts/IsLoadingContext';
import {
  ResponseMessageContext,
  compareWithErrorMessages,
} from '../../contexts/ResponseMessageContext';
import { makeClassName } from '../../utils/utils';
import './Form.css';

function Form({ children, title, buttonName, onSubmit, isValid }) {
  const {responseMessage, handleSetResponseMessage} = useContext(ResponseMessageContext);
  const isLoading = useContext(IsLoadingContext);

  const isResponseError = compareWithErrorMessages(responseMessage);

  const formMessageClassName = makeClassName([
    'form__message',
    [isResponseError, '_type_error'],
    [responseMessage, '_visible'],
  ])

  const formSubmitButtonClassName = makeClassName([
    'form__submit-button',
    [!isValid || isLoading, '_disabled']
  ])

  useEffect(() => {
    return () => handleSetResponseMessage();

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <form className="form" onSubmit={onSubmit}>
      <h1 className="form__title">
        {title}
      </h1>

      {children}

      <span className={formMessageClassName}>
        {responseMessage}
      </span>
      <button
        className={formSubmitButtonClassName}
        type="submit"
        disabled={!isValid || isLoading}
      >
        {isLoading ? 'Подождите...' : buttonName}
      </button>
    </form>
  )
}

export default memo(Form);
