import React, { useState, useEffect } from 'react'
import { Table, Card, Modal, Button } from 'antd'
import { withRouter } from 'react-router-dom'
import { initColumns } from './fundList.config'
import { getFunds } from '../../utils/api'
import { PlusCircleOutlined } from '@ant-design/icons';
import FundAdd from './fundAdd'
import { addFund, deleteFund, updateFund } from '../../utils/api'
import './fundList.scss'

const FundList = (props) => {

    const [id, setId] = useState('')
    const [fund, setFund] = useState([])
    const [cost, setCost] = useState(0)
    const [income, setIncome] = useState(0)
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(false)

    const formRef = React.createRef()

    const remove = async (id) => {
        await deleteFund(id)
        setLoading(true)
    }

    const edit = (id) => {
        setId(id)
        setVisible(true)
    }

    const fundColumns = initColumns(remove, edit)

    useEffect(() => {
        let unmount = false
        setLoading(true);
        (async () => {
            let response = await getFunds()
            if (!unmount) {
                setFund(response.res.fundList)

                setCost(response.res.fundList.reduce((pre, cur) => {
                    return pre + cur.position
                }, 0))

                setIncome(response.res.fundList.reduce((pre, cur) => {
                    return parseInt(pre + cur.position * parseFloat(cur.applies) * 0.01)
                }, 0))
            }
        })()
        setLoading(false)

        return () => unmount = true
    }, [loading])

    const showModal = () => {
        setVisible(true)
    }

    const handleOk = () => {

        formRef.current.validateFields()
            .then(values => {
                let data = {
                    serialNumber: values.serialNumber,
                    position: values.position
                };

                if (id) {
                    (async () => {
                        await updateFund(id, data)
                        setVisible(false)
                        setId('')
                        setLoading(true)
                    })()
                } else {
                    (async () => {
                        await addFund(data)
                        setVisible(false)
                        setLoading(true)
                    })()
                }


            }).catch(errorInfo => { })
    }

    const handleCancel = () => {
        setId('')
        setVisible(false)
    }
    return (
        <section>
            <Card id="fund-card" title="净值估算" extra={<Button type="primary" onClick={showModal}>
                <PlusCircleOutlined />添加基金</Button>}>
                <section id="table-section">
                    <Table
                        loading={loading}
                        columns={fundColumns}
                        rowKey={record => record.id}
                        dataSource={fund}
                        bordered='true'
                        size='small'
                        summary={() => (
                            <Table.Summary.Row>
                                <Table.Summary.Cell colSpan={3} index={0}>合计</Table.Summary.Cell>
                                <Table.Summary.Cell index={1}>{cost}</Table.Summary.Cell>
                                <Table.Summary.Cell index={2}>{income}</Table.Summary.Cell>
                                <Table.Summary.Cell index={3}>
                                    <Button type="primary" onClick={() => setLoading(true)}>刷新</Button>
                                </Table.Summary.Cell>
                            </Table.Summary.Row>
                        )}
                    />
                </section>
            </Card>
            <div>
                <Modal
                    title="添加标签"
                    visible={visible}
                    okText="保存"
                    cancelText="取消"
                    onOk={handleOk}
                    onCancel={handleCancel}
                >
                    <FundAdd formRef={formRef} visible={visible} id={id} fund={fund} />
                </Modal>
            </div>
        </section>
    )
}

export default withRouter(FundList)