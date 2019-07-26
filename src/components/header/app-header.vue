<template>
  <header class="app-header">
		<div class="app-wrapper">
			<div class="flex container-call-menu">
				<call-menu text="Categorías"/>
			</div>
			<div class="flex container-header-logo">
				<h1 class="app-header-logo">
					<router-link to="/" class="link-logo" :style="`height: ${logo.height}px`">
						<img
							:src="logo.image"
							:alt="logo.name"
							:height="logo.height"
						/>
					</router-link>
				</h1>
				<div class="container-search">
					<app-search image="/static/img/search.svg"/>
					<button-image :data="close" class="icon-close"/>
				</div>
			</div>
			<div class="flex container-button-image">
				<button-image :data="search" class="icon-mobile"/>
				<button-image :data="imagesButton[0]" class="icon-desktop"/>
				<button-image :data="imagesButton[1]" class="icon-medium icon-desktop"/>
				<button-image
					:data="imagesButton[2]"
					:number="1"
					if-number
				/>
			</div>
		</div>
	</header>
</template>
<script>
const callMenu = () => import('@/components/header/call-menu');
const appSearch = () => import('@/components/shared/inputs/app-input-search');
const buttonImage = () => import('@/components/shared/buttons/app-button-image');

function data() {
	return {
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
	};
}
export default {
	name: 'app-header',
	components: {
		callMenu,
		appSearch,
		buttonImage,
	},
	data,
	props: {
		logo: {
			type: Object,
			default: () => {},
		},
	},
};
</script>
<style lang="scss" scoped>
	.app-header {
		background: color(white);
		padding: 25px 6%;
		position: relative;
	}

	.app-wrapper {
		align-items: center;
		display: flex;
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

		@media (max-width: 764px) {
			border-right: none;
			flex: 1 1 20%;
		}
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
		}
	}

	.link-logo {
		display: block;
	}

	.app-header-logo {
		margin: 0 40px 0 22px;
	}

	.icon-medium {
		margin: 0 25px;
	}

	.container-search {
		width: 100%;
	}

	.icon-close {
		display: none;

		@media (max-width: 764px) {
			display: block;
		}
	}

	.container-search {
		@media (max-width: 764px) {
			position: absolute;
			left: 100%;
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
</style>


