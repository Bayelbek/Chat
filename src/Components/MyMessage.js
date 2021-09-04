import React from 'react';
import {Col, Row} from "react-bootstrap";

function YourMessage(props) {
    return (
        <Row xs={12} md={8}>
            <div  className={' myMessage  d-flex justify-content-end'}>
            <Col sm={11}>
                <div className="myTitle">You</div>
                <div className="myContent"> Эмне кылып жатасынар ? Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium culpa cupiditate dignissimos dolores eos fugit, incidunt ipsa molestiae obcaecati perferendis praesentium quas quasi quos rem suscipit ut vitae voluptas voluptate?</div>
                <span className={'myData'}> </span>
            </Col>
            <Col sm={1} >
                    <div className="myImg" style={{backgroundImage:`url(https://www.w3schools.com/w3css/img_avatar3.png)`}}/>
            </Col>
            </div>

        </Row>


    );
}

export default YourMessage;