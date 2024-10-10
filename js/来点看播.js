var rule = {
            title: '来点看播',
            host: 'https://lkvod.me',
            // homeUrl:'/',
            url: '/show/fyclass--------fypage---.html',
            searchUrl: '/nk/-------------.html?wd=**',
            searchable: 2,//是否启用全局搜索,
            quickSearch: 0,//是否启用快速搜索,
            filterable: 0,//是否启用分类筛选,
            headers: {//网站的请求头,完整支持所有的,常带ua和cookies
                'User-Agent': 'MOBILE_UA',
                // "Cookie": "searchneed=ok"
            },
            class_name:'电影&剧集&综艺&动漫',
            class_url:'1&2&3&4',
            //class_parse: '.wap-show0&&ul&&li0;a&&Text;a&&href;.*/(\\d+)-----------.html',//a&&href  a&&Text .wap-show0&&ul&&li0
            cate_exclude: '',
            play_parse: true,
            lazy: `js:
                var uic = function(uid,value) {
							var key = CryptoJS['enc']['Utf8']['parse']('2890' + uid + 'tB959C')
							, iv = CryptoJS['enc']['Utf8']['parse']('GZ4JgN2BdSqVWJ1z')
							, data = CryptoJS['AES']["decrypt"](value, key, {
								'iv': iv,
								'mode': CryptoJS['mode']['CBC'],
								'padding': CryptoJS['pad']['Pkcs7']
							});
							return CryptoJS['enc']["Utf8"]["stringify"](data);
		 				}
						var player_aaaa = JSON.parse(request(input).match(/var player_aaaa=(.*?)</)[1]);
						var url = player_aaaa.url;
						var m3u8_url;
						var ConFig;
						if (/m3u8|mp4/.test(url)) {
							m3u8_url = url;
						} else {
		      				var url_1 = 'https://op.xn--it-if7c19g5s4bps5c.com/player/ez.php?code=nkdyw&if=1&url=' + url;
		      				var html = request(url_1);
		      				if (/ConFig/.test(html)){
								ConFig = JSON.parse(html.match(/let ConFig = ({.*?}),box/)[1]);								
		      				} else {
									var href = 'https://op.xn--it-if7c19g5s4bps5c.com/player/' + html.match(/href = '(.*?)';/)[1];
									ConFig = JSON.parse(request(href).match(/let ConFig = ({.*?}),box/)[1]);		
		      				} 
		      				m3u8_url = uic(ConFig["config"]["uid"], ConFig["url"]);
						} 
				
						input = {
							jx: 0,
							url: m3u8_url,
							parse: 0
		 				}
						`,
            limit: 6,
            推荐: 'body&&.fadeInUp;.diy-center&&.public-list-box;a&&title;img&&data-src;.ft2&&Text;a&&href',
            double: true, // 推荐内容是否双层定位
            一级: 'body&&.fadeInUp .diy-center&&.public-list-box;a&&title;img&&data-src;.ft2&&Text;a&&href',
            二级: {
                "title": "h3&&Text;.slide-info:eq(0)&&Text",
                "img": ".detail-pic&&img&&data-src",
                "desc": ".slide-info:eq(1)&&Text;.module-info-item:eq(2)&&Text,.module-info-item:eq(3)&&Text,.module-info-item:eq(4)&&Text",
                "content": ".cor3&&Text",
                "tabs": ".br&&.swiper-slide",
                "lists": ".anthology-list-play.size:eq(#id) a"
            },
 
				 搜索:'.row-right&&.public-list-box;.thumb-txt&&a&&Text;img&&data-src;.humb-blurb&&Text;.thumb-txt&&a&&href'
        }