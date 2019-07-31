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
			image: '/static/img/mrc-logo.png',
			name: 'MRC',
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

.table-area {
	.column .sortable .active .asc .text-xs-left {
		display: none !important;
	}	
}

.open-modal {
	.v-btn__content {
		color: map-get($colors, white) !important;
		font-family: map-get($fonts, bold);
		font-size: 14px;
	}

	.v-dialog .v-dialog--active .v-dialog--persistent {
		bottom: 0 !important;
		position: absolute !important;
	}
}

.table-list {
	.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
		background-color: transparent;
	}

	.v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
		box-shadow: none;
	}
}

.employees {
	.v-btn__content {
		font-size: map-get($fonts, small);
	}

	.v-select.v-text-field--enclosed:not(.v-text-field--single-line) .v-select__selections {
		padding: 6px !important;
	}

	.v-input__slot {
		width: 206px !important;
	}

	.v-btn {
		height: 31px !important;
	}

	.v-btn:not(.v-btn--depressed):not(.v-btn--flat) {
		box-shadow: none !important;
	}

	.theme--light.v-label {
		color: map-get($colors, gray-medium) !important;
	}
	
	.v-btn__content {
		color: map-get($colors, secondary);
	}

	.theme--light.v-btn:not(.v-btn--icon):not(.v-btn--flat) {
		background-color: map-get($colors, border-gray);
		border: solid 1px map-get($colors, secondary);
		border-radius: 4px;
	}
}

.theme--light.v-text-field--box > .v-input__control > .v-input__slot {
	background-color: none !important;
}

