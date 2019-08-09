<template>
	<transition name="fade-lateral" mode="out-in">
		<div v-if="value" class="slider-container">
			<div class="content-app-slider title">
				<button 
				class="close-btn" 
				@click="closeSlider">
					<img src="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/left-arrow.svg" alt="" width="19px" height="13px">
				</button>
				<span class="title-center">{{title}}</span>
			</div>
			<slot></slot>
		</div>
	</transition>
</template>

<script>

function closeSlider() {
	this.$emit('input', false);
}

export default {
	name: 'app-slider',
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
	height: 100vh;
	margin-top: 169px;
	padding: 25px 36px;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 99;
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
	font-size: 13px;
	text-align: center;
	width: 95%;
}
</style>

