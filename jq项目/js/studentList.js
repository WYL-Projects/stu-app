var tableData = [], //每页包含的数据
	num = 3, //每页数据数目
	showIndex = 1; //showIndex默认值为1代表第一页
(function() {
	//初始化构造函数
	function OperateStuList() {
		this.dom = {
			form: $('#editForm'),
			mosk: $('.mosk'),
			editBtn: $('.btn.edit'),
			optionsStu: $('.stuManage>dd'),
			studentList: $('.studentList'),
			addStudent: $('.addStudent'),
		};
		this.ways = {
			showMosk: () => {
				this.dom.mosk.slideDown();
			},
			hideMosk: () => {
				this.dom.mosk.slideUp();
			},
			//获取数据的操作
			transferData: ({
				url,
				data,
				cb
			}) => {
				$.ajax({
					type: 'GET',
					url: 'http://api.duyiedu.com' + url,
					data: {
						appkey: '_411771204WYL_1555650312097',
						...data
					},
					dataType: 'json',
					success: cb
				});
			},
			//根据页码得到表格数据
			getDataTable: (pageCode, size) => {
				let self = this.ways;
				$('.pageNum').removeClass('cur-page'); //提前清除颜色
				//if(pageCode==0)  $('.pageNum').eq(pageCode).addClass('cur-page');
				self.transferData({
					url: '/api/student/findByPage',
					data: {
						page: pageCode || 1,
						size: size || num //默认num条数据
					},
					cb: function(res) {
						tableData = res.data.findByPage;
						console.log(pageCode, res.data);
						if (tableData.length == 0) {
							alert('没有更多的数据了！');
						}
						self.renderTable(res.data.findByPage);
					}
				});
				//获取数据后更改分页按钮颜色
				$('.pageNum').eq((pageCode - 1) % 3).addClass('cur-page');
			},
			//把得到的数据渲染得到页面
			renderTable: data => {
				let str = "",
					self = this;
				data.forEach((ele, index) => {
					str +=
						`<tr>
					 	<td>${ele.sNo}</td>
					 	<td>${ele.name}</td>
					 	<td>${ele.sex?'男':'女'}</td>
					 	<td>${ele.email}</td>
					 	<td>${new Date().getFullYear() - ele.birth}</td>
					 	<td>${ele.phone}</td>
					 	<td>${ele.address}</td>
					 	<td>
					 		<button class="btn edit" data-index = ${index} data-sNo = ${ele.sNo}>编辑</button>
					 		<button class="btn del" data-index = ${index} data-sNo = ${ele.sNo}>删除</button>
					 	</td>
					 </tr>`;
				});
				//console.log($('.studentList .dataTbody'));
				$('.studentList .dataTbody').html(str);
				//编辑和删除按钮都需在表格生成之后才能点击
				$('.btn.edit').click(function(e) {
					let index = $(this).attr('data-index');
					self.ways.showMosk();
					self.ways.renderEditForm(tableData[index]);
				});
				$('.mosk').click(self.ways.hideMosk);
				$('.mosk').find(".studentForm").click((e) => {
					e.stopPropagation();
				});
				//删除学生 点击事件
				self.ways.clickDeleteStu();
			},
			//这个是将form表单里面的所有数据包装成类
			getFormData: dom => {
				//取得表单数据
				let data = dom.serializeArray();
				// console.log(data);
				const result = {};
				data.forEach(ele => {
					//console.log(ele.name ,ele.value);
					result[ele.name] = ele.value;
				});
				return result;
			},
			//回填数据
			renderEditForm: function(data) {
				let editForm = $('.studentList #editForm')[0];
				for (let prop in data) {
					if (editForm[prop]) {
						// console.log(editForm[prop].value);
						$(editForm[prop]).attr('value', data[prop]);
						//console.log(editForm[prop]);
					}
				}
			},
			//删除学生
			clickDeleteStu: function() {
				
				var self = this; //this是this.ways
				$('.studentList .btn.del').click(function(e) {
					var isDel = confirm('你确定要删除该学生？');
					if (isDel) {
						var sNo = $(this).data('sno');
						self.transferData({
							url: '/api/student/delBySno',
							data: {
								sNo
							},
							cb: res => {
								//console.log(res);
								if (res.status == 'success') {
									$('.mosk').slideUp();
									$('.left>.stuManage>.stuList').trigger('click', [showIndex]);
								}
							}
						});
					}
				});
			},
			//返回所有数据的长度
			returnAllDataLen: function(callback) {
				this.transferData({
					url: '/api/student/findAll',
					data: {},
					cb: res => {
						callback(res.data.length);
					}
				});
			},

			//*****最难最重要的逻辑操作，分页及分页点击等等
			pagingAllEvent: function() {
				let self = this;
				let count = 0,//栏数
					curMaxShowNum = 3, //刚开始显示最大的页面号为3
					count1 = 0; //用于标记,到第几栏数据
				const lastPage = $('.lastPage'),
					nextPage = $('.nextPage');
				const domArr = []; //用于保存上一栏的dom结构数据
				this.returnAllDataLen((len) => {
					const pageNum = Math.ceil(len / num); //向上取整 //总页数
					//点击分页数字跳到相应的第几页 绑定新生成dom的事件
					function clickPageNum() {
						$('.pageNum').click(function(e) {
							//$(this).addClass('cur-page');
							//得到索引值
							//console.log(num);
							//根据页码分页
							showIndex = Number($(this).html());
							//验证按钮，判断是否可以点
							validateByIndex(showIndex);
							//点击更新数据
							self.getDataTable(showIndex, num);
						});
					};
					//判断showIndex是否是第一页或者最后一页
					function validateByIndex(showIndex1) {
						//lastPage与nextPage不能写在函数外面，因为当turn-page更新节点树时，你想要的并不是那些，因为它们已经更新
						if (showIndex1 == 1) {
							lastPage.css('opacity', '0.5');
							nextPage.css('opacity', '1');
						} else if (showIndex1 == pageNum) {
							lastPage.css('opacity', '1');
							nextPage.css('opacity', '0.5');
						} else {
							lastPage.css('opacity', '1');
							nextPage.css('opacity', '1');
						}
						//当到达每一栏的第一个，判断下面是否还有数据，如果有的话则改变展开栏的颜色及透明度
						if ((showIndex1 - 1) % 3 == 0) {
							if (showIndex1 + 3 > pageNum) {
								$('#slh').css('opacity', "0.5");
							} else {
								$('#slh').css('opacity', "1");
							}
						}
					}
					//点击上一页和下一页的切换
					function switchPage() {
						validateByIndex(1);//默认从第一页开始
						//上一页按钮
						lastPage.click(function() {
							if (showIndex > 1) {
								//先判断是否到每一栏的第一个，而且必须在第二栏之后的栏
								if (showIndex-- > 3 && showIndex % 3 == 0) {//showIndex 第一次为4，showIndex为3
									var index = showIndex / 3 - 1, //得到索引值
										dataArr = domArr[index];
										//由于之前存储的数据默认是每一栏的第一个被设为当前页，但是我们想要的是每一栏的最后一个
									dataArr[0].classList.remove('cur-page');
									dataArr[2].classList.add('cur-page');
									//先移除之前的索dom结构
									$('.pageNum').remove();
									lastPage.after(dataArr);
									//这个是解决点击返回上一栏改变扩展省略的透明度
									$('#slh').css('opacity', "1");
									domArr.splice(index); //用完之后删除数据
									count--; //进入上一栏
									clickPageNum();
									curMaxShowNum = curMaxShowNum - count1;
									count1 = $(".pageNum").length;
									console.log("curMaxShowNum=" + curMaxShowNum);
								};
								self.getDataTable(showIndex);
								validateByIndex(showIndex);
							}
						});
						//下一页按钮
						nextPage.click(function() {
							if (showIndex < pageNum) {
								//showIndex可以被加到4，7，10
								if (showIndex++ >= 3 && showIndex % 3 == 1) {
									var index = showIndex / 3 - 1;
									$('#slh').trigger('click');
									//更改showIndex
									/* 	$('.pageNum').remove();
										lastPage.after(dataArr);
										$('#slh').css('opacity', "1");
										domArr.splice(index); //用完之后删除数据
										count++;//进入下一栏
										clickPageNum(); */
									/* 
																		curMaxShowNum=curMaxShowNum+count1;
																		count1=$(".pageNum").length;
																		console.log("curMaxShowNum="+curMaxShowNum); */
								};
								self.getDataTable(showIndex);
								validateByIndex(showIndex);
							}
						});
					};


					$('.pageNum').eq(0).addClass('cur-page');
					clickPageNum(); //初始化点击事件
					switchPage();


					//如果pageNum > 3的话
					//如果pageNum <= 3的话，默认有三个页
					if (pageNum <= 3) {
						$('#slh').css('opacity', "0.5");
					};

					//点击展开后面的页码
					$('#slh').click(function(e) {
						//可以点击的时候就把它改过来
						//console.log(pageNum);
						if (count < pageNum / 3 - 1) {
							var domStr = "";
							domArr.push([...$('.pageNum')]);
							$('.pageNum').remove(); //先
							//console.log(pageNum,curMaxShowNum);
							for (let i = 1; i < 4 && curMaxShowNum < pageNum; i++, curMaxShowNum++) {
								domStr += `<li class="pageNum">${curMaxShowNum + 1}</li>`;
							};
							//domStr+='<li id="slh">···</li><li class="nextPage">下一页</li>';
							$('.lastPage').after(domStr);
							count++; //
							showIndex = count * 3 + 1;
							count1 = $(".pageNum").length;
							console.log("curMaxShowNum1=" + curMaxShowNum, "count1=" + count1);
							self.getDataTable(showIndex, num);
							validateByIndex(showIndex);
							clickPageNum(); //生成新的页号，同时也加上点击事件
						}
					});

				});
			}
		}
	}
	OperateStuList.prototype.bindEvent = function() {
		const self = this;
		//初始化
		self.ways.getDataTable(showIndex);
		console.log([].slice.call(this.dom.optionsStu));
		//切换左边栏的按钮(学生列表和新增学生)
		[].slice.call(this.dom.optionsStu).forEach((ele) => {
			$(ele).click(function(e, index) {
				console.log(index);
				self.dom.optionsStu.removeClass("active");
				$(ele).addClass("active");
				//console.log(self.dom.studentList,$('.content1'));
				$('.content1').fadeOut();
				$(ele).attr('class') == 'stuList active' ?
					(self.dom.studentList.fadeIn(), self.ways.getDataTable(index || 1)) :
					(self.dom.addStudent.fadeIn());
			});
		});
		//console.log($('#add-stu'));
		
		//新增学生
		$('.addStudent #addStu').click(function(e) {
			e.preventDefault();
			const data = self.ways.getFormData($('#editForm'));
			self.ways.transferData({
				url: '/api/student/addStudent',
				data,
				cb: res => {
					//console.log(res);
					if (res.status == 'success') {
						console.log(res);
						$('#editForm')[0].reset();
						$('.left>.stuManage>.stuList').trigger('click', [showIndex]);
						window.location.reload();
					}
				}
			})
		});
		//学生列表修改学生
		$('.studentList #addStu').click(function(e) {
			e.preventDefault();
			const data = self.ways.getFormData($('.studentList #editForm'));
			self.ways.transferData({
				url: '/api/student/updateStudent',
				data,
				cb: res => {
					if (res.status == 'success') {
						$('.mosk').slideUp();
						//把需要点击的按钮索引值传递过去
						//console.log(showIndex);
						$('.left>.stuManage>.stuList').trigger('click', [showIndex]);
					}
				}
			});

		});
		
		self.ways.pagingAllEvent();

		//按关键字查找数据
		/* url:/api/student/searchStudent

        method:get */
		$('#search-submit').click(function(e) {
             var value = $('#search-word').val();
			 if(value){
				 self.ways.transferData({
					 url:"/api/student/searchStudent",
					 data:{
						 sex:-1,
						 search:value,
						 page:1,
						 size:1
					 },
					 cb:function(res){
						 tableData = res.data.searchList;
						 self.ways.renderTable(tableData);
					 }
				 })
			 }else{
				 self.ways.getDataTable();
			 }
		})
	}
	const osl = new OperateStuList();
	console.log(osl)
	osl.bindEvent();
})()
