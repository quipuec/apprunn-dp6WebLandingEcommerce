<template>
	<transition name="fade-lateral" mode="out-in">
		<div v-if="value" class="slider-container">
			<div class="content-app-slider title">
				<button 
				class="close-btn" 
				@click="closeSlider">
					X
				</button>
				<span class="title-center">{{title}}</span>
			</div>
			<slot></slot>
		</div>
	</transition>
</template>

<script>

function closeSlider() {
	debugger;
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
}

.close-btn {
	background: transparent;
	border: none;
	color: white;
}

.title-center {
	text-align: center;
	width: 95%;
}
</style>

