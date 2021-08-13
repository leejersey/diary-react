// 弹出层组件
import React, { useState, useEffect, forwardRef } from 'react'
import PropTypes from 'prop-types'
import { Popup, Icon } from 'zarm';
import { get } from '@/utils'
import cx from 'classnames';

import s from './style.module.less'

// 重点：forwardRef拿到父组件传入的ref熟悉，这样父组件就能通过ref控制子组件
const PopupType = forwardRef(( {onSelect}, ref) => {
    const [show, setShow] = useState(false)
    const [active, setActive] = useState('all'); // 激活的 type
    const [expense, setExpense] = useState([])
    const [income, setIncome] = useState([])
    // 获取类型列表数据
    useEffect(async () => {
        const { data: { list } } = await get('/api/type/list');
        setExpense(list.filter(i => i.type == 1))
        setIncome(list.filter(i => i.type == 2))
    }, [])

    if(ref){
        ref.current = {
            show: () => {
                setShow(true)
            },
            close: () => {
                setShow(false)
            }
        }
    }

    const choseType = (item) => {
        setActive(item.id);
        setShow(false)
        // 传值到父组件
        onSelect(item);
    }

    return (
        <Popup
        visible={show}
        direction="bottom"
        onMaskClick={() => setShow(false)}
        destroy={false}
        mountContainer={() => document.body}
      >
        <div className={s.popupType}>
            <div className={s.header}>
                请选择类型
                <Icon type="wrong" className={s.cross} onClick={() => setShow(false)} />
            </div>
            <div className={s.content}>
                <div onClick={() => choseType({ id: 'all' })} className={cx({ [s.all]: true, [s.active]: active == 'all' })}>全部类型</div>
                <div className={s.title}>支出</div>
                <div className={s.expenseWrap}>
                {
                    expense.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[s.active]: active == item.id})} >{ item.name }</p>)
                }
                </div>
                <div className={s.title}>收入</div>
                <div className={s.incomeWrap}>
                {
                    income.map((item, index) => <p key={index} onClick={() => choseType(item)} className={cx({[s.active]: active == item.id})} >{ item.name }</p>)
                }
                </div>
            </div>
        </div>
      </Popup>
    )
})

PopupType.propTypes = {
    onSelect: PropTypes.func
  }

export default PopupType;