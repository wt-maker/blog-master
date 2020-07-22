import React, { useState, useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input } from 'antd'
import { CirclePicker } from 'react-color'
import { layout } from './tagAdd.config'
const TagAdd = (props) => {

    const { formRef, visible } = props

    const [newColor, setNewColor] = useState('')

    const onColorChange = (e) => {
        setNewColor(e.hex)
    }
    useEffect(() => {
        setNewColor('')
        formRef.current.resetFields()
    }, [visible])

    return (
        <Form ref={formRef} layout='horizontal' {...layout} className="addTag">
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
                rules={[{ required: true, message: '请选择标签颜色' }]}
            >
                <CirclePicker color={newColor} onChange={onColorChange} />
            </Form.Item>
        </Form>
    )
}

export default withRouter(TagAdd)