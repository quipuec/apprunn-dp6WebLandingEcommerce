<template>
	<v-app>
		<app-header :logo="logo" @change-menu="changeMenu" :menu="showMenu"/>
		<transition name="slide-fade">
			<div 
				class="v-overlay v-overlay--absolute v-overlay--active mobile-overlay" 
				@click="changeMenu"
				v-show="showMenu"></div>
  	</transition>
	  <form-bulletin />
	<transition name="slide-fade">
		<app-menu-category 
			v-if="showMenu" 
			:img-user="user"
			:color-base="colorBase"
			:color-border="colorBorder"/>
  	</transition>
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
const appMenuCategory = () => import('@/components/header/app-category');
const formBulletin = () => import('@/components/shared/form/form-bulletin');

function indeterminate() {
	return this.$store.getters.indeterminate;
}

function snackbar() {
	return this.$store.getters.snackbar;
}

function changeMenu() {
	this.showMenu = !this.showMenu;
}

function data() {
	return {
		logo: {
			image: process.env.COMPANY_LOGO,
			name: process.env.COMPANY_LOGIN_TITLE,
			height: 30,
		},
		showMenu: false,
		user: {
			urlImage: '/static/img/user.svg',
			name: 'Login',
			height: 25,
		},
		colorBase: process.env.COLOR_BASE,
		colorBorder: process.env.COLOR_BORDER,
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
		appMenuCategory,
		formBulletin,
	},
	methods: {
		changeMenu,
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
	font-family: font(demi) !important;
	font-size: size(minmedium) !important;
	font-weight: normal !important;
}

.product-rating {
	.v-icon {
		padding: 0.2rem !important;
	}
}

.slide-fade-enter-active {
  	transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-leave-active {
  	transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.ecommerce-select {
	background-color: color(background) !important;
	color: color(base);
	font-family: font(medium) !important;
	height: 46.8px !important;

	.v-input__control {

		.v-input__slot {
			border: 1px solid color(border) !important;
			border-radius: 5px !important;
			height: -webkit-fill-available !important;
			min-height: inherit !important;

			.v-select__selections {
				padding-top: 0 !important;
			}

			.v-input__append-inner {
				margin-top: 10px !important;
			}
		}
	}
}

.slide-fade-enter, .slide-fade-leave-to {
	opacity: 0;
  transform: translateX(-20px);
}

.mobile-overlay {
	display: none;

	@media (max-width: 764px) {
		display: block;
	}
}
</style>