html, body {
	color: color(black) !important;
	font-family: font(regular) !important;
	font-size: map-get($sizes, medium);
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

.application {
	font-family: map-get($fonts, regular) !important;
}

.content {
	background: color(white);
	padding: 133px 12px 0px !important;

	&--wrap {
		background-color: map-get($colors, white);
		padding: 0px 12px;
	}

	@media (min-width: 768px) {
		padding: 80px 0px 0px !important;
	}

	@media (min-width: 1264px) {
		padding: 80px 0px 0px 53px !important;
	}
}

.chk-all {
	&.v-input-group {
		.v-input-group__input {
			.icon {
				font-size: map-get($sizes, xlarge) !important;
				height: map-get($sizes, xlarge);
			}
		}
		.v-input-group__details {
			display: none;
		}
	}
}

.bars-align {
	max-width: 100%;

	.v-list__tile {
		border-bottom: 4px solid map-get($colors, success);
		height: 72px;
		justify-content: flex-end;
		padding: 14px 0 21px;

		&--avatar {
			height: auto !important;
		}
	}

	.v-btn {
		color: map-get($colors, success);
	}

	.logo-company {
		height: 72px;
		margin-bottom: 21px;
	}

	.wrapper-avatar {
		border-radius: 50%;
	}

	.icon-avatar {
		height: 72px;
		width: 72px;
	}

	.v-avatar {
		border: 5px solid map-get($colors, white);
		border-radius: 50%;
		height: 76px !important;
		width: 76px !important;
	}

	.avatar {
		&-image {
			justify-content: center;
			margin-bottom: 21px;
		}

		&-name {
			color: map-get($colors, white);
			font-size: 16px;
			font-family: map-get($fonts, bold);
			text-align: center;
		}

		&-position {
			color: map-get($colors, white);
			font-family: map-get($fonts, light);
			margin-bottom: 15px;
			text-align: center;
		}
	}
}


.v-snack {
	.v-btn {
		color: map-get($colors, white) !important;
	}
}

.pa-0 {
	main.content {
		padding: 0px !important;
	}
}

.progress-bar {
	left: 0px !important;
	margin: 0px !important;
	position: fixed !important;
	right: 0px !important;
	top: 120px !important;
	z-index: 3;

	@media (min-width: 768px) {
		top: 72px !important;
	}
}

.sidebar-bg {
	&.v-list {
		.v-list__group {
			&__header {
				&__prepend-icon,
				&__append-icon {
					display: none;
				}

				&:hover {
					background: map-get($colors, black-bold);
				}

				.v-list__tile {
					font-family: map-get($fonts, open-semibold);
					font-size: map-get($sizes, xlarge);
					padding: 0 16px 0 26px;

					&:hover,
					&--active {
						background: transparent;

						.item-action-sidebar {
							.v-tooltip {
								img {
									filter: none;
								}
							}
						}
					}
				}

				.item-select {
					background: map-get($colors, success);
					border-radius: 0 41px 41px 0;
					height: 100%;
					left: 0;
					margin-right: 20px;
					opacity: 0;
					position: absolute;
					width: 6px;
				}

				&--active {
					background: map-get($colors, black-bold);

					.v-list__tile {
						opacity: 1;
					}

					.item-select {
						opacity: 1;
					}

					.item-action-sidebar {
						.v-tooltip {
							img {
								filter: none;
							}
						}
					}
				}				
			}

			&__items {
				font-family: map-get($fonts, bold);

				&.padding-items {
					padding-bottom: 12px;
				}

				.v-list__tile {
					font-size: map-get($sizes, small);
					height: 48px;
					padding-left: 50px;

					&:hover {
						background: transparent;

						.item-action-sidebar {
							.v-tooltip {
								img {
									filter: none;
								}
							}
						}
					}

					&__action {
						color: map-get($colors, white);
						justify-content: flex-start;
						margin-right: 18px;
						min-width: 26px;

						.v-icon {
							color: inherit !important;
							font-size: 6px;
						}
					}

					&__content {
						color: map-get($colors, white);
					}
				}

				.item-sidebar-active {
					.v-tooltip {
						img {
							filter: none;
						}
					}
				}
			}

			&:before,
			&:after {
				background: rgba(0, 0, 0, 0.12);
			}

		}
		&__tile {
			height: auto;
		}
	}
}

.char-value-select {
	&.input-group {
		.input-group__input {
			.icon {
				font-size: map-get($sizes, xlarge) !important;
				height: map-get($sizes, xlarge);
			}
		}

		label {
			color: map-get($colors, black) !important;
			font-size: map-get($sizes, small);
		}
	}
}

.sidebar-border {
	background-color: map-get($colors, secondary) !important;

	.v-toolbar__content {
		background: map-get($colors, secondary);
		height: auto !important;
		padding: 0px;

		.v-list {
			margin: 0px;
			max-width: 100%;
			padding: 0px;
		}
	}

	.v-list__tile {
		justify-content: center;
	}

	.v-list__group__header {
		.v-list__tile {
			&__action {
				min-width: auto;
				justify-content: flex-start;
			}
		}
	}

	&.v-navigation-drawer--mini-variant {
		.v-list__tile {
			padding: 12px !important;

			&__action {
				justify-content: center !important;
				min-width: 100%;
			}
		}

		.v-list__group__header {
			.v-list__tile {
				padding: 0px !important;

				&__action {
					min-width: 100%;
					justify-content: center;

					.v-icon {
						color: inherit !important;
					}
				}

				&__content {
					display: none;
				}
			}
		}
	}

	&:before {
		border-bottom: 6px solid transparent;
		border-right: 10px solid white;
		border-top: 6px solid transparent;
		content: '';
		position: absolute;
		right: 0px;
		top: 29.5px;
		z-index: 1;
	}
}

.v-navigation-drawer {
	&--mini-variant {
		width: 70px !important;

		.bars-align {
			.icon-avatar {
				height: 100%;
				width: 100%;
			}

			.v-avatar {
				border-width: 2px;
				height: 41px !important;
				width: 41px !important;
			}
		}

		.logo-open {
			display: none;
		}

		.v-list__tile__content {
			display: none !important;
		}

		.v-list__tile .v-list__tile__action {
			margin-right: 0px !important;
		}
	}

	&--open {
		.logo-close {
			display: none;
		}
	}
}

.v-navigation-drawer--open.v-navigation-drawer--mini-variant {
	.logo-close {
		display: block !important;
	}
}

.v-toolbar__content {
	.v-list {
		&:first-child {
			margin-left: 0px !important;
		}
	}
}

.columns-menu {
	&.v-menu__content {
		background-color: white;
		border-radius: 4px;
		box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.4);
		max-width: 154px;
		padding-left: 5px;
		padding-right: 5px;

		.v-input {
			label {
				font-family: map-get($fonts, opens-semibold);
				font-size: map-get($sizes, small);
			}

			&__input {
				min-height: 20px;
			}

			.v-icon {
				font-size: map-get($sizes, medium);
				height: 5px !important;
			}

			&--selection-controls {
				margin-top: 0px;
			}

			&--selection-controls__input {
				height: 14px;
				width: 14px;
			}

			&--selection-controls__ripple {
				height: 10px;
				transform: translate(7px, 12px);
				width: 10px;
			}
		}
	}
}

