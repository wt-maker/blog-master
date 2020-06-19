import React, {useState, useEffect} from 'react'
import {withRouter} from 'react-router-dom'
import { Form, Input, PageHeader, Button, Col, Row } from 'antd'
import { CirclePicker } from 'react-color'
import axios from 'axios'
const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
}


const TagAdd = (props) => {

    const [color, setColor] = useState('#f44336')
    const onFinish = (values) => {
        let {tag} = values
        let request_body = {
            name:tag,
            color:color
        }
        axios.post('/api/addTag', request_body).then(
            ()=>{
                props.history.push('/tag/list')
            },
            ({response}) => {
                console.log(response)
            }
        )
    }

    const handleChangeColor = (color) => {
        setColor(color.hex)
    }
    return (
        <Form onFinish={onFinish} layout='horizontal' {...layout} className="addTag">
            <PageHeader className="site-page-header" title="添加标签" />
            <Row align="top">
                <Col span={8}>
                    <Form.Item
                        name='tag'
                        label='标签'
                        rules={[{ required: true, message: '请输入标签名' }]}
                    >
                        <Input placeholder="请输入标签名" />
                    </Form.Item>
                </Col>
            </Row>
            <Row align="top">
                <Col span={8}>
                    <Form.Item
                        name='color'
                        label='颜色'
                    >
                        <CirclePicker color={color}  onChange={handleChangeColor} />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify="center" align="top">
                <Col span={16}>
                    <Button htmlType='submit' size='large' shape='round' type='primary'>保存</Button>
                </Col>
            </Row>
        </Form>
    )
}

export default withRouter(TagAdd)
