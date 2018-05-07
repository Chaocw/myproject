import 'css/common.css'
import './search.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import qs from 'qs'
import mixin from 'js/mixin.js'
import Velocity from 'velocity-animate' 

import { InfiniteScroll } from 'mint-ui';

Vue.use(InfiniteScroll);

import scroll from 'components/scroll.vue'



let {keyword, id} = qs.parse(location.search.substr(1))
console.log(keyword, id)

new Vue({
	el: '.container',
	data: {
		id,
		searchList: null,
		keyword,
		isShow: false,
		allLoaded: false,
		loading: false,
		pageNum: 1,
		pageSize: 6
	},
	created() {
		this.getSearchList()

	},
	methods: {
		getSearchList() {
			
			if(this.loading) return 
			this.loading = true
			axios.post(url.searchList,{
				keyword,
				id,
				pageNum: this.pageNum,
				pageSize: this.pageSize
			}).then(res => {
				let curLists = res.data.lists
				//判断所有数据是否加载完毕
				if(curLists.length < this.pageSize) {
					this.allLoaded = true
				}
				if(this.searchList){
					this.searchList = this.searchList.concat(curLists)
				}else{
					//第一次请求数据
					this.searchList = curLists
				}

				this.loading = false
				this.pageNum++
			})					
		},
		loadMore () {
	        this.busy = true // 无线滚动禁止
	        setTimeout(() => {
	            this.page++
	            this.getGoodsList() // 调用获取商品的接口
	        }, 500)
      	},
		move() {
			this.shouldScroll()
			if(document.documentElement.scrollTop > 100) {
				this.isShow = true
			}else {
				this.isShow = false
			}
		},
		toTop() {
			Velocity(document.body,'scroll',{duration: 300})
			this.isShow = false
		},
		shouldScroll() {
            // if(document.scrollTop === 0) {// 滑动距离为0，还没开始滑动
            //     this.loading = false;
            // }               // 列表高度 - 列表可视高度 - 滑动的高度 < 50px , 则加载更多
            if(document.documentElement.scrollHeight - document.documentElement.clientHeight - document.documentElement.scrollTop < 50) {
            	this.getSearchList()
            }else{
            	
            }
        },
        scrollready() {
        	this.getSearchList()
        }
	},
	mixins: [mixin],
	components: {
		scroll
	}
})