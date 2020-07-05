import React from 'react'
export const fundColumns = [
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
        width: 100
    },
    {
        title: 'fundName',
        dataIndex: 'name',
        key: 'name',
        width: 100
    },
    {
        title: 'position',
        dataIndex: 'position',
        key: 'position',
        width: 100
    },
    {
        title: 'applies',
        dataIndex: 'applies',
        key: 'applies'
    }
]