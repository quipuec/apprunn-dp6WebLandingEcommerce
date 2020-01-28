<template>
	<div class="product-related">
		<title-section 
			title="Productos relacionados" 
			:color="globalColors.dark"/>
		<div v-if="relateds.length < 3" class="container-related">
			<div 
				v-for="product in relateds"
				:key="product.id">
				<product-card 
					:base-color="globalColors.primary" 
					class="product-card"
					:product="product"
					small/>
			</div>
		</div>	
		<div v-else class="container-slider-related">
			<swiper :options="getOptions" ref="mySwiper">
				<swiper-slide 
					v-for="product in relateds" 
					:key="product.id">
					<div>
						<product-card 
							:base-color="globalColors.primary" 
							class="product-card"
							:product="product"
							small/>
					</div>
				</swiper-slide>
			</swiper>
			<div 
				v-if="viewButtons"
				class="container-buttons-slider">
				<button @click="nextSlider" class="btn btn-rigth">
					<img src="/static/img/slider-arrow-rigth.svg" alt="adelante">
				</button>
				<button @click="prevSlider" class="btn btn-left">
					<img src="/static/img/slider-arrow-left.svg" alt="atras">
				</button>
			</div>
		</div>
	</div>
</template>
<script>
import productCard from '@/components/products/product-card';
import titleSection from '@/components/home/title-section';

function getOptions() {
	if (this.relateds.length >= 5) {
		return this.swiperOption;
	}

	if (this.relateds.length >= 4) {
		return this.swiperOptionOne;
	}
	return this.swiperOptionTwo;
}

function nextSlider() {
	this.swiper.slideNext();
}

function prevSlider() {
	this.swiper.slidePrev();
}

function swiper() {
	return this.$refs.mySwiper.swiper;
}

function viewButtons() {
	return this.relateds.length >= 5;
}

function data() {
	return {
		swiperOption: {
			slidesPerView: 5,
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				1000: {
					slidesPerView: 4,
					slidesPerGroup: 1,
					allowTouchMove: true,
					spaceBetween: 10,
				},
				700: {
					slidesPerView: 3,
				},
				466: {
					slidesPerView: 2,
					centeredSlides: true,
					grabCursor: true,
				},
			},
		},
		swiperOptionOne: {
			slidesPerView: 4,
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				975: {
					slidesPerView: 3,
					slidesPerGroup: 1,
					allowTouchMove: true,
					spaceBetween: 10,
				},
				652: {
					slidesPerView: 2,
					centeredSlides: true,
					grabCursor: true,
				},
			},
		},
		swiperOptionTwo: {
			slidesPerView: 3,
			spaceBetween: 10,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				975: {
					slidesPerView: 3,
					slidesPerGroup: 1,
					allowTouchMove: true,
					spaceBetween: 10,
				},
			},
		},
	};
}
export default {
	name: 'product-related',
	components: {
		titleSection,
		productCard,
	},
	computed: {
		getOptions,
		swiper,
		viewButtons,
	},
	methods: {
		nextSlider,
		prevSlider,
	},
	data,
	props: {
		relateds: {
			type: Array,
			default: () => [],
		},
	},
};
</script>
<style lang="scss" scoped>
	.product-card {
		margin: auto !important;
	}

	.product-related {
		background: color(background);
		padding: 20px 3% 56px;
	}

	.container-slider-related {
		margin-top: 22px;
		position: relative;
	}

	.container-buttons-slider {
		position: absolute;
		top: 50%;
		width: 100%;

		.btn {
			position: absolute;
		}

		.btn-rigth {
			right: -12px;
		}

		.btn-left {
			left: -12px;
		}

		@media screen and (max-width: 1000px) {
			display: none;
		}
	}

	.container-related {
		display: flex;
    justify-content: space-around;
		margin-top: 22px;
	}
</style>


