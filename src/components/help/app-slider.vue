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
	background-color: white;
	height: 100vh;
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	width: 100%;
	z-index: 99;
}

.content-app-slider {
	display: flex;
	align-items: center;
	justify-content: flex-start;
	text-transform: uppercase;
	padding-top: 22px;
}

.close-btn {
	background: transparent;
	border: none;
}

.title-center {
		color: #06539f;
	font-size: 13px;
	font-family: font(bold);
	text-align: center;
	width: 95%;
}
</style>

