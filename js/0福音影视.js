var rule = {
    title:'福音影视',
    host:'https://www.ifuyin.net',
    homeUrl:'',
    searchUrl:'movies/search/**/1/fypage',
    searchable:1,
    quickSearch:1,
    filterable:1,
    //multi:1,
    // 分类链接fypage参数支持1个()表达式
    url:'/content/fyfilter/page/fypage/index.html',//fyfilter
    filter_url: '{{fl.cateId}}',
    //filterable:1,//是否启用分类筛选,
    headers:{'User-Agent': 'PC_UA'},
    timeout:15000,
    class_name:'热播排行&最新发布&最近更新&主日讲道&全部视频&福音慕道&福音证道&婚姻家庭&赞美诗歌&福音见证&福音视频&圣乐崇拜&初信造就&福音动漫&神学课程',
    class_url:'hot&publish&latest&主日&all&慕道&证道&家庭&诗歌&见证&视频&崇拜&初信&动漫&神学',

    filter: {
				"主日": [{"key":"cateId","name":"牧者讲员","value":[{"n":"矽谷基督徒聚会","v":"category/id/237"},{"n":"台北基督之家","v":"category/id/313"},{"n":"橄榄山基督教会","v":"category/id/238"},{"n":"橙县中华福音教会","v":"category/id/240"},{"n":"贝郡基督徒证主教会","v":"category/id/286"},{"n":"东区教会信息","v":"category/id/243"},{"n":"基督之五家信息","v":"category/id/244"},{"n":"凤凰城基督教会","v":"category/id/251"},{"n":"恩城基督徒证主教会","v":"category/id/327"}]}, {'key': 'cateId', 'name': '年份', 'value': [{'n': '2024', 'v': 'category/id/341'}, {'n': '2023', 'v': 'category/id/333'}, {'n': '2022', 'v': 'category/id/328'}, {'n': '2021', 'v': 'category/id/326'}, {'n': '2020', 'v': 'category/id/319'}, {'n': '2019', 'v': 'category/id/318'}, {'n': '2018', 'v': 'category/id/316'}, {'n': '2017', 'v': 'category/id/299'}, {'n': '2016', 'v': 'category/id/294'}, {'n': '2015', 'v': 'category/id/278'}, {'n': '2014', 'v': 'category/id/262'}, {'n': '2013', 'v': 'category/id/250'}, {'n': '2012', 'v': 'category/id/249'}, {'n': '2011', 'v': 'category/id/248'}, {'n': '2010', 'v': 'category/id/247'}, {'n': '2009', 'v': 'category/id/246'}, {'n': '2008', 'v': 'category/id/245'}]}
]

			  },
    filter_def:{
        hot:{cateId:'hot'},publish:{cateId:'publish'},latest:{cateId:'latest'},all:{cateId:'all'},主日:{cateId:'category/id/205'},慕道:{cateId:'category/id/133'},证道:{cateId:'category/id/22'},家庭:{cateId:'category/id/34'},
			诗歌:{cateId:'category/id/24'},见证:{cateId:'category/id/42'},视频:{cateId:'category/id/21'},崇拜:{cateId:'category/id/26'},初信:{cateId:'category/id/25'},动漫:{cateId:'category/id/23'},神学:{cateId:'category/id/290'}
     },
    limit:6,
    play_parse:true,
    //play_json:1,
    // 手动调用解析请求json的url,此lazy不方便     //'https://www.ifuyin.net/html/'
    lazy:`js:
			let data = input.split("_");
			input = 'https://www.ifuyin.net/api/api/tv.movie/url?movid=' + data[0] + '&urlid=' + data[1] + '&type=1&lang=zh';
		  	let json_data = JSON.parse(request(input));
			let m3u8_url = json_data["data"]["url"]
			input = {
				jx: 0,
				url: m3u8_url,
				parse: 0
			 }
		  `,
    推荐:'.albums;.albums&&.album-item;.c-primary&&Text;.loader&&style;.c-thirdary&&Text;a&&href',
    double: true, // 推荐内容是否双层定位
    一级:`js:
			print(input);
        var d = [];
        let pdfh = jsp.pdfh;
        let pdfa = jsp.pdfa;
        let pd = jsp.pd;
			let html;
			let items;
			let items_1;
			if(/category/.test(input)){
				let page = input.match(/page\\/(\\d+)/)[1];
				page = (parseInt(page) - 1).toString();
				input = input.replace(/page\\/(\\d+)/, "page/" + page);
				html = request(input);
				items = pdfa(html, ".albums&&a");
				items.forEach(function(it){
            d.push({
                title: pdfh(it, ".c-primary&&Text"),
                desc: pdfh(it, ".c-thirdary&&Text"),
                pic_url: pd(it, ".loader&&style"),
                url: pd(it, "a&&href"),
            })
        	});
			}else{
				var move_id = input.match(/content\\/(.*?)\\/page\\/\\d+\\/index/)[1];
				input = input.replace(/page\\/\\d+\\//, '').replace(/\\/all/, "").replace(/latest/, "update");
				//print(input);
				html = request(input);

				let __ssr_init_state__  = (html.replace(/\\n/gi, "").replace(/ /gi, "")).match(/__ssr_init_state__=(.*?)<\\/script><\\/div>/)[1];
				let json_data = JSON.parse(__ssr_init_state__);
				let movie_name = "movie-" + move_id;
				//print(json_data[movie_name]["albums"]);
				items = json_data[movie_name]["albums"];
				items.forEach(function(it){
            d.push({
                title: it["title"],
                desc: it["speaker"],
                pic_url: it["image"],
                url: "/content/view/movid/" + it["movid"] + "/index.html"
            })
        	});
			}
        print(d)
        setResult(d)
    `,
    二级: `js:
        let pdfh = jsp.pdfh;
        let pdfa = jsp.pdfa;
        let pd = jsp.pd;
			let html = request(input);
			let __ssr_init_state__  = (html.replace(/\\n/gi, "").replace(/ /gi, "")).match(/__ssr_init_state__=(.*?)<\\/script><\\/div>/)[1];
			let json_data = JSON.parse(__ssr_init_state__);
			//print(json_data)
			let info = json_data["movie-album"]["detail"];
			let items = json_data["movie-album"]["detail"]["url_list"];
			VOD = {
				vod_id: info["movid"],
				vod_name: info["title"],
				vod_pic: info["image"],
				type_name:info["category_info"][0]["name"],
				vod_year: '',
				vod_area: info["area"],
				vod_remarks: info["source"],
				vod_actor: info["speaker"],
				vod_director: info["subtitle"],
				vod_content: info["content"]
			};
			//print(VOD)
			let playFrom = [];
			let playList = [];
			items.forEach(function(it){
		  		let url = it["movid"] + '_' + it["urlid"];
           playFrom.push(it["title"] + "$" + url);
				playList.push(it["title"] + "$" + url);
        });
			//print(items)
			//print(playFrom)
			//print(playList)
			let playUrl = playFrom.join("#");
			VOD['vod_play_from'] = "福音影视";
			VOD['vod_play_url'] = playUrl;
    `,
    搜索:`js:
				print("1111111111112222222222222223333333333333333")
				let page = (parseInt(input.match(/\\/1\\/(\\d+)/)[1]) - 1).toString();
				input = input.replace(/1\\/\\d+/, '1/') + page;
				print(input)
				let d = []
				let html = request(input);
				let __ssr_init_state__  = (html.replace(/\\n/gi, "").replace(/ /gi, "")).match(/__ssr_init_state__=(.*?)<\\/script><\\/div>/)[1];
				let json_data = JSON.parse(__ssr_init_state__);
				//print(json_data["movie-search"]["albums"]);
				let items = json_data["movie-search"]["albums"];
				items.forEach(function(it){
            d.push({
                title: it["title"],
                desc: it["speaker"] + it["language"] + it["source"],
                pic_url: it["thumb"],
                url: "/content/view/movid/" + it["movid"] + "/index.html"
            })
        	});
        //print(d)
        setResult(d)
    `,

}