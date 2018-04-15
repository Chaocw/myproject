import "./cart_base.css"
import "./cart_trade.css"
import "./cart.css"

import Vue from 'vue'
import url from 'js/api.js'
import mixin from 'js/mixin.js'
import axios from 'axios'
import Velocity from 'velocity-animate'
import cart from 'js/cartService.js'

var app = new Vue({
	el: '#app',
	data: {
		lists: null,
		editingShop: null,
		editingShopIndex: -1,
		removePopup: false,
		removeData: null,
		removeMsg: ''
	},
	computed: {
		total() {
			let total = 0 
			this.selectList.forEach(good => {
				total += good.price * good.number
			})
			return total
		},
		allSelected: {
			get() {
				if(this.lists&&this.lists.length) {
					return this.lists.every(shop => {
						return shop.checked
					})					
				}
				return false
			},
			set(newVal) {
				this.lists.forEach(shop => {
					shop.checked = newVal
					shop.goodsList.forEach(good => {
						good.checked = newVal
					})
				})
			}
		},
		allRemoveSelected: {
			get() {
				if(this.editingShop) {
					return this.editingShop.removeChecked
				}
				return false
			},
			set(newVal) {
				if(this.editingShop) {
					this.editingShop.removeChecked = newVal
					this.editingShop.goodsList.forEach(good => {
						good.removeChecked = newVal
					})
				}

			}
		},
		selectList() {
			if(this.lists&&this.lists.length){
				let arr = []
				let total = 0
				this.lists.forEach(shop => {
					shop.goodsList.forEach(good => {
						if(good.checked) {
							total += good.price * good.number
							arr.push(good)
						}
					})
				})
				
				return arr
			}
			return []
		},
		removeList() {
			if(this.editingShop) {
				let arr = []
				this.editingShop.goodsList.forEach(good => {
					if(good.removeChecked) {
						arr.push(good)
					}
				})
				return arr
			}
			return []
		}
	},
	created() {
		this.getLists()
		this.selectList
	},
	methods: {
		getLists() {

			axios.post(url.cartLists).then(res => {
				let lists = res.data.cartList
				lists.forEach(shop => {
					shop.checked = true
					shop.removeChecked = false
					shop.editing = false
					shop.editingMsg = '编辑'
					shop.goodsList.forEach(good => {
						good.checked = true
						good.removeChecked = false
					})
				})
				this.lists = lists
			})

		},
		selectGood(shop,good) {
			let attr = this.editingShop ? 'removeChecked' : 'checked'
			good[attr] = !good[attr]
			shop[attr] = shop.goodsList.every(good => {
				return good[attr]
			})
		},
		selectShop(shop) {
			let attr = this.editingShop ? 'removeChecked' : 'checked'
			shop[attr] = !shop[attr]
			shop.goodsList.map(good => {
				good[attr] = shop[attr]
			})
		},
		selectAll() {
			let attr = this.editingShop ? 'allRemoveSelected' : 'allSelected'
			this[attr] = !this[attr]
		},
		edit(shop,shopIndex) {
			shop.editing = !shop.editing
			shop.editingMsg = shop.editing ? '完成' : '编辑'
			this.lists.forEach((item,i) => {
				if(shopIndex != i) {
					item.editing = false
					item.editingMsg = shop.editing ? '' : '编辑'
				}
			})
			this.editingShop = shop.editing ? shop : null
			this.editingShopIndex = shop.editing ? shopIndex : -1
		},
		reduce(good) {
			if(good.number === 1) return
			// axios.post(url.cartReduce,{
			// 	id: good.id,
			// 	number: 1
			// }).then(res => {
			// 	good.number--
			// })
			cart.reduce(good.id).then(res => {
				good.number--
			})
		},
		add(good) {
			// axios.post(url.cartAdd, {
			// 	id: good.id,
			// 	number: 1
			// }).then(res => {
			// 	good.number++
			// })
			cart.add(good.id).then(res => {
				good.number++
			})
		},
		remove(shop,shopIndex,good,goodIndex) {
			this.removePopup = true
			this.removeData = {shop,shopIndex,good,goodIndex}
			this.removeMsg = '确定要删除该商品吗？'
		},
		removeLists() {
			this.removePopup = true
			this.removeMsg = `确定将所选${this.removeList.length}个商品删除吗？`
		},
		removeConfirm() {
			if(this.removeMsg === '确定要删除该商品吗？') {
				let {shop,shopIndex,good,goodIndex} = this.removeData
				axios.post(url.cartRemove, {
					id: good.id
				}).then(res => {
					shop.goodsList.splice(goodIndex,1)
					if(!shop.goodsList.length) {
						this.lists.splice(shopIndex,1)
						this.removeShop()
					}
					this.removePopup = false
				})
			}else {
				let ids = []
				this.removeList.forEach(good => {
					ids.push(good.id)
				})
				axios.post(url.cartMrRemove, {
					ids
				}).then(res => {
					let arr = []
					this.editingShop.goodsList.forEach(good => {
						let index = this.removeList.findIndex(item => {
							return item.id === good.id
						})
						if(index === -1) {
							arr.push(good)
						}
					})
					if(arr.length) {
						this.editingShop.goodsList = arr
					}else {
						this.lists.splice(this.editingShopIndex,1)
						this.removeShop()
					}
					this.removePopup = false
				})
			}
		
		},
		removeShop() {
			
			this.editingShop = null
			this.editingShopIndex = -1
			this.lists.forEach(shop => {
				shop.editing = false
				shop.editingMsg = '编辑'
			})
		},
		start(e,good) {
			good.startX = e.changedTouches[0].clientX
		},
		end(e,shopIndex,good,goodIndex) {
			let endX = e.changedTouches[0].clientX
			let left ='0'
			if (good.startX - endX > 100) {
				left = '-60px'
			}
			if (endX - good.startX > 100) {
				left = '0px'
			}
			Velocity(this.$refs[`goods-${shopIndex}-${goodIndex}`],{left})
			
		}
	},
	mixins: [mixin]
})