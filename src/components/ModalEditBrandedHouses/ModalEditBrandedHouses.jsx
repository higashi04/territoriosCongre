import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

const ModalEditBrandedHouses = ({
  parentTerritory,
  onBrandedEdit,
  btnText,
  id,
  address,
  comments,
  ClickedMarker,
}) => {
  const [show, setShow] = useState(false);
  const [addressValue, setAddressValue] = useState(address);
  const [commentsValue, setCommentsValue] = useState(comments);

  const handleClose = () => {
    setShow(false);
    ClickedMarker(false);
  };

  const handleShow = () => {
    setShow(true);
    ClickedMarker(true)
  };

  const handleHTTPCall = async () => {
    try {
      const data = {
        territory: parentTerritory,
        marker: id
      };
      console.log(data);
      const request = await fetch(
        process.env.REACT_APP_API_SERVER + "territorios/DeleteMarked",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(data),
        }
      );

      if (request.ok) {
        const response = await request.json();
        onBrandedEdit(response);
      } else {
        throw request;
      }
    } catch (error) {
      const err = await error.json();
      console.error(err);
    } finally {
        handleClose();
    }
  };

  const handleUpdate = async() => {
    try {
      const data ={
        id,
        address: addressValue,
        comments: commentsValue
      }
      const request = await fetch(process.env.REACT_APP_API_SERVER + "territorios/UpdateMarked", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });
      if(!request.ok) {
        throw request;
      } 
      // else {
      //   const response = await request.json();
      //   console.log(response)
      //   setAddressValue(response.branded.address);
      //   setCommentsValue(response.branded.comments);
      // }
    } catch (error) {
      console.log(error)
      //console.error(err.Message);
    }
  }

  return (
    <>
      <span onClick={handleShow}>{btnText}</span>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Casa Marcada</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="row my-3">
            <div className="input-group">
              <label className="input-group-text">Dirección</label>
              <input type="text" className="form-control" value={addressValue} onInput={(e) => setAddressValue(e.target.value)} />
            </div>
          </div>
          <div className="row my-3">
            <div className="input-group">
              <label className="input-group-text">Comentarios</label>
              <textarea className="form-control" defaultValue={commentsValue} onInput={(e) => setCommentsValue(e.target.value)}>
                
              </textarea>
            </div>
          </div>
          <div className="row my-5 d-grid gap-2">
            <button className="btn btn-warning" onClick={handleUpdate}>Guardar Cambios</button>
            <button className="btn btn-danger" onClick={handleHTTPCall}>Eliminar</button>
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

export default ModalEditBrandedHouses;
