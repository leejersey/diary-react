// 新增账单弹窗
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Popup, Icon, Checkbox } from 'zarm';
import dayjs from 'dayjs';
import PopupDate from '../PopupDate'

import s from './style.module.less'

const PopupAddBill = forwardRef((props, ref) => {
    const dateRef = useRef();
    const [show, setShow] = useState(false) // 内部控制弹窗显示隐藏。
    const [payType, setPayType] = useState('expense')
    const [date, setDate] = useState(new Date()); // 日期

    if (ref) {
        ref.current = {
          show: () => {
            setShow(true);
          },
          close: () => {
            setShow(false);
          }
        }
      };

    const changeType = (type) => {
        setPayType(type)
    }

    const selectDate = (val) => {
        setDate(val);
    }

    return (
        <Popup
            visible={show}
            direction="bottom"
            onMaskClick={() => setShow(false)}
            destroy={false}
            mountContainer={() => document.body}
        >
            <div className={s.addWrap}>
                {/* 右上角关闭弹窗 */}
                <header className={s.header}>
                    <span className={s.close} onClick={() => {setShow(false)}}><Icon type="wrong" /></span>
                </header>
                {/* 「收入」和「支出」类型切换 */}
                <div className={s.filter}>
                    <div className={s.type}>
                        <span
                            onClick={() => changeType('expense')}
                            className={cx({ [s.expense]: true, [s.active]: payType == 'expense'})}
                        >支出</span>
                        <span
                            onClick={() => changeType('income')}
                            className={cx({ [s.income]: true, [s.active]: payType == 'income'})}
                        >收入</span>
                    </div>
                    <div
                        className={s.time}
                        onClick={() => dateRef.current && dateRef.current.show()}
                    >
                        {dayjs(date).format('MM-DD')}
                        <Icon className={s.arrow} type="arrow-bottom" />
                    </div>
                </div>
                <PopupDate ref={dateRef} onSelect={selectDate} />
            </div>
        </Popup>
    )
})

export default PopupAddBill