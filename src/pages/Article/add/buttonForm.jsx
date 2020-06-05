import React from 'react'
import { Button, Row, Col, Space} from 'antd'


const ButtonForm = () => {
    return (
        <React.Fragment>
            <Row>
                <Col span={20} />
                <Col span={4}>
                    <Space size='middle'>
                        <Button size='large' shape='round'>草稿</Button>
                        <Button size='large' shape='round'>预览</Button>
                        <Button htmlType='submit' size='large' shape='round' type='primary'>保存</Button>
                    </Space>
                </Col>
            </Row>
        </React.Fragment>
    )
}

export default ButtonForm