.filter-select {
	&.v-input {
		background: white;
		border-radius: 2px;
		box-shadow: 0px 1px 1px 0px rgba(0, 0, 0, 0.2);
		height: 33px;
		padding: 0px;

		&.shadow-inset {
			border-radius: 3px;
			box-shadow: inset 0px 0px 1px 1px rgba(0, 0, 0, 0.2);
			height: 30px;

			&-chip {
				border-radius: 5px;
				box-shadow: inset 0px 0px 1px 0px rgba(0, 0, 0, 0.5);
				height: 30px;
				left: 16px;
				max-width: 160px;
				position: absolute;
				top: 1.5px;

				input {
					color: map-get($colors, subheaderText);
					font-family: map-get($fonts, open-semibold);
					font-size: map-get($sizes, medium);
					padding: 0 19px;
					text-align: right;
				}

				label {
					color: map-get($colors, subheaderText);
					font-family: map-get($fonts, open-semibold);
					font-size: map-get($sizes, medium);
					height: 30px;
					left: auto;
					line-height: 30px;
					text-align: right;
					right: 19px;
				}
			}

			&-table {
				border-radius: 3px;
				box-shadow: none;
				display: inline-flex;
				height: 22px;
				max-width: 72px;

				.v-input-group__input {
					min-height: 22px;
				}

				input {
					border: 1px solid map-get($colors, gray);
					border-radius: 4px;
					color: map-get($colors, paginationText);
					font-size: map-get($sizes, medium);
					height: 37px;
					padding: 0 5px;
					text-align: right;
				}

				label {
					color: map-get($colors, subheaderText);
					font-size: map-get($sizes, medium);
					height: 22px;
					left: auto;
					line-height: 22px;
					text-align: right;
					right: 5px;
				}
			}

			.v-input-group__selections {
				border-width: 1px;
				height: 24px;

				&__comma {
					color: map-get($colors, paginationText) !important;
				}
			}

			.v-input-group__append-icon {
				width: 26px;
			}

			input {
				color: map-get($colors, paginationText) !important;
				font-family: map-get($fonts, open-semibold);
				font-size: map-get($sizes, medium);
				height: 30px;
				padding-left: 14px;

				&[readonly] {
					color: map-get($colors, subheaderText) !important;
				}
			}

			label {
				color: map-get($colors, paginationText) !important;
				height: 30px;
				line-height: 30px;
			}

			&-calendar {
				.v-icon {
					background: map-get($colors, orange-btn);
					border-bottom-right-radius: 2px;
					border-top-right-radius: 2px;
					color: white !important;
					font-size: 24px;
					height: 30px;
					line-height: 32px;
					padding-left: 3px;
					width: 30px;
				}

				&.shadow-inset-calendar-start {
					.icon {
						background: map-get($colors, success);
					}
				}

				&.shadow-inset-calendar-start,
				&.shadow-inset-calendar-end {
					.icon {
						height: 28px;
						line-height: 30px;
					}
				}

				&.shadow-inset-calendar-requirement {
					.icon {
						background: white;
						border: 1px solid map-get($colors, blue-purchase);
						color: map-get($colors, blue-purchase) !important;
						height: 28px;
						line-height: 30px;
					}
				}
			}

			&.input-address {
				.input-group__input {
					padding-right: 7px;
				}

				.input-group__append-icon {
					background-color: map-get($colors, orange-btn);
					border-radius: 4px;
					box-shadow: 0px 2px 3px 0px rgba(0, 0, 0, 0.3);
					color: white !important;
					font-size: 16px;
					height: 20px;
					padding-top: 2px;
					text-align: center;
					width: 20px;
				}
			}

			&.input-time-picker {
				.input-group--text-field__suffix {
					color: map-get($colors, paginationText) !important;
					font-family: map-get($fonts, open-semibold);
					font-size: map-get($sizes, medium);
					height: 28px;
					margin: 0px;
					padding-right: 20px;
				}
			}

			&.textarea-content {
				border: none !important;
				min-height: 85px;

				label {
					top: 5px;
				}

				.input-group__input {
					border: none !important;
				}

				textarea {
					padding-left: 16px;
					padding-top: 7px;
				}
			}
		}

		&--autocomplete {
			input {
				color: map-get($colors, subheaderText);
				font-size: 13px;
				padding-left: 14px;
			}
		}

		&--text-field {
			label {
				color: map-get($colors, subheaderText) !important;
				font-family: map-get($fonts, open-light);
				font-size: 13px;
				height: 33px;
				left: 13px;
				line-height: 33px;
				top: 0px;
			}
		}

		&--select {
			.input-group__selections {
				border-right: 2px solid map-get($colors, grey-border);
				height: 27px;
				margin-top: 3px;

				&__comma {
					color: map-get($colors, subheaderText) !important;
					font-family: map-get($fonts, open-light);
					font-size: 13px;
					padding-left: 13px;
				}
			}
		}

		.input-group__append-icon {
			color: map-get($colors, subheaderText) !important;
			font-size: 28px;
			padding: 0px;
			width: 25px;
		}

		.input-group__details {
			display: none;
		}
	}

	&.input-group.input-group--multiple {
		height: auto;

		.input-group__selections {
			height: auto;
			margin: 0px;
			padding-left: 10px;
		}
	}

	&-content {
		.list {
			&__tile {
				color: map-get($colors, subheaderText);
				font-family: map-get($fonts, open-light);
				font-size: 13px;
				height: 33px;
			}
		}
	}
}

