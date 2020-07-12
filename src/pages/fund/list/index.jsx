import React, { useState, useEffect } from 'react'
import { Table, PageHeader, Col } from 'antd'
import { withRouter } from 'react-router-dom'
import { fundColumns } from './config'
import {getFunds} from '../../../utils/api'
const FundList = (props) => {

    const [fund, setFund] = useState([])
    const [cost, setCost] = useState(0)
    const [income, setIncome] = useState(0)
    const [loading, setLoading] = useState(false)
    var _ummount = false
    useEffect(() => {

        setLoading(true)
        getFunds().then(
            (res) => {
                if (!_ummount) {
                    setFund(res.data.res.fundList)

                    setCost(res.data.res.fundList.reduce((pre, cur) => {
                        return pre + cur.position
                    }, 0))

                    setIncome(res.data.res.fundList.reduce((pre, cur) => {
                        return pre + cur.position * parseFloat(cur.applies) * 0.01
                    }, 0))
                }
            }
        )
        setLoading(false)

        return () => _ummount = true
}, [loading])
return (
    <section>
        <PageHeader className="site-page-header" title="fund列表" />
        <Col span={8}>
            <Table
                columns={fundColumns}
                rowKey={record => record.serialNumber}
                dataSource={fund}
                bordered='true'
                size='small'
                summary={() => (
                    <Table.Summary.Row>
                        <Table.Summary.Cell colSpan={3} index={0}>合计</Table.Summary.Cell>
                        <Table.Summary.Cell index={1}>{cost}</Table.Summary.Cell>
                        <Table.Summary.Cell index={2}>{income}</Table.Summary.Cell>
                    </Table.Summary.Row>
                )}
            />
        </Col>
    </section>
)
}

export default withRouter(FundList)