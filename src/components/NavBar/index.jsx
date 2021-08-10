import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { TabBar, Icon } from 'zarm'
import { useHistory } from 'react-router-dom'
import s from './style.module.less'

const TabIcon = Icon.createFromIconfont('//at.alicdn.com/t/font_2236655_w1mpqp7n1ni.js');

const NavBar = ({showNav}) => {
    const [activeKey, setActiveKey] = useState('/')
    const history = useHistory()

    const changeTab = (path) => {
        console.log(path);
        setActiveKey(path)
        history.push(path)
    }

    return (
        <TabBar
            visible={showNav}
            className={s.tab}
            activeKey={activeKey}
            onChange={changeTab}
        >
            <TabBar.Item
                itemKey="/"
                title="账单"
                icon={<TabIcon type="zhangdan" />}
            />
            <TabBar.Item
                itemKey="/data"
                title="统计"
                icon={<TabIcon type="tongji" />}
            />
            <TabBar.Item
                itemKey="/user"
                title="我的"
                icon={<TabIcon type="wode" />}
            />
        </TabBar>
    )
}

NavBar.propTypes= {
    showNav: PropTypes.bool.isRequired
}

export default NavBar