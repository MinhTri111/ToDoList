import React from 'react'
import { PlusCircleOutlined } from '@ant-design/icons';
import { Button, Tooltip, Input  } from 'antd';
import { toast} from 'react-toastify';
import './addtodo.css'
import { useState } from 'react';
export default function AddTodo(props) {
    const [newTodo, setNewTodo] = useState("")
    const {handleAdd} = props
    const handleChange =  (e)=>{
        setNewTodo(e.target.value)
    }
    const handleAddNewTodo = ()=>{
        if(newTodo){
            handleAdd(newTodo)
            setNewTodo("")
        }
        else{
            toast.error("This field is required!!!")
        }
        
       
    }

  return (
  <div className="Add">
        <label htmlFor="todo">Input Todo</label>
        <Input placeholder="New Todo"  size="small" id="todo" onChange={handleChange} value ={newTodo}/>
        <Tooltip title="Add">
      <Button type="primary" shape="circle" icon={<PlusCircleOutlined/>} onClick={()=>{handleAddNewTodo()}}/>
    </Tooltip>
  </div>
  )
}
