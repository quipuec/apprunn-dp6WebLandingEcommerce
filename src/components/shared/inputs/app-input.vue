<template>
	<div>
		<input
			v-bind="$attrs"
			class="app-input"
		/>
	</div>
</template>

<script>
	export default {
		name: 'app-input',
		inheritAttrs: false,
	};
</script>

<style lang="scss" scoped>
	.app-input {
		background-color: color(background);
		border-radius: 7px;
		color: color(text);
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