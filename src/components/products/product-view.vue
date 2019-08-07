<template>
  <div class="product-view">
		<div class="btns-product-view">
			<button 
				v-for="(image, index) in data.images" 
				:key="image.id"
				class="btn-product-view"
				:class="{'select' : image.select }"
				@click="goToSlider(index, image)"
			>
				<img 
					:src="image.urlImage" 
					:alt="image.name" 
					height="100%">
			</button>
		</div>
		<div class="slider-product-view">
			<swiper ref="mySwiper">
				<swiper-slide 
					v-for="image in data.images" 
					:key="image.id">
					<div>
						<img 
							:src="image.urlImage" 
							:alt="image.name"
							width="100%">
					</div>
				</swiper-slide>
				<div class="pagination-carousel swiper-pagination" slot="pagination"></div>
			</swiper>
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

export default {
	name: 'product-view',
	computed: {
		swiper,
	},
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
	}

	.btns-product-view {
		display: flex;
		flex-direction: column;
		width: 20%;
	}

	.product-view {
		display: flex;
		justify-content: center;
	}

	.slider-product-view {
		align-items: center;
		background: color(white);
		border-radius: 7px;
		box-shadow: 0 2px 4px 0 rgba(213, 213, 213, 0.5);
		display: flex;
		height: 487px;
		justify-content: center;
		padding: 0 19px;
		width: 80%;
	}
</style>


