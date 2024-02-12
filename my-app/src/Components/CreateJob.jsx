import { Alert, Button, Form, Input, Space } from 'antd';
import TextArea from 'antd/es/input/TextArea';
import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate} from 'react-router-dom';

const CreateJob = () => {
    const [showSuccessMessage, setSuccessMessage] = useState(false);
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"))

    const onFinish = async (values) => {
        const allValues = { ...values, createdBy: user.id._id, disabled:false }
        try {
            await axios.post('http://localhost:8000/createjob', allValues);
            setSuccessMessage(true)
            setTimeout(() => {
                setSuccessMessage(false)
                navigate('/')
            }, 2000);
        } catch (error) {
            console.log(error)
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
            {showSuccessMessage && <Alert message='Successfully Job Created' type="success" showIcon />}
        </Space>
        <div className='MainSignUpContainer'>
            <div className='SignUpBox  CreateJobBox'>
                <div className='SignUpFields CreateJobFields'>
                    <h1>Create Job</h1>
                    <Form
                    style={{paddingTop:'10px'}}
                        className='Form'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete="off"
                    >
                        <Form.Item
                            label="Job Tittle"
                            name="jobtittle"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Job Tittle!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Company"
                            name="company"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Company!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Work Place Type"
                            name="workplacetype"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input Work Place Type!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Job Location"
                            name="joblocation"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Job Location!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="Job Type"
                            name="jobtype"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Job Type!',
                                },
                            ]}
                        >
                            <Input />
                        </Form.Item>

                        <Form.Item
                            label="About Info"
                            name="aboutInfo"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Job Type!',
                                },
                            ]}
                        >
                            <TextArea />
                        </Form.Item>

                        <Form.Item
                        >
                            <Button style={{ width: '100%' }} type="primary" htmlType="submit">
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

export default CreateJob