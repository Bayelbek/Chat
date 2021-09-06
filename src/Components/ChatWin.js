import React, {useState} from 'react';
import {
    Button,
    Col,
    Container,
    Form,
    FormControl,
    FormGroup,
    InputGroup,
    ListGroup,
    Navbar,
    Row
} from "react-bootstrap";
import MyMessage from "./MyMessage";
import YourMessage from "./YourMessage";
import '../App.css'
import axios from "axios";
import {useEffect} from "react";


function ChatWin(props) {
    const [users, setUsers] = useState([]);
    const [message, setMessage] = useState([]);
    const [input, setInput] = useState('');

    useEffect(() => {
        const a = axios.get(`https://api.chat.besoft.kg/v1/message`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('data'))[0]} `
            }
        })
        a.then(({data}) => {
            setMessage(data.payload)
        })

        const b =  axios.get(`https://api.chat.besoft.kg/v1/user`, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('data'))[0]} `
            }
        })
            b.then(({data})=>{
                setUsers(data.payload)
                console.log(data)
            })
    }, []);


    const sendMessage = () => {
        const a = axios.post(`https://api.chat.besoft.kg/v1/message`, {
            text: input
        }, {
            headers: {
                'Authorization': `Bearer ${JSON.parse(localStorage.getItem('data'))[0]} `
            }
        });
        a.then(({data}) => {
            setInput('')
        })
        a.finally(()=>{

        })
    }
    return (
        <div className={'chat'}>
            <Navbar style={{background: '#003367'}} variant="dark">
                <Container>
                    <Navbar.Brand href="#home">BESOFT CHAT</Navbar.Brand>
                </Container>
            </Navbar>
            <Row className={'m-0 p-0'}>
                <Col className={'p-0'} xs={3}>
                    <div className={'d-none d-md-block users'} style={{height: 530, width: '100%', background: '#002045',overflowY:'scroll'}}>
                        <ListGroup as="ul" >
                            <div className={'container'}>
                                <ListGroup.Item className={'text-center'} as="li"  style={{fontWeight:600,background:'#ffffff'}} >
                                    В группе
                                </ListGroup.Item>
                            {users.map((item)=>{
                                return(
                                    <ListGroup.Item as="li"  style={{background:'#002045',color:"white"}} >
                                        {item.full_name} /<span style={{color:'grey'}}>{item.phone_number}</span>
                                    </ListGroup.Item>
                                )
                            })}
                            </div>
                        </ListGroup>
                    </div>
                </Col>
                <Col xs={12} md={9} className={'p-0'}>
                    <div className={'sc'} style={{height: 480, width: '100%', overflowY: "scroll"}}>
                        {message.map((item) => {
                            if (item.user.id === JSON.parse(localStorage.getItem('data'))[1].id) {
                                return <MyMessage picture={item.user.picture ? item.user.picture.path.original : null}
                                                  text={item.text} created_at={item.created_at}/>
                            } else {
                                return <YourMessage full_name={item.user.full_name}
                                                    picture={item.user.picture ? item.user.picture.path.original : null}
                                                    text={item.text}
                                                    created_at={item.created_at}/>
                            }
                        })}
                    </div>
                    <div>
                        <InputGroup>
                            <FormControl
                                onChange={(e) => setInput(e.target.value)}
                                value={input}
                            />
                            <Button
                                type={'submit'}
                                onClick={() => {
                                    sendMessage()
                                }}
                                variant={'danger'} disabled={ input.length < 1}>отправить</Button>
                        </InputGroup>
                    </div>
                </Col>
            </Row>
        </div>
    );
}

export default ChatWin;