import Vue from 'vue'
import Router from 'vue-router'

const stuList = ()=>import('./components/stuList.vue')
const addStu = ()=>import('./components/addStu.vue')
Vue.use(Router)

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
			path:'/stuList',
			name:'stuList',
			component:stuList
		},
		{
			path:'/addStu',
			name:'addStu',
			component:addStu
		},
		{
			path:'*',
			redirect:'/stuList'
		}
  ],
  linkActiveClass:'active'
})
