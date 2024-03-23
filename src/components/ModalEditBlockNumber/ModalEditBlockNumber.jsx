import React, { useState, useRef } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalEditBlockNumber = ({
  block,
  btnText,
  ClickedMarker,
  parentTerritoryId,
  onBlockSave,
}) => {
  const [show, setShow] = useState(false);
  const [blockName, setBlockName] = useState(block.name);
  const [worked, setWorked] = useState(false);
  const checkboxRef = useRef();

  const handleClose = () => {
    setShow(false);
    ClickedMarker(false);
  };

  const handleShow = () => {
    setShow(true);
    ClickedMarker(true);
  };

  const handleSwitch = () => {
    setWorked(checkboxRef.current.checked);
  };

  const handleUpdate = async () => {
    try {
      const data = {
        territory: parentTerritoryId,
        blockId: block._id,
        name: blockName,
        worked,
      };

      const response = await fetch(
        process.env.REACT_APP_API_SERVER + "territorios/editBlock",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if(!response.ok) {
        throw response
      }

      const json = await response.json();
      onBlockSave(json);
    } catch (error) {
      const err = await error.json();
      console.error(err);
    } finally {
      handleClose();
    }
  };

  const handleDelete = async () => {
    console.log(block);
    try {
      const data = {
        territory: parentTerritoryId,
        blockId: block._id,
      };

      const response = await fetch(
        process.env.REACT_APP_API_SERVER + "territorios/deleteBlock",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (response.ok) {
        const json = await response.json();
        onBlockSave(json);
      } else {
        throw response;
      }
    } catch (error) {
      console.log(error);
    } finally {
      handleClose();
    }
  };

  return (
    <>
      <span onClick={handleShow}>{btnText}</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Marcador</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row my-3">
            <div className="input-group">
              <label className="input-group-text">Número</label>
              <input
                type="text"
                className="form-control"
                value={blockName}
                onInput={(e) => setBlockName(e.target.value)}
              />
            </div>
          </div>
          <div className="row my-3">
            <span>¿La manzana fue trabajada?</span>
            <div className="form-check form-switch mx-3">
              <input
                ref={checkboxRef}
                className="form-check-input"
                type="checkbox"
                role="switch"
                id="checkWorked"
                defaultChecked={worked}
                onChange={handleSwitch}
              />
              <label className="form-check-label" htmlFor="checkWorked">
                {" "}
                {worked ? "Sí" : "No"}{" "}
              </label>
            </div>
          </div>
          <div className="row my-5 d-grid gap-2">
            <button className="btn btn-warning" onClick={handleUpdate}>
              Guardar Cambios
            </button>
            <button className="btn btn-danger" onClick={handleDelete}>
              Eliminar
            </button>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default ModalEditBlockNumber;
