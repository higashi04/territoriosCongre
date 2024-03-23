import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

import OptionsAddingMarkers from "../OptionsAddingMarkers/OptionsAddingMarkers";
import OptionsNewTerritory from "../OptionsNewTerritory/OptionsNewTerritory";

const ModalMapOptions = ({
  coordinates,
  showModal,
  onModalClose,
  territoryId,
  onBrandedSave,
  onCornerSelection,
  onBlockSave
}) => {
  const [show, setShow] = useState(showModal);

  const handleClose = () => {
    setShow(false);
    onModalClose(false);
  };

  const handleShow = () => {
    setShow(true);
  };

  useEffect(() => {
    if (showModal) {
      handleShow();
    } else {
      handleClose();
    }
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          Coordenadas {coordinates?.lat}, {coordinates?.lng}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {territoryId.length > 0 ? (
          <OptionsAddingMarkers 
          lat={coordinates?.lat} 
          lng ={coordinates?.lng} 
          parentTerritory={territoryId} 
          onBrandedSave={onBrandedSave} 
          onBlockSave={onBlockSave}/>
        ) : (
         <OptionsNewTerritory coordinates={coordinates} onCornerSelection={(corner, coordinates) => onCornerSelection(corner, coordinates)} />
        )}
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cerrar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModalMapOptions;
