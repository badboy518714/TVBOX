globalThis.secondsToHMS = function(seconds) {
	seconds = parseInt(seconds);
	let hours = Math.floor(seconds / 3600);
	let minutes = Math.floor((seconds % 3600) / 60);
	print(hours, minutes, minutes)
	seconds = seconds % 60;

	return hours.toString() + ":" + minutes.toString() + ":" + seconds.toString();
}
globalThis.get_Vedios = function(url) {
	let html;
	let d = [];
	let pdfh = jsp.pdfh;
	let pdfa = jsp.pdfa;
	let pd = jsp.pd;
	for(let i=0;i<5;i++){
		html = request(url);
		if(html) break;
	}
	html = decodeURIComponent(html).replace(/\n/gi, "").match(/"(.*)"/)[1];
	let items = pdfa(html,'.one');
	for(let i = 0; i < items.length; i++){
		let desc = items[i].match(/secondsToHMS\((\d+)\)/);
		if(desc){
			d.push({
				title: pdfh(items[i],'.title&&Text'),
				desc: secondsToHMS(desc[1]),
				pic_url: pd(items[i],'img&&data-original').replace(/\.js/, ".webp"),
				url: pd(items[i],'a&&href')
			})
		}
	}
	return d;
}
var rule = {
            title: '精品资源',
            host: 'https://gg51-001.xyz',
            //host: "https://jgtq.gg51-lieb401.vip",
            hostJs: 'print(HOST); let html;  for(let i=0;i<20;i++){ html = decodeURIComponent(request(HOST,{headers:{"User-Agent":PC_UA}})); if(html) break; }  let match_s = html.match(/(gg51-[^.]*.vip)/gi);print(match_s); let host_list = []; for(let i in match_s){ print(i); print(match_s[i]);host_list.push("https://jgtq." + match_s[i]); host_list.push("https://d90." + match_s[i]); } print(host_list);let flag = 0; for(let i in host_list){ for( let j=0;j<5;j++){ html = request(host_list[i]); if(html){ print("获取--HOST--成功"); flag = 1 ;HOST = host_list[i]; break; }else{  print("获取--HOST--失败"); }}if(flag) break;} print(HOST);',
            timeout:3000, 
            url: '/category/fyclass/fypage/',
            searchUrl: '/search/**/fypage/',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 1,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: { 'User-Agent': 'MOBILE_UA',},//网站的请求头,完整支持所有的,常带ua和cookies
            class_url:'7&8&5&6&11&14&12&13&15&16&18&48&19&21&22&20',
    			 class_name:'大厂原创&重磅泄密&偷拍自拍&绿帽偷情&中文字幕&强奸迷奸&高清无码&熟女人妻&剧情大片&黑白配&美颜巨乳&欧美少妇&动漫3D&网红主播&AI换脸&女同男同',
            //class_parse: '.wap-show0&&ul&&li0;a&&Text;a&&href;.*/(\\d+)-----------.html',//a&&href  a&&Text .wap-show0&&ul&&li0
            cate_exclude: '',
            play_parse: false,
            lazy: `js:
						let html;						
						for(let i=0;i < 5;i++){
							html = request(input);
							if(html) break;
						}
						html = decodeURIComponent(html).replace(/\\n/gi, "").replace(/ /gi, "");
						
						let href = html.match(/initPlayer\\("(.*?.m3u8)"\\)var/)[1];
						input = {
							jx: 0,
							url: 'https://vdo.sinw.net/m3u8/' + href,     
							parse: 0
						 }
						`,		
            limit: 6,
            推荐: `js:
						let d = get_Vedios(input);
						setResult(d);
						`,
            double: true, // 推荐内容是否双层定位
            一级: `js:
						let d = get_Vedios(input);
						setResult(d);
						`,
            二级: '*',
            搜索:`js:
						let d = get_Vedios(input);
						setResult(d);
						`
        }