.show-error {
	.input-group__details {
		font-size: map-get($sizes, small10);
		display: block !important;
		padding-top: 0;
	}
	.input-group__details:before {
		height: 0px;
	}
}

.table-style {
	.table__overflow {
		.table {
			thead tr {
				background-color: map-get($colors, primary);
				height: 30px;
				th {
					color: white !important;
				}
			}
			tbody tr:nth-child(even) {
				background-color: map-get($colors, background-sidebar);
			}
		}
	}
}

.general-filter-button {
	.btn__content {
		justify-content: space-between;
		padding: 0px 8px 0px 13px;
	}
}

.header-page-download-document {
	.btn__content {
		padding: 0px;
	}
}

.modal-filter-footer {
	background-color: white;
	bottom: 0%;
	left: 0px;
	position: fixed;
	right: 0px;
	width: 100%;
	z-index: 2;
}

.filter-by-row {
	.input-group {
		padding-left: 18px;

		label {
			color: map-get($colors, subheaderText) !important;
			font-family: map-get($fonts, open-semibold);
			font-size: 13px;
			margin-left: 18px;
		}

		&__input {
			.icon {
				font-size: map-get($sizes, medium);
				height: 12px !important;
			}
		}
	}
}

.chip-exchange {
	.chip__content {
		height: 20px;
		letter-spacing: normal;
		line-height: 1;
		padding: 0px 10px;
		white-space: normal;
	}
}

.radio-group.sale-radio {
	.input-group {
		&__input {
			min-height: 19px;

			label {
				color: map-get($colors, subheaderText);
				font-size: map-get($sizes, medium);
				height: 19px;
				left: 16px;
				line-height: 19px;
			}

			.icon {
				font-size: map-get($sizes, small);
				height: 13px !important;
			}
		}

		&__details {
			display: none;
		}
	}

	&.radio-expansion-panel {
		&.input-group {
			padding: 5px 0px;
		}

		.input-group {
			&__input {
				display: flex;
				flex: 1 1 auto;
				flex-direction: row;
				flex-wrap: wrap;
				min-height: 19px;
				min-width: 0;

				label {
					color: map-get($colors, paginationText);
					font-size: 13px;
					height: 19px;
					left: 20px;
					line-height: 21px;
					text-transform: capitalize;
				}

				.icon {
					font-size: 16px;
					height: 16px !important;
				}
			}

			&__details {
				display: none;
			}
		}
	}

	.sale-radio-ticket {
		padding-left: 0px;
		padding-right: 44px;

		label {
			width: auto;
		}
	}

	.sale-radio-note {
		padding-left: 0px;
		padding-right: 16px;

		@media (min-width: 768px) {
			padding-right: 75px;
		}

		label {
			left: 16px;
		}
	}

	.sale-radio-bill {
		padding-right: 28px;
	}
}

.align-col-responsive {
	margin-bottom: 5px;
	text-align: left;

	@media (min-width: 768px) {
		margin-bottom: 0px;
		text-align: center;
	}
}

.pd-col-responsive {
	padding-left: 20px;

	@media (min-width: 768px) {
		padding-left: 0px;
	}
}

.btn-action-requeriment {
	border-radius: 5px !important;
	box-shadow: none !important;
	color: white !important;
	height: 30px !important;
	margin: 0px;
	text-transform: none !important;

	.btn__content {
		font-family: map-get($fonts, open-semibold);
		font-size: map-get($sizes, small10);

		img {
			height: 20px;
			margin-left: 10px;
		}
	}
}

