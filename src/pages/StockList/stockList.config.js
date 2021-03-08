import React from 'react'
import { toPercent } from '../../utils/mathUtils'

export const layout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 }
}

export const initColumns = (remove, edit) => {
    const columns = [
        {
            title: '股票代码',
            dataIndex: 'id',
            key: 'id',
            width: 150,
        },
        {
            title: '股票名称',
            dataIndex: 'name',
            key: 'name',
            width: 150
        },
        {
            title: '当前价格',
            dataIndex: 'currentPrice',
            key: 'currentPrice',
            width: 120
        },
        {
            title: '涨跌幅',
            key: 'change',
            width: 150,
            render: (text, record, dataIndex) => <span>{toPercent((record.currentPrice - record.closePrice) / record.closePrice)}</span>
        },
        {
            title: '最高价格',
            dataIndex: 'highPrice',
            key: 'highPrice',
            width: 150
        },
        {
            title: '最低价格',
            dataIndex: 'lowPrice',
            key: 'lowPrice',
            width: 150
        },
        {
            title: '成交量',
            dataIndex: 'volume',
            key: 'volume',
            width: 150
        },
        {
            title: '成交额',
            dataIndex: 'turnover',
            key: 'turnover'
        }
        
    ]
    return columns
}
