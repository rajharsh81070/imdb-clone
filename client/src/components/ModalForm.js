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
        <label>Name</label>
        <input
          type="text"
          name={props.name1}
          className="form-control"
          onChange={props.onChange}
          value={props.value1}
        />
        <br />
        <label>Gender</label>
        <input
          type="text"
          name={props.name2}
          className="form-control"
          onChange={props.onChange}
          value={props.value2}
        />
        <br />
        <label>Bio</label>
        <input
          type="text"
          name={props.name3}
          className="form-control"
          onChange={props.onChange}
          value={props.value3}
        />
        <br />
        <label>D.O.B</label>
        <input
          type="date"
          name={props.name4}
          className="form-control"
          onChange={props.onChange}
          value={props.value4}
        />
        {
          props.showerror === 'true' ?
            <p style={{ color: 'red' }}>All items are required!</p>
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