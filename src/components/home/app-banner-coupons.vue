<template>
	<div class="app-banner-cupons"
	:style="`background-image: url(${webImage})`"
	>
		<p class="title-banner">CUPONES</p>
		<swiper :options="swiperOption">
			<swiper-slide
			v-for="(item, index) in imageCoupons"
			:key="index">
				<div class="content-coupons">
					<div class="box-coupons">
						<a href="#"
						target="_blank"
						>
							<img :src="item.image" class="img-coupons" alt="">
						</a>
					</div>
				</div>
			</swiper-slide>
		</swiper>
	</div>	
</template>

<script>
import lib from '@/shared/lib';

function data() {
	return {
		swiperOption: {
			slidesPerView: 3,
			spaceBetween: 30,
			slidesPerGroup: 3,
			breakpoints: {
				930: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					allowTouchMove: true,
				},
				600: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					allowTouchMove: true,
				},
			},
			autoplay: {
				delay: 5500,
				disableOnInteraction: false,
			},
			pagination: {
				el: '.pagination-carousel',
				clickable: true,
			},
		},
		imageCoupons: [
			{
				id: 1,
				image: 'https://japi-static.s3.amazonaws.com/japi-sales-error/cupones-lunes.png',
				name: 'image-coupons-1',
			},
			{
				id: 2,
				image: 'https://japi-static.s3.amazonaws.com/japi-sales-error/cupones-lunes-2.jpeg',
				name: 'image-coupons-2',
			},
			{
				id: 3,
				image: 'https://japi-static.s3.amazonaws.com/japi-sales-error/cuponess.png',
				name: 'image-coupons-3',
			},
		],
	};
}

function webImage() {
	return lib.getDeeper('webImage')(this.data);
}

export default {
	name: 'app-banner-cupons',
	data,
	computed: {
		webImage,
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
};
</script>

<style lang="scss" scoped>
.app-banner-cupons {
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 435px;
	padding: 44px 85px;
	width: 100%;
}

.title-banner {
	color: color(white);
	font-family: font(bold);
	font-size: 48px;
	text-align: center;
}

.box-coupons {
	border: 1px solid color(base);
	background-color: color(white);
	min-height: 248px;
	width: 363px;
}

.content-coupons {
	display: flex;
	justify-content: space-around;
}

.img-coupons {
	height: 100%;
	width: 100%;
}
</style>