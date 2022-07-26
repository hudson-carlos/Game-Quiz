import React, { useContext } from "react";
import { Alert } from "react-bootstrap";
import TodoContext from '../TodoContext';

export default () => {
  const { showAlert, setShowAlert, messageError } = useContext(TodoContext);

  if (showAlert) {
    return (
      <Alert variant="danger" onClose={() => setShowAlert(false)} dismissible>
        <p>{messageError}</p>
      </Alert>
    );
  }
}