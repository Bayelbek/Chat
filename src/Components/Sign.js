import React from 'react';
import {Form, InputGroup, FormControl, Button, Row, Col} from "react-bootstrap";
import axios from "axios";
import {useState} from "react";
import {ToastContainer, toast} from "react-toastify";
import 'react-toastify/dist/ReactToastify.css'

function Sign(props) {
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [status, setStatus] = useState('');
    const [loading, setLoading] = useState(0);
    const [bul, setBul] = useState(false);

    const error = () => {
        toast.error('Код не совпадают', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    };
    const success = () => {
        toast.success('Добро пожаловать !!!', {
            position: "bottom-left",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "colored"
        });
    };


    const send = () => {
        setBul(true)
        const a = axios.post(`https://api.chat.besoft.kg/v1/auth`, {
            phone_number: '996' + phoneNumber
        })
        a.then(({data}) => {
            console.log(data)
            if (data.status.startsWith("not_exists")) {
                setLoading(1)
                setStatus('register')
            } else if (data.status.startsWith("exists_code")) {
                setLoading(2)
                setStatus('loading')
            }
        })
        a.catch((err) => {
            console.log(err)
        })
        a.finally(() => {
            setBul(false)
        })
    }
    const signIn = () => {
        setBul(true)
        const a = axios.post(`https://api.chat.besoft.kg/v1/auth/register`, {
            phone_number: 996 + phoneNumber,
            verification_code: password,
            platform: 'web',
            version_code: 1,
            full_name: fullName,
        })
        a.then(({data}) => {
            console.log(data)
            if (data.status === 'success') {
                localStorage.setItem('data',JSON.stringify([data.payload.token,data.payload.user]))
                props.setUser(data.payload.user)
                success();
            } else {
                error()
            }
        })
        a.catch((err) => {
            console.log(err)
        })
        a.finally(() => {
            setBul(false)
        })
    }
    const signUp = () => {
        setBul(true)
        const a = axios.post(`https://api.chat.besoft.kg/v1/auth/login`, {
            phone_number: 996 + phoneNumber,
            verification_code: password,
            platform: 'web',
            version_code: 1
        })
        a.then(({data}) => {
            console.log(data)
            if (data.status === 'success') {
                localStorage.setItem('data',JSON.stringify([data.payload.token,data.payload.user]))
                props.setUser(data.payload.user);
                success();
            } else {
                error()
            }
        })
        a.catch((err) => {
            console.log(err)
        })
        a.finally(() => {
            setBul(false)
        })
    }
    return (
        <>
            <Row className={'d-flex justify-content-center'}>
                <Col xm={8} md={6}>
                    <div className={'container mt-5  border p-5 '}>
                        <h2>BESOFT OFFICE</h2>
                        <Form>

                            <Form.Label htmlFor="inlineFormInputGroup" visuallyHidden>
                                Username
                            </Form.Label>
                            <InputGroup className="mb-2 mb-4">
                                <InputGroup.Text>+996</InputGroup.Text>
                                <FormControl
                                    disabled={loading}
                                    type={'number'}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    id="inlineFormInputGroup" placeholder="Номер телефона"/>
                            </InputGroup>
                            {status !== '' && status === 'register' ?
                                <FormControl
                                    className={'mb-4'}
                                    onChange={(e) => setFullName(e.target.value)}
                                    id="inlineFormInputGroup" placeholder="Имя"/> : null}
                            {status !== '' ?
                                <FormControl
                                    type={'number'}
                                    className={'mb-4'}
                                    onChange={(e) => setPassword(e.target.value)}
                                    id="inlineFormInputGroup" placeholder="Код подверждение"/> : null}
                            <Button
                                disabled={
                                    phoneNumber.length !== 9 || bul ||
                                    (status === 'register' && (password.length !== 4 || fullName.length < 1)
                                    )}
                                onClick={() => {
                                    if (loading === 0) {
                                        send()
                                    } else if (loading === 1) {
                                        signIn()
                                    } else if (loading === 2) {
                                        signUp()
                                    }
                                }}
                                className={'w-100 mb-3'}>{status === '' ? 'Отправить код' : 'Подтвердить'}</Button>
                        </Form>
                    </div>
                </Col>
            </Row>
        </>
    );
}

export default Sign;