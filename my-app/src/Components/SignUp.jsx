import React, { useState } from 'react';
import { Alert, Button, Checkbox, Form, Input, Space } from 'antd';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const SignUp = () => {
    const [showSuccessMessage, setSuccessMessage] = useState(false);
    const [showErrorMessage, setErrorMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate()

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('https://job-portal-website-x40p.onrender.com/userSignUp', values);
            setMessage(response.data.msg)
            setSuccessMessage(true)
            setTimeout(() => {
                setSuccessMessage(false)
                navigate('/login')
            }, 2000);
        } catch (error) {
            if (error.response.status === 400) {
                setMessage(error.response.data.msg)
                setErrorMessage(true)
                setTimeout(() => {
                    setErrorMessage(false)
                }, 2000);
            }
            console.log(error.response.data.msg)
        } finally {
            setLoading(false);
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
                <div className='SignUpBox'>
                    <div className='SignUpFields'>
                        <h1>Sign Up</h1>
                        <Form
                            className='Form'
                            onFinish={onFinish}
                            onFinishFailed={onFinishFailed}
                            autoComplete="off"
                        >
                            <Form.Item
                                label="Name"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your Name!',
                                    },
                                ]}
                            >
                                <Input />
                            </Form.Item>
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

                            <Form.Item>
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
                        <p>Already have an account? <Link to={'/login'}><span>Log In</span></Link></p>
                    </div>
                </div>
            </div>
        </>
    )
}

export default SignUp;
