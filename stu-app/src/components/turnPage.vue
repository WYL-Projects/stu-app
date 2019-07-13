<template>
	<ul class="turn-page">
		<li class="lastPage" v-show="curPage>1" @click="prePage">上一页</li>
		<!-- 自动生成li 默认123-->
		<li class="pageNum" v-show="curPage>3" @click="lockCurPage">1</li>
	    <li v-show="curPage>4">...</li>	
		<li v-for="i in 4" :key="i"
		:class="{'cur-page':i==3}"
		 v-show="curPage+i>3&&curPage-3+i<=sumPage"
		 @click="lockCurPage"
		>{{curPage-3+i}}</li>
		<!-- 点击展现后面 前提是有-->
		<li v-show="curPage+4<=sumPage">...</li>
		<li v-show="curPage+3<=sumPage" class="pageNum" @click="lockCurPage">{{sumPage}}</li>
		<li class="nextPage" v-show="curPage<sumPage" @click="nextPage">下一页</li>
	</ul>
</template>

<script>
    import { mapState, mapMutations, mapActions } from 'vuex'
    export default {
		created() {
		},
		methods: {
			prePage(){
				this.getStuList(this.curPage - 1)
			},
			nextPage(){
				this.getStuList(this.curPage + 1)
			},
			lockCurPage(e){
				console.log(e.target.innerText)
				this.getStuList(+e.target.innerText)
			},
			...mapMutations(['setPage']),
			...mapActions(['getStuList'])
		},
		computed: {
			...mapState({
				curPage:'page',
				sumPage:'sumPage'
			})
		},
	}
</script>

<style>
</style>
