import React from 'react';
import PropTypes from 'prop-types';
import Button from "@material-ui/core/Button";

const Modal = ({
  title, onClose, onSubmit, content, type, buyDocument,
}) => (
        <div className="modal-wrapper">
        <div className="modal-component">
          <div className="modal-title">
            {title}
          </div>
          <div className="modal-content">
            {content}
          </div>
          <div className="modal-buttons">
            {
                <Button className="modal-buttons__save-button button-primary button-profile blue-btn" onClick={onClose} type="submit">Ok</Button>
            }
          </div>
        </div>
      </div>
);

Modal.propTypes = {
  title: PropTypes.string,
  onClose: PropTypes.bool,
  onSubmit: PropTypes.func,
  content: PropTypes.string,
  type: PropTypes.bool,
};

Modal.defaultProps = {
  title: '',
  onClose: false,
  onSubmit: {},
  content: '',
  type: false,
};

export default Modal;
