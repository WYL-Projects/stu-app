<template>
  <div class="wrapper">
    <header-vue></header-vue>
    <div class="content">
      <left-vue></left-vue>
    </div>
  </div>
</template>
<script>
import headerVue from "./views/header.vue"
import leftVue from "./views/left.vue"
import api from './api.js'
import { mapActions, mapState } from "vuex"
export default {
  data() {
    return {
       studentList:[]
    }
  },
  components: {
    headerVue,
    leftVue
  },
  methods: {
      ...mapActions(['getStuList'])
  },
  created() {
    this.getStuList(1);
    
	 // this.$store.dispatch('getStuList');
	 // api.findPage(1,10).then(data=>console.log(data)).catch(err=>console.log(err));
  },
  computed: {
    ...mapState(['stuList'])
  },
}
</script>

<style>
* {
  padding: 0;
  margin: 0;
}
body,
html {
  width: 100%;
  height: 100%;
}
.wrapper {
  width: 100%;
  height: 100%;
}
.header {
  width: 100%;
  height: 70px;
  background: #354457;
  line-height: 70px;
}
.header img {
  width: 40px;
  height: 40px;
  vertical-align: middle;
  margin-left: 20px;
}
.header .logoItem {
  color: #b3bcc5;
}
.content {
  overflow: hidden;
}
.content .left {
  float: left;
  width: 200px;
  height: 850px;
  background: #4d5e70;
}
.content .left .stuManage {
  color: #b3bcc5;
  font-size: 14px;
}
.content .left .stuManage dt {
  padding: 8px 10px;
  font-weight: bold;
}
.left .stuManage dd {
  height: 40px;
  line-height: 40px;
  padding-left: 20px;
}
.left .stuManage dd.active {
  background: #ddd;
  color: #354457;
}
.content .right {
  width: calc(100% - 200px);
  height: 800px;
  float: left;
}
.addStudent {
  display: block;
}
#editForm {
  width: 400px;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 50px auto;
}
#editForm tr td {
  height: 30px;
}
#editForm tr td:first-child {
  text-align: right;
  padding-right: 4px;
}
#editForm tr td input {
  font-size: 16px;
}
#editForm .Btn {
  padding-left: 50px;
}
#editForm .Btn > input {
  padding: 5px 30px;
  font-size: 16px;
  border: 0;
  outline: 0;
  background: #ddd;
}
.studentList {
  width: calc(100% - 200px);
  position: absolute;
  background: gainsboro;
}
.search-bar {
  height: 60px;
  line-height: 60px;
  padding-left: 20px;
}
.search-bar label {
  font-size: 16px;
  color: #646987;
  font-weight: 800;
}
.search-bar input {
  font-size: 16px;
  border: none;
  outline: none;
  width: 200px;
  height: 30px;
  color: #b3bcc5;
}
.search-bar .search-submit {
  background: #354457;
  border: none;
  outline: none;
  padding: 5px 10px;
  color: #ddd;
  font-size: 16px;
}
.search-bar .search-submit:hover {
  background: #1e2936;
}
.studentList > table {
  width: 100%;
  font-size: 14px;
}
.studentList > table thead {
  background: #e3e8ee;
}
.studentList > table tbody {
  background: #fff;
}
.studentList > table tr td {
  padding: 10px;
  text-align: center;
}
.studentList > table .btn {
  padding: 3px 10px;
  border: none;
  outline: none;
  color: #fff;
}
.studentList > table .btn.edit {
  background: #5cb85c;
  cursor: pointer;
}
.studentList > table .btn.edit:hover {
  background: greenyellow;
}
.studentList > table .btn.del {
  background: #c9302c;
  cursor: pointer;
}
.studentList > table .btn.del:hover {
  background: red;
}

.turn-page {
  font-size: 0;
  margin: 20px;
  position: absolute;
  right: 0;
}
.turn-page li {
  font-size: 14px;
  display: inline-block;
  padding: 5px 10px;
  border: 1px solid #646987;
  cursor: pointer;
}
.turn-page li.cur-page {
  background: #5cb85c;
  color: white;
}
.mosk {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
}
.mosk .studentForm {
  width: 450px;
  height: 350px;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.studentForm #editForm {
  margin: 0;
}
.mosk .studentForm h3 {
  margin: 20px;
  color: #b3bcc5;
}
</style>
