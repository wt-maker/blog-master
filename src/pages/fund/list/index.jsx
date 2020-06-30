import React, { useState, useEffect } from 'react'
import { Table, PageHeader } from 'antd'
import { withRouter } from 'react-router-dom'
import axios from 'axios'
const FundList = (props) => {
    const columns = [
        {
            title: 'No.',
            key: 'no',
            width: 20,
            render: (text, record, dataIndex) => <span>{dataIndex + 1}</span>
        },
        {
            title: 'serialNumber',
            dataIndex: 'serialNumber',
            key: 'serialNumber',
            width: 300
        },
        {
            title: 'fundName',
            dataIndex: 'name',
            key: 'name',
            width: 300
        },
        {
            title: 'position',
            dataIndex: 'position',
            key: 'position',
            width: 300
        },
        {
            title: 'applies',
            dataIndex: 'applies',
            key: 'applies',
            width: 300
        }
    ]

    const [fund, setFund] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {

        setLoading(true)

        axios.get('/api/getAllFund').then(
            (res) => {
                console.log(res)
                setFund(res.data.res.fundList)
            }
        )
        setLoading(false)
    }, [loading])
    return (
        <section>
            <PageHeader className="site-page-header" title="fund列表" />
            <Table columns={columns} rowKey={record => record.serialNumber} dataSource={fund} bordered='true' />
        </section>
    )
}

export default withRouter(FundList)