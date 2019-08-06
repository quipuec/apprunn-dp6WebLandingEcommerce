<template>
	<v-app>
		<app-banner-top :data="bannerTop"/>
		<app-header :logo="logo" @change-menu="changeMenu" :menu="showMenu"/>
		<transition name="slide-fade">
			<div 
				class="v-overlay v-overlay--absolute v-overlay--active mobile-overlay" 
				@click="changeMenu"
				v-show="showMenu"></div>
  	</transition>
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
	<section-visa></section-visa>
	<form-bulletin />
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
const appBannerTop = () => import('@/components/header/app-banner-top');
const formBulletin = () => import('@/components/shared/form/form-bulletin');
const sectionVisa = () => import('@/components/footer/section-visa');

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
		bannerTop: {
			urlImage: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/banner-top.png',
			image: 'descuento',
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
		sectionVisa,
		appHeader,
		appMenuCategory,
		appBannerTop,
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
  transform: translateX(-10px);
}

.mobile-overlay {
	display: none;

	@media (max-width: 764px) {
		display: block;
	}
}

.banner-carousel {
	.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
		border: 1px solid color(white);
		height: 12px;
    width: 12px;
	}

	.swiper-pagination-bullet {
		cursor: pointer;
		opacity: 1;
	}

	.swiper-pagination-bullet-active {
		background: color(white);
	}

	.v-input--switch__thumb:not(.success--text) {
		color: map-get($colors, error) !important;
	}
}

@media print {
	.media-print {
		display: none !important;
	}
}

nav.v-toolbar {
	& + aside + .on-survey {
		margin: 61px 4% 0 auto;
		max-width: 81%;
		min-width: 0 !important;

		@media (max-width: 768px) {
			margin: 61px auto 0;
		}

		@media (max-width: 500px) {
			max-width: 95%;
		}
	}
	& + aside + .section-margin {
		margin: 61px 4% 0 auto;
		max-width: 81%;
		min-width: 816px !important;

		@media (min-width: 1024px) {
			margin: 61px 4.5% 0 auto;
		}

		@media (min-width: 1130px) {
			margin: 61px 4% 0 auto;
		}

		@media (min-width: 1280px) {
			margin: 61px 7% 0 auto;
		}
	}

	&.toggle {
		& + aside + .section-margin {
			margin: 61px 4% 0 18%;

			@media (min-width: 1024px) {
				margin: 61px 4.5% 0 auto;
			}

			@media (min-width: 1130px) {
				margin: 61px 4% 0 auto;
			}

			@media (min-width: 1280px) {
				margin: 61px 5% 0 auto;
			}
		}
	}
}

.score-slider {
	.v-slider__track {
		background-color: map-get($colors, gray-slider) !important;
		border-color: map-get($colors, gray-slider) !important;
		left: 0px !important;
	}

	.v-slider__track-fill {
		background-color: map-get($colors, success) !important;
		border-color: map-get($colors, success) !important;
	}

	.v-slider__thumb {
		background-color: map-get($colors, success) !important;
		border: 0 !important;
		border-color: map-get($colors, success) !important;
		border-radius: 4.5px;
		height: 20px;
		left: -4px !important;
		transform: translateY(-50%) !important;
		width: 9px;

		&-container {
			&:before {
				height: 100px !important;
				left: -23px !important;
				top: -50px !important;
				width: 45px !important;
			}
		}
	}

	.v-slider__ticks {
		border-color: map-get($colors, gray-slider) !important;

		span {
			color: map-get($colors, secondary) !important;
			font-family: map-get($fonts, regular) !important;
			font-size: map-get($sizes, medium) !important;
			top: -28px !important;
		}
	}

	.v-input__slot {
		margin-bottom: 0 !important;
	}
}

.page-container {
	width: 26%;
}

.input-value {
	background-color: map-get($colors, white);
	border: 1px solid map-get($colors, gray);
	border-radius: 4px;
	height: 54.7px;
	margin: 0px;
	padding: 0px;
	width: 106px;

	.v-input__control {
		height: 54.7px;
	}

	input {
		color: map-get($colors, gray-medium) !important;
		font-family: map-get($fonts, bold);
		font-size: map-get($sizes, big);
		max-height: 100%;
		text-align: center;
	}

	.v-input__slot {
		height: 54.7px;

		&:before,
		&:after {
			content: none !important;
		}
	}
}

.title-table {
	color: map-get($colors, info);
	font-family: map-get($fonts, bold);
	font-size: map-get($sizes, xlarge);
}

.input-table-search {
	border: solid 1px map-get($colors, gray);
	border-radius: 4px;
	color: map-get($colors, black);
	height: 37px;
	outline: none;
	padding-left: 15px;
	width: 100%;
}

.surveys-organizational, .surveys-inventory {
	.table-pagination, .v-menu, .v-menu--inline {
		display: none !important; 
	}

	table.table-list thead {
		background-color: map-get($colors, white) !important; 
	}

	.text-xs-center {
		border-bottom: 1px solid map-get($colors, gray);
		border-top: 1px solid map-get($colors, gray);
		color: map-get($colors, primary) !important;
	}

	.text-xs-right {
		display: none !important;
	}

	table.table-list tbody tr td {
		background-color: map-get($colors, white);
		border-right: none !important;
		color: map-get($colors, info);
		padding: 15px 51px !important;
	}

	.border-top {
		border-bottom: 1px solid map-get($colors, gray);
		color: map-get($colors, font-bold);
		font-family: map-get($fonts, NeuzeitGroT);
		font-size: map-get($sizes, small);
		text-align: left !important;
	}

	table.table-list thead th {
		padding: 11px 51px !important;
	}

	.v-input--switch .v-input--selection-controls__input {
		width: 35px !important;
	}

	.v-input--selection-controls  {
		margin-top: 0;
	}

	.v-input--switch__track {
		height: 10px;
	}

	.v-input--switch__thumb {
		height: 17px;
		width: 17px;
	}

	.application {
		font-family: map-get($fonts, NeuzeitGroT);
	}
}

.check-factor {
	.v-icon {
		color: map-get($colors, gray);
	}
}

.new-survey {
	bottom: 0;
	left: 0;
	padding: 37px 71px 36px;
	position: absolute !important;
	right: 0;

	&-input {
		background: map-get($colors, white);
		border: 1px solid map-get($colors, gray);
		border-radius: 4px;
		color: map-get($colors, secondary);
		display: block;
		margin-top: 4px;
		outline: none;
		padding: 6px 20px;
		width: 100%;

		&::placeholder {
			color: map-get($colors, placeholder);
		}
	}

	&-label {
		color: map-get($colors, secondary);
		font-size: 11px;
		margin-bottom: 10px;
	}

	&.theme--light.v-sheet {
		background: map-get($colors, gray-light);
	}
}

.media-print.main-header-page.v-toolbar {
	.v-toolbar__content {
		padding: 0px !important;
	}
}

.switch-table {
	color: map-get($colors, gray-switch);
	display: inline-flex;
	padding-top: 0px;

	.v-input__control {
		.v-input--selection-controls__ripple {
			height: 13px;
			left: 0px;
			margin: 0px;
			top: 0px;
			transform: translate(16px, 0) !important;
			width: 13px;
		}
	}

	.v-input--selection-controls__input {
		height: 10.4px;
		margin-right: 0px;
		width: 30px !important;

		input,
		.v-input--switch__track {
			border-radius: 5px;
			color: rgba(212, 212, 212, .39);
			height: 10.4px;
			top: 0px;
		}

		.v-input--switch__track {
			opacity: .3;
		}
	}

	.v-input--switch__thumb {
		box-shadow: none;
		color: map-get($colors, gray-switch);
		height: 13px;
		top: -1.5px;
		transform: translate(16px, 0);
		width: 13.2px;
	}

	&.v-input--is-dirty {
		.v-input--switch__thumb,
		.v-input--selection-controls__ripple {
			transform: translate(1px, 0) !important;
		}
	}

	.v-input--selection-controls__ripple:before {
		content: none !important;
	}
}

.v-dialog {
	box-shadow: none !important;
}

.wrapper-template {
	background-color: color(white);
	border: 1px solid color(primary);
	border-radius: 7px;
	font-family: font(bold);
	font-size: size(medium);
	margin: 0 auto;
	max-width: 360px;
	padding: 16px 45px;

	@media (max-width: 500px) {
		border: none;
		border-radius: 0;
		border-top: 3px solid color(primary);
		max-width: 100%;
		padding: 16px 0px;
		width: 100%;
	}

	.answer {
		align-items: center;
		border-bottom: 1px solid color(gray);
		display: grid;
		grid-column-gap: 20px;
		grid-template-columns: 215px 22px;
		padding: 15px 5px 15px 0;

		@media (max-width: 500px) {
			grid-template-columns: 1fr 22px;
			padding: 15px 45px;
		}
	}

	.answer:last-child {
		border: none;
	}

	.answer-selected {
		color: color(success);
	}

	.answer-text {
		color: color(secondary) !important;
		font-family: font(regular);
	}

	.v-input--selection-controls {
		margin-top: 0;

		.v-input__control {
			width: 100%;

			.v-input__slot {
				margin-bottom: 0;
			}

			.accent--text {
				caret-color: color(success) !important;
				color: color(success) !important;
			}

			.v-messages {
				display: none;
			}
		}
	}
}

.input-text {
	.v-input__control {
		background: map-get($colors,white);
		border: 1px solid map-get($colors, gray);
		border-radius: 4px;
		height: 37px;

		.v-input__slot {
			box-shadow: none !important;
		}
	}
}

.type-select {
	.v-input__slot {
		border: 1px solid map-get($colors, gray);
		border-radius: 4px;
		box-shadow: none !important;
	}

	.v-input__append-inner {
		.v-input__icon {
			.theme--light.v-icon {
				color: map-get($colors, success) !important;
			}
		}
	}
}

.employee-table {
	.table-pagination {
		display: none !important; 
	}
}

.form-group__message {
	color: map-get($colors, gray-medium);
}

.open-modal {
	.label {
		color: map-get($colors, info);
	}
}

.new-diagnosis-input {
	background: map-get($colors, white);
	border-radius: 4px;
	border: 1px solid #e9e9e9;
	color: #545a54;
	display: block;
	margin-top: 4px;
	outline: none;
	padding: 4px 20px;
	width: 100%;
}

.select-core,
.input-core {
	.v-input__slot {
		border: 1px solid color(gray) !important;
		color: color(gray-medium) !important;
		min-height: 37px !important;
		padding: 0 18px !important;
	}

	&.v-text-field--outline > .v-input__control > .v-input__slot {
		background: color(white) !important;
		background-color: color(white) !important;
	}

	.v-select__selections {
		padding-top: 0px !important;
	}

	.v-label {
		top: 7px !important;
	}

	.v-input__append-inner {
		margin-top: 6px !important;
	}

	.v-icon {
		color: color(success) !important;
	}

	input {
		margin-top: 0px !important;
	}
}

.title-modal {
	border-bottom: 0.5px solid map-get($colors, placeholder);
	color: map-get($colors, primary);
	font-family: map-get($fonts, bold);
	font-size: 18px;
	padding-bottom: 10px;
}

.label-modal {
	color: map-get($colors, secondary);
	font-size: 11px;
}

.card-tool {
	.v-progress-circular__underlay {
		stroke: rgba(74, 144, 226, 0.25) !important;
	}
}

.center {
	text-align: center;
}

.v-btn--disabled {
	cursor: not-allowed;
}

.v-btn.v-btn--disabled {
	pointer-events: all !important;
}

.title-delete {
	color: map-get($colors, info);
	margin-bottom: 80px;
	text-align: center;
}

.v-card__title, .v-card__actions {
	justify-content: center;
}
	
.check-questions-list {
	input {
		height: 16px;
	}

	.v-label {
		color: color(secondary) !important;
		font-family: font(regular) !important;
		font-size: size(small) !important;
	}

	.v-icon {
		font-size: size(large);
		height: size(large);
	}

	.v-input--selection-controls__ripple {
		margin: 0px !important;
	}

	.v-input--selection-controls__input {
		height: 16px;
	}
}

input.app-input::-webkit-input-placeholder {
	color: color(border);
	font-family: font(medium);
	font-size: size(medium);
}

.product-rating {
	.v-icon {
		padding: 0.2rem !important;
	}
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

.payment-btn {

		button.app-button {
			min-width: 255px !important;

			@media (min-width: 764px) {
				min-width: 255px !important;
			}
	}
}

.slide-fade-enter-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
	opacity: 0;
  transform: translateX(10px);
}

.mobile-overlay {
	display: none;

	@media (max-width: 764px) {
		display: block;
	}
}

.component-filter {
	.swiper-slide {
		width: 360px !important;
	}

	.swiper-container {
		width: 95%;
	}
	.swiper-button-next {
		background-image: url('/static/img/icons/arrow-button-next-white.svg');
		position: absolute;
		right: 77px;

		@media (max-width: 650px) {
			right: 15px;
		}
	}

	.swiper-button-prev {
		background-image: url('/static/img/icons/arrow-button-prev-white.svg');
		left: 77px;
		position: absolute;
		
		@media (max-width: 650px) {
			left: 15px;
		}
	}
}
</style>
