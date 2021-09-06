import React from 'react';
import {Col, Row} from "react-bootstrap";
import '../App.css'

function YourMessage(props) {
    return (
<div className={'d-flex'}>
            <div className={'yourMessage flex-row d-flex px-3' }>
                <div className="myImg"
                     style={{backgroundImage: `url(${props.picture ? `https://api.chat.besoft.kg/${props.picture}` : `https://www.w3schools.com/w3css/img_avatar3.png`})`}}/>
                <div>
                    <div className="title">{props.full_name} </div>
                    <div className="content"> {props.text}</div>
                    <span className={'data'}> </span>
                </div>
            </div>
</div>
    );
}

export default YourMessage;