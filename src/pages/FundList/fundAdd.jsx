import React from 'react'
import { withRouter } from 'react-router-dom'
import { Form, Input } from 'antd'
import { layout } from './fundList.config'
const FundAdd = (props) => {

    const { serFundCode, setFundPosition } = props

    const handleChangeFundCode = (e) => {
        serFundCode(e.target.value)
    }

    const handleChangeFundPosition = (e) => {
        setFundPosition(e.target.value)
    }


    return (
        <Form layout='horizontal' {...layout} className="addTag">
            <Form.Item
                name='serialNumber'
                label='基金代码'
                rules={[{ required: true, message: '请输入标签名' }]}
            >
                <Input placeholder="请输入基金代码" onChange={handleChangeFundCode}/>
            </Form.Item>
            <Form.Item
                name='position'
                label='持有金额'
            >
                <Input placeholder="请输入持有金额" onChange={handleChangeFundPosition}/>
            </Form.Item>
        </Form>
    )
}

export default withRouter(FundAdd)