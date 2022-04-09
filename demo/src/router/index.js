import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import demo01 from '../components/demo01'
import Index from '../components/index'
import GNYQTU from "../components/GNYQTU";
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'demo01',
      component: Index
    },


    {
      path: "/Index",
      name:"用户管理",
      component:Index,
      meta:true,
      children:[
        {
          path:"/userManager",
          name:"查询用户",
          component:() => import('../components/userManager')
        },
        {
          path:"/AddRecord",
          name:"添加用户",
          component:()=>import('../components/addUser')
        },{
          path:"/userUpdate",
          name:"修改用户",
          component:()=>import('../components/UserUPdate')
        }
      ]
    },
    {
      path: "/Index",
      name:"疫情爬取图",
      component:Index,
      meta:true,
      children:[
        {
          path:"/GNYQTU",
          name:"国内疫情图",
          component:() => import(/* webpackChunkName: "BlogManage" */ '../components/GNYQTU')

        },
        {
          path:"/GWYQTU",
          name:"国外疫情图",
          component:()=>import('../components/GWYQTU')
        }
      ]
    },
    {
      path: "/Index",
      name:"疫情爬取管理",
      component:Index,
      meta:true,
      children:[{
        path:"/MessagePQ",
        name:"国内疫情爬取",
        component:()=>import(/* webpackChunkName:"MaterialManage" */ '../components/MessagePQ')
      },{
        path:"/MessagePQ2",
        name:"国外疫情爬",
        component:()=>import(/* webpackChunkName:"AddMaterial" */ '../components/MessagePQ2')
      }
      ]
    },
    {
      path: "/Index",
      name:"疫情确诊管理",
      component:Index,
      meta:true,
      children:[{
        path:"/MessageManager",
        name:"数据查看",
        component:()=>import(/* webpackChunkName:"MaterialManage" */'../components/MessageManager')
      }
      ]
    }
  ]
})
