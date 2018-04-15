import './goods_common.css'
import './goods_custom.css'
import './goods.css'
import './goods_theme.css'
import './goods_mars.css'
import './goods_sku.css'
import './goods_base.css'

import Vue from 'vue'
import url from 'js/api.js'
import axios from 'axios'
import qs from 'qs'

import Swiper from 'components/Swiper.vue'

let {
	id
} = qs.parse(location.search.substr(1))


import mixin from 'js/mixin.js'

import {
	InfiniteScroll
} from 'mint-ui';

Vue.use(InfiniteScroll);

let tabChange = ['商品详情', '本店成交']


new Vue({
	el: '#app',
	data: {
		details: null,
		id,
		img: [],
		pageSize: 6,
		pageNum: 1,
		allLoaded: false,
		loading: false,
		lists: null,
		deal: null,
		tabChange,
		tabIndex: 0,
		skuNum: 0,
		skuShow: false,
		skuBnum: 1,
		isAddCart: false,
		showAddsucess: false
	},
	created() {
		this.getDetails()
		this.getList()
	},
	methods: {
		getDetails() {
			axios.post(url.details, {
				id
			}).then(res => {
				this.details = res.data.data
				this.getImg()
			})
		},
		getImg() {
			// console.log(this.details.imgs)
			this.details.imgs.forEach(item => {
				this.img.push({
					clickUrl: '',
					img: item
				})
			})
		},
		getList() {
			if (this.allLoaded) return
			this.loading = true
			axios.post(url.hotLists, {
				pageNum: this.pageNum,
				pageSize: this.pageSize
			}).then(res => {
				let curLists = res.data.lists
				if (curLists.length < this.pageSize) {
					this.allLoaded = true
				}
				if (this.lists) {
					this.lists = this.lists.concat(curLists)
				} else {
					this.lists = curLists
				}

				this.loading = false
				this.pageNum++
			})
		},
		getDeal() {

			axios.post(url.deal, {
				id
			}).then(res => {
				this.deal = res.data.data.lists
			})
		},
		changeTab(index) {
			this.tabIndex = index
			if (index) {
				this.getDeal()
			}
		},
		chooseSku(num) {
			this.skuNum = num
			this.skuShow = true
		},
		changeSkuBnum(num) {
			if(num < 0 && this.skuBnum === 1) return
			this.skuBnum+=num
		},
		addCart() {
			
			axios.post(url.cartAdd, {
				id,
				number: this.skuBnum
			}).then(res => {
				
				if(res.data.status === 200) {
					this.skuShow = false
					this.isAddCart = true
					this.showAddsucess = true

					setTimeout(() => {
						this.showAddsucess = false
					}, 1000)
				}
			})
		}
	},
	watch: {
		skuShow(val, oldVal) {
			document.body.style.overflow = val ? 'hidden' : 'auto'
			document.querySelector('html').style.overflow = val ? 'hidden' : 'auto'
			document.body.style.height = val ? '100%' : 'auto'
			document.querySelector('html').style.height = val ? '100%' : 'auto'

		}
	},
	components: {
		Swiper
	},
	mixins: [mixin]
})