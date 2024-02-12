import { Alert, Button, Form, Input, Space } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';

const JobEdit = () => {
    const [showSuccessMessage, setSuccessMessage] = useState(false);
    const [data, setdata] = useState({});
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("user"))
    const { id } = useParams()

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get(`http://localhost:8000/singleJobs/${id}`);
                setdata(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [id, setdata]);

    const onFinish = async (values) => {
        const allValues = { ...values, createdBy: user.id._id }
        try {
            await axios.put(`http://localhost:8000/jobEdit/${id}`, allValues);
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
            {showSuccessMessage && <Alert message='Successfully Job Updated' type="success" showIcon />}
        </Space>
        <div className='MainSignUpContainer'>
            <div className='SignUpBox  CreateJobBox'>
                <div className='SignUpFields CreateJobFields'>
                    <h1>Update Job</h1>
                    <Form
                        className='Form'
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        // autoComplete="off"
                        initialValues={{
                            jobtittle: data.jobtittle,
                            company: data.company,
                            workplacetype: data.workplacetype,
                            joblocation: data.joblocation,
                            jobtype: data.jobtype,
                        }}
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

export default JobEdit