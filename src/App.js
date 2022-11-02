import React from "react";

import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import styled from "styled-components";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
// import Badge from 'react-bootstrap/Badge';
import ListGroup from 'react-bootstrap/ListGroup';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import { addItem, deleteItem, updateItem } from "./redux/modules/todos";
import Modal from 'react-bootstrap/Modal';

import { v4 as uuid } from 'uuid';

const Container = styled.div`
  /* background-color: grey; */
  margin: 25px;
  width: 500px;
  height: 300px;
  align-items: center;
  align-content: center;
`;

const TodoForm = () => {
  const dispatch = useDispatch();
  const [toDo, setTodo] = useState({ id: 0, title: '', description: '', isDone: false });


  const handleNewTodoTitle = ({ target: { value } }) => { // value destructured from event.target.value
    setTodo(current => ({ ...current, title: value }))
  };

  const handleNewTodoDesc = ({ target: { value } }) => { // value destructured from event.target.value
    setTodo(current => ({ ...current, description: value }))
  };

  const createNewTodo = () => {
    const newId = uuid().slice(0, 8);
    setTodo(current => ({ ...current, id: newId }))

    if (!(toDo.title && toDo.description)) return; //do nothing if toDo properties falsified
    dispatch(addItem(toDo));
    alert(toDo.title + ' ' + toDo.description + ' ' + toDo.id + ' ' + toDo.isDone);
  };

  return (
    <Form>
      <Form.Group className="mb-3">
        <Form.Label><h3>My Todo List</h3></Form.Label>
        <Form.Control
          onChange={handleNewTodoTitle}
          type="text"
          placeholder="Title" />
        <Form.Control
          as="textarea"
          onChange={handleNewTodoDesc}
          placeholder="What's on your mind..." />
      </Form.Group>
      {/* <Form.Group className="mb-3">
        <Form.Label>Add activity</Form.Label>
        <Form.Control onChange={handleNewTodo} type="text" placeholder="What's on your mind..." />
      </Form.Group> */}
      <Button onClick={createNewTodo} variant="primary" size="sm">
        Add +
      </Button>
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



  // const toDos = ['Task 1','Task 2','Task 3'];
  return (
    <Container>
      <h5>To Dos : {countIncomplete}</h5>
      <ListGroup variant="flush" as="ol" numbered>
        {toDosIncomplete.map(task => {
          return (<ListGroup.Item
            as="li"
            className="d-flex justify-content-between align-items-start"
            key={task.id}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold">{task.title}</div>
              {task.description}
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
            key={task.id}
          >
            <div className="ms-2 me-auto">
              <div className="fw-bold"><s>{task.title}</s></div>
              <s>{task.description}</s>
            </div>
            <DropdownButton
              drop={'end'}
              variant="link"
              title={'Action'}
              size=""
            >
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

    </Container>
  );
};

const App = () => {
  return (
    <div>
      <Container className="MainContainer">
        <TodoForm />
        <TodoList />
      </Container>
    </div>
  );
};

export default App;