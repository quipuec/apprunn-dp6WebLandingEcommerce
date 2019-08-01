<template>
	<div>
		<button
			v-bind="$attrs"
<<<<<<< HEAD
			:class="[
				'app-button',
				{ 'save-btn': save },
				{ 'cancel-btn': cancel },
				{'thin': thin},
			]"
			:style="`background-color: ${background}; text-align: ${!img ? 'center' : 'left'} ; color: ${color}; border: ${border ? `1px solid ${border}` : null}`"
			@click="clicked"
=======
			v-on="$listeners"
			class="app-button"
			:class="{'thin': thin}"
			:style="`background-color: ${background}; text-align: ${!img ? 'center' : 'left'} ; color: ${color}; border: ${border ? `1px solid ${border}` : null}`"
>>>>>>> 4411ae3d5b20b6cff15fd2950565fa43c86673aa
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
			img: String,
			imgBorderColor: String,
			imgHeight: [String, Number],
			imgWidth: [String, Number],
			color: {
				type: String,
				default: 'white',
			},
			border: String,
			thin: Boolean,
		},
	};
</script>

<style lang="scss" scoped>
	.app-button {
		border-radius: 7px;
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

		&.thin {
			height: 24px;
			font-family: font(demi);
			font-size: size(small);
			width: 170px;
		}
	}
</style>