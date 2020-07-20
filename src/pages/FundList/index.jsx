import React, { useState, useEffect } from 'react'
import { Table, Card } from 'antd'
import { withRouter } from 'react-router-dom'
import { fundColumns } from './fundList.config'
import { getFunds } from '../../utils/api'
import ButtonLink from '../../components/Link'
import './fundList.scss'

const FundList = (props) => {

    const [fund, setFund] = useState([])
    const [cost, setCost] = useState(0)
    const [income, setIncome] = useState(0)
    const [loading, setLoading] = useState(false)
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
                    return pre + cur.position * parseFloat(cur.applies) * 0.01
                }, 0))
            }
        })()
        setLoading(false)

        return () => unmount = true
    }, [loading])

    return (
        <section>
            <Card id="fund-card" title="净值估算" extra={<ButtonLink>More</ButtonLink>}>
                <section id="table-section">
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
                </section>
            </Card>
        </section>
    )
}

export default withRouter(FundList)