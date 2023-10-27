import React from 'react'
import { useSelector } from 'react-redux'
import {useDispatch} from 'react-redux'
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import moment from 'moment';
import { deletetodo, updatetodo ,update_filter} from '../slices/todoslice';
import { toast } from 'react-toastify';
import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import './style.css'

const TodoItem=(props)=>{
  // const userAgent =window.navigator.userAgent;
    //console.log('User-Agent:', userAgent.split(' '));
    const {id,title,status,time}=props;
    const inputRef=React.useRef(null)
    const convertToSortableDate = (dateString) => {
      return moment(dateString).format('lll');
      
    };
    
    const formattedTime = convertToSortableDate(time)
    console.log(formattedTime,time)
    const dispatch=useDispatch();
    const [title2,setTite]=React.useState(title)
    const [status2,setStatus]=React.useState('InCompleted')
    const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);setTite(title);
};
    const handledelete=()=>{
       dispatch(deletetodo(id))
       toast.success("Todo Deleted ")

    };
    const fxn=(e)=>{
        e.preventDefault()
        //console.log(id)
        
        if(title2 && status2){
            dispatch(updatetodo({
              id,
              title2,
              status2,
              time:moment().toISOString(),
      
            }));
            setTite('')
            handleClose()
          }else{
            toast.error("title shouldn't empty")
          }
      

    }
    React.useEffect(()=>{
      if(show){
        inputRef.current.focus()
        //inputRef.current.style.boxShadow="0 0 5px red";
        // inputRef.current.style.backgroundColor="#16163f";
        // inputRef.current.style.color="#ffffff";
       // inputRef.current.style.fontSize='1.5rem';
        // inputRef.current.style.outline='3px solid';
          // inputRef.current.style.outlineColor='black';
          //inputRef.current.style.borderColor='green'

      }
    },[show])
    return  <>    
    <Card style={{backgroundColor:'#25406e',color:'#ffffff',margin:'0.3rem'}}>
    <Card.Body>
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',flexWrap:'nowrap'}}>
            <div>
                <div  className={status==='Completed'?'strike':'undefined'} style={{fontSize:'2rem'}}>{title.replace(title[0],title[0].toUpperCase())}</div>
                <div style={{fontSize:'0.8rem'}}>{formattedTime}</div>
            </div>
            <div>
            <Button className={status==='Completed'?`disabled`:'undefined'} variant="primary" style={{backgroundColor:'#193152',borderColor:'#193152'}} onClick={handleShow}>
           {status==='Completed'?status:'Edit'}
          </Button>{' '}
            <Button variant="danger" style={{backgroundColor:'#193152',borderColor:'#193152'}} onClick={handledelete}>Delete</Button>{' '}
            </div>
        </div>
        </Card.Body>
  </Card>
  <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>Update Todo</Modal.Title>
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
                <input ref={inputRef} type="text" id="title" value={title2} onChange={(e)=>setTite(e.target.value)} className='form-control custom-input' style={{boxShadow:'none'}}/>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-sm-12'>
                  <h5>Status</h5>
                </div>
                <div className='col-sm-12'>
                  <Form.Select value={status2} onChange={(e)=>setStatus(e.target.value)} style={{boxShadow:'none'}}>
                  <option value="InCompleted">InCompleted</option>
                    <option value="Completed">Completed</option>
                </Form.Select>
                </div>
              </div>
              <div className='row mb-3'>
                <div className='col-sm-12'>
                  <Button variant="primary" type="submit" style={{marginRight:'1rem'}}>Update Todo</Button>
                  <Button variant="secondary" onClick={handleClose} style={{textAlign:'end'}}>Close</Button>
                
                </div>
              </div>
            </div>
          </form>
        </div>
          
        </Modal.Body>
  </Modal>
  </>

}
const ShowTodoList = (props) => {
  // const userAgent =window.navigator.userAgent;
    //console.log('User-Agent:', userAgent.split(' '));
  //console.log(props.filtervalue)
    const list=useSelector((state)=>state.todo.todolist)
    const dispatch=useDispatch();
    // const list1=useSelector((state)=>state.counter.count)
    // console.log(list1)
    // const sortedList=[...list]
    // sortedList.sort((a,b)=>{
    //     return new Date(b.time)-new Date(a.time)
    // })
    //  console.log("sorted",sortedList)
    
    // Sorting the list based on the time property
    const sortedList = [...list].sort((a, b) => {
      return moment(b.time).diff(moment(a.time));
    });
    if(sortedList && sortedList.length>0){
      dispatch(update_filter(true))
    }else{
      dispatch(update_filter(false))
    }
    
    //console.log(sortedList);
    const filtertodo=()=>{
      switch(props.filtervalue){
        case "All":return sortedList.map((obj,ind)=><TodoItem {...obj}/>);
        case "Completed":const bool1=sortedList.some((obj,ind)=>(obj.status==="Completed"));
        if(bool1===false){
          return <Card style={{backgroundColor:'#000033',color:'#193152',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
            <Card.Body className='no-todo' style={{ fontWeight: '700' }}>ℕ𝕠 ℂ𝕠𝕞𝕡𝕝𝕖𝕥𝕖𝕕 𝕋𝕠𝕕𝕠 𝕐𝕖𝕥</Card.Body>
            </Card>
        }else{
          return sortedList.map((obj,ind)=>{
            if(obj.status==="Completed"){
              return <TodoItem {...obj}/>
            }
  
            
          });
        }
        case "InCompleted":
          const bool2=sortedList.some((obj,ind)=>(obj.status==="InCompleted"));
        if(bool2===false){
          return<Card style={{backgroundColor:'#000033',color:'#193152',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
          <Card.Body className='no-todo' style={{ fontWeight: '700' }}>ℕ𝕠 𝕀𝕟ℂ𝕠𝕞𝕡𝕝𝕖𝕥𝕖𝕕 𝕋𝕠𝕕𝕠 𝕐𝕖𝕥</Card.Body>
          </Card>
        }else{
          return sortedList.map((obj,ind)=>{
            if(obj.status==="InCompleted"){
              return <TodoItem {...obj}/>
            }
  
            
          });
        }
      }
    }


  return (<div style={{color:'#ffffff'}}>   
  {sortedList && (sortedList.length>0 ? (filtertodo()) :<Card style={{backgroundColor:'#000033',color:'#193152',boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>
    <Card.Body className='no-todo'   style={{ fontWeight: '700' ,boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)'}}>ℕ𝕆 𝕋𝕆𝔻𝕆 𝕐𝔼𝕋</Card.Body></Card>)} 
  </div>
 
  )
}

export default ShowTodoList



