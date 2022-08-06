import Modal from 'react-bootstrap/Modal';
import { Fragment, useState, } from "react";
import axios from "axios";

function MyVerticallyCenteredModal(props) {
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [src, setSrc] =useState('')
  const token = localStorage.getItem('token')

  const handleSubmit = (e) => {
    e.preventDefault()
    const config = {headers: {Authorization: `Bearer ${token}`}}
    const url = 'https://test-binar.herokuapp.com/v1/products/';
    const body = {
        name,
        price: value,
        imageurl: src
    }
    axios.post(url, body, config)
        .then(res => {
            console.log('success', res)
            window.location.reload()
        })
        .catch(err => {
            console.log(err)
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
        <div className='modal-title'>
          <p >Create new</p>
        </div>
        <div className='text-center' style={{marginBottom:"0px"}}>
          <form onSubmit={(e) => handleSubmit(e)}> 
            <div className="mb-2 form">
              <input type="text" className="form-input" placeholder='Product Name' id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-2 form">
              <input type="text" className="form-input" placeholder='Price (Dollar USD)' id="value" value={value} onChange={(e) => setValue(e.target.value)}/>
            </div>
            <div className="mb-4 form">
              <input type="text" className="form-input" placeholder='image url' id="src" value={src} onChange={(e) => setSrc(e.target.value)}/>
            </div>
            <hr />
            <div className='d-flex flex-row-reverse'>
              <button type='submit' className='modal-btn'>Create</button>
              <button onClick={props.onHide} className='modal-btn-plain'>Back</button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function Add() {
  const [modalShow, setModalShow] = useState(false);

  return (
    <>
      <button className='add-btn' onClick={() => setModalShow(true)}>
        Create New
      </button>

      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
    </>
  );
}

export default Add;