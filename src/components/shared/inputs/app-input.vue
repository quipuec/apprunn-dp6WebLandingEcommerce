<template>
	<div>
		<input
			v-bind="$attrs"
			class="app-input"
			:style="`border-color: ${borderColor}`"
			:placeholder="placeholder"
			@input="$emit('input', $event)"
		/>
	</div>
</template>

<script>
	export default {
		name: 'app-input',
		inheritAttrs: false,
		props: {
			borderColor: {
				default: '#f5f3f3',
				type: String,
			},
			placeholder: String,
		},
	};
</script>

<style lang="scss" scoped>
	.app-input {
		background-color: color(background);
		border-radius: 7px;
		border-style: solid;
		border-width: 1px;
		color: color(border);
		font-family: font(demi);
		font-size: size(medium);
		height: 46.8px;
		max-width: 244.5px;
		outline: none;
		padding: 0px 16.2px;
		width: 100%;

		@media (min-width: 764px) {
			height: 40px;
			max-width: 306px;
		}
	}
</style>