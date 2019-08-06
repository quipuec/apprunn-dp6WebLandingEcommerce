<template>
  <div 
		class="app-banner-top"
		:class="big ? 'big' : null">
		<div 
			:style="`background-image: url(${data.urlImage})`"
			:class="big ? 'big' : null"
			class="image-banner">
			<app-button
				action="ENCUÉNTRALO AQUÍ"
				:background="color"
				v-if="big"
				type="button"
				class="btn-find"
			></app-button>
		</div>
	</div>
</template>
<script>
const appButton = () => import('@/components/shared/buttons/app-button');

export default {
	name: 'banner-top',
	components: {
		appButton,
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		big: {
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
	}
	
	.image-banner {
		background-position-x: left;
		background-position-y: center;
		background-repeat: no-repeat;
		background-size: cover;
		height: 65px;
		width: 100%;

		&.big {
			height: 283px;

			@media (max-width: 764px) {
				height: 287px;
			}
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
</style>

