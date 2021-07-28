import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { Button, Card, Modal } from 'react-bootstrap';

interface IChanges {
    title: string;
    todo: string;
    id: number;
}

interface ITodoList {
    title: string;
    todo: string;
    id: number;
    handleRemoveTodo: (id: number) => void;
    handleTodoEdit: (id: number) => void;
    handleUpdateTodo: (e: React.ChangeEvent<HTMLInputElement>) => void;
    changes: IChanges;
    handleSaveOnChange: () => void;
}

const TodoList = ({
    title,
    todo,
    id,
    handleRemoveTodo,
    handleTodoEdit,
    handleUpdateTodo,
    changes,
    handleSaveOnChange,
}: ITodoList) => {
    // bootstrap modal start
    const [show, setShow] = useState<boolean>(false);
    const handleClose = () => setShow(false);
    const handleShow = () => {
        setShow(true);
        handleTodoEdit(id);
    };
    // bootstrap modal end

    return (
        <div className='Todo-card'>
            <Card className='my-2'>
                <Card.Body className='d-flex justify-content-between'>
                    <span>
                        <strong>{title}: </strong> {todo}
                    </span>
                    <>
                        <span>
                            <FontAwesomeIcon
                                onClick={handleShow}
                                icon={faEdit}
                                className="text-success me-1"
                            />
                            <FontAwesomeIcon
                                onClick={() => handleRemoveTodo(id)}
                                icon={faTrashAlt}
                                className="text-danger"
                            />
                        </span>
                        <Modal show={show} onHide={handleClose}>
                            <Modal.Header closeButton>
                                <Modal.Title>Edit</Modal.Title>
                            </Modal.Header>
                            <Modal.Body>
                                <form>
                                    <input
                                        className='form-control'
                                        value={changes.title}
                                        type='text'
                                        name='title'
                                        placeholder='Title'
                                        onChange={handleUpdateTodo}
                                    />
                                    <input
                                        className='form-control'
                                        value={changes.todo}
                                        type='text'
                                        name='todo'
                                        placeholder='Write your todo here'
                                        onChange={handleUpdateTodo}
                                    />
                                </form>
                            </Modal.Body>
                            <Modal.Footer>
                                <Button
                                    variant='secondary'
                                    onClick={handleClose}
                                >
                                    Cancel
                                </Button>
                                <Button variant='primary' onClick={handleClose}>
                                    <span onClick={handleSaveOnChange}>
                                        Save Changes
                                    </span>
                                </Button>
                            </Modal.Footer>
                        </Modal>
                    </>
                </Card.Body>
            </Card>
        </div>
    );
};

export default TodoList;
