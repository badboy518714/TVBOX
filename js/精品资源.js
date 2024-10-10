var rule = {
            title: '精品资源',
            host: 'https://www.jingpinx.com',

            timeout:15000,
            url: '/index.php/vod/type/id/fyclass/page/fypage.html',
            searchUrl: '/index.php/vod/search/page/fypage/wd/**.html',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: { 'User-Agent': 'PC_UA',},//网站的请求头,完整支持所有的,常带ua和cookies
            class_url:'7&8&5&6&11&14&12&13&15&16&18&48&19&21&22&20',
    			 class_name:'大厂原创&重磅泄密&偷拍自拍&绿帽偷情&中文字幕&强奸迷奸&高清无码&熟女人妻&剧情大片&黑白配&美颜巨乳&欧美少妇&动漫3D&网红主播&AI换脸&女同男同',
            //class_parse: '.wap-show0&&ul&&li0;a&&Text;a&&href;.*/(\\d+)-----------.html',//a&&href  a&&Text .wap-show0&&ul&&li0
            cate_exclude: '',
            play_parse: false,
            lazy: `js:
						var html;
						let d = [];
						function secondsToHMS(seconds) {
							seconds = parseInt(seconds)
  							let hours = Math.floor(seconds / 3600);
  							let minutes = Math.floor((seconds % 3600) / 60);
							//print(hours, minutes, minutes)
  							seconds = seconds % 60;

  							return hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
						}
						for(let i=0;i<10;i++){
							try{
								html = request(input).match(/decodeURIComponent\\("(.*)"\\)\\)</)[1];
								break;
							}catch(error){}
						}
						html = decodeURIComponent(html).replace(/\\n/gi, "").replace(/ /gi, "");
						
						var href = html.match(/initPlayer\\("(.*?.m3u8)"\\)var/)[1]
						input = {
							jx: 0,
							url: 'https://vdo.sinw.net/m3u8/2024-09-27/001/5160b21427059617/index.m3u8',     
							parse: 0
						 }
						`,
            limit: 6,
            推荐: `js:
						let html;
						print(input);
						let d = [];
						let pdfh = jsp.pdfh;
						let pdfa = jsp.pdfa;
						let pd = jsp.pd;
						for(let i=0;i < 50;i++){
							html = request(input);
							if(html) break;
						}

						let items = pdfa(html, '.addition-content&&ul&&li');
						print(items)
						items.forEach(function(it){
							d.push({
								title: pdfh(it,'a&&Text'),
								desc: '',
								pic_url: pd(it,'img&&src'),
								url: pd(it,'a&&href')
							})	
						})
						
						setResult(d)
						`,
            double: true, // 推荐内容是否双层定位
            一级: `js:
						let html;
						print(input);
						let d = [];
						let pdfh = jsp.pdfh;
						let pdfa = jsp.pdfa;
						let pd = jsp.pd;
						for(let i=0;i < 50;i++){
							html = request(input);
							if(html) break;
						}

						let items = pdfa(html, '.addition-content&&ul&&li');
						print(items)
						items.forEach(function(it){
							d.push({
								title: pdfh(it,'a&&Text'),
								desc: '',
								pic_url: pd(it,'img&&src'),
								url: pd(it,'a&&href')
							})	
						})
						
						setResult(d)
						`,
            二级: '*',
            搜索:`js:
						var html;
						let d = [];
						var prints = function(str){
							console.log(str)
						}
						function secondsToHMS(seconds) {
							seconds = parseInt(seconds)
  							let hours = Math.floor(seconds / 3600);
  							let minutes = Math.floor((seconds % 3600) / 60);
							print(hours, minutes, minutes)
  							seconds = seconds % 60;

  							return hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
						}
						while(1){
							try{
								html = request(input).match(/decodeURIComponent\\("(.*)"\\)\\)</)[1];
								break;
							}catch(error){
								continue;
							}
						}
						html = decodeURIComponent(html).replace(/\\n/gi, "").replace(/ /gi, "");
						var items = html.match(/(<aclass="one".*?<\\/span><\\/a>)/g);
						//prints(html);
						items.forEach(function(it){
							try{
								var r = it.match(/secondsToHMS\\((\\d+)\\)/)[1];
								prints(r)
								d.push({
									title: it.match(/"title\">(.*?)<\\/span>/)[1],
									desc: secondsToHMS(r),
									pic_url: it.match(/data-original="(.*?)"><spanclass/)[1].replace(/\\.js/g, ".webp"),
									url: it.match(/href="(.*?)"><div/)[1]
								})
							}catch(error){ }
							
							
						})
					
						setResult(d)
						`
        }