import Modal from 'react-bootstrap/Modal';
import {Trash} from 'react-bootstrap-icons'
import { Fragment, useState } from "react";
import axios from "axios";

function MyVerticallyCenteredModal(props) {
  const token = localStorage.getItem('token')
  const deleteItem= () => {
    const config = {headers: {Authorization: `Bearer ${token}`}}
    let url = `/${props.id}`;
    axios.delete(url, config)
    .then(res => {
        console.log('deleted', res)
        window.location.reload()
    })
    .catch(err => {
        console.log( 'deleted', err)
        window.location.reload()
    })
  }

  return (
    <Modal
      {...props}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      style={{width:"100%"}}
    >
      <Modal.Body>
        <p className='text-center' style={{marginBottom:"0px"}}>
          Are you sure want to delete <br/>
          {props.name} ?
        </p>
      </Modal.Body>
      <div className='d-flex justify-content-evenly my-3'>
        <button onClick={props.onHide} className='modal-btn'>no</button>
        <button onClick={deleteItem} className='modal-btn'>delete it</button>
      </div>
    </Modal>
  );
}

function Delete(props) {
  const [modalShow, setModalShow] = useState(false);
  const {data} = props

  return (
    <>
      <Trash className='icon' onClick={() => setModalShow(true)} />

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        animation={false}
        name = {data.name}
        id = {data.id}
      />
    </>
  );
}

export default Delete;

// axios(url, {
//   method: 'DELETE',
//   mode: 'no-cors',
//   headers: {
//     'Access-Control-Allow-Origin': url,
//     'Content-Type': 'application/json',
//     'Authorization': `Bearer ${token}`
//   },
//   withCredentials: true,
//   credentials: 'same-origin',
// })