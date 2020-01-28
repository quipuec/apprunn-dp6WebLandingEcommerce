<template>
	<button
		:class="[
			indeterminate ? 'loading' : 'heart-btn',
		]"
		@click="clicked"
	>
		<svg xmlns="http://www.w3.org/2000/svg" width="26px" height="22px" viewBox="-2 0 30 22">
			<g v-if="!indeterminate" id="DETALLE-DE-PRODUCTO" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd">
				<g
					:style="`fill:${value ? globalColors.primary : 'transparent'};stroke:${globalColors.primary};stroke-width: 1px;`"
				>
					<g>
						<path d="M21.2857313,14.0641057 L23.9352312,11.5266698 C26.6882563,8.88968403 26.6882563,4.61457671 23.9352312,1.97778882 C21.1822061,-0.659196973 16.7184332,-0.659196973 13.9654082,1.97778882 L13,2.90243589 L12.0345918,1.97759092 C9.28156678,-0.659196973 4.81779385,-0.659196973 2.06476879,1.97759092 C-0.688256264,4.61457671 -0.688256264,8.88968403 2.06476879,11.5264719 L13,22 L18.2182047,17.0021163" id="Shape"></path>
					</g>
				</g>
			</g>
		</svg>
	</button>
</template>
<script>
import { mapGetters } from 'vuex';

function clicked($event) {
	$event.stopPropagation();
	this.$emit('click', this.value);
}

export default {
	name: 'heart-component',
	computed: {
		...mapGetters([
			'indeterminate',
		]),
	},
	methods: {
		clicked,
	},
	props: {
		value: false,
	},
};
</script>
<style lang="scss" scoped>
	.heart-btn {
		align-items: center;
		display: flex;
	}
</style>

