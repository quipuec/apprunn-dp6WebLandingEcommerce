<template>
  <div class="product-view">
		<div class="btns-product-view">
			<button 
				v-for="(image, index) in data.images" 
				:key="image.id"
				class="btn-product-view"
				:class="{'select' : image.select, 'not-select' : !image.select}"
				:style="{'border-color': image.select ? globalColors.secondary : null}"
				@click="goToSlider(index, image)"
			>
				<img 
					:src="image.urlImage" 
					:alt="image.name" 
					height="100%">
			</button>
		</div>
		<div class="slider-product-view" v-if="data.images && data.images.length">
			<swiper ref="mySwiper" :options="swiperOption">
				<swiper-slide 
					v-for="image in data.images" 
					:key="image.id">
					<div class="wrapper-image">
						<img 
							:src="image.urlImage" 
							:alt="image.name"
							class="image-product-slider"
						>
					</div>
				</swiper-slide>
				<div class="pagination-carousel swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<div v-else class="slider-product-view-one">
			<img :src="data.urlImage" :alt="data.name" height="90%">
		</div>
	</div>
</template>
<script>

function swiper() {
	return this.$refs.mySwiper.swiper;
}

function goToSlider(index, image) {
	this.swiper.slideTo(index, 1000, false);
	this.data.images = this.data.images.map((i) => {
		const newImage = { ...i };
		newImage.select = i.id === image.id;
		return newImage;
	});
}


function data() {
	return {
		swiperOption: {
			allowTouchMove: false,
			loop: true,
			breakpoints: {
				996: {
					slidesPerView: 2,
					slidesPerGroup: 1,
					allowTouchMove: true,
					centeredSlides: true,
					grabCursor: true,
					spaceBetween: 30,
				},
			},
		},
	};
}
export default {
	name: 'product-view',
	computed: {
		swiper,
	},
	data,
	methods: {
		goToSlider,
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
	.btn-product-view {
		background: color(white);
		border: 2px solid color(border);
		border-radius: 7px;
		height: 74px;
		margin-bottom: 14px;
		max-width: 94px;
		transition: all .3s;

		&.not-select {
			opacity: 0.3;
		}
	}

	.btns-product-view {
		display: flex;
		flex-direction: column;
		margin-right: 20px;
		width: 94px;

		@media screen and (max-width: 996px) {
			display: none;
		}
	}

	.product-view {
		display: flex;
		justify-content: center;
	}

	.slider-product-view {
		background: color(white);
		border-radius: 7px;
		box-shadow: 0 2px 4px 0 rgba(213, 213, 213, 0.5);
		height: 487px;
		padding: 0 19px;
		width: 80%;

		@media screen and (max-width: 996px) {
			background: transparent;
			box-shadow: none;
			height: 217px;
			padding: 0;
			width: 100%;
		}
	}

	.wrapper-image {
		align-items: center;
		display: flex;
		height: 487px;
		justify-content: center;
		width: 100%;

		@media screen and (max-width: 996px) {
			height: 217px;
		}
	}

	.image-product-slider {
		max-height: 487px;
		max-width: 100%;

		@media screen and (max-width: 996px) {
			max-height: 217px;
		}
	}

	.slider-product-view-one {
		align-items: center;
		background: color(white);
		border-radius: 7px;
		box-shadow: 0 2px 4px 0 rgba(213, 213, 213, 0.5);
		display: flex;
		height: 487px;
		justify-content: center;
		padding: 0 19px;
		width: 80%;

		@media screen and (max-width: 764px) {
			height: 217px;
			width: 70%;
		}
	}
</style>