.btn-action-save {
	border: 1px solid map-get($colors, primary) !important;
	border-radius: 5px !important;
	box-shadow: none !important;
	color: map-get($colors, primary) !important;
	height: 30px !important;
	margin: 0px;
	text-transform: none !important;

	.btn__content {
		font-family: map-get($fonts, open-semibold);
		font-size: map-get($sizes, small10);

		img {
			height: 20px;
			margin-left: 10px;
		}
	}
}

.btn-action {
	border-radius: 18.5px !important;
	box-shadow: none !important;
	color: map-get($colors, white) !important;
	height: 37px !important;
	margin: 0px;
	text-transform: none !important;
	width: 123px !important;

	.v-btn__content {
		color: map-get($colors, white) !important;
		font-family: map-get($fonts, open-semibold);
		font-size: map-get($sizes, small10);
		padding: 0px;

		img {
			height: 20px;
			margin-left: 10px;
		}
	}

	&.text-large {
		.btn__content {
			font-family: map-get($fonts, open-bold);
			font-size: map-get($sizes, small);
		}
	}
}

.change-document-btn {
	.btn__content {
		padding: 0px;
	}
}

.overflow-auto {
	margin-top: 13px;
	overflow: auto;
	padding-bottom: 134px;
}

.options-menu {
	.btn__content {
		padding: 0px 2px;
	}

	button:hover {
		&:before {
			background-color: transparent !important;
		}
	}

	&-content {
		.list {
			border-radius: 4px;
			box-shadow: 0px 1px 2px 0px rgba(0, 0, 0, 0.25);
			display: flex;
			padding: 0px;

			&__tile {
				height: 32px;
				padding: 0 8px;
			}
		}
	}
}

.progress-companies {
	.progress-linear__background {
		background-color: transparent !important;
	}
}

.notification {
	&-btn {
		.btn__content {
			padding: 0px;
		}
	}

	&-card {
		.btn__content {
			max-width: 100%;
			padding: 0px 0px 0px 17%;
			white-space: normal;
		}
	}
}

.theme--light {
	color: rgba(84, 90, 84, 0.26) !important;
	font-size: map-get($sizes, medium);

	.table-icon {
		.btn__content {
			padding: 0px;
		}

		&.btn--disabled {
			&:not(.btn--icon):not(.btn--flat) {
				background-color: transparent !important;
				opacity: 0.6;
			}
		}
	}
}

.filter-toggle {
	.btn {
		background-color: transparent !important;

		.btn__content {
			height: 28px;

			&:before {
				background-color: transparent !important;
			}
		}

		&.btn--disabled {
			&:not(.btn--icon):not(.btn--flat) {
				background-color: transparent !important;
			}

			.btn__content {
				&:before {
					background-color: transparent !important;
				}
			}
		}
	}
}

.dialog.dialog-cancel {
	border-radius: 10px;
	height: 237px;

	.card {
		height: 237px !important;
		padding: 32px 65px 22px;

		&__title {
			color: map-get($colors, paginationText);
			font-family: map-get($fonts, open-semibold);
			font-size: map-get($sizes, small);
		}
	}
}

.textarea-content {
	.input-group__input {
		border: 1px solid map-get($colors, grey-border) !important;
		border-radius: 0px !important;
		margin-bottom: 15px;
		max-height: 110px;
		padding: 0px !important;

		textarea {
			border-radius: 0px;
			color: map-get($colors, paginationText);
			font-family: map-get($fonts, open-regular);
			font-size: map-get($sizes, small);
			padding-left: 10px;
			padding-top: 10px !important;
		}
	}
}

button {
	min-width: 5px;
	outline: none;

	.table-icon {
		outline: none;
	}
}

.input-group--hide-details {
	.input-group__details {
		display: none;
	}
}

#calendar {
	padding: 0px 15px 15px;

	.fc {
		&-toolbar {
			&.fc-header-toolbar {
				margin-bottom: 0px;
			}
		}

		&-button {
			background-color: map-get($colors, background-sidebar);
			background-image: none;
			border: 1px solid map-get($colors, subheaderText);
			box-shadow: none;
			color: map-get($colors, subheaderText);
			font-family: map-get($fonts, open-regular);
			font-size: map-get($sizes, medium);
			height: 25px;
			line-height: map-get($sizes, medium);
			outline: none;
			text-shadow: none;

			&:first-child {
				border-bottom-left-radius: 5px;
				border-top-left-radius: 5px;
			}

			&:last-child {
				border-bottom-right-radius: 5px;
				border-top-right-radius: 5px;
			}
		}

		&-center {
			h2 {
				color: map-get($colors, subheaderText);
				font-family: map-get($fonts, regular);
				font-size: map-get($sizes, medium18);
			}
		}
	}
}

