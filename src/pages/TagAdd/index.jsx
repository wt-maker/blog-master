import React, { useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input } from 'antd'
import { CirclePicker } from 'react-color'
import { addTag } from '../../utils/api'
import { layout } from './tagAdd.config'
const TagAdd = (props) => {

    const [color, setColor] = useState('#f44336')

    const onFinish = (values) => {
        let { tag } = values
        let request_body = {
            name: tag,
            color: color
        };
        (async () => {
            await addTag(request_body)
            props.history.push('/tag/list')
        })()
    }

    const handleChangeColor = (color) => {
        setColor(color.hex)
    }

    return (
        <Form onFinish={onFinish} layout='horizontal' {...layout} className="addTag">
            <Form.Item
                name='tag'
                label='标签'
                rules={[{ required: true, message: '请输入标签名' }]}
            >
                <Input placeholder="请输入标签名" />
            </Form.Item>
            <Form.Item
                name='color'
                label='颜色'
            >
                <CirclePicker color={color} onChange={handleChangeColor} />
            </Form.Item>
        </Form>
    )
}

export default withRouter(TagAdd)