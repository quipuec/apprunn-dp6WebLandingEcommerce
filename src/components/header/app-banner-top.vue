<template>
  <div 
		class="app-banner-top"
		:class="[big ? 'big' : null, small ? 'small' : null]">
		<div 
			:style="`background-image: url(${data.urlImage})`"
			:class="[big ? 'big' : null, small ? 'small' : null]"
			class="image-banner">
			<app-button
				action="ENCUÉNTRALO AQUÍ"
				:background="color"
				v-if="big"
				type="button"
				class="btn-find"
			></app-button>
			<button v-if="small" class="btn-more">Ver más</button>
		</div>
	</div>
</template>
<script>
const appButton = () => import('@/components/shared/buttons/app-button');

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
	
	.image-banner {
		background-position-x: left;
		background-position-y: center;
		background-repeat: no-repeat;
		background-size: cover;
		height: 65px;
		position: relative;
		width: 100%;
		z-index: 4;

		&.big {
			height: 283px;

			@media (max-width: 764px) {
				height: 287px;
			}
		}

		&.small {
			height: 413px;
			max-width: 337px;
		}
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
</style>

