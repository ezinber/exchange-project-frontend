import { memo } from 'react';
import './Popup.css';

function Popup({ children, isOpen, onClose }) {

  const handleClose = (e) => {
    const isTarget = e.target.classList.contains('popup_opened')
    || e.target.classList.contains('popup__close-button');

    isTarget && onClose();
  }

  isOpen
    ? document.body.style.overflow = "hidden" //prevent body scroll
    : document.body.style.overflow = "";

  return (
    <div
      className={`popup${isOpen ? ' popup_opened' : ''}`}
      onClick={handleClose}
    >
      <div className="popup__container">
        {children}
        <button
          className="popup__close-button"
          type="button"
          title="Закрыть"
          onClick={handleClose}
        />
      </div>
    </div>
  )
}

export default memo(Popup);
