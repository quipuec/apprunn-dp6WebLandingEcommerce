<template>
	<button
		type="button"
		v-on="$listeners"
		:class="[
			'btn-svg',
			active ? 'active' : 'non-active',
		]"
	>
		<span class="svg">
			<slot></slot>
		</span>
		<span>{{buttonTitle}}</span>
		<slot name="after"></slot>
	</button>
</template>
<script>
export default {
	name: 'app-button-order',
	inheritAttrs: false,
	props: {
		active: {
			default: false,
			type: Boolean,
		},
		buttonTitle: {
			default: '',
			type: String,
		},
	},
};
</script>
<style lang="scss" scoped>
	.btn-svg {
		align-items: center;
		border-radius: 5px;
		display: flex;
		justify-content: center;
		padding: 5px 0;
	}

	.active {
		background-color: color(secondary);
		border: 1px solid color(secondary);
		color: white;
	}

	.non-active {
		background-color: white;
		border: 1px solid color(secondary);
		color: color(secondary);
	}

	.svg {
		margin: 0 5px;
	}
</style>

