<template>
	<div class="addStudent content1" >
		<form id="editForm">
			<table border="0" cellspacing="0" cellpadding="0">
				<tr>
					<td><label for="name">姓名</label></td>
					<td><input type="text" name="name"></td>
				</tr>
				<tr>
					<td><label for="sex">性别</label></td>
					<td>
						<input type="radio" value="0" name="sex" checked>男
						<input type="radio" value="1" name="sex">女
					</td>
				</tr>
				<tr>
					<td><label for="sNo">学号</label></td>
					<td>
						<input type="text" name="sNo">
					</td>
				</tr>
				<tr>
					<td><label for="email">邮箱</label></td>
					<td>
						<input type="text" name="email">
					</td>
				</tr>
				<tr>
					<td><label for="birth">出生年</label></td>
					<td>
						<input type="text" name="birth">
					</td>
				</tr>
				<tr>
					<td><label for="phone">手机号</label></td>
					<td>
						<input type="text" name="phone">
					</td>
				</tr>
				<tr>
					<td><label for="address">住址</label></td>
					<td>
						<input type="text" name="address">
					</td>
				</tr>
			</table>
			<div class="Btn">
				<input type="submit" id="addStu" class="commit" value="提交" />
				<input type="reset" value="重置" />
			</div>
		</form>
	</div>
</template>

<script>
    export default{

	}
</script>

<style>
</style>
