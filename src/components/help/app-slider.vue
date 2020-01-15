<template>
	<transition name="fade-lateral" mode="out-in">
		<div v-if="value" class="slider-container">
			<div class="content-app-slider title">
				<button-image
				:data="leftArrow"
				class="icon-close"
				@click-image="closeSlider"
				></button-image>
				<span class="title-center">{{title}}</span>
			</div>
			<slot></slot>
		</div>
	</transition>
</template>

<script>
import buttonImage from '@/components/shared/buttons/app-button-image';

function closeSlider() {
	this.$emit('input', false);
}

function data() {
	return {
		leftArrow: {
			image: '/static/img/icons/arrow-left-slider-help.svg',
			height: 13,
			name: 'arrow-left',
		},
	};
}

export default {
	name: 'app-slider',
	components: {
		buttonImage,
	},
	data,
	methods: {
		closeSlider,
	},
	props: {
		title: {
			default: '',
			type: String,
		},
		value: null,
	},
};
</script>

<style lang="scss" scoped>
.slider-container {
	background-color: color(white);
	bottom: 0;
	height: 100vh;
	left: 0;
	padding: 25px 36px;
	position: absolute;
	right: 0;
	top: 0;
	width: 100%;
	z-index: 99;

	@media (max-width: 950px)  {
		height: 945px;
		padding: 0 36px;
	}
}

.content-app-slider {
	align-items: center;
	border-bottom: 4px solid color(secondary); 
	display: flex;
	justify-content: flex-start;
	padding: 22px 0 11px 0;
	text-transform: uppercase;
}

.close-btn {
	background: transparent;
	border: none;
}

.title-center {
	color: color(secondary);
	font-family: font(bold);
	font-size: size(minmedium);
	text-align: center;
	width: 95%;
}
</style>

