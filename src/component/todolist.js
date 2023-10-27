import React from 'react';
import {useDispatch} from 'react-redux'
import { useSelector } from 'react-redux'
import './style.css'
import { addtodo, increment } from '../slices/todoslice';
import {v4 as uuid} from 'uuid'
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ToastContainer, toast } from 'react-toastify';
import ShowTodoList from './ShowTodoList';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Form from 'react-bootstrap/Form';
import moment from 'moment';


const TodoList = () => {
  // const userAgent =window.navigator.userAgent;
  //   console.log('User-Agent:', userAgent.split(' '));
  // const [count,setCount]=React.useState(0)
 
  const [title,setTite]=React.useState('')
  const [status,setStatus]=React.useState('InCompleted')
  const [show, setShow] = useState(false);
  const [filtervalue, setFilterValue] = useState("All");
  const [dropdown,setDropdown]=React.useState(false)
  const val=useSelector((state)=>state.todo.filter_button);

  

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const dispatch=useDispatch()
  const fxn=(e)=>{
    e.preventDefault()
    if(title && status){
      dispatch(addtodo({
        id:uuid(),
        title,
        status,
        time:moment().toISOString()

      }));
      setTite('')
      handleClose()
      setDropdown(true)
    }else{
      toast.error("title shouldn't empty")
    }

  }
  return <div className='container' style={{width:'80%'}}>
    <h1 style={{textAlign:'center',color:'#ffffff'}}>Todolist</h1>
    <div style={{display:'flex',justifyContent:'space-between',margin:'0.3rem'}}>
      <div>
          <Button variant="primary" onClick={handleShow} style={{backgroundColor:'lightblue',borderColor:'lightblue',color:'black'}}>
            Add Todo
          </Button>
    </div>
    <div>
      {val && <DropdownButton id="dropdown-item-button" title={filtervalue}>
        <Dropdown.Item as="button"  onClick={(e)=>{setFilterValue(e.target.innerText)}}  >All</Dropdown.Item>
        <Dropdown.Item as="button" onClick={(e)=>{setFilterValue(e.target.innerText)}}>Completed</Dropdown.Item>
        <Dropdown.Item as="button" onClick={(e)=>{setFilterValue(e.target.innerText)}}>InCompleted</Dropdown.Item>
      </DropdownButton>}
    </div>
    </div>


      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Add Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div>
          <form onSubmit={fxn}>
            <div className='container-fluid'>
              <div className='row mb-3'>
                <div className='col-sm-12'>
                <h5>Title</h5>
                </div>
                <div className='col-sm-12'>
                <input type="text" id="title" value={title} onChange={(e)=>setTite(e.target.value)} className='form-control' style={{boxShadow:'none'}}/>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-sm-12'>
                  <h5>Status</h5>
                </div>
                <div className='col-sm-12'>
                  <Form.Select value={status} onChange={(e)=>setStatus(e.target.value)}  style={{boxShadow:'none'}}>
                  <option value="InCompleted">InCompleted</option>
                    <option value="Completed">Completed</option>
                  </Form.Select>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-sm-12'>
                  <Button variant="primary" type="submit" style={{marginRight:'1rem'}}>Add Todo</Button>
                  <Button variant="secondary" onClick={handleClose} style={{textAlign:'end'}}>Close</Button>
                
                </div>
              </div>
            </div>
          </form>
        </div>
          
        </Modal.Body>
      </Modal>
      <ShowTodoList filtervalue={filtervalue}/>
      {/* <h1>{count}</h1>
      <button onClick={()=>dispatch(increment(count))}>+</button><button>-</button> */}
   
  </div>
}
export default TodoList


