import React, { useState, useEffect, useRef } from 'react'
import { useParams, useHistory } from "react-router-dom";
import cx from 'classnames';
import dayjs from 'dayjs';
import { Modal, Toast } from 'zarm';
import Header from '@/components/Header';
import PopupAddBill from '@/components/PopupAddBill'
import CustomIcon from '@/components/CustomIcon';
import { get, post, typeMap } from '@/utils';

import s from './style.module.less';

const Detail = () => {
  const { id } = useParams();
  const history = useHistory();
  const editRef = useRef();
  const [detail, setDetail] = useState({});

  useEffect(() => {
    getDetail()
  }, [])

  const getDetail = async () => {
    const { data } = await get(`/api/bill/detail/${id}`);
    setDetail(data);
  }

  const deleteDetail = () => {
      Modal.confirm({
        title: '删除',
        content: '确认删除账单？',
        onOk: async () => {
          const { data } = await post('/api/bill/delete', { id })
          Toast.show('删除成功')
          history.goBack()
      },
      });
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
        <span onClick={deleteDetail}><CustomIcon type='shanchu' />删除</span>
        <span onClick={() => editRef && editRef.current && editRef.current.show()}><CustomIcon type='tianjia' />编辑</span>
      </div>
    </div>
    <PopupAddBill ref={editRef} detail={detail} onReload={getDetail} />
  </div>
}

export default Detail