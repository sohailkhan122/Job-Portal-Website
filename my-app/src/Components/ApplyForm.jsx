import React, { useState } from 'react'
import { Alert, Button, Form, Input, Space } from 'antd';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';

const ApplyForm = () => {
    const [showSuccessMessage, setSuccessMessage] = useState(false);
    const [showErrorMessage, setErrorMessage] = useState(false);
    const [message, setMessage] = useState('');
    const navigate = useNavigate()
    const user = typeof window !== 'undefined' ? JSON.parse(localStorage.getItem('user')) : null;
    const { id } = useParams();

    const onFinish = async (values) => {
        const allvalues = { ...values, jobId: id, userId: user.id._id }
        try {
            const response = await axios.post('https://job-portal-website-x40p.onrender.com/applyForm', allvalues);
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
                    navigate('/')
                }, 2000);
            }
        }
    };

    const onFinishFailed = (errorInfo) => {
        console.log('Failed:', errorInfo);
    };
    return (<>
        <Space
            direction="vertical"
            style={{
                width: '100%',
                height: '5px',
                alignItems: 'center',
                transition: '0.5s'
            }}>
            {showSuccessMessage && <Alert message='Successfully Applied' type="success" showIcon />}
            {showErrorMessage && <Alert message={message} type="error" />}
        </Space>
        <div className='MainSignUpContainer'>
            <div className='SignUpBox'>
                <div className='SignUpFields'>
                    <h1>Apply</h1>
                    <Form
                        className='Form'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            initialValue={user.id.name}
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
                            label="Email"
                            name="email"
                            initialValue={user.id.email}
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Phone Number"
                            name="number"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Education"
                            name="education"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your password!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                        >
                            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </div>
            </div>
        </div>
    </>
    )
}

export default ApplyForm