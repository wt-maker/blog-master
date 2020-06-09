import React from 'react'
import { Form, Input, Row, Col, Select } from 'antd'
const { Option } = Select
const InputForm = () => {

    const children = [];
    for (let i = 10; i < 36; i++) {
        children.push(<Option key={i.toString(36) + i}>{i.toString(36) + i}</Option>);
    }
    console.log(children)
    function handleChange(value) {
        console.log(`selected ${value}`);
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
                        <Input placeholder="请输入标题"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='tag'
                        label='标签'
                        rules={[{ required: true, message: '请输入标签' }]}
                    >
                        <Select
                            mode="multiple"
                            style={{ width: '100%' }}
                            placeholder="请选择标签"
                            defaultValue={[]}
                            onChange={handleChange}
                        >
                            {children}
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
                        <Input placeholder="请输入关键字"/>
                    </Form.Item>
                </Col>
                <Col span={12}>
                    <Form.Item
                        name='description'
                        label='描述'
                        rules={[{ required: true, message: '请输入文章描述' }]}
                    >
                        <Input placeholder="请输入文章描述"/>
                    </Form.Item>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default InputForm