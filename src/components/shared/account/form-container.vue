<template>
	<v-layout
		wrap justify-center px-4
		class="form-container"
		:style="`background-image: url(${backgroundImage})`"
	>
		<div class="opacity"></div>
		<account-form
			:color="color"
			:disabled="disabled"
			:facebook="facebook"
			:heading-image="headingImage"
			:img-height="imgHeight"
			:title="title"
			:title-btn="titleBtn"
			@authenticate="$emit('on-authenticate', $event)"
			@on-submit="$emit('on-submit')"
		>
			<slot slot="form"></slot>
		</account-form>
	</v-layout>
</template>

<script>
	const accountForm = () => import('@/components/shared/account/account-form');

	export default {
		name: 'form-container',
		components: {
			accountForm,
		},
		props: {
			backgroundImage: String,
			color: String,
			disabled: {
				default: false,
				type: Boolean,
			},
			facebook: String,
			headingImage: String,
			imgHeight: [Number, String],
			title: String,
			titleBtn: String,
		},
	};
</script>

<style lang="scss" scoped>
	.form-container {
		background-position: 53%;
		background-repeat: no-repeat;
		background-size: cover;
		min-height: calc(100vh - 76px);
		padding-bottom: 54px;
		padding-top: 54px;
		position: relative;

		@media (min-width: 768px) {
			background-position: center;
			background-size: cover;
			min-height: calc(100vh - 99px);
			padding-bottom: 109px;
			padding-top: 109px;
		}
	}

	.opacity {
		background-color: rgba(14, 14, 14, .59);
		height: 100%;
		left: 0px;
		position: absolute;
		top: 0px;
		width: 100%;
	}
</style>