import React from 'react';
import {Col, Row} from "react-bootstrap";

function MyMessage(props) {
    return (
        <div className={'d-flex justify-content-end  mx-3'}>
            <div  className={' myMessage  flex-row d-flex px-3'}>
                <div>
                <div className="myTitle">You</div>
                <div className="myContent"> {props.text}</div>
                </div>
                <span className={'myData'}> </span>
                <div className="myImg " style={{backgroundImage:`url(${props.picture ? `https://api.chat.besoft.kg/${props.picture}` : `https://www.w3schools.com/w3css/img_avatar3.png`})`}}/>
            </div>
        </div>


    );
}

export default MyMessage;