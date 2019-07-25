<template>
	<div>
		<button
			v-bind="$attrs"
			:class="[
				'app-button',
				{ 'save-btn': save },
				{ 'cancel-btn': cancel },
			]"
			:style="`background-color: ${background}; text-align: ${!img ? 'center' : 'left'}`"
		>
			<span class="span-img" :style="`border-color: ${imgBorderColor}`" v-if="img">
				<img
					v-if="img"
					:height="imgHeight"
					:width="imgWidth"
					:src="img"
					:alt="action"
				/>
			</span>
			{{ action }}
		</button>
	</div>
</template>

<script>
	export default {
		name: 'app-button',
		inheritAttrs: false,
		props: {
			action: String,
			background: String,
			cancel: Boolean,
			img: String,
			imgBorderColor: String,
			imgHeight: [String, Number],
			imgWidth: [String, Number],
			save: Boolean,
		},
	};
</script>

<style lang="scss" scoped>
	.app-button {
		border-radius: 7px;
		color: color(white);
		font-family: font(bold);
		font-size: size(medium);
		height: 39.5px;
		letter-spacing: 0;
		max-width: 175px;
		width: 100%;

		@media (min-width: 764px) {
			max-width: 182px;
		}

		.span-img {
			border-right-style: solid;
			border-right-width: 1px;
			display: inline-block;
			height: 31px;
			line-height: 31px;
			margin-right: 11px;
			padding: 3px 14px;
			vertical-align: middle;
		}
	}

	.save-btn {
		background-color: color(secondary);
	}

	.cancel-btn {
		background-color: color(primary);
	}
</style>