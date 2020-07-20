import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input } from 'antd'
import { CirclePicker } from 'react-color'
import { layout } from './tagAdd.config'
const TagAdd = (props) => {

    const { color, setColor, setTag } = props

    const handleChangeColor = (color) => {
        setColor(color.hex)
    }

    const handleChangeTag = (e) => {
        setTag(e.target.value)
    }

    return (
        <Form layout='horizontal' {...layout} className="addTag">
            <Form.Item
                name='tag'
                label='标签'
                rules={[{ required: true, message: '请输入标签名' }]}
            >
                <Input placeholder="请输入标签名" onChange={handleChangeTag}/>
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