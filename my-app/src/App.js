import 'antd/dist/antd.min.css';
import { useEffect, useState } from 'react';
import './App.css';
import { Divider, Pagination } from 'antd';
import AddTodo from './component/AddTodo/AddTodo';
import Todo from './component/Todo/Todo';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
    const [listTodo, setListTodo] = useState([]);
    console.log('renderlai');
    console.log('List', listTodo);
    const [current, setCurrent] = useState(1);
    const regex = /^\w/;
    useEffect(() => {
        if (localStorage.getItem('todos')) {
            setListTodo(JSON.parse(localStorage.getItem('todos')));
        }
    }, []);

    useEffect(() => {
        if (listTodo.length > 0) {
            localStorage.setItem('todos', JSON.stringify(listTodo));
        }
    }, [listTodo]);

    const checkItemExits = (check) => {
        if (listTodo.filter((value) => value.title === check).length > 0) {
            return false;
        }
        return true;
    };

    const addNewItem = (value) => {
        if (value) {
            if (!checkItemExits(value)) {
                toast.error('This to do already exits!!!');
            } else {
                if (!regex.test(value)) {
                    toast.error('The beginning of character must be a character or a number!!!');
                } else {
                    const list = [...listTodo];
                    console.log('list', list);
                    const id = list.length + 1;
                    list.push({ id: id, title: value });
                    setListTodo(list);
                    toast.success('Add Success!!!');
                }
            }
        } else {
            toast.error('This field is required!!!');
        }
    };
    const deleteItem = (id) => {
        downId(id);
    };
    const downId = (id) => {
        const list = [...listTodo];
        const listEdit = list.filter((value) => value.id > id);
        const newList = [];
        for (var value of listEdit) {
            newList.push({ ...value, id: value.id - 1 });
        }
        list.splice(id, list.length - id, ...newList);
        list.splice(id - 1, 1);
        setListTodo(list);
    };

    const updateItem = (id, value) => {
        if (value) {
            if (!checkItemExits(value)) {
                toast.error('This to do already exits!!!');
            } else {
                if (!regex.test(value)) {
                    toast.error('The beginning of character must be a character or a number!!!');
                } else {
                    const list = [...listTodo];
                    const indexItemEdit = list.findIndex((value) => value.id === id);
                    const newItemEdit = { ...list[indexItemEdit], title: value };
                    list[indexItemEdit] = newItemEdit;
                    setListTodo(list);
                    toast.success('Edit Success!!!');
                }
            }
        } else {
            toast.error('This field is required!!!');
        }
    };
    const handleChangePage = (page) => {
        setCurrent(page);
    };
    return (
        <>
            <h1>Todo App</h1>

            <div className="App">
                <div className="TodoList">
                    <div className="AddTodo">
                        <AddTodo addNewItem={addNewItem} />
                    </div>
                    <div className="List">
                        {listTodo
                            .filter(
                                (value) =>
                                    value.id > current + 3 * (current - 1) - 1 && value.id <= current * 4 + 1 - 1,
                            )
                            .map((value, key) => (
                                <div key={key}>
                                    <Divider orientation="left" plain>
                                        Task {value.id}:
                                    </Divider>
                                    <Todo
                                        value={value.title}
                                        id={value.id}
                                        deleteItem={deleteItem}
                                        updateItem={updateItem}
                                    />
                                </div>
                            ))}

                        <Pagination
                            current={current}
                            onChange={handleChangePage}
                            total={Math.ceil((listTodo.length * 10) / 40) * 10}
                        />
                    </div>
                </div>
            </div>

            <ToastContainer />
        </>
    );
}

export default App;
