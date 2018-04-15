import 'css/common.css'
import './category.css'

import Foot from 'components/Foot.vue'

import Vue from 'vue'
import axios from 'axios'
import url from 'js/api.js'
import { Loadmore } from 'mint-ui';
import mixin from 'js/mixin.js'

Vue.component(Loadmore.name, Loadmore);

new Vue({
	el: '.app',
	data: {
		topList: null,
		curindex: -1,
		rankData: null,
		subData: null
	},
	created() {
		this.getTopList(),
		this.getSubList(0)

	},

	methods: {
		getTopList() {
			axios.post(url.topList).then(res => {
				this.topList = res.data.lists
			})
		},
		getRank() {
			axios.post(url.rank).then(res => {
				this.rankData = res.data.data

			})
		},
		getSubList(index,id) {

			this.curindex = index

			if(index === 0){
				this.getRank()
			}else{
				axios.post(url.subList,{id}).then(res => {
					console.log(url.subList)
					this.subData = res.data.data
				})
			}
			
		},
		toSearch(list) {
			location.href = `search.html?keyword=${list.name}&id=${list.id}`
		}
		// loadTop() {
		  
		//     this.$refs.loadmore.onTopLoaded();
		// },
		// loadBottom() {
		//     this.$refs.loadmore.onBottomLoaded();
		// },
		// allLoaded() {
		// 	return 
		// }
	},
	// 	capitalize: function (value) {
	// 		console.log(value)
	// 		    if (!value) return ''
	// 		    value = value.toString()
	// 		    return value.charAt(0).toUpperCase() + value.slice(1)
	// 		  }
	
	components: {
		Foot,
	},
	mixins: [mixin]
})