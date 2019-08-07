<template>
  <div class="product-view">
		<div class="btns-product-view">
			<button 
				v-for="image in data.images" 
				:key="image.id"
				class="btn-product-view">
				<img 
					:src="image.urlImage" 
					:alt="image.name" 
					height="100%">
			</button>
		</div>
		<div class="slider-product-view">
			<swiper>
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

export default {
	name: 'product-view',
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
		// max-width: 301px;
		padding: 0 19px;
		width: 80%;
	}
</style>


