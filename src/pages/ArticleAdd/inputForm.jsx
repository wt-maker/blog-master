import React from 'react'
import { Form, Input, Row, Col, Select, Tag } from 'antd'

const { Option } = Select
const InputForm = (props) => {

    const tags = props.tags

    const options = tags.map((item) => <Option key={item.name}>{item.name}</Option>)

    const tagRender = (props) =>{
        let { label, value, closable, onClose } = props;
        let tag = tags.filter(item => item.name===value)[0]
        return (
            <Tag color={tag.color} closable={closable} onClose={onClose} style={{ marginRight: 3 }}>
                {label}
            </Tag>
        )
    }

    return (
        <React.Fragment>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='title'
                        label='标题'
                        rules={[{ required: true, message: '请输入标题' }]}
                    >
                        <Input placeholder="请输入标题" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='tag'
                        label='标签'
                        rules={[{ required: true, message: '请选择标签' }]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="请选择标签"
                            tagRender={tagRender}
                        >
                            {options}
                        </Select>
                    </Form.Item>
                </Col>
            </Row>
            <Row>
                <Col span={12}>
                    <Form.Item
                        name='keywords'
                        label='关键字'
                        rules={[{ required: true, message: '请输入关键字' }]}
                    >
                        <Input placeholder="请输入关键字" />
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='description'
                        label='描述'
                        rules={[{ required: true, message: '请输入文章描述' }]}
                    >
                        <Input placeholder="请输入文章描述" />
                    </Form.Item>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default InputForm