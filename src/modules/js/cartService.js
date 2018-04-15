import fecth from 'js/fetch.js'
import url from 'js/api.js'

class Cart {
	static add(id) {
		return fecth(url.cartAdd,{
			id,
			number: 1
		})
	}
	static reduce(id) {
		return fecth(url.cartReduce,{
			id,
			number: 1
		})
	}
}

export default Cart