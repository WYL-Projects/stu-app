<template>
	<div class="search-bar">
		<label for="search-word">关键字搜索</label>
		<input type="text" id="search-word" v-model="keyWord">
		<button type="button" class="search-submit" id="search-submit" @click="search(keyWord)">搜索</button>
	</div>
</template>

<script>
import { mapActions } from 'vuex'
    export default{
		data (){
			return {
				keyWord:''
			}
		},
		methods: {
		  search (keyWord){
			  this.keyWord === '' ?this.getStuList(1):this.searchStu( keyWord )
		  },
	      ...mapActions(['searchStu', 'getStuList'])
		},
	}
</script>

<style>
</style>
