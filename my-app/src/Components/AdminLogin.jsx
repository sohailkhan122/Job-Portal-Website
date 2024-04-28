import React, { useState } from 'react';
import { Alert, Button, Form, Input, Space } from 'antd';
import axios from 'axios';

const AdminLogin = () => {
    const [showSuccessMessage, setSuccessMessage] = useState(false);
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const onFinish = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('https://job-portal-website-x40p.onrender.com/AdminLogIn', values);
            localStorage.setItem('admin', JSON.stringify(response.data.msg))
            setMessage(response.data.msg)
            setSuccessMessage(true)
            setTimeout(() => {
                setSuccessMessage(false)
                navigate('/heelo')
            }, 2000);
        } catch (error) {
            console.log(error)
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
            </Space>
            <div className='MainSignUpContainer'>
                <div className='SignUpBox'>
                    <div className='SignUpFields' style={{ marginTop: '70px' }}>
                        <h1>Admin Log In</h1>
                        <Form
                            className='loginForm'
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

                            <Form.Item>
                                <Button
                                    style={{ width: '100%' }}
                                    type="primary"
                                    htmlType="submit"
                                    loading={loading}
                                >
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </div>
                </div>
            </div>
        </>
    )
}

export default AdminLogin;
