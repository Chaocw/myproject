webpackJsonp([2],{"035s":function(t,e){},"8YMv":function(t,e){},"97Sy":function(t,e){},NydE:function(t,e,a){"use strict";a("mgS3");var s=a("DNVT"),n={props:{banner:{type:Array,required:!0}},mounted:function(){new s.a(".swiper-container",{pagination:{el:".swiper-pagination"},loop:!0})}},r={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"swiper-container"},[a("div",{staticClass:"swiper-wrapper"},t._l(t.banner,function(e){return a("div",{staticClass:"swp-page swiper-slide"},[a("a",{staticClass:"js-no-follow",attrs:{href:e.clickUrl}},[a("img",{staticClass:"goods-main-photo",attrs:{src:e.img}})]),t._v(" "),a("div",{staticClass:"swiper-pagination"})])}))])},staticRenderFns:[]};var i=a("VU/8")(n,r,!1,function(t){a("8YMv")},null,null);e.a=i.exports},TFhR:function(t,e,a){"use strict";var s={hotLists:["index/hotLists","get"],banner:["index/banner","get"],topList:["category/topList","get"],subList:["category/subList","get"],rank:["category/rank","get"],searchList:["search/list","get"],details:["goods/details","get"],deal:["goods/deal","get"],cartAdd:["cart/add","post"],cartLists:["cart/list","get"],cartReduce:["cart/reduce","post"],cartUpdate:["cart/update","post"],cartRemove:["cart/remove","post"],cartMrRemove:["cart/mrremove","post"],addressLists:["address/list","get"],addressAdd:["address/add","post"],addressRemove:["address/remove","post"],addressUpdate:["address/update","post"],addressSetDefault:["address/setDefault","post"]};for(var n in s)s.hasOwnProperty(n)&&(s[n]="http://rap2api.taobao.org/app/mock/7058/"+s[n][1].toUpperCase()+"/"+s[n][0]);e.a=s},U67u:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var s=a("97Sy"),n=(a.n(s),a("bCKv")),r=a.n(n),i=a("035s"),o=(a.n(i),a("eChN")),c=(a.n(o),a("7+uW")),d=a("TFhR"),l=a("mtWM"),u=a.n(l),p=a("nq5D"),g=a("NydE");c.default.use(r.a);new c.default({el:".app",data:{lists:null,pageNum:1,pageSize:6,loading:!1,allLoaded:!1,bannerLists:null},created:function(){this.getLists(),this.getBanner()},methods:{getLists:function(){var t=this;this.allLoaded||(this.loading=!0,u.a.post(d.a.hotLists,{pageNum:this.pageNum,pageSize:this.pageSize}).then(function(e){var a=e.data.lists;a.length<t.pageSize&&(t.allLoaded=!0),t.lists?t.lists=t.lists.concat(a):t.lists=a,t.loading=!1,t.pageNum++}))},getBanner:function(){var t=this;u.a.get(d.a.banner).then(function(e){t.bannerLists=e.data.lists})}},components:{Foot:p.a,Swiper:g.a}})},eChN:function(t,e){},mgS3:function(t,e){},nq5D:function(t,e,a){"use strict";var s=a("mw3O"),n=a.n(s).a.parse(location.search.substr(1)).index,r=[{href:"index.html",class:"icon-home",name:"有赞"},{href:"category.html",class:"icon-category",name:"分类"},{href:"cart.html",class:"icon-cart",name:"购物车"},{href:"member.html",class:"icon-user",name:"我"}],i={data:function(){return{renderData:r,curIndex:parseInt(n)||0}},methods:{changeName:function(t,e){location.href=t.href+"?index="+e}}},o={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"bottom-nav"},[a("ul",t._l(t.renderData,function(e,s){return a("li",{class:{active:t.curIndex==s},on:{click:function(a){t.changeName(e,s)}}},[a("a",[a("i",{class:e.class}),a("div",[t._v(t._s(e.name))])])])}))])},staticRenderFns:[]};var c=a("VU/8")(i,o,!1,function(t){a("pD7p")},null,null);e.a=c.exports},pD7p:function(t,e){}},["U67u"]);
//# sourceMappingURL=index.e33dbe715f2b7124a366.js.map