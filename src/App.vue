<template>
	<v-app>
		<app-header :logo="logo"/>
		<v-progress-linear
			class="progress-bar"
			color="success"
			:indeterminate="indeterminate"
			v-if="indeterminate"
		></v-progress-linear>
		<router-view></router-view>
		<v-snackbar
			:timeout="5000"
			:color="snackbar.color"
			top
			right
			v-model="snackbar.isVisible"
		>
			{{ snackbar.text }}
			<div
				v-if="snackbar.html"
				v-html="snackbar.html">
			</div>
			<v-btn
				flat
				class="white--text"
				@click.native="snackbar.isVisible = false"
			>
				Cerrar
			</v-btn>
		</v-snackbar>
	</v-app>
</template>

<script>
const appHeader = () => import('@/components/header/app-header');

function indeterminate() {
	return this.$store.getters.indeterminate;
}

function snackbar() {
	return this.$store.getters.snackbar;
}

function data() {
	return {
		logo: {
			image: process.env.COMPANY_LOGO,
			name: process.env.COMPANY_LOGIN_TITLE,
			height: 30,
		},
	};
}

export default {
	name: 'app',
	computed: {
		indeterminate,
		snackbar,
	},
	data,
	components: {
		appHeader,
	},
};
</script>

<style lang="scss">
html, body {
	color: color(black) !important;
	font-family: font(regular) !important;
	font-size: size(medium);
	overflow-x: auto;
}

html, body.survey-page {
	min-width: 0px !important;
}

input[type='number']::-webkit-inner-spin-button,
input[type='number']::-webkit-outer-spin-button {
	-webkit-appearance: none;
	margin: 0;
}

button {
	cursor: pointer;
	min-width: 5px;
	outline: none;
}

input.app-input::-webkit-input-placeholder {
	color: color(border);
	font-family: font(demi);
	font-size: size(medium);
}

.product-rating {
	.v-icon {
		padding: 0.2rem !important;
	}
}
</style>
