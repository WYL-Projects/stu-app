<template>
	<div class="studentList content1">
	 <search-bar></search-bar>
	 <show-data></show-data>
	 <mosk-page></mosk-page>
	 <turn-page></turn-page>
 </div>
</template>

<script>
	import searchBar from "./searchBar.vue"
	import showData from "./showData.vue"
	import turnPage from "./turnPage.vue"
	import moskPage from "./mosk.vue"
	export default{
		
		components:{
			searchBar,
			showData,
			turnPage,
			moskPage
		}
	}
</script>

<style>
</style>
