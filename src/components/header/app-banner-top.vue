<template>
  <div
		v-if="webImage || mobileImage"
		class="app-banner-top"
		:class="[big ? 'big' : null, small ? 'small' : null]">
		<div 
			:class="[big ? 'big' : null, small ? 'small' : null]"
		>
			<picture>
				<source :srcset="webImage" media="(min-width: 600px)">
				<img :src="mobileImage" alt="">
			</picture>
			<button v-if="small" class="btn-more">Ver más</button>
		</div>
	</div>
</template>
<script>
import lib from '@/shared/lib';

const appButton = () => import('@/components/shared/buttons/app-button');

function webImage() {
	return lib.getDeeper('webImage')(this.data);
}

function mobileImage() {
	return lib.getDeeper('mobileImage')(this.data);
}

function data() {
	return {
		scrolled: false,
	};
}

export default {
	name: 'banner-top',
	components: {
		appButton,
	},
	computed: {
		mobileImage,
		webImage,
	},
	data,
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		big: {
			type: Boolean,
			default: false,
		},
		small: {
			type: Boolean,
			default: false,
		},
		color: String,
	},
};
</script>
<style lang="scss" scoped>
	.app-banner-top {
		background: color(white);
		padding: 12px 7%;
		
		@media (max-width: 764px) {
			padding: 7px 5%;
		}

		&.big {
			height: 283px;
			padding: 0;
			position: relative;

			@media (max-width: 764px) {
				height: 287px;
			}
		}

		&.small {
			padding: 0;
		}

		&.scrolled {
			margin-bottom: 99px;
		}
	}

	.big {
		height: 283px;

		@media (max-width: 764px) {
			height: 287px;
		}
	}
	.small {
		height: 413px;
		max-width: 337px;
	}

	.btn-find {
		position: absolute;
		right: 141px;
		top: 43%;
		width: 225px;

		@media (max-width: 764px) {
			bottom: 51px;
			left: 50%;
			right: auto;
			text-align: center;
			top: auto;
			transform: translateX(-50%);
		}
	}

	.btn-more {
		border: 1px solid color(white);
		bottom: 123px;
		color: color(white);
		font-family: font(bold);
		font-size: size(large);
		height: 30px;
		left: 50%;
		max-width: 193px;
		position: absolute;
		transform: translateX(-50%);
		width: 80%; 
	}

	img {
		height: 100%;
		object-fit: fill;
		width: 100%
	}
</style>

