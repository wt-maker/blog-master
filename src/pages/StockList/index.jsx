import React, { useState, useEffect, useRef } from 'react'
import { initColumns } from './stockList.config'
import { Card, Table } from 'antd'
import { getAllStock } from '../../utils/api'
import { toPercent } from '../../utils/mathUtils'

const StockList = () => {

  const [stockDetailList, setStockDetailList] = useState()

  const stockColumns = initColumns()

  const saveCallBack = useRef()

  const callBack = () => {
    refresh()
  }

  const refresh = () => {
    (async() => {
      let { res } = await getAllStock()
      let stockDetails = res.map(item => {
        return {
          ...item.stockDetail
        }
      })
      setStockDetailList(stockDetails)
    })()
  }

  useEffect(() => {
    saveCallBack.current = callBack
    return () => { }
  })

  useEffect(() => {
    
    (async() => {
      let { res } = await getAllStock()
      let stockDetails = res.map(item => {
        return {
          ...item.stockDetail
        }
      })
      setStockDetailList(stockDetails)
    })()

    return () => {
    }
  }, [])

  useEffect(() => {
    const tick = () => {
      saveCallBack.current()
    }
    const timer = setInterval(tick, 2000)
    return () => { clearInterval(timer) }
  }, [])

  return (
    <Card id="fund-card" title="自选列表">
      <section id="table-section">
        <Table
          columns={stockColumns}
          rowKey={record => record.id}
          dataSource={stockDetailList}
          bordered='true'
          size='small'
        />
      </section>
    </Card>
  )
}

export default StockList