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
import { addItem, deleteItem } from "./redux/modules/todos";

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

    if (!(toDo.title && toDo.description)) return; //do nothing if toDo falsified
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



  const toDos = useSelector(state => state.toDos.items);
  const count = useSelector(state => state.toDos.items.length);

  const deleteTodo = (taskId) => {
    alert(taskId);
    dispatch(deleteItem(taskId));
  };


  // const toDos = ['Task 1','Task 2','Task 3'];
  return (
    <Container>
      <h5>To Dos : {count}</h5>
      <ListGroup variant="flush" as="ol" numbered>
        {toDos.map(task => {

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
              <Dropdown.Item >Complete task</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item onClick={() => { deleteTodo(task.id) }} >Delete task</Dropdown.Item>
            </DropdownButton>
          </ListGroup.Item>)

        })}
      </ListGroup>
      <h5>Completed:</h5>


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