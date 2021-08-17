// router/index.js
import Home from '@/container/Home'
import Data from '@/container/Data'
import User from '@/container/User'
import UserInfo from '@/container/UserInfo'
import Account from '@/container/Account'
import Detail from '@/container/Detail'
import Login from '@/container/Login'

const routes = [
  {
    path: "/",
    component: Home,
  },
  {
    path: "/data",
    component: Data
  },
  {
    path: "/user",
    component: User
  },
  {
    path: "/userinfo",
    component: UserInfo
  },
  {
    path: '/account',
    component: Account
  },
  {
    path: "/detail/:id",
    component: Detail
  },
  {
    path: "/login",
    component: Login
  }
];

export default routes