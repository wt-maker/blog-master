import React from 'react'
import { Form, Input, Row, Col } from 'antd'

const InputForm = (props) => {
    
    const { title, tag, keywords, description } = props.article
    const t = props.article.title
    return (
        <React.Fragment>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='title'
                        label='标题'
                        rules={[{ required: true, message: '请输入标题' }]}
                        initialValue = {t}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='tag'
                        label='标签'
                        rules={[{ required: true, message: '请输入标签' }]}
                        initialValue = {tag}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='keywords'
                        label='关键字'
                        rules={[{ required: true, message: '请输入关键字' }]}
                        initialValue = {keywords}
                    >
                        <Input />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='description'
                        label='描述'
                        rules={[{ required: true, message: '请输入文章描述' }]}
                        initialValue = {description}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default InputForm