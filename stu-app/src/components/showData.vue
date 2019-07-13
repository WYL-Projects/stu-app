<template>
	<table>
		<thead>
			<tr>
				<td>学号</td>
				<td>姓名</td>
				<td>性别</td>
				<td>邮箱</td>
				<td>年龄</td>
				<td>手机号</td>
				<td>住址</td>
				<td>操作</td>
			</tr>
		</thead>
		<tbody class="dataTbody">
			<tr v-for="(item, index) in stuList" :key="index">
				<td>{{item.sNo}}</td>
				<td>{{item.name}}</td>
				<td>{{item.sex == 0?'男':'女'}}</td>
				<td>{{item.email}}</td>
				<td>{{new Date().getFullYear() - item.birth}}</td>
				<td>{{item.phone}}</td>
				<td>{{item.address}}</td>
				<td>
					<button class="btn edit" @click="edit(item)">编辑</button>
					<button class="btn del" @click="del(item.sNo)">删除</button>
				</td>
			</tr>
		</tbody>
	</table>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
 export default{
	 data(){
		 return {
             item1:{}
		 }
	 },
	 methods: {
		 edit (item){
			 //console.log( this.$store.commit );
			// this.$store.commit('setIsShowMosk',false)
			this.item1 = item //item与user指向相同
			this.setIsShowMosk(true)
			this.setUser(item)
		 },
		 del(sNo){
			 const isDel = window.confirm("是否删除？");
			 if(isDel) {
				 this.delBySno(sNo)
			 }
		 },
		 ...mapMutations(['setIsShowMosk','setUser']),
		 ...mapActions(['delBySno'])
	 },
	 computed: {
		 ...mapState(['stuList'])
	 }
 }
</script>

<style>
</style>
