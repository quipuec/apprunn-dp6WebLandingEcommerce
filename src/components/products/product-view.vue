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
		<div class="slider-product-view">
			<swiper ref="mySwiper" :options="swiperOption">
				<swiper-slide 
					v-for="image in data.images" 
					:key="image.id">
					<div class="wrapper-image">
						<!-- <img 
							:src="image.urlImage" 
							:alt="image.name"
							class="image-product-slider"
						> -->
						<ProductZoomer
							:base-images="images"
							:base-zoomer-options="zoomerOptions"
							class="image"
						/>
					</div>
				</swiper-slide>
				<div class="pagination-carousel swiper-pagination" slot="pagination"></div>
			</swiper>
		</div>
		<!-- <ProductZoomer
			:base-images="images"
			:base-zoomer-options="zoomerOptions"
			class="image"
		/> -->
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
	console.log(this.$refs.mySwiper.swiper);
}


function slideChange() {}

// function images() {
// 	// debugger;
// 	const image = {
// 		normal_size: [
// 			{
// 				id: 1,
// 				url: 'http://yoohooworld.com/images/vue-product-zoomer/images/thumbs/1.jpeg',
// 			},
// 		],
// 		large_size: [
// 			{
// 				id: 1,
// 				url: 'http://yoohooworld.com/images/vue-product-zoomer/images/thumbs/1.jpeg',
// 			},
// 		],
// 	};
// 	return image;
// }

function data() {
	return {
		swiperOption: {
			on: {
				slideChange,
			},
		},
		indexSlide: 0,
		zoomerOptions: {
			choosed_thumb_border_color: '#bbdefb',
			hoverDelay: 300,
			move_by_click: true,
			pane: 'container-round',
			scroll_items: 4,
			zoomFactor: 2,
		},
		images: {
			normal_size: [
				{
					id: 1,
					url: 'https://japi-static.s3.amazonaws.com/taurus/mochila-crossbody2.jpg',
				},
			],
			large_size: [
				{
					id: 1,
					url: 'https://japi-static.s3.amazonaws.com/taurus/mochila-crossbody2.jpg',
				},
			],
		},
	};
}
export default {
	name: 'product-view',
	computed: {
		swiper,
		// images,
	},
	data,
	methods: {
		goToSlider,
		slideChange,
		// images,
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
	}

	.wrapper-image {
		align-items: center;
		display: flex;
		height: 487px;
		justify-content: center;
		width: 100%;
	}

	.image-product-slider {
		max-height: 487px;
		max-width: 100%;
	}
</style>


