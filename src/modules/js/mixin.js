let mixin = {
	filters: {
		number(price) {
			price += ''
			
			if(price.indexOf('.') > 0){
				price += '00'
			}else{
				price +='.00'
			}
			// console.log(price)
			return price.slice(0, price.indexOf('.') + 3)
		}
	}
}

export default mixin