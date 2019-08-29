/**
 * create by fake in 2019/07/12
 * fakeAjax 自封装Ajax方法
 * paramsObj json类型参数
 *  type    :请求类型(string 'get'/'post')
 *  url     :请求地址(string)
 *  data    :请求参数(json)
 *  success :请求参数(function)
 * **************************************
 * 使用示例：
 * <button onclick="request()">发送请求</button>
 * function request(){
 * 	fakeAjax({
		type:'get',
		url:'tt.php?a=6',
		data:{
			tudou:'xipeng',
			age:'xxx'
		},
		success:function(res){
			console.log(res);
		}
	});	
		}
 * */
	function fakeAjax(paramsObj) {
		/*1.处理paramsObj参数,把这个json格式的参数转成必要的格式*/
		if(paramsObj.type.toLowerCase() == 'get') {
			/*1.1如果是get请求,那么将参数拼接到url后面;*/
			var arr = [];
			/*1.11 {json格式}->[数组属性]->join()->{字符串形式};*/
			for(var pro in paramsObj.data) {
				var str = pro + '=' + paramsObj.data[pro];
				arr.push(str);
			}
			//--以&符为间隔把数组中的所有元素放入一个字符串;
			var canshu = arr.join('&');
			//拼接到url后面						
			paramsObj.url += paramsObj.url.indexOf('?') == -1 ? '?' + canshu :
				'&' + canshu;
			/*&分割一定要加，防止在地址请求中已经存在参数*/
			console.log(paramsObj.url)
		} else {
			/*1.2如果是post请求,则构建formData参数对象;*/
			var formData = new FormData();
			for(var pro in paramsObj.data) {
				formData.append(pro, paramsObj.data[pro]);
			}
		}
		var xhr = new XMLHttpRequest();
		xhr.onreadystatechange = function() {
			if(xhr.readyState == 4) {
				if(xhr.status == 200) {
					//请求返回时调用success函数
					paramsObj.success(JSON.parse(xhr.responseText));
				}
			}
		};
		xhr.open(paramsObj.type, paramsObj.url, true);
		if(paramsObj.type.toLowerCase() == 'get') {
			xhr.send(null);
		} else {
			xhr.send(formData);
		};
	};