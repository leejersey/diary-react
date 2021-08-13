// 新增账单弹窗
import React, { forwardRef, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { Popup  } from 'zarm';

const PopupAddBill = forwardRef((props, ref) => {
    const [show, setShow] = useState(false) // 内部控制弹窗显示隐藏。

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

    return (
        <Popup
            visible={show}
            direction="bottom"
            onMaskClick={() => setShow(false)}
            destroy={false}
            mountContainer={() => document.body}
        >
            <div style={{ height: 200, background: '#fff' }}>弹窗</div>
        </Popup>
    )
})

export default PopupAddBill