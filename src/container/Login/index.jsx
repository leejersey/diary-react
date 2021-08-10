import React, {useState, useRef} from 'react'
import { Cell, Input, Button, Checkbox, Toast } from 'zarm'
import Captcha from "react-captcha-code"
import CustomIcon from '@/components/CustomIcon';
import { post } from '@/utils'

import s from './style.module.less'

const Login = () => {
    const captchaRef = useRef();
    const [username, setUsername] = useState(''); // 账号
    const [password, setPassword] = useState(''); // 密码
    const [verify, setVerify] = useState(''); // 验证码
    const [captcha, setCaptcha] = useState(''); // 验证码变化后存储值
    
    const handleChange = (captcha) => {
        console.log('captcha', captcha)
        setCaptcha(captcha);
    }

    const onSubmit = () => {
        console.log(post);
        if (!username) {
            Toast.show('请输入账号')
            return
        }
        if (!password) {
            Toast.show('请输入密码')
            return
        }
        if (!verify) {
            Toast.show('请输入验证码')
            return
          };

        post('/user/register',{
            username,
            password
        }).then((res) => {
            if(res.code === 200){
                console.log(res);
                Toast.show('注册成功');
            }
            
        });
    }

    return (
    <div className={s.auth}>
        <div className={s.head} />
            <div className={s.tab}>
                <span>注册</span>
            </div>
            <div className={s.form}>
                <Cell icon={<CustomIcon type="zhanghao" />}>
                <Input
                    clearable
                    type="text"
                    placeholder="请输入账号"
                    onChange={(value) => setUsername(value)}
                />
                </Cell>
                <Cell icon={<CustomIcon type="mima" />}>
                <Input
                    clearable
                    type="password"
                    placeholder="请输入密码"
                    onChange={(value) => setPassword(value)}
                />
                </Cell>
                <Cell icon={<CustomIcon type="mima" />}>
                    <Input
                    clearable
                    type="text"
                    placeholder="请输入验证码"
                    onChange={(value) => setVerify(value)}
                    />
                    <Captcha ref={captchaRef} charNum={4} onChange={handleChange} />
                </Cell>
            </div>
            <div className={s.operation}>
            <div className={s.agree}>
                <Checkbox />
                <label className="text-light">阅读并同意<a>《掘掘手札条款》</a></label>
            </div>
            <Button block theme="primary" onClick={onSubmit}>注册</Button>
        </div>
    </div>)
}

export default Login