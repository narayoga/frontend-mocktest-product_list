import Modal from 'react-bootstrap/Modal';
import {Gear} from 'react-bootstrap-icons'
import { Fragment, useState, useEffect } from "react";
import axios from "axios";

function MyVerticallyCenteredModal(props) {
  const token = localStorage.getItem('token')
  const [name, setName] = useState('')
  const [value, setValue] = useState('')
  const [src, setSrc] =useState('')

  const getItem= () => {
    const config = {headers: {Authorization: `Bearer ${token}`}}
    let url = `https://test-binar.herokuapp.com/v1/products/${props.id}`;
    axios.get(url, config)
        .then(res => {
            const att = res.data.result
            setName(att.name)
            setValue(att.price)
            setSrc(att.imageurl)
        })
        .catch(err => {
            console.log( err.message)
        })
  }

  const updateSubmit = (e) => {
    e.preventDefault()
    const bodyUpdate ={
      name,
      price: value,
      imageurl: src
    }
    const config = {headers: {Authorization: `Bearer ${token}`}}
    let url = `https://test-binar.herokuapp.com/v1/products/${props.id}`
    axios.put(url, bodyUpdate, config)
      .then(res => {
        console.log('success')
      })
      .catch(err => {
        console.log(err)
      })
  }

  useEffect(() => {
    getItem()
    // console.log(props.id)
  }, []);

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
          <p >Edit Product</p>
        </div>
        <div className='text-center' style={{marginBottom:"0px"}}>
          <form onSubmit={updateSubmit}> 
            <div className="mb-2 form">
              <input type="text" className="form-input" id="name" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-2 form">
              <input type="text" className="form-input" id="value" value={value} onChange={(e) => setValue(e.target.value)}/>
            </div>
            <div className="mb-4 form">
              <input type="text" className="form-input" id="src" value={src} onChange={(e) => setSrc(e.target.value)}/>
            </div>
            <hr />
            <div className='d-flex flex-row-reverse'>
              <button type='submit' className='modal-btn'>Update</button>
              <button onClick={props.onHide} className='modal-btn-plain'>Back</button>
            </div>
          </form>
        </div>
      </Modal.Body>
    </Modal>
  );
}

function Edit(props) {
  const [modalShow, setModalShow] = useState(false);
  const {data} = props
  return (
    <>
      <Gear className='icon' onClick={() => setModalShow(true)} />
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
        animation={false}
        id = {data}
      />
    </>
  );
}

export default Edit;