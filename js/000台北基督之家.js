globalThis.get_video = function(url) {
	let d = [];
	let pdfh = jsp.pdfh;
	let pdfa = jsp.pdfa;
	let pd = jsp.pd;
	let page;
	if(/page/.test(url)){
		page = url.match(/page\/(\d+)/)[1];
		let html_1 = request(url);
		if((/sermons/.test(url))&&!(/N|Y/.test(url))){ url = url.replace(/&/, '');}
		else if(/sunday/.test(url)){  url = 'https://www.tpehoc.org.tw/page/' + page + '/?wpv_sermons_category=sunday-sermon';}
		else if(/N/.test(url)){  
				let year = url.match(/N(.*?)N/)[1];
				if(/Y/.test(url)){ if(page == '1'){ let month = url.match(/Y(.*?)Y/)[1]; url = "https://www.tpehoc.org.tw/page/1/?wpv_sermons_category=" + month + "-" + year;} }
				else{ url = "https://www.tpehoc.org.tw/page/" + page + "/?wpv_sermons_category=" + year; }
		}
	}
	let html = request(url);
	let items = pdfa(html, '.wpv-sermon-wrapper');
	for(let i = 0; i < items.length; i++){	
		let info = pd(items[i], 'a&&title').replace(/\|/g,';').replace(/｜/g,';').split(';');
		d.push({
			title: info[0],
			desc: info[2] + '--' + info[1],
			pic_url: 'https://img0.baidu.com/it/u=54646213,1278654946&fm=253&fmt=auto&app=138&f=JPEG?w=500&h=333',
			url: pd(items[i], '.wp-audio-shortcode&&source&&src')
		})	
	}
	return d;
}


var rule = {
            title: '台北基督之家',
            host: 'https://www.tpehoc.org.tw',
				  //HOST="https://jgtq.000104gg.xyz"
            timeout:5000,
            url: '/fyfilter/page/fypage/',
            searchUrl: '/search/**',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: { 'User-Agent': 'PC_UA',},//网站的请求头,完整支持所有的,常带ua和cookies
            class_url:'sermons',
    			 class_name:'主日证道',
            //class_parse: '.wap-show0&&ul&&li0;a&&Text;a&&href;.*/(\\d+)-----------.html',//a&&href  a&&Text .wap-show0&&ul&&li0
            cate_exclude: '',
            filter_url: '{{fl.cateId}}{{fl.year}}{{fl.month}}',
            filter: {'sermons': [{'key': 'cateId', 'name': '主日证道', 'value': [{'n': '主日講道', 'v': 'sunday-sermon'}]}, {'key': 'year', 'name': '年份', 'value': [{'n': '2024', 'v': 'N2024N'}, {'n': '2023', 'v': 'N2023N'}, {'n': '2022', 'v': 'N2022N'}, {'n': '2021', 'v': 'N2021N'}, {'n': '2020', 'v': 'N2020N'}, {'n': '2019', 'v': 'N2019N'}]}, {'key': 'month', 'name': '月份', 'value': [{'n': '12月', 'v': 'Y12Y'}, {'n': '11月', 'v': 'Y11Y'}, {'n': '10月', 'v': 'Y10Y'}, {'n': '9月', 'v': 'Y09Y'}, {'n': '8月', 'v': 'Y08Y'}, {'n': '7月', 'v': 'Y07Y'}, {'n': '6月', 'v': 'Y06Y'}, {'n': '5月', 'v': 'Y05Y'}, {'n': '4月', 'v': 'Y04Y'}, {'n': '3月', 'v': 'Y03Y'}, {'n': '2月', 'v': 'Y02Y'}, {'n': '1月', 'v': 'Y01Y'}]}]},	
				 filter_def:{ sermons:{cateId:'sermons'}},
            play_parse: true,
            lazy: '',		
            limit: 6,
            推荐:`js:
						let d = get_video(input);
						setResult(d)
						`,
            double: true, // 推荐内容是否双层定位
            一级:`js:
						let d  = get_video(url);
						setResult(d)
						`,
            二级: '*',
            搜索:'*'
        }