<template>
	<div class="page-components">
		<div class="title">Componentes</div>
		<v-layout wrap mb-5>
			<v-flex xs12>
				Inputs
			</v-flex>
			<v-flex xs12>
				<app-input
					border-color="#f5f3f3"
					placeholder="E-mail"
				></app-input>
			</v-flex>
		</v-layout>
		<v-layout wrap mb-5>
			<v-flex xs12>
				Botones
			</v-flex>
			<v-flex xs12>
				<app-button
					action="Iniciar Sesión"
					background="red"
					img="http://www.sclance.com/pngs/facebook-logo-white-png/facebook_logo_white_png_466292.png"
					img-border-color="#324988"
					img-height="25"
				></app-button>
			</v-flex>
		</v-layout>
		<v-layout wrap mb-5>
			<v-flex xs12>
				Boton categoría
			</v-flex>
			<v-flex xs12>
				<call-menu text="Categorías"/>
			</v-flex>
		</v-layout>
		<v-layout>
			<v-flex>
				Tarjetas de producto
			</v-flex>
			<section class="product-section">
				<product-card class="product-card"/>		
				<product-card class="product-card"/>		
				<product-card class="product-card"/>		
				<product-card class="product-card"/>		
				<product-card class="product-card"/>		
			</section>
		</v-layout>
		<v-layout wrap mb-5>
			<v-flex xs12>
				Botones Header
			</v-flex>
			<v-flex xs12>
				<button-image 
					:data="imagesButton[0]"
					/>
				<button-image
				:data="imagesButton[1]"
				:number="1"
				if-number/>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	const appButton = () => import('@/components/shared/buttons/app-button');
	const appInput = () => import('@/components/shared/inputs/app-input');
	const callMenu = () => import('@/components/header/call-menu');
	const productCard = () => import('@/components/products/product-card');
	const buttonImage = () => import('@/components/shared/buttons/app-button-image');

	function data() {
		return {
			imagesButton: [
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
		};
	}
	export default {
		name: 'components',
		data,
		components: {
			appButton,
			appInput,
			callMenu,
			productCard,
			buttonImage,
		},
	};
</script>

<style lang="scss" scoped>
	.page-components {
		background-color: color(background);
		color: color(black);
		height: 100vh;
		padding: 45px;
	}

	.title {
		margin-bottom: 20px;
	}
	
	.product-section {
		align-items: center;
		display: grid;
		flex-wrap: wrap;
		grid-template-columns: repeat(auto-fit, minmax(214px, 1fr));
		margin: auto;
		max-width: 1070px;
	}
</style>