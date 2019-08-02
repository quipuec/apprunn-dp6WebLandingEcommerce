<template>
  	<header class="app-header">
		<div class="app-wrapper">
			<div class="flex container-call-menu">
				<call-menu :color="baseColor" text="Categorías" @change-menu="changeMenu" :menu="menu" />
			</div>
			<div class="flex container-header-logo">
				<h1 class="app-header-logo">
					<router-link to="/" class="link-logo" :style="`height: ${logo.height}px`">
						<img
							:src="logo.image"
							:alt="logo.name"
							:height="logo.height"
							class="logo-image"
						/>
					</router-link>
				</h1>
				<div 
					class="container-search flex"
					:class="isSearchMobile ? 'open' : null">
					<app-search 
						image="/static/img/search.svg"
						color="#4a4a4a"/>
					<button-image 
						:data="close" 
						class="icon-close"
						@click-image="toogleSearch"/>
				</div>
			</div>
			<div 
				class="flex container-button-image"
				:class="{'opacity' : isSearchMobile}">
				<button-image 
					:data="search" 
					class="icon-mobile"
					@click-image="toogleSearch"/>
				<button-image :data="imagesButton[0]" class="icon-desktop" @click-image="openModalLogin"/>
				<button-image :data="imagesButton[1]" class="icon-medium icon-desktop"/>
				<button-image
					:data="imagesButton[2]"
					:number="1"
					if-number
				/>
			</div>
		</div>
		<modal-login 
			class="app-modal-login"
			v-show="modalLogin"/>
	</header>
</template>
<script>
const callMenu = () => import('@/components/header/call-menu');
const appSearch = () => import('@/components/shared/inputs/app-input-search');
const buttonImage = () => import('@/components/shared/buttons/app-button-image');
const modalLogin = () => import('@/components/header/modal-login');

function toogleSearch() {
	this.isSearchMobile = !this.isSearchMobile;
}

function changeMenu() {
	this.$emit('change-menu');
}

function openModalLogin() {
	this.modalLogin = !this.modalLogin;
}

function data() {
	return {
		baseColor: process.env.COLOR_BASE,
		imagesButton: [
			{
				image: '/static/img/user.svg',
				name: 'Usuario',
				height: 20,
			},
			{
				image: '/static/img/heart.svg',
				name: 'Mis órdenes',
				height: 20,
			},
			{
				image: '/static/img/car.svg',
				name: 'Carrito de compras',
				height: 20,
			},
		],
		close: {
			image: '/static/img/close.svg',
			name: 'Cerrar',
			height: 13,
		},
		search: {
			image: '/static/img/search.svg',
			name: 'Buscar',
			height: 20,
		},
		isSearchMobile: false,
		modalLogin: false,
	};
}
export default {
	name: 'app-header',
	components: {
		callMenu,
		appSearch,
		buttonImage,
		modalLogin,
	},
	data,
	methods: {
		toogleSearch,
		changeMenu,
		openModalLogin,
	},
	props: {
		logo: {
			type: Object,
			default: () => {},
		},
		menu: {
			type: Boolean,
			default: false,
		},
	},
};
</script>
<style lang="scss" scoped>
	.app-header {
		background: color(white);
		display: flex;
		height: 76px;
		padding: 0px 6%;
		position: relative;
		overflow: hidden;

		@media (min-width: 768px) {
			height: 99px;
			overflow: inherit;
			padding: 0px 6%;
		}
	}

	.app-wrapper {
		align-items: center;
		display: flex;
		position: relative;
		width: 100%;
	}

	.flex {
		display: flex;
	}

	.container-call-menu {
		align-items: center;
		border-right: 1px solid color(border);
		flex: 1 1 10%;
		justify-content: center;

		
	}

	.container-header-logo {
		align-items: center;
		flex: 1 1 70%;

		@media (max-width: 764px) {
			flex: 1 1 60%;
			justify-content: center;
		}
	}

	.container-button-image {
		flex: 1 1 20%;
		justify-content: flex-end;

		@media (max-width: 764px) {
			justify-content: space-between;

			&.opacity {
				opacity: 0;
			}
		}
	}

	.link-logo {
		display: block;

		@media (max-width: 768px) {
			height: 20px !important;
			line-height: 0.5 !important;
		}
	}

	.app-header-logo {
		margin: 0 40px 0 22px;
	}

	.icon-medium {
		margin: 0 25px;
	}

	.container-search {
		align-items: center;
		background: color(white);
		transition: .3s ease-in-out;
		width: 100%;
		z-index: 1;

		@media (max-width: 764px) {
			left: 107%;
			position: absolute;

			&.open {
				left: 0;
			}
		}
	}

	.icon-close {
		display: none;

		@media (max-width: 764px) {
			display: block;
			margin-left: 11px;
		}
	}

	.icon-mobile {
		display: none;

		@media (max-width: 764px) {
			display: block;
		}
	}

	.icon-desktop {
		display: block;

		@media (max-width: 764px) {
			display: none;
		}
	}

	.logo-image {
		@media (max-width: 768px) {
			height: 20px;
		}
	}

	.app-modal-login {
		position: absolute;
		right: calc(6% + 85px);
		top: 70px;
		z-index: 6;

		@media (max-width: 764px) {
			display: none !important;
		}
	}
</style>


