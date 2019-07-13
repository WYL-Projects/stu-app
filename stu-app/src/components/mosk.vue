<template>
	<div class="mosk" v-if="isShowMosk" @click.self = "hiddenMosk">
			<div class="studentForm">
				<h3>编辑信息</h3>
					<form id="editForm">
									<table border="0" cellspacing="0" cellpadding="0">
										<tr>
											<td><label for="name">姓名</label></td>
											<td>
											<input type="text" name="name" 
											:value="user.name" 
											@change="changeUser($event)"></td>
										</tr>
										<tr>
											<td><label for="sex">性别</label></td>
											<td>
												<input type="radio" @change="changeUser($event, 0)" :checked="user.sex==0" name="sex">男
												<input type="radio" @change="changeUser($event, 1)" :checked="user.sex==1" name="sex">女
											</td>
										</tr>
										<tr>
											<td><label for="sNo">学号</label></td>
											<td>
												<input type="text" name="sNo" :value="user.sNo" @change="changeUser($event)">
											</td>
										</tr>
										<tr>
											<td><label for="email">邮箱</label></td>
											<td>
												<input type="text" name="email" :value="user.email" @change="changeUser($event)">
											</td>
										</tr>
										<tr>
											<td><label for="birth">出生年</label></td>
											<td>
												<input type="text" name="birth" :value="user.birth" @change="changeUser($event)">
											</td>
										</tr>
										<tr>
											<td><label for="phone">手机号</label></td>
											<td>
												<input type="text" name="phone" :value="user.phone" @change="changeUser($event)">
											</td>
										</tr>
										<tr>
											<td><label for="address">住址</label></td>
											<td>
												<input type="text" name="address" :value="user.address" @change="changeUser($event)">
											</td>
										</tr>
									</table>
									<div class="Btn">
										<input type="button" id="addStu" class="commit" value="提交" @click="commitUserData"/>
										<input type="reset" value="重置" @click="reset"/>
									</div>
								</form>
						</div>
			</div>    
</template>
<script>
import {mapState, mapMutations, mapActions} from 'vuex'
import api from '../api'
export default {
	 data() {
		return {
		    newUser:{},
			flag:false
		}
	},
     computed: {
		 ...mapState(['isShowMosk','user'])
	 },
	 created(){
         for(let prop in this.user){
			 this.newUser[prop] = ""
		 }
	 },
	 methods: {
		 hiddenMosk (){
			  this.setIsShowMosk(false)
			  this.flag = false
		 },
		 changeUser(e, value1){
			let name = e.target.name, 
				value = (value1==0 ||value1==1) ? value1 : e.target.value
            this.newUser[name] = value
			//这里合并的原因是新的newUser只能在触发onchange事件的时候才能被赋值
				this.newUser = Object.assign({},  this.user, this.newUser)
				this.flag = true
		 },
		 commitUserData (){
			 if(!this.flag){
				  this.newUser = Object.assign ({}, this.user)
			 }
			 this.updateStuInfo(this.newUser)
			 
		 },
		 reset (){
			this.flag = true
			for(let prop in this.user){
			 this.newUser[prop] = ""
		 }
		 },
		 ...mapMutations(['setIsShowMosk']),
		 ...mapActions(['updateStuInfo'])
	 },
}
</script>