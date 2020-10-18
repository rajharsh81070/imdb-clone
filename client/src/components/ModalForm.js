import React from 'react';
import Modal from 'react-bootstrap/Modal';

export default function ModalForm(props) {
  return (
    <Modal
      {...props}
      size="sm"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Modal.Header>
        <Modal.Title id="contained-modal-title-vcenter">
          {props.label}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <input
          type="text"
          name={props.name}
          className="form-control"
          onChange={props.onChange}
          value={props.value}
          placeholder={props.place}
        />
        {/* {console.log(props.showerror)} */}
        {
          props.showerror === 'true' ?
            <p style={{ color: 'red' }}>Item is required!</p>
            : null
        }
      </Modal.Body>
      <Modal.Footer>
        <button type="button" className="btn btn-danger" onClick={props.onHide}>Close</button>
        <button type="submit" onClick={props.onSubmit} className="btn btn-outline-primary" >Save</button>
      </Modal.Footer>
    </Modal>
  );
}