<template>
	<div>
	<div class="left ">
		<dl class="stuManage">
			<dt>学生管理</dt>
			<router-link tag="dd" :to="{name:'stuList'}" class="stuList">学生列表</router-link>
			<router-link tag="dd" :to="{name:'addStu'}" class="addStu">新增学生</router-link>
		</dl>
	</div>
	<div class="right">
		<router-view></router-view>
	</div>
	</div>
</template>

<script>
	export default {
        
	}
</script>

<style>
</style>
