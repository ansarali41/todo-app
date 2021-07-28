import React, { useState } from 'react';
import { Button, Col, Row } from 'react-bootstrap';
import TodoList from './TodoList';

interface ITodo {
    title: string;
    todo: string;
    id: number;
}

const Todo = () => {
    const [id, setId] = useState<number>(0);
    const [todo, setTodo] = useState<ITodo>({} as ITodo);
    const [todoList, setTodoList] = useState<ITodo[]>([]);

    const [changes, setChanges] = useState<ITodo>({} as ITodo);

    // handleToDo change or Add to do
    const handleTodoChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setTodo({ ...todo, [e.target.name]: e.target.value, id: id });
    };

    const handleAddTodo = (e: React.MouseEvent<HTMLButtonElement>): void => {
        e.preventDefault();
        setId(id + 1);
        setTodo({ ...todo, id: id });
        setTodoList([...todoList, todo]);
        setTodo({
            title: '',
            todo: '',
            id: id,
        });
    };

    // handle todo remove button
    const handleRemoveTodo = (id: number) => {
        const filteredTodoList = todoList.filter((todo) => todo.id !== id);
        setTodoList(filteredTodoList);
    };

    // edit todo function
    const handleTodoEdit = (id: number) => {
        const fTodo = todoList.filter((todo) => todo.id === id);
        setChanges(fTodo[0]);
    };

    // update todo modal input
    const handleUpdateTodo = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setChanges({ ...changes, [e.target.name]: e.target.value });
    };

    // save on change
    const handleSaveOnChange = () => {
        const indexOfId: number = todoList.findIndex(
            (t) => t.id === changes.id
        );
        todoList.splice(indexOfId, 1, changes);
        setTodoList(todoList);
        console.log('clicked');
    };

    return (
        <div>
            <img className='img-responsive w-25' src="https://i.ibb.co/KXx50d1/Todo-Logo1.png" alt="" />
            <form>
                <Row className='d-flex justify-content-center text-center'>
                    <Col xs={0} md={3} lg={3}></Col>
                    <Col xs={12} md={6} lg={6}>
                        <input
                            className='form-control mt-2'
                            value={todo.title}
                            type='text'
                            name='title'
                            placeholder='Title'
                            onChange={handleTodoChange}
                        />
                        <input
                            className='form-control mt-2'
                            value={todo.todo}
                            type='text'
                            name='todo'
                            placeholder='Write your todo here'
                            onChange={handleTodoChange}
                        />
                    </Col>
                    <Col xs={0} md={3} lg={3}></Col>
                </Row>

                <Button
                    className='px-5 mt-2'
                    variant='dark'
                    onClick={handleAddTodo}
                >
                    Add
                </Button>
                {todoList.map((t) => (
                    <TodoList
                        key={t.id}
                        title={t.title}
                        todo={t.todo}
                        id={t.id}
                        handleRemoveTodo={handleRemoveTodo}
                        handleTodoEdit={handleTodoEdit}
                        handleUpdateTodo={handleUpdateTodo}
                        changes={changes}
                        handleSaveOnChange={handleSaveOnChange}
                    />
                ))}
            </form>
        </div>
    );
};

export default Todo;
