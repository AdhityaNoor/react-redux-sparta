// import { useNavigate } from "react-router-dom";

import React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addItem, deleteItem, updateItem } from "../redux/modules/todos";
import { v4 as uuid } from 'uuid';

import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Stack from 'react-bootstrap/Stack';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

import styled from "styled-components";
import { Link } from "react-router-dom";


const TodoForm = () => {
    const dispatch = useDispatch();
    const [toDo, setTodo] = useState({ id: '', title: '', description: '', isDone: false });


    const handleNewTodoTitle = ({ target: { value } }) => { // value destructured from event.target.value
        setTodo(current => ({ ...current, title: value }))
    };

    const handleNewTodoDesc = ({ target: { value } }) => { // value destructured from event.target.value
        setTodo(current => ({ ...current, description: value }))
    };

    const createNewTodo = () => {
        const newId = uuid();
        alert (newId);
        setTodo(current => ({ ...current, id: newId }))
        alert (toDo.id);
        if (!(toDo.title && toDo.description && toDo.id)) return; //do nothing if toDo properties falsified
        dispatch(addItem(toDo));
        // alert(toDo.title + ' ' + toDo.description + ' ' + toDo.id + ' ' + toDo.isDone);
    };

    return (
        <Form>
            <Stack gap={0}>
                <Form.Group className="mb-3">
                    <Stack gap={2} className="col-md-5 mx-auto">
                        <Form.Label><h3>My Todo List</h3></Form.Label>
                        <Form.Control
                            onChange={handleNewTodoTitle}
                            type="text"
                            placeholder="Title" />
                        <Form.Control
                            as="textarea"
                            onChange={handleNewTodoDesc}
                            placeholder="What's on your mind..." />
                        <Button onClick={createNewTodo} variant="primary" size="sm">
                            Add +
                        </Button>
                    </Stack>
                </Form.Group>
            </Stack>
        </Form>
    );
};


const TodoList = () => {

    const dispatch = useDispatch();

    const [modalShow, setModalShow] = useState(false);

    const toDos = useSelector(state => state.toDos.items);
    // const count = useSelector(state => state.toDos.items.length);

    const toDosIncomplete = toDos.filter(incompleted => { return !incompleted.isDone });
    const countIncomplete = toDosIncomplete.length;

    const toDosComplete = toDos.filter(completed => { return completed.isDone });
    const countComplete = toDosComplete.length;

    const deleteTodo = (taskId) => {
        dispatch(deleteItem(taskId));
    };

    const updateTodo = (taskId, isDone) => {
        const payload = {
            id: taskId,
            status: isDone ? false : true
        }
        alert(taskId + ' is going to be updated ' + payload.status);
        dispatch(updateItem(payload));
    };

    const DeleteConfirmationModal = (props) => {
        return (
            <Modal
                {...props}
                size="sm"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Delete task ?
                    </Modal.Title>
                </Modal.Header>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={() => { deleteTodo(props.taskid) }}>Yes</Button>
                    <Button onClick={props.onHide}>No</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    const Desc = styled.div`
        width: 350px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    `;


    // const toDos = ['Task 1','Task 2','Task 3'];
    return (
        <Container>
            <Stack gap={2} className="col-md-5 mx-auto">
                <h5>To Dos : {countIncomplete}</h5>
                <ListGroup variant="flush" as="ol" numbered>
                    {toDosIncomplete.map(task => {
                        return (<ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            key={task.id}
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    {task.title}
                                </div>
                                <OverlayTrigger
                                    key={'right'}
                                    placement={'right'}
                                    overlay={
                                        <Tooltip>
                                            Go to details
                                        </Tooltip>
                                    }
                                >
                                    <Desc>
                                        <Link to={`/detail/${task.id}`}>
                                            {task.description}
                                        </Link>
                                    </Desc>
                                </OverlayTrigger>
                            </div>
                            <DropdownButton
                                drop={'end'}
                                variant="link"
                                title={'Action'}
                                size=""
                            >
                                <Dropdown.Item onClick={() => { updateTodo(task.id, task.isDone) }} >Complete task</Dropdown.Item>
                                <Dropdown.Item onClick={() => setModalShow(true)} >Delete task</Dropdown.Item>
                                <DeleteConfirmationModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    taskid={task.id}
                                />
                            </DropdownButton>
                        </ListGroup.Item>
                        )
                    })}
                </ListGroup>
                <h5>Completed: {countComplete}</h5>
                <ListGroup variant="flush" as="ol" numbered>
                    {toDosComplete.map(task => {
                        return (<ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            key={task.id}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    <s>{task.title}</s>
                                </div>
                                <Desc>
                                    <s>{task.description}</s>
                                </Desc>
                            </div>
                            <DropdownButton
                                drop={'end'}
                                variant="link"
                                title={'Action'}
                                size="">
                                <Dropdown.Item onClick={() => { updateTodo(task.id, task.isDone) }} >Un-Complete task</Dropdown.Item>
                                <Dropdown.Item onClick={() => setModalShow(true)} >Delete task</Dropdown.Item>
                                <DeleteConfirmationModal
                                    show={modalShow}
                                    onHide={() => setModalShow(false)}
                                    taskid={task.id}
                                />
                            </DropdownButton>
                        </ListGroup.Item>)
                    })}
                </ListGroup>

            </Stack>
        </Container>
    );
};

const LandingPage = () => {
    return (
        <div>
            <Container >
                <Row>
                    <Col><TodoForm /></Col>
                </Row>
                <Row>
                    <Col><TodoList /></Col>
                </Row>
            </Container>
        </div>
    );
};

export default LandingPage;