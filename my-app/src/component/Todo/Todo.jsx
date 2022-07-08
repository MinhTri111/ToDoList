import React from 'react'
import { DeleteOutlined,EditOutlined,CheckOutlined } from '@ant-design/icons';
import { Button, Tooltip, Input  } from 'antd';
import './todo.css';
import { useState } from 'react';
import { toast} from 'react-toastify';
export default function Todo(props) {
    const {value, id, handleDelete, handleEdit} = props;
    const [show, setShow] = useState(true)
    const [todo, setTodo] = useState("")
    const clickEdit = ()=>{
      setShow(!show)
    }

    const handleChange = (e)=>{
        setTodo(e.target.value)
    }
    const handleUpdate = (id,todo)=>{
        if(todo){
            handleEdit(id,todo)
            clickEdit()
        }
        else{
            toast.error("This field is required!!!")
        }
    

    }
    const handleDel = (id)=>{
        handleDelete(id)
        toast.success("Delete Success!!!")
        setShow(true)
       
    }
        return (
    <>
    {(show) ? 
    (<div className="todo">
        <p className="test">{value}</p>
        
    <div className="button">
    <Tooltip title="Delete">
      <Button type="primary" danger shape="circle" icon={<DeleteOutlined/>} onClick = {()=> {handleDel(id)}} />
    </Tooltip>
    <Tooltip title="Edit">
      <Button type="primary" shape="circle" icon={<EditOutlined />}  onClick={()=>{clickEdit()}}/>
    </Tooltip>
    </div>
    
    </div>)
    :
    (<div className="todo">
    <Input placeholder={value}  size="small" onChange={handleChange}/>
    <div className="button">
    <Tooltip title="Delete">
      <Button type="primary" danger shape="circle" icon={<DeleteOutlined/>} onClick = {()=> {handleDel(id)}} />
    </Tooltip>
    <Tooltip title="Save">
      <Button type="primary" shape="circle" icon={<CheckOutlined />} onClick = {()=>{handleUpdate(id,todo)}}/>
    </Tooltip>
    </div>
    </div>)
    }
      </>
    
  )
}
