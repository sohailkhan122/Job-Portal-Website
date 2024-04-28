import React, { useState } from 'react';
import { Alert, Button, Checkbox, Form, Input, Space } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

const Login = () => {
    const [showSuccessMessage, setSuccessMessage] = useState(false);
    const [showErrorMessage, setErrorMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false); // Add loading state for submit button
    const navigate = useNavigate();

    const onFinish = async (values) => {
        setLoading(true); // Set loading state to true when form is submitted
        try {
            const response = await axios.post('http://localhost:8000/userLogIn', values);
            const decoded = jwtDecode(response.data.token);
            localStorage.setItem('user', JSON.stringify(decoded))
            setMessage(response.data.msg)
            setSuccessMessage(true)
            setTimeout(() => {
                setSuccessMessage(false)
                navigate('/')
            }, 2000);
        } catch (error) {
            if (error.response.status === 400) {
                setMessage(error.response.data.msg)
                setErrorMessage(true)
                setTimeout(() => {
                    setErrorMessage(false)
                }, 2000);
            }
        } finally {
            setLoading(false); // Set loading state to false when response is received
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };

    return (
        <>
            <Space
                direction="vertical"
                style={{
                    width: '100%',
                    height: '5px',
                    alignItems: 'center',
                    transition: '0.5s'
                }}>
                {showSuccessMessage && <Alert message={message} type="success" showIcon />}
                {showErrorMessage && <Alert message={message} type="error" />}
            </Space>
            <div className='MainSignUpContainer'>
                <h3 className='admin' onClick={()=>navigate('/adminLogin')}>Admin</h3>
                <div className='SignUpBox'>
                    <div className='SignUpFields'>
                        <h1>Log In</h1>
                        <Form
                            className='loginForm'
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Email"
                                name="email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Email!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>

                            <Form.Item
                                label="Password"
                                name="password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your password!',
                                    },
                                ]}
                            >
                                <Input.Password />
                            </Form.Item>
                            <div className='ForgetPassword'>
                                <Form.Item
                                    name="remember"
                                    valuePropName="checked"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please check Remeber!',
                                        }
                                    ]}
                                >
                                    <Checkbox>Remember me</Checkbox>
                                </Form.Item>
                                <Link to={'/forget'}><p>Forget Password ?</p></Link>
                            </div>
                            <Form.Item
                            >
                                <Button
                                    style={{ width: '100%' }}
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading} // Set loading state for the submit button
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                        <p>Don't have an account ? <Link to={'/register'}><span>Sign Up</span></Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Login;
