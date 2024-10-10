var rule = {
    title:'山东齐鲁',
    host:'https://v.iqilu.com',
    homeUrl:'',
    searchUrl:'',
    searchable:0,
    quickSearch:1,
    filterable:0,
    //multi:1,
    // 分类链接fypage参数支持1个()表达式
    url:'/fyclass/',
    headers:{'User-Agent': 'PC_UA','referer': 'https://v.iqilu.com'},
    timeout:5000,
    class_name:'看电视&听广播',
    class_url:'live&radio',
    pagecount:{"live":1,"radio":1},
    limit:5,
    play_parse:true,
    //play_json:1,
    // 手动调用解析请求json的url,此lazy不方便     //'https://www.ifuyin.net/html/'
    lazy:'',
    推荐:'',
    double: true, // 推荐内容是否双层定位
    一级:`js:
			let host = 'https://v.iqilu.com';
			let d = [];
			let items;
        let pdfh = jsp.pdfh;
        let pdfa = jsp.pdfa;
        let pd = jsp.pd;
			let html = request(host);
			let pic = {};
        if(/live/.test(input)){	
				items = pdfa(html, '.nav&&ul&&li:gt(0):lt(10)');
				
			}else if(/radio/.test(input)){
				items = pdfa(html, '.nav&&ul&&li:gt(10)');
			}
			print(items)
			//  https://badboy518714.github.io/TV/IPTV_LOGO/山东齐鲁/山东.png
			let pic_url;
			items.forEach(function(it){	
			    let title =  pd(it, 'a&&title');
			    if(/live/.test(input)){ pic_url = 'https://badboy518714.github.io/TV/IPTV_LOGO/山东齐鲁/' + title + '.png'; }
			    else{ pic_url= 'https://file.iqilu.com/custom/radio/images/shoutu.jpg'; }
            d.push({
                title: '山东' + title + '频道',
                desc: '', 
                pic_url: pic_url,
                url: pd(it, 'a&&href')
            })
        });
			print(d);
        setResult(d);
    `,
    二级: '*',
    搜索:'',

}