import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import styled from 'styled-components';

import store from "../redux/config/configStore";
import { Provider } from "react-redux";

// import store from "../redux/config/configStore";

// import { Provider } from 'react-redux';

const StyledContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const StyledCard = styled.div`
    margin: 10px;
    width: 200px;
    height: 300px;
    background-color: ${props => props.backgroundColor};
    border: 3px darkgray solid; 
    border-radius: 20px;
    text-align: center;
`;

const StyledSpan = styled.span`
    margin-left: 10px;
    margin-right: 10px;
    font-size: 20px;
    color: white;
`;

const Card = ({ title, status, isDone, count }) => {
    return (
        <StyledCard backgroundColor={isDone ? 'lightgreen' : 'darkgray'}>
            <StyledSpan>{title}</StyledSpan>
            <StyledSpan>{status}</StyledSpan>
            <h1>{count}</h1>
        </StyledCard>
    );
}

const Cards = () => {

    const [inputContent, setInputContent] = useState('');
    useEffect(() => { console.log('setInputContent: ' + inputContent) });
    const globalCounter = useSelector(state => state.counterReducerKey)


    const tasks = [
        {
            key: 1,
            name: 'Eat',
            status: '',
            isDone: true
        },
        {
            key: 2,
            name: 'Sleep',
            status: 'test',
            isDone: true
        },
        {
            key: 3,
            name: 'Code',
            status: 'test',
            isDone: false
        },
        {
            key: 4,
            name: 'Repeat',
            status: 'test',
            isDone: true
        },
    ];

    // function increaseCount() {
    //     window.alert('increased');
    // };

    // function decreaseCount() {
    //     window.alert('decreased');
    // };

    return (
        <Provider store={store}>
            <div>
                <input
                    value={inputContent}
                    onChange={event => setInputContent(event.target.value)}></input>
                <StyledContainer>
                    {tasks.map((task) => {
                        return (

                            <Card title={task.name} status={task.status} isDone={task.isDone} key={task.key} count={globalCounter} />
                        );
                    })}
                </StyledContainer>
            </div>
        </Provider>
    );
}

export default Cards;