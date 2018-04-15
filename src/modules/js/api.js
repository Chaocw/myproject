let url = {
	hotLists:['index/hotLists','get'],
    banner:['index/banner','get'],
    topList:['category/topList','get'],
    subList:['category/subList','get'],
    rank:['category/rank','get'],
    searchList:['search/list','get'],
    details:['goods/details','get'],
    deal:['goods/deal','get'],
    cartAdd:['cart/add','post'],
    cartLists:['cart/list','get'],
    cartReduce:['cart/reduce','post'],
    cartUpdate:['cart/update','post'],
    cartRemove:['cart/remove','post'],
    cartMrRemove:['cart/mrremove','post'],
    addressLists:['address/list','get'],
    addressAdd:['address/add','post'],
    addressRemove:['address/remove','post'],
    addressUpdate:['address/update','post'],
    addressSetDefault:['address/setDefault','post']
}

//开发环境和真实环境的切换 
//let host = ’‘
let host = 'http://rap2api.taobao.org/app/mock/7058'

for (let key in url) {
	if(url.hasOwnProperty(key)) {
		url[key]=host +'/'+url[key][1].toUpperCase()+'/'+url[key][0]
	}
};

export default url