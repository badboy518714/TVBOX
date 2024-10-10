var rule = {
            title: '测试机',
            host: 'https://jgtq.gg51-lyql396.vip',
            hostJs:`js: HOST ='https://jgtq.gg51-lcab395.vip'`,
            timeout:5000,
            url: 'category/fyclass',
            searchUrl: '/index/search.asp?keyword=**&typeid=%C6%AC%C3%FB&page=fypage',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 1,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: { 'User-Agent': 'MOBILE_UA'},//网站的请求头,完整支持所有的,常带ua和cookies	
            编码:'gb2312',
			    搜索编码:'gb2312',
            class_url:'16&17&18&19&21&22&23&24&26&28&29&31&32&33',
    			 class_name:'初信&福音证道&福音电影&赞美&家庭&儿童&纪录片&福音见证&主日学&神学&诗歌&特会&精读圣经&程蒙恩',
            //class_parse: '.wrap&&ul&&li;a&&Text;a&&href;/(.*?)',//'.l_top_5&&ul&&li;a&&Text;a&&href;.*/mlist/(.*?).html',//a&&href  a&&Text .wap-show0&&ul&&li0
            cate_exclude: '',
            play_parse: true,
            lazy: `js:
						let m3u8_url = input;
						if(!(/mp4|mp3|m3u8/i.test(input))){
							m3u8_url = request(input).match(/player[^.]*file:"([^"]*.mp4)"/)[1];
						}
						input = {
							jx: 0,
							url: m3u8_url,
							parse: 0
			 			}
		  			  `,
            limit: 10,
            推荐: `js:
						 print(HOST)
						 print("123456--------52431");
						 var d = [];
						 setResult(d)
						`,
            double: true, // 推荐内容是否双层定位   
            一级: `js:
						//print(input);
        			 var d = [];
        			 let pdfh = jsp.pdfh;
        			 let pdfa = jsp.pdfa;
        			 let pd = jsp.pd;
						let html = request(input);
						//print(html);
						let items = pdfa(html, ".d_5&&.d_1_2&&div:gt(0)");
						items.forEach(function(it){
            			d.push({
                			title: pdfh(it, ".l_film_3&&.l_film_4:eq(0)&&Text"),
                			desc: pdfh(it, ".l_film_3&&.l_film_4:eq(2)&&Text") + pdfh(it, ".l_film_3&&.l_film_4:eq(1)&&Text"),
                			pic_url: pd(it, ".l_film_2&&img&&src"),
                			url: pd(it, ".l_film_2&&a&&href"),
            			})
        			});
        			//print(d)
        			setResult(d)
    				 `,
            二级: `js:
						print("123456--------52431");
        			 let pdfh = jsp.pdfh;
        			 let pdfa = jsp.pdfa;
        			 let pd = jsp.pd;
						let html = request(input);

						let items = pdfa(html, ".d_5&&.d_1_2&&.t_partnum");
						let nums = items.length / 5;
						VOD = {
							vod_id: input.match(/html\\/(\\d+)\\.html/)[1],
							vod_name: pdfh(html, ".d_5&&.l_film_4:eq(0)&&Text"), 
							vod_pic: '',
							type_name: pdfh(html, ".d_5&&.l_film_4:eq(1)&&Text").split('：')[1] + '-' + pdfh(html, ".d_5&&.l_film_4:eq(5)&&Text").split('：')[1],
							vod_year: pdfh(html, ".d_5&&.l_film_4:eq(4)&&Text").split('：')[1],
							vod_area: '',
							vod_remarks: pdfh(html, ".d_5&&.l_film_4:eq(4)&&Text").split('：')[1],
							vod_actor: pdfh(html, ".d_5&&.l_film_4:eq(2)&&Text").split('：')[1],
							vod_director: '',
							vod_content: pdfh(html, ".d_5&&.d_1_2&&li:eq(-2)&&Text").split('：')[1]
						};
						
						let playFrom = ["专线VIP", "专线1", "专线2", "专线3", "专线4"];
						let playList_1 = [];
						let playList_2 = [];
						let playList_3 = [];
						let playList_4 = [];
						let playList_5 = [];
						for(let i = 0; i< items.length; i++){	
							let line = Math.floor(i / nums) + 1;
							let remainder = (i % nums + 1).toString();
							//print(line)
							//print(remainder)
							switch(line){
								case 1: playList_1.push('第' + remainder + '集$' + pd(items[i], "a&&href"));break;    
								case 2: playList_2.push('第' + remainder + '集$' + pd(items[i], "a&&href"));break;    
								case 3: playList_3.push('第' + remainder + '集$' + pd(items[i], "a&&href"));break;    
								case 4: playList_4.push('第' + remainder + '集$' + pd(items[i], "a&&href"));break;    
								case 5: playList_5.push('第' + remainder + '集$' + pd(items[i], "a&&href"));break;    
							}							
						}
						VOD['vod_play_from'] = playFrom.join("$$$");
						VOD['vod_play_url'] = playList_5.join("#") + "$$$" + playList_1.join("#") + "$$$" + playList_2.join("#") + "$$$" + playList_3.join("#") + "$$$" + playList_4.join("#");
						//print(VOD)
    				  `,
            搜索:`js:
						print(input);

						let key = input.match(/keyword=(.*?)&typeid/)[1]
						print(key)
						//input = input.replace(/keyword=(.*?)&typeid/, 'keyword=%D6%F7&typeid')
						
        			 let d = [];
        			 let pdfh = jsp.pdfh;
        			 let pdfa = jsp.pdfa;
        			 let pd = jsp.pd;
						let html = request(input);
						//print(html);
						let items = pdfa(html, ".l_film_2&&.y");
						//print(items)
						items.forEach(function(it){
            			d.push({
                			title: pdfh(it, ".mayi&&Text"),
                			desc: pdfh(it, ".eng_S&&Text"),
                			pic_url: pd(it, "img:eq(1)&&src"),
                			url: pd(it, ".mayi&&href"),
            			})
        			});
        			//print(d)
        			setResult(d)
    				 `
        }