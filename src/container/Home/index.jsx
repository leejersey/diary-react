import React, { useState, useEffect } from 'react'
import { Icon, Pull } from 'zarm'
import dayjs from 'dayjs'
import BillItem from '@/components/BillItem'
import { get } from '@/utils'

import s from './style.module.less'

const Home = () => {
    const [currentTime, setCurrentTime] = useState(dayjs().format('YYYY-MM'))
    const [page, setPage] = useState(1); // 分页
    const [list, setList] = useState([])

    useEffect(() => {
        getList()
    }, [])

    const getList = async () => {
        const { data } = await get(`/api/bill/list?page=${page}&page_size=5&date=${currentTime}`)
        setList(data.list)
    }

    return (
        <div className={s.home}>
            <div className={s.header}>
                <div className={s.dataWrap}>
                <span className={s.expense}>总支出：<b>¥ 200</b></span>
                <span className={s.income}>总收入：<b>¥ 500</b></span>
                </div>
                <div className={s.typeWrap}>
                <div className={s.left}>
                    <span className={s.title}>类型 <Icon className={s.arrow} type="arrow-bottom" /></span>
                </div>
                <div className={s.right}>
                    <span className={s.time}>2022-06<Icon className={s.arrow} type="arrow-bottom" /></span>
                </div>
                </div>
            </div>
            <div className={s.contentWrap}>
            {
                list.map((item, index) => <BillItem key={index} bill={item} />)
            }
            </div>
        </div>
    )
}

export default Home