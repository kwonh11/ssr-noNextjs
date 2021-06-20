import React, {useEffect} from 'react';
import AComponent from './pages/AComponent';
import BComponent from './pages/BComponent';
import styled from'styled-components';
import {Button} from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux';
import {actions} from './redux/common/state';

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
    const dispatch = useDispatch();
    const theme = useSelector(state => state.common.themeColor);
    
    useEffect(() => {
        setTimeout(() => {
            dispatch(actions.setThemeColor("dark"));
        }, 2000)
    }, [])
    const onClickButton = () => {
        window.alert("clicked !!")
    }
    const Component = router(data.page);
    return (
        <Container>
            <Button color="primary" variant="outlined" onClick={onClickButton}>{theme}</Button>
            <Component />
        </Container>
    )
}