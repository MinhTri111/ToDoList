import 'antd/dist/antd.min.css';
import { useEffect, useState } from 'react';
import './App.css'
import { Divider, Pagination  } from 'antd';
import AddTodo from './component/AddTodo/AddTodo';
import Todo from './component/Todo/Todo';
import { ToastContainer,toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [ListTodo, setListTodo] = useState(JSON.parse(localStorage.getItem('ListTodo')));
  const [current, setCurrent] = useState(1)
  const regex = /^\w/
  useEffect(()=>{
    localStorage.setItem('ListTodo',JSON.stringify(ListTodo))
  },[ListTodo])
  
  const checkItem = (check)=>{
  if((ListTodo.filter((value)=>value.title===check)).length > 0){
    return false
  } 
  else return true
  }

  const handleAdd = (value)=>{
    if(!checkItem(value)){
      toast.error("This to do already exits!!!")
    }
    else{
      if(!(regex.test(value))){
        toast.error("The beginning of character must be a character or a number!!!")
      }
      else{
        const List = [...ListTodo]
        const id = List.length + 1
        List.push({id:id,title:value})
        setListTodo(List)
        toast.success("Add Success!!!")

      }
   
    
    }
   
  }
  const handleDelete = (id)=>{
    downId(id)
  }
  const downId = (id)=>{
    const List = [...ListTodo]
    const ListEdit = List.filter((value)=> ((value.id) > id))
    const NewList= []
    for(var value of ListEdit){
      NewList.push({...value,id:value.id-1})
    }
    List.splice(id,List.length-id,...NewList)
    List.splice(id-1,1)
    setListTodo(List)
  }

  const handleEdit = (id,value)=>{
    if(!checkItem(value)){
      toast.error("This to do already exits!!!")
    }
    else{
      if(!(regex.test(value))){
        toast.error("The beginning of character must be a character or a number!!!")
      }
      else{
        const List = [...ListTodo]
        const ItemEdit = List.filter((value)=> value.id === id)
        const NewItemEdit = {...ItemEdit[0],title:value}
        List.splice(id-1,1,NewItemEdit)
        setListTodo(List)
        toast.success("Edit Success!!!")
      }
      
    }
    
  }
  const handleChange = page => {
    setCurrent(page)
  };
  return (
    <>
    <h1>Todo App</h1>
    
    <div className="App">
    <div className="TodoList">
    <div className="AddTodo">
      <AddTodo handleAdd = {handleAdd}/>
    </div>
    <div className="List">
    {   
        ListTodo.filter((value)=>(value.id >(current+3*(current-1)-1) && (value.id <=((current*4+1)-1)))).map((value,key)=>(
          <div key={key}>
              <Divider orientation="left" plain>Task {value.id}:</Divider>
              <Todo value={value.title} id={value.id} handleDelete = {handleDelete} handleEdit = {handleEdit}/>
               
               </div>
            ))
      }
      
      <Pagination 
      current={current}
      onChange={handleChange} 
      total={(Math.ceil(ListTodo.length*10/40))*10}
       />
    </div>
      
      
    </div>
  
    </div>
 
    <ToastContainer />
    </>
  );
}

export default App;
