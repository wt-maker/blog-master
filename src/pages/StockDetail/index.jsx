import React, { useState, useEffect, useRef } from 'react'
import { getStockDataById, addStock } from '../../utils/api'
import { Input, Card, Button } from 'antd'
import { toDecimal, toPercent } from '../../utils/mathUtils'
import './stockDetail.scss'

const StockDetail = () => {

  const [stockNumber, setStockNumber] = useState('sh000001')
  const [stockDetail, setStockDetail] = useState(null)
  const [loading, setLoading] = useState(true)
  const saveCallBack = useRef()

  const callBack = () => {
    onSearchStockById()
  }

  useEffect(() => {
    saveCallBack.current = callBack
    return () => { }
  })

  useEffect(() => {
    setLoading(true);
    (async () => {
      let response = await getStockDataById(stockNumber)
      setStockDetail(response.res.data.stockDetail)
      setLoading(false)
    })()
  }, [])

  useEffect(() => {
    const tick = () => {
      saveCallBack.current()
    }
    const timer = setInterval(tick, 5000)
    return () => { clearInterval(timer) }
  }, [])

  const onStockNumberChange = (e) => {
    setStockNumber(e.target.value)
  }
  const onSearchStockById = () => {
    (async () => {
      let response = await getStockDataById(stockNumber)
      if (response.res) {
        setStockDetail(response.res.data.stockDetail)
      }
    })()
  }

  const addToMyLike = () => {
    let data = {
      stockNumber
    };

    (async () => {
      let res = await addStock(data)
      console.log(res)
    })()
  }

  return (
    <React.Fragment>
      <Input.Search
        placeholder="请输入股票代码（添加交易所前缀，如sh000001）"
        allowClear
        enterButton
        size="large"
        value={stockNumber}
        onChange={onStockNumberChange}
        onSearch={onSearchStockById}
      />

      <div id="stockDetail">
        {
          loading ?
            (<div>正在加载</div>) :
            (<Card title={stockDetail.name} style={{ width: 350 }} extra={<Button type="link" onClick={addToMyLike} shape="circle">添加自选</Button>}>
              <p>价格 | {toDecimal(stockDetail.currentPrice)} {`(${stockDetail.currentTime})`}</p>
              <hr />
              <p>涨跌幅 | {toPercent((stockDetail.currentPrice - stockDetail.closePrice) / stockDetail.closePrice)}</p>
              <hr />
              <p>今开 | {toDecimal(stockDetail.openPrice)}</p>
              <hr />
              <p>昨收 | {toDecimal(stockDetail.closePrice)}</p>
              <hr />
              <p>最高 | {toDecimal(stockDetail.highPrice)}</p>
              <hr />
              <p>最低 | {toDecimal(stockDetail.lowPrice)}</p>
              <hr />
              <p>成交量（手） | {stockDetail.volume}</p>
              <hr />
              <p>成交额（万元） | {stockDetail.turnover}</p>
            </Card>
            )
        }
      </div>

    </React.Fragment>
  )
}

export default StockDetail