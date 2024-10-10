var rule = {
    title:'FUYIN-FM',
    host:'https://www.fuyin.fm',
    homeUrl:'',
    searchUrl:'/content/search/keyword/**.html',
    searchable:2,
    quickSearch:1,
    filterable:0,
    //multi:1,
    // 分类链接fypage参数支持1个()表达式
    url:'/content/category/id/fyclass/page/fypage.html',//fyfilter   诗篇诗歌&恩典记号&这个年纪爱的音符&为祢读诗&主播频道&有声书屋&每日灵修&了解福音&热门排行
    filter_url: '{{fl.cateId}}',
    //filterable:1,//是否启用分类筛选,
    //headers:{'User-Agent': 'PC_UA'},
    timeout:3000,
    class_name:'诗篇诗歌&恩典记号&爱的音符&为祢读诗&主播频道&有声书屋&每日灵修&了解福音&热门排行',
    class_url:'shipian&3&2&5&7&6&1&8&rank',
    //class_parse: '.nav-list&&li:lt(5);a&&Text;a&&href;/(\\w+).html',
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
    // 手动调用解析请求json的url,此lazy不方便    
    lazy:`js:
			let data = input.split("_");
			input = 'https://www.fuyin.fm/index.php?c=api&a=getData&movid=' + data[0] + '&urlid=' + data[1];
		  	let json_data = JSON.parse(request(input));
			let m3u8_url = json_data["url"]
			input = {
				jx: 0,
				url: m3u8_url,
				parse: 0
			 }
		  `,
    推荐:'.page_content_offset&&.col-sm-4&&.row;h4&&Text;.col-sm-4&&img&&src;p&&Text;a&&href',//.col-sm-4&&img&&src p&&Text  //input = input.replace(/category\\/\\d+\\//, '')
    double: false, // 推荐内容是否双层定位
    一级:`js:
			var d = [];
        let pdfh = jsp.pdfh;
        let pdfa = jsp.pdfa;
        let pd = jsp.pd;
			let html;
			let items;
			
			if(/shipian/.test(input)){
				input = 'https://www.fuyin.fm/content/search/keyword/%E7%84%A6%E6%B0%B8%E4%BF%A1.html';
				while(1){ html = request(input);if(html)break;}
				items = pdfa(html, ".page_content_offset&&.song_list").reverse();
			}
			else if(/rank/.test(input)){ 
				input = input.replace(/category\\/id\\//, '');
				while(1){ html = request(input);if(html)break;}
				items = pdfa(html, ".page_content_offset&&.song_list");
			} 	
			else{ items = pdfa(html, ".page_content_offset&&.col-sm-8&&.row").slice(0, -1); }
			
			print(items);
			items.forEach(function(it){
				d.push({
              title: pdfh(it, "a&&Text"),
              desc: '以马内利',
              pic_url: 'https://badboy518714.github.io/TV/IPTV_LOGO_SJ/福音FM.png',
              url: pd(it, "a&&href"),
           })
        });

        //print(d)
        setResult(d)
    `,
    二级: `js:
        let pdfh = jsp.pdfh;
        let pdfa = jsp.pdfa;
        let pd = jsp.pd;
			let html;
			while(1){ html = request(input);if(html)break;}		
			let items = pdfa(html, ".tab-content&&.text-ellipsis");
			//print(items)
			let vod = pdfa(html, ".page_content_offset&&.mt_10&&ul&&li");
			//print(vod)
			let actor = '';
			if(vod.length == 3){ actor = pdfh(vod[2], "li&&Text"); }
			
			VOD = {
				vod_id: 'FM',
				vod_name:  pdfh(html, ".page_content_offset&&h2&&Text"),
				vod_pic: '',
				type_name:pdfh(html, ".mr_15&&Text").split(':')[1],
				vod_year: '',
				vod_area: '',
				vod_remarks: '',
				vod_actor: actor,
				vod_director: pdfh(vod[1], "li&&Text").split(':')[1],
				vod_content: pdfh(vod[0], "li&&Text").split(':')[1]
			};
			print(VOD)
			let playList = [];
			items.forEach(function(it){
		  		let url = pd(it, "a&&data-id") + '_' + pd(it, "a&&data-urlid");
				playList.push(pd(it, "a&&Text") + "$" + url);
        });
			VOD['vod_play_from'] = "福音-FM";
			VOD['vod_play_url'] = playList.join("#");;
    `,
    搜索:`js:
				let d = [];
				let pdfh = jsp.pdfh;
        	 let pdfa = jsp.pdfa;
        	 let pd = jsp.pd;
				let html = request(input);
				while(1){ html = request(input);if(html)break;}
				items = pdfa(html, ".page_content_offset&&.song_list").reverse();
				items.forEach(function(it){
					d.push({
              	title: pdfh(it, "a&&Text"),
              	desc: '以马内利',
              	pic_url: 'https://badboy518714.github.io/TV/IPTV_LOGO_SJ/福音FM.png',
              	url: pd(it, "a&&href"),
          		 })
        	});
        	print(d)
        	setResult(d)
    `,

}