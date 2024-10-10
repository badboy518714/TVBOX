var rule = {
            title: '方庄聚会',
            host: 'https://site.bjfengtaichurch.cn',
				  //HOST="https://jgtq.000104gg.xyz"
            timeout:5000,
            url: '/portal/portalpc/get-listv2?pid=230&cid=fyclass&page=fypage&size=10',
            searchUrl: '/search/**',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: { 'User-Agent': 'MOBILE_UA',},//网站的请求头,完整支持所有的,常带ua和cookies
            class_url:'951&956&957&954&1434&952&959&1011',
    			 class_name:'主日证道&查经聚会&每日灵粮&悦读分享&爱的团契&敬拜赞美&基要神学&信仰影视',
            //class_parse: '.wap-show0&&ul&&li0;a&&Text;a&&href;.*/(\\d+)-----------.html',//a&&href  a&&Text .wap-show0&&ul&&li0
            cate_exclude: '',
            play_parse: true,
            lazy: '',		
            limit: 6,
            推荐:'',
            double: true, // 推荐内容是否双层定位
            一级: `js:
						let d = [];
						let json_data = JSON.parse(request(input));
						let items = json_data["data"]["data"];
						items.forEach(function(it){
								d.push({
									title: it["title"],
									desc: it["create_time"],
									pic_url: it["head_img"],
									url: it["content_url"]
								})							
						})
						setResult(d)
						`,
            二级: `js:
						let pdfh = jsp.pdfh;
        			 let pdfa = jsp.pdfa;
        			 let pd = jsp.pd;
						let html = request(input);
						let flag = 0;
						let playFrom = ['线路1','线路2','线路3','线路4'];
						let playUrl_1 = [];
						let playUrl_2 = [];
						let playUrl_3 = [];
						let playUrl_4 = [];
						print(input);

						VOD = {
							vod_id: '1832',
							vod_name: pdfh(html,'.title&&Text'),
							vod_pic: pd(html,'.dedication&&a:eq(0)&&img&&src'),
							type_name: pd(html,'.audio-kj&&audio&&source:eq(0)&&type'),
							vod_year: '',
							vod_area: '北京-方庄聚会点',
							vod_remarks: '',
							vod_actor: '',
							vod_director: '',
							vod_content: ''
						};
						print(VOD)
						let url_vedio = pd(html,'source:eq(0)&&src');
						print(url_vedio)
						if(/mp3|mp4|m4a|m3u8/i.test(url_vedio)){ flag = 1; playUrl_1.push('阿门$' +  url_vedio);}
						else {
							let aaa = "https://oss.arksaas.cn/live1832/audio1832/jwHoew194B3Q.mp3";
							print("11111111111111222222222222222222333333333333333++++++++++++++++++++++++++");
							let href = pd(html, 'a&&href');
							print(href);
							let items;
							let video_id;
							if(/urlid=/.test(href)){
								let data = href.match(/movie\\/(\\d+).*urlid=(\\d+)/);
								print(data);
								href = 'https://www.ifuyin.net/api/api/tv.movie/url?movid=' + data[1] + '&urlid=' + data[2] + '&type=1&lang=zh';
								print(href)
		  						let json_data = JSON.parse(request(href));
								items = ["'" + json_data["data"]["url"] + "'" ];
							}else{
								html = request(href).replace(/ /g, "").replace(/\\n/g, "");
								video_id = html.match(/(wxv_\\d+)/)[1];
								items = html.match(/url:\\(([^)]*)\\)\\.replace/g);
							}
							print(items);	
							
							for(let i= 0;i< items.length ; i++ ){
								let url = items[i].split(/'/)[1].replace(/\\\\x26amp;/g, '&');
								if(/live/.test(url)){ playUrl_1.push("福音影视$" + url); flag = 1; break; }
								let format_id = url.match(/\\.f(\\d+)\\./)[1];
								url =  url.replace(/http/, "https") + '&vid=' + video_id + '&format_id=' + format_id + '&support_redirect=0&mmversion=false';
								let line = i % 4;
								switch(line){
									case 1: playUrl_1.push("第" + Math.floor(i/4 + 1).toString() + "集$" + url ); break;
									case 2: playUrl_2.push("第" + Math.floor(i/4 + 1).toString() + "集$" + url ); break;
									case 3: playUrl_3.push("第" + Math.floor(i/4 + 1).toString() + "集$" + url ); break;
									case 0: playUrl_4.push("第" + Math.floor(i/4 + 1).toString() + "集$" + url ); break;
								}
								
								html = request(url,{headers:{"User-Agent":PC_UA,"referer":"https://mp.weixin.qq.com/","Range":"bytes=0-50"}});
								//print(html);	
							}

						}
						
						if(flag){
							VOD.vod_play_from = '北京方庄$$$';
							VOD.vod_play_url = playUrl_1.join("#");
						}else{
							VOD.vod_play_from = playFrom.join("$$$");	
							VOD.vod_play_url = playUrl_1.join("#") + '$$$' +playUrl_2.join("#") + '$$$' + playUrl_3.join("#") + '$$$' +playUrl_4.join("#");	
						}
						print(VOD);
						`,
            搜索:'*'
        }