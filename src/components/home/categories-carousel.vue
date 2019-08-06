<template>
	<div class="categories-carousel">
		<div>
			<title-section 
				title="Categorías" 
				:color="colorBorder"/>
		</div>
		<div class="categories-carousel-slider">
			<swiper :options="swiperOption">
        <swiper-slide v-for="(category, index) in categories" :key="category.id">
					<div 
						class="container-big-category" 
						@mouseover="hoverCategory(index)"
						@mouseleave="leaveCategory(index)"
					>
						<div 
							class="container-category-image"
							:style="category.hover ? `border-color: ${colorBase}` : null">
							<div 
								:style="`background-image: url(${category.urlImage})`"
								class="category-image">
								<img 
									:src="category.webImage" 
									:alt="category.name"
									class="image">	
							</div>
						</div>
						<div 
							class="category-title"
							:style="category.hover ? `color: ${colorBase}` : null">{{category.title}}</div>
					</div>
				</swiper-slide>
        <div class="swiper-button-prev" slot="button-prev"></div>
        <div class="swiper-button-next" slot="button-next"></div>
      </swiper>
		</div>
	</div>
</template>
<script>
const titleSection = () => import('@/components/home/title-section');

function hoverCategory(index) {
	this.categories[index].hover = true;
}

function leaveCategory(index) {
	this.categories[index].hover = false;
}

function data() {
	return {
		swiperOption: {
			slidesPerView: 3,
			spaceBetween: 0,
			slidesPerGroup: 3,
			allowTouchMove: false,
			navigation: {
				nextEl: '.swiper-button-next',
				prevEl: '.swiper-button-prev',
			},
			breakpoints: {
				860: {
					slidesPerView: 1,
					slidesPerGroup: 1,
					allowTouchMove: true,
				},
				1261: {
					slidesPerView: 2,
					slidesPerGroup: 2,
					allowTouchMove: true,
				},
			},
		},
		colorBorder: process.env.COLOR_DARK,
	};
}
export default {
	name: 'categories-carousel',
	data,
	components: {
		titleSection,
	},
	methods: {
		hoverCategory,
		leaveCategory,
	},
	props: {
		categories: {
			type: Array,
			default: () => [],
		},
		colorBase: String,
	},
};
</script>
<style lang="scss" scoped>
	.categories-carousel {
		background: color(white);
		padding: 115px 15% 108px;

		@media (max-width: 860px) {
			padding: 35px 10%;
		}
	}

	.category-image {
		align-items: center;
		display: flex;
		height: 163px;
		justify-content: center;
		position: relative;
		width: 205px;

		&::before {
			background-image: linear-gradient(to bottom, rgba(60, 60, 60, 0.89), rgba(60, 60, 60, 0.89));
			bottom: 0;
			content: '';
			left: 0;
			position: absolute;
			right: 0;
			top: 0;
		}

		.image {
			height: 67px;
			position: absolute;

			@media (max-width: 860px) {
				height: 46px;
			}
		}

		@media (max-width: 860px) {
			height: 111px;
			width: 140px;
		}
	}

	.container-category-image {
		align-items: center;
		border: 4px solid color(base);
		border-radius: 16px;
		cursor: pointer;
		display: flex;
		height: 179px;
		justify-content: center;
		margin: auto;
		transition: all .3s;
		width: 220px;

		@media (max-width: 860px) {
			height: 122px;
			width: 150px;
		}
	}

	.container-big-category {
		cursor: pointer;
		margin: auto;
		padding: 6px;
		width: 229px;

		&:hover {
			.container-category-image {
				transform: scale(1.05);
			}
		}
	}

	.categories-carousel-slider {
		margin-top: 25px;
	}

	.category-title {
		color: color(base);
		font-family: font(bold);
		font-size: size(large);
		margin-top: 26px;
		text-align: center;
	}
</style>


