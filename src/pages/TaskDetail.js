import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import Button from "react-bootstrap/Button";
// import Form from "react-bootstrap/Form";
import ListGroup from 'react-bootstrap/ListGroup';
// import Dropdown from 'react-bootstrap/Dropdown';
// import DropdownButton from 'react-bootstrap/DropdownButton';
// import Modal from 'react-bootstrap/Modal';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
// import Stack from 'react-bootstrap/Stack';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Tooltip from 'react-bootstrap/Tooltip';

import styled from "styled-components";

const TaskDetail = () => {
    const changePage = useNavigate();
    const pageParams = useParams();
    // alert(pageParams.id);
    const selected = useSelector(state => state.toDos.items).filter(item => item.id === pageParams.id);


    return (
        <Container>
            <Row>
                <Col>
                    <div>
                        <h1>Task Detail :</h1>
                        <Button variant="link"
                                title={'Action'} onClick={() => changePage('/')}>Back to home</Button>
                    </div>
                </Col>
            </Row>

            <Row>
                <ListGroup variant="flush" as="ol">
                    {selected.map(task => {
                        return (<ListGroup.Item
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                            key={task.id}>
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">
                                    {task.title}
                                </div>
                                    {task.description}
                            </div>
                        </ListGroup.Item>)
                    })}
                </ListGroup>
            </Row>
        </Container>
    );
};

export default TaskDetail;