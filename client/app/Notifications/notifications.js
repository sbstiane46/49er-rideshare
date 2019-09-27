import React from 'react';
import styled from 'styled-components';


const Container = styled.div`
    background-color: #444;
    color: white;
    padding: 16px;
    position: absolute;
    top: 16px;
    right: 16px;
    z-index: 999;
    transition: top 0.5s ease;
`;

export default class Notification extends React.component {
    render(){
        return(
            <Container>text</Container>
        );
    }
}
