<template>
	<div class="app-banner-cupons"
	:style="`background-image: url(${webImage})`"
	>
		<p class="title-banner">CUPONES</p>
		<swiper :options="swiperOption">
			<swiper-slide
			v-for="(item, index) in imageCou"
			:key="index">
				<div class="content-coupons">
					<div class="box-coupons">
						<a href="#"
						target="_blank"
						>
							<img :src="item.webImage" class="img-coupons" alt="">
						</a>
					</div>
				</div>
			</swiper-slide>
				<div class="swiper-button-prev" slot="button-prev" v-if="lengthImageCoupons"></div>
				<div class="swiper-button-next" slot="button-next" v-if="lengthImageCoupons"></div>
		</swiper>
	</div>	
</template>

<script>
import lib from '@/shared/lib';
import { mapGetters } from 'vuex';

function created() {
	this.imageCou = this.getBanners.filter(c => c.typeId === 8);
	this.imageCou.splice(0, 1);
	if (this.imageCou.length <= 3) {
		this.lengthImageCoupons = false;
	}
}

function webImage() {
	return lib.getDeeper('webImage')(this.data);
}

function data() {
	return {
		lengthImageCoupons: true,
		images: [],
		swiperOption: {
			slidesPerView: 3,
			slidesPerGroup: 1,
			spaceBetween: 0,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1250: {
					slidesPerView: 2,
					allowTouchMove: true,
				},
				950: {
					slidesPerView: 1,
					allowTouchMove: true,
				},
			},
			pagination: {
				el: '.pagination-carousel',
				clickable: true,
			},
		},
		imageCou: [],
	};
}

export default {
	name: 'app-banner-cupons',
	created,
	data,
	computed: {
		webImage,
		...mapGetters([
			'getBanners',
		]),
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

	@media (max-width: 764px) {
		padding: 25px 65px;
	}
}

.title-banner {
	color: color(white);
	font-family: font(bold);
	font-size: 48px;
	text-align: center;
}

.box-coupons {
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