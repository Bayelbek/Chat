import React from 'react';
import {Col, Row} from "react-bootstrap";

function YourMessage(props) {
    return (
        <Row  md={8} xs={12} className={'yourMessage'}>
            <Col md={1} >
                <div className="myImg" style={{backgroundImage:`url(https://www.w3schools.com/w3css/img_avatar3.png)`}}/>
            </Col>
            <Col md={11}>
                <div className="title">Bayel </div>
                <div className="content"> Эмне кылып жатасынар?</div>
                <span className={'data'}> </span>
            </Col>

        </Row>
    );
}

export default YourMessage;