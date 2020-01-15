<template>
	<div 
		:class="[
			indeterminate ? 'loading' : 'car-container',
		]">
		<button type="button" @click="clicked">
			<svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24">
				<g v-if="!indeterminate" :fill="`${globalColors.primary}`" fill-rule="nonzero" stroke-width="1">
					<path d="M12.364 20.763a2.215 2.215 0 1 0-4.43 0 2.215 2.215 0 0 0 4.43 0zm-3.645 0a1.43 1.43 0 1 1 2.859 0 1.43 1.43 0 0 1-2.859 0zM18.351 22.978a2.215 2.215 0 1 0 .001-4.43 2.215 2.215 0 0 0 0 4.43zm0-3.645a1.43 1.43 0 1 1 0 2.859 1.43 1.43 0 0 1 0-2.859zM1.393 1.786h2.396a1.593 1.593 0 0 1 1.581 1.35L7.267 15.12a2.376 2.376 0 0 0 2.357 2.014H21.35a.393.393 0 0 0 0-.786H9.624a1.594 1.594 0 0 1-1.58-1.35l-.323-2.038H19.73a2.388 2.388 0 0 0 2.255-1.605l2.228-6.43a.393.393 0 0 0-.371-.522H6.366l-.22-1.389A2.376 2.376 0 0 0 3.79 1H1.393a.393.393 0 0 0 0 .786zM23.29 5.188l-2.047 5.909a1.602 1.602 0 0 1-1.513 1.076H7.596L6.49 5.187h16.8z"/>
				</g>
			</svg>
		</button>
		<output
			v-if="count"
			class="car-count"
			:style="`background-color:${globalColors.primary}`"
		>{{count}}</output>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

function clicked() {
	this.$emit('click');
}
export default {
	name: 'camera-component',
	computed: {
		...mapGetters([
			'indeterminate',
		]),
	},
	methods: {
		clicked,
	},
	props: {
		count: {
			type: Number,
			default: 0,
		},
	},
};
</script>
<style lang="scss" scoped>
	.car-container {
		position: relative;
	}

	button {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.car-count {
		align-items: flex-end;
		border-radius: 50%;
		bottom: 70%;
		color: white;
		display: flex;
		font-family: font(bold);
		font-size: size(xsmall);
		height: 16px;
		justify-content: center;
		left: 100%;
		position: absolute;
		width: 16px;
	}
</style>
