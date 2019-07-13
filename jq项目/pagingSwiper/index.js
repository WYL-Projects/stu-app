(function (){
	function TurnPage(options){
		this.wrap = options.wrap;
		this.curPage = options.curPage;
		this.allPage = options.allPage;
		this.changePage = options.changePage;
		this.fillHtml();
	};
	TurnPage.prototype.fillHtml = function(){
		$(this.wrap).empty();
		//添加上一页的按钮
		if(this.curPage > 1){
			$(this.wrap).append($('<li class="prev-page">上一页</li>'))
		}else{
			$(this.wrap).remove('.prev-page');
		}
		
		//展示第一页
		if(this.curPage - 2 > 1){
			$(this.wrap).append($('<li class="tabNumber">1</li>'))
		};
		if(this.curPage - 2 > 2){
			$(this.wrap).append($('<li>...</li>'));
		};
		
		for(var i = this.curPage - 2;i <= this.curPage + 2;i++){
			if(i > 0 & i <= this.allPage){
				if(i == this.curPage){
					$(this.wrap).append($('<li class="tabNumber cur-page">' + i + '</li>'))
				}else{
					$(this.wrap).append($('<li class="tabNumber">' + i + '</li>'))
				}
			}
		};
		
		if(this.curPage + 2 < this.allPage - 1){
			$(this.wrap).append($('<li>...</li>'));
		}
		
		if(this.curPage + 2 < this.allPage){
			$(this.wrap).append($('<li class="tabNumber">' + this.allPage + '</li>'))
		}
		//添加下一页
		if(this.curPage < this.allPage){
			$(this.wrap).append($('<li class="next-page">下一页</li>'))
		}else{
			$(this.wrap).remove('.next-page');
		}
	};
	$.fn.extend({
		turnPage:function(options){
			options.wrap = this;
			
			new TurnPage(options);
			return this;
		}
	})
})()
console.log($);