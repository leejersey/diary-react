import React, { useState, useEffect } from 'react'
import { useParams } from "react-router-dom";
import cx from 'classnames';
import dayjs from 'dayjs';
import Header from '@/components/Header';
import CustomIcon from '@/components/CustomIcon';
import { get, typeMap } from '@/utils';

import s from './style.module.less';

const Detail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getDetail()
  }, [])

  const getDetail = async () => {
    const { data } = await get(`/api/bill/detail/${id}`);
    setDetail(data);
  }

  return <div className={s.detail}>
    <Header title='账单详情' />
    <div className={s.card}>
      <div className={s.type}>
        <span className={cx({
          [s.expense]: detail.pay_type == 1,
          [s.income]: detail.pay_type == 2
        })}>
          <CustomIcon className={s.iconfont} type={detail.type_id ? typeMap[detail.type_id].icon : 1} />
        </span>
        <span>{ detail.type_name || '' }</span>
      </div>
      {
        detail.pay_type == 1
          ? <div className={cx(s.amount, s.expense)}>-{ detail.amount }</div>
          : <div className={cx(s.amount, s.income)}>+{ detail.amount }</div>
      }
      <div className={s.info}>
        <div className={s.time}>
          <span>记录时间</span>
          <span>{dayjs(Number(detail.date)).format('YYYY-MM-DD HH:mm')}</span>
        </div>
        <div className={s.remark}>
          <span>备注</span>
          <span>{ detail.remark || '-' }</span>
        </div>
      </div>
      <div className={s.operation}>
        <span><CustomIcon type='shanchu' />删除</span>
        <span><CustomIcon type='tianjia' />编辑</span>
      </div>
    </div>
  </div>
}

export default Detail