.title-form {
	color: map-get($colors, paginationText);
	font-family: map-get($fonts, open-semibold);
	font-size: 13px;
}

.hr-info {
	background-color: map-get($colors, blue-grey) !important;
}

.form-group__message {
	color: map-get($colors, orange-btn);
	font-family: map-get($fonts, open-semibold);
	font-size: 11px;
}

.pl-add-container {
	@include flex-center;
	background-color: map-get($colors, primary);
	border-radius: 5px;
	display: inline-flex;
	height: 20px;
	margin-right: 6px;
	width: 20px;
}

.btn-list {
	border-radius: 5px !important;
	box-shadow: none !important;
	height: 20px !important;
	min-width: 20px !important;

	&-add {
		border: 1px solid map-get($colors, primary);
		color: map-get($colors, primary) !important;
	}

	&-remove {
		border: 1px solid map-get($colors, orange-btn);
		color: map-get($colors, orange-btn) !important;
	}

	.btn__content {
		height: 18px;
		padding: 0px;
	}

	.icon {
		font-size: 20px;
	}
}

.custom-loader {
	animation: loader 1s infinite;
	display: flex;
}

.tabs__container--overflow .tabs__div.customer-tabs {
	flex: 0 1 auto;
}

@-moz-keyframes loader {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}

@-webkit-keyframes loader {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}

@-o-keyframes loader {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}

@keyframes loader {
	from {
		transform: rotate(0);
	}
	to {
		transform: rotate(360deg);
	}
}

.size {
	cursor: pointer;
	height: 30px;
	width: 30px;
}

.fast-register-footer {
	background-color: white;
	bottom: 0%;
	position: fixed;
	width: 100%;
}

.expansion-panel-component {
	.expansion-panel {
		&__header {
			background-color: map-get($map: $colors, $key: expansion-panel-header);
			color: white;
			font-family: map-get($map: $fonts, $key: open-semibold);
			font-size: 13px;
			height: 30px;
			line-height: 1.2;
			padding: 0px 0px 0px 34px;
			text-transform: capitalize;
		}

		&__container .header__icon {
			border-left: 1px solid white;
			height: 30px;
		}

		&__container .header__icon .icon {
			color: white !important;
			font-size: 44px;
			height: 30px;
			line-height: 0.7;
		}
	}
}

.row-background-grey {
	background-color: map-get($map: $colors, $key: background-table);
}

.feature-footer {
	background-color: white;
	bottom: 0;
	position: absolute;
	width: 100%;
}

.input-group--error {
	border: 1px solid !important;
	box-shadow: none !important;
}

.login-input {
	color: map-get($colors, text) !important;

	.v-input__control .v-input__slot {
		min-height: auto !important;

		.v-input__prepend-inner {
			margin-top: 12px !important;

			.v-icon {
				color: map-get($colors, grey-icon) !important;
			}
		}

		.v-text-field__slot	{
			input {
				color: map-get($colors, secondary) !important;
				font-size: 14px !important;
				margin-top: 0px !important;
				max-height: 100% !important;
			}

			label {
				color: map-get($colors, text) !important;
				top: 15px !important;

				&.v-label--active {
					transform: translateY(-13px) scale(.75);
				}
			}
		}
	}
}

.confirmation-dialog {
	border-radius: 8px;
}

.cyan--text {
	color: #00add4 !important;
}

.switch-period {
	.v-input--selection-controls__input {
		margin-right: 0px !important;
	}
}

.v-text-field.v-text-field--solo .v-input__control {
	min-height: auto !important;
}

.btn-auto {
	min-width: auto !important;
	
	&.btn-action {
		height: auto !important;
		width: auto !important;
	}
}

.check-table {
	.v-input--selection-controls__input {
		margin-right: 0px !important;
	}
}

.switch-rule {
	color: map-get($colors, error) !important;

	.v-input--switch__track:not(.success--text) {
		color: map-get($colors, error) !important;
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
	color: color(dark);
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
</style>
