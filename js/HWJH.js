// 注意事项:此源仅支持tvbox的js1以及c#版drpy的js0，暂不支持drpy官方py版的js0

// 注入全局方法,方便
globalThis.getTime = function(){
	let ts = Math.round(new Date().getTime()/1000).toString();
	log('获取时间戳:'+ts);
	return ts
}

globalThis.getHeaders= function(input,ts){
	let tkstr=input.split('?')[1].split('&').map(function(it){ return it.split('=')[1] }).join('');
	tkstr=input.split('?')[0].replace('https://api.tyun77.cn','')+tkstr+ts+'XSpeUFjJ';
	log('tk加密前:'+tkstr);
	let TK=md5(tkstr);
	log('tk加密后:'+TK);
	let headers={
    "User-Agent":"okhttp/3.12.0",
    "TK":TK
	};
	return headers
}

var rule = {
    title:'海外教会',
    host:'https://live.vhall.com',
    homeUrl:'',
    searchUrl:'v3/webinars/webinar/get-list?pos=fypage&limit=12&title=**&order_type=1&is_private=0&need_flash=1&home_user_id=18789693',
    searchable:2,
    quickSearch:1,
    filterable:0,
    //multi:1,
    // 分类链接fypage参数支持1个()表达式
    url:'/v3/webinars/fyclass/get-list?pos=fypage&limit=12&order_type=1&is_private=0&need_flash=1&home_user_id=18789693',//fyfilter
    filter_url: '{{fl.title}}',
    filterable:1,//是否启用分类筛选,
    headers:{'User-Agent': 'PC_UA'},
    timeout:5000,
    class_name:'海外直播&圣经专题',
    class_url:'webinar&subject',
    limit:20,
    play_parse:true,
    //play_json:1,
    // 手动调用解析请求json的url,此lazy不方便     //'https://www.ifuyin.net/html/'
    filter_url: '{{fl.title}}',
    filter: { "webinar": [{"key":"title","name":"直播筛选","value":[ {"n":"主日崇拜","v":"title=主日崇拜"},  {"n":"忍耐和恩慈","v":"title=忍耐和恩慈"}, {"n":"每日以马内利","v":"title=每日"}]}]},
    //filter_def:{ webinar:{title:'webinar'}},
    lazy:`js:
			let m3u8_url = input;
			if (!(/m3u8|mp4/.test(input))) {
				
				let ids = input.split("_");
				let line_id = parseInt(ids[0]);
				let first_url = "https://live.vhall.com/v3/webinars/watch/init";
				
				let body = 'webinar_id=' + ids[1] + '&clientType=standard&live_type=0&stealth=0&id=' + ids[2] + '&visitor_id=v1822070493533798400';
				let json_data = JSON.parse(request(first_url, { headers: { 'User-Agent': MOBILE_UA }, method: 'POST', body: body }));
				let record_id = json_data["data"]["record"]["paas_record_id"];
				let app_id = json_data["data"]["interact"]["paas_app_id"];
				let access_token = json_data["data"]["interact"]["paas_access_token"];				
				let second_url = "https://api.vhallyun.com/sdk/v2/demand/get-record-watch-info";
				body = "client=pc_browser&app_id=" + app_id + "&third_party_user_id=visit_v1822070493533798400&access_token=" + access_token + "&package_check=peter&record_id=" + record_id;
				json_data = JSON.parse(request(second_url, { headers: { 'User-Agent': MOBILE_UA }, method: 'POST', body: body }));
				let token = json_data["data"]["default_server"]["token"];
				let lines = json_data["data"]["default_server"]["hls_domainnames"];
				
				if(lines.length == 2){
					m3u8_url = lines[line_id - 1]["hls_domainname"] + "?token=" + token;
				}else if(lines.length == 1){
					m3u8_url = lines[0]["hls_domainname"] + "?token=" + token;
				}
				
			} 
				
			input = {
				jx: 0,
				url: m3u8_url,
				parse: 0
			 }
		 `,
    推荐:'',
    double: true, // 推荐内容是否双层定位
    一级:`js:
			print(input);
			//print(getTime())
			let page = ((parseInt(input.match(/pos=(\\d+)/)[1])-1)*12).toString();		
			input = input.replace(/pos=\\d+/, 'pos=' + page);
			//print(input);
        let d = [];
			let html = request(input, { headers: { 'User-Agent': MOBILE_UA, 'referer': 'https://live.vhall.com' }, method: 'POST', body: ''});
			let items =  JSON.parse(html)["data"]["list"]
			//print(items);
			//print(items.length)
			items.forEach(function(it){
				if(/subject/.test(input)){
					d.push({
					
               title: it["title"],
               desc: it["created_at"],
               pic_url: it["cover"],
               url: 'v3/special/detail?id=' + it["id"] + '&delay=0'
           		})
				}else {
					if(it["pv"] != 0){
						d.push({					
               		title: it["subject"],
               		desc: it["updated_at"],
               		pic_url: it["img_url"],
               		url: it["share_link"]
          			 })	
					}
				}
				
           
        });
        //print(d)
        setResult(d)
    `,
    二级: `js:
			let html;
			let items;
			if(/special/.test(input)){
				let referer = input
				let subject_id = input.match(/id=(\\d+)/)[1];
				let url_info = 'https://live.vhall.com/v3/webinars/subject-watch/subject-watch-info?subject_id=' + subject_id;
				print(url_info)
				let video = request(url_info, { headers: { 'User-Agent': MOBILE_UA, 'referer': referer }, method: 'POST', body: ''});
				print(video)
				let video_info = JSON.parse(video)["data"];
				input = 'https://live.vhall.com/v3/webinars/subject/get-webinar-list?subject_id=' + subject_id + '&extra_fields=pv&pos=0&limit=100'
				html = request(input, { headers: { 'User-Agent': MOBILE_UA, 'referer': referer }, method: 'POST', body: ''});
				items =  JSON.parse(html)["data"]["list"]
				VOD = {
					vod_id: video_info["id"],
					vod_name:video_info["title"],
					vod_pic: video_info["cover"],
					type_name: '圣经专题',
					vod_year: video_info["created_at"],
					vod_area: '',
					vod_remarks: video_info["updated_at"],
					vod_actor: 'jdsmt--https://live.vhall.com/v3/user/home/18789693',
					vod_director: '',
				vod_content: video_info["intro"]
				};
				let playList_1 = [];
				let playList_2 = [];
				items.forEach(function(it){
		  			let url = 'https://live.vhall.com/v3/lives/watch/' + it["id"] + '?id=' + subject_id;
           	  playList_1.push(it["subject"] + "$1_" + it["id"] + '_' + subject_id);
					playList_2.push(it["subject"] + "$2_" + it["id"] + '_' + subject_id);
        	});
				VOD['vod_play_from'] = "专题线路1$$$专题线路2";
				VOD['vod_play_url'] = playList_1.join("#") + '$$$' + playList_2.join("#");
				print(VOD)
			}else if(/watch/.test(input)) {
				let webinar_id = input.match(/watch\\/(\\d+)/)[1];
				print(webinar_id);
				let first_url = "https://live.vhall.com/v3/webinars/watch/init";
				let body = 'webinar_id=' + webinar_id + '&clientType=standard&live_type=0&stealth=0&visitor_id=v1822070493533798400';
				let json_data = JSON.parse(request(first_url, { headers: { 'User-Agent': MOBILE_UA }, method: 'POST', body: body }));
				//print(json_data);
				let record_id = json_data["data"]["record"]["paas_record_id"];
				let app_id = json_data["data"]["interact"]["paas_app_id"];
				let access_token = json_data["data"]["interact"]["paas_access_token"];				
				let webinar = json_data["data"]["webinar"];
				let title = webinar["subject"];
				print(title)
				print(webinar)
				VOD = {
					vod_id: webinar["id"].toString(),
					vod_name: title,
					vod_pic: webinar["img_url"],
					type_name: '海外直播',
					vod_year: webinar["start_time"],
					vod_area: '',
					vod_remarks: webinar["actual_start_time"],
					vod_actor: 'jdsmt--https://live.vhall.com/v3/user/home/18789693',
					vod_director: '',
					vod_content: webinar["introduction"]
				};
				print(VOD)
				let second_url = "https://api.vhallyun.com/sdk/v2/demand/get-record-watch-info";
				body = "client=pc_browser&app_id=" + app_id + "&third_party_user_id=visit_v1822070493533798400&access_token=" + access_token + "&package_check=peter&record_id=" + record_id;
				json_data = JSON.parse(request(second_url, { headers: { 'User-Agent': MOBILE_UA }, method: 'POST', body: body }));
				//print(json_data)
				items = json_data["data"]["default_server"]["hls_domainnames"];
				let token = json_data["data"]["default_server"]["token"];
				let playList = [];
				let playFrom = [];
				print(items)
				items.forEach(function(it){
					let m3u8_url = it["hls_domainname"] + '?token=' + token;
					playFrom.push(it["line"]);
					playList.push(m3u8_url);
				})
	
				VOD.vod_play_from = playFrom.join('$$$');
				VOD.vod_play_url = playList.join('$$$');
				print(VOD)
			}
    	  `,
    搜索:`js:
			let page = ((parseInt(input.match(/pos=(\\d+)/)[1])-1)*12).toString();			
			input = input.replace(/pos=\\d+/, 'pos=' + page);
			print(input);
        let d = [];
			let html = request(input, { headers: { 'User-Agent': MOBILE_UA, 'referer': 'https://live.vhall.com' }, method: 'POST', body: ''});
			let items =  JSON.parse(html)["data"]["list"]
			print(items);
			print(items.length)
			items.forEach(function(it){
				if(/subject/.test(input)){
					d.push({
					
               title: it["title"],
               desc: it["created_at"],
               pic_url: it["cover"],
               url: 'v3/special/detail?id=' + it["id"] + '&delay=0'
           		})
				}else {
					if(it["pv"] != 0){
						d.push({					
               		title: it["subject"],
               		desc: it["updated_at"],
               		pic_url: it["img_url"],
               		url: it["share_link"]
          			 })	
					}
				}
				
           
        });
        print(d)
        setResult(d)
    `

}