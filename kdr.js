// using a fork of Zepto with JSONp capability from deepsweet: http://github.com/deepsweet/zepto
(function(h,i){function e(a,b){var d=/^(\.|#)?([\w-]+)$/.exec(b);return g.call(d?d[1]=="."?a.getElementsByClassName(d[2]):d[1]=="#"?[i.getElementById(d[2])]:a.getElementsByTagName(b):a.querySelectorAll(b))}function c(a,b){function d(k){return d.dom.forEach(k),d}if(b!==void 0)return c(b).find(a);d.dom=(typeof a=="function"&&"dom"in a?a.dom:a instanceof Array?a:a instanceof Element?[a]:e(i,d.selector=a)).filter(function(k){return k!==void 0&&k!==null});for(f in c.fn)d[f]=c.fn[f];return d}var g=[].slice,
f,j={append:"beforeEnd",prepend:"afterBegin",before:"beforeBegin",after:"afterEnd"};c.fn={compact:function(){return c(this.dom)},get:function(a){return a===void 0?this.dom:this.dom[a]},remove:function(){return this(function(a){a.parentNode.removeChild(a)})},each:function(a){return this(a)},find:function(a){return c(this.dom.map(function(b){return e(b,a)}).reduce(function(b,d){return b.concat(d)},[]))},closest:function(a){var b=this.dom[0].parentNode;for(a=e(i,a);b&&a.indexOf(b)<0;)b=b.parentNode;
return c(b&&b!==i?b:[])},pluck:function(a){return this.dom.map(function(b){return b[a]})},show:function(){return this.css("display:block")},hide:function(){return this.css("display:none")},prev:function(){return c(this.pluck("previousElementSibling"))},next:function(){return c(this.pluck("nextElementSibling"))},html:function(a){return a===void 0?this.dom.length?this.dom[0].innerHTML:null:this(function(b){b.innerHTML=a})},attr:function(a,b){return typeof a=="string"&&b===void 0?this.dom.length&&this.dom[0].getAttribute(a)||
b:this(function(d){if(typeof a=="object")for(f in a)d.setAttribute(f,a[f]);else d.setAttribute(a,b)})},offset:function(){var a=this.dom[0].getBoundingClientRect();return{left:a.left+i.body.scrollLeft,top:a.top+i.body.scrollTop,width:a.width,height:a.height}},css:function(a){return this(function(b){b.style.cssText+=";"+a})},index:function(a){return this.dom.indexOf(c(a).get(0))},anim:function(a,b,d){return this.css("-webkit-transition:all "+(d||0.5)+"s;-webkit-transform:"+a+";opacity:"+(b===0?0:b||
1))},bind:function(a,b){return this(function(d){a.split(/\s/).forEach(function(k){d.addEventListener(k,b,false)})})},delegate:function(a,b,d){return this(function(k){k.addEventListener(b,function(m){for(var l=m.target,n=e(k,a);l&&n.indexOf(l)<0;)l=l.parentNode;l&&l!==k&&l!==i&&d.call(l,m)},false)})},hasClass:function(a){return RegExp("(^|\\s)"+a+"(\\s|$)").test(this.dom[0].className)},addClass:function(a){return this(function(b){!c(b).hasClass(a)&&(b.className+=(b.className?" ":"")+a)})},removeClass:function(a){return this(function(b){b.className=
b.className.replace(RegExp("(^|\\s)"+a+"(\\s|$)")," ").trim()})},trigger:function(a){return this(function(b){var d;b.dispatchEvent(d=i.createEvent("Events"),d.initEvent(a,true,false))})}};["width","height"].forEach(function(a){c.fn[a]=function(){return this.offset()[a]}});for(f in j)c.fn[f]=function(a){return function(b){return this(function(d){d["insertAdjacent"+(b instanceof Element?"Element":"HTML")](a,b)})}}(j[f]);h.Zepto=c;"$"in h||(h.$=c)})(this,document);
(function(h){var i=document,e={},c;i.ontouchstart=function(g){var f=Date.now(),j=f-(e.last||f);e.target=g.touches[0].target;c&&clearTimeout(c);e.x1=g.touches[0].pageX;if(j>0&&j<=250)e.isDoubleTap=true;e.last=f};i.ontouchmove=function(g){e.x2=g.touches[0].pageX};i.ontouchend=function(){if(e.isDoubleTap){h(e.target).trigger("doubleTap");e={}}else if(e.x2>0){Math.abs(e.x1-e.x2)>30&&h(e.target).trigger("swipe");e.x1=e.x2=e.last=0}else if("last"in e)c=setTimeout(function(){c=null;h(e.target).trigger("tap");
e={}},250)};["swipe","doubleTap","tap"].forEach(function(g){h.fn[g]=function(f){return this.bind(g,f)}})})(Zepto);
(function(h){function i(c,g,f,j){var a=/callback=\?/;if(a.test(g)){c="jsonp"+ ++e;window[c]=function(d){f(d)};j=document.createElement("script");h(j).attr({src:g.replace(a,"callback="+c),type:"text/javascript"});h("head").append(j)}else{var b=new XMLHttpRequest;b.onload=function(){f(b.responseText)};b.open(c,g,true);b.setRequestHeader("X-Requested-With","XMLHttpRequest");b.send(j||null)}}var e=0;h.get=function(c,g,f){i("GET",c+(f||""),g)};h.post=function(c,g,f){i("POST",c,g,f)};h.getJSON=function(c,
g,f){h.get(c,function(j){g(typeof j=="string"?JSON.parse(j):j)},f)}})(Zepto);

var kdr = {};

kdr.update = function() {
	$player.html(kdr.player);
	$kdr.html('').attr('class', '');
	$emblem.attr('style', 'display:none');
	if(kdr.player != '') {
		// Bungie, why do I have to use YQL to scrape your site? Open the API!
		var url = "%22http%3A%2F%2Fwww.bungie.net%2FStats%2FReach%2FCareerStats%2Fdefault.aspx%3Fplayer%3D"+kdr.player.replace(/ /gi, '%2520')+"%26vc=3%22"
			, xpath = "'%2F%2Fspan%5B%40id%3D%22ctl00_mainContent_kdLabel%22%5D%20%7C%20%2F%2Fimg%5B%40id%3D%22ctl00_mainContent_identityBar_emblemImg%22%5D'"
			,YQL = "http://query.yahooapis.com/v1/public/yql?q=select%20*%20from%20html%20where%20url%3D"+url+"%20and%20xpath%3D"+xpath+"&format=json&callback=?";
		
		$.getJSON(YQL, function(data){
			// data = JSON.parse(data);
			var mykdr = (data.query.results != null) ? data.query.results.span.content : -1
				, emblem = (data.query.results != null) ? 'http://bungie.net/'+data.query.results.img.src : '';

			if(mykdr > 0){
				if(mykdr < 1) $kdr.addClass('uSuck');
				if(mykdr > 1) $kdr.addClass('urRad');
				$kdr.html(mykdr);
				$message.html('Kill/Death Ratio:')
				$emblem.attr('src', emblem).attr('style', 'display:block');
				$('#icon').attr('href', emblem)
			}
			else if(mykdr < 0)
				$message.html('No Stats')

		});
		localStorage.gamertag = kdr.player;
	} else {
		$player.html('');
		$message.html('Set your Gamertag')
	}
}

kdr.player = (localStorage.gamertag != undefined) ? localStorage.gamertag : '';