// 新增账单弹窗
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';
import { Popup, Icon, Checkbox, Keyboard, Input, Toast } from 'zarm';
import dayjs from 'dayjs';
import CustomIcon from '../CustomIcon';
import PopupDate from '../PopupDate'
import { get, post, typeMap } from '@/utils';

import s from './style.module.less'

const PopupAddBill = forwardRef((props, ref) => {
    const dateRef = useRef();
    const [show, setShow] = useState(false) // 内部控制弹窗显示隐藏。
    const [payType, setPayType] = useState('expense')
    const [date, setDate] = useState(new Date()); // 日期
    const [amount, setAmount] = useState('') // 账单金额
    const [expense, setExpense] = useState([]); // 支出类型数组
    const [income, setIncome] = useState([]); // 收入类型数组
    const [currentType, setCurrentType] = useState({}); // 当前选中账单类型
    const [remark, setRemark] = useState(''); // 备注
    const [showRemark, setShowRemark] = useState(false); // 备注输入框

    useEffect(async () => {
        const { data: {list} } = await get('/api/type/list');
        const _expense = list.filter(i => i.type == 1); // 支出类型
        const _income = list.filter(i => i.type == 2); // 收入类型
        setExpense(_expense);
        setIncome(_income);
        setCurrentType(_expense[0]); // 新建账单，类型默认是支出类型数组的第一项
    },[])

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

    const handleMoney = (value) => {
        value = String(value);
        
        // 删除
        if (value == 'delete') {
            let _amount = amount.slice(0, amount.length - 1)
            setAmount(_amount)
            return
        }

        // 确认
        if (value == 'ok') {
            addBill()
            return
        }

        // 当输入.且.已经存在
        if (value == '.' && amount.includes('.')) return

        // 小数点后保留两位
        if(value != '.' && amount.includes('.') && amount && amount.split('.')[1].length >= 2) return

        setAmount(amount + value)
    }

    const addBill = async () => {
        if (!amount) {
            Toast.show('请输入具体金额')
            return
        }

        const params = {
            amount: Number(amount).toFixed(2),
            type_id: currentType.id,
            type_name: currentType.name,
            date: dayjs(date).unix()*1000,
            pay_type: payType == 'expense' ? 1 : 2,
            remark: remark || ''
        }

        const result = await post('/api/bill/add', params);

        // 清空数据和状态
        setAmount('')
        setPayType('expense');
        setCurrentType(expense[0]);
        setDate(new Date());
        setRemark('');
        Toast.show('添加成功');
        setShow(false);
        if(props.onReload) props.onReload();
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
                {/* 「选择类型 */}
                <div className={s.typeWarp}>
                    <div className={s.typeBody}>
                        {
                            (payType == 'expense' ? expense : income).map(item => <div
                                    key={item.id}
                                    className={s.typeItem}
                                    onClick={() => setCurrentType(item)}
                                >
                                <span
                                    className={cx({
                                        [s.iconfontWrap]: true,
                                        [s.expense]: payType == 'expense',
                                        [s.income]: payType == 'income',
                                        [s.active]: currentType.id == item.id
                                    })}>
                                    <CustomIcon className={s.iconfont} type={typeMap[item.id].icon} />
                                </span>
                                <span>{item.name}</span>
                            </div>)
                        }
                    </div>
                </div>
                {/* 「输入金额 */}
                <div className={s.money}>
                    <span className={s.sufix}>¥</span>
                    <span className={cx(s.amount, s.animation)}>{amount}</span>
                </div>
                {/* 「输入备注 */}
                <div className={s.remark}>
                    {
                        showRemark ? <Input
                            autoHeight
                            showLength
                            maxLength={50}
                            type="text"
                            rows={3}
                            value={remark}
                            placeholder="请输入备注信息"
                            onChange={(val) => setRemark(val)}
                            onBlur={() => setShowRemark(false)}
                        /> : <span onClick={() => setShowRemark(true)}>{remark || '添加备注'}</span>
                    }
                </div>
                <Keyboard type="price" onKeyClick={(value) => handleMoney(value)} />
                <PopupDate ref={dateRef} onSelect={selectDate} />
            </div>
        </Popup>
    )
})

export default PopupAddBill