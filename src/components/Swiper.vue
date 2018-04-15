<template>
	<div class="swiper-container">
		<div class="swiper-wrapper">
			<div class="swp-page swiper-slide" v-for="list in banner">
				<a class="js-no-follow" :href="list.clickUrl">
					<img class="goods-main-photo" :src="list.img">
				</a>
				<div class="swiper-pagination"></div>
			</div>
		</div>
	</div>	
</template>

<style>
	.swiper-slide img {
    width: 100%;
    height: 100%;
}
</style>

<script>
	import 'swiper/dist/css/swiper.min.css'
	import swiper from 'swiper'

	export default {
		props: {
			banner: {
				type: Array,
				required: true
			}
		},
		mounted() {
			new swiper('.swiper-container', {
				pagination: {

					el: '.swiper-pagination',
					
				},
				loop: true,
			});
		}
		
	}
</script>