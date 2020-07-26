import React, { useEffect } from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input } from 'antd'
import { layout } from './fundList.config'
const FundAdd = (props) => {

    const { formRef, visible, id, fund } = props
    useEffect(() => {
        formRef.current.resetFields()
        if (id) {
            let res = fund.find(item => item.id===id)
            formRef.current.setFieldsValue({serialNumber:res.serialNumber, position: res.position})
        }
    }, [visible])

    return (
        <Form ref={formRef} layout='horizontal' {...layout} className="addTag">
            <Form.Item
                name='serialNumber'
                label='基金代码'
                rules={[{ required: true, message: '请输入标签名' }]}
            >
                <Input placeholder="请输入基金代码"/>
            </Form.Item>
            <Form.Item
                name='position'
                label='持有金额'
            >
                <Input placeholder="请输入持有金额(默认0)"/>
            </Form.Item>
        </Form>
    )
}

export default withRouter(FundAdd)