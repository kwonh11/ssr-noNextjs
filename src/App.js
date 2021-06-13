import React from 'react';
import AComponent from './pages/AComponent';
import BComponent from './pages/BComponent';
import styled from'styled-components';
import {Button} from '@material-ui/core';

const Container = styled.div`
    width: 100%;
    height: 100px;
    border: 1px solid rgb(200, 200, 200);
    border-radius: 20px;
`;

const router = (path) => {
    switch(path) {
        case "a":
            return AComponent;
        case "b":
            return BComponent;
        default:
            return () => <div />;
    }
}
export default function App({data}) {
    const onClickButton = () => {
        window.alert("clicked !!")
    }
    const Component = router(data.page);
    return (
        <Container>
            <Button color="primary" variant="outlined" onClick={onClickButton}>클릭</Button>
            <Component />
        </Container>
    )
}