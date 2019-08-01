<template>
	<div>
		<section class="nav">
			<left-component @click="goTo"/>
			<p class="order-head">
				<span class="order-state">solicitado</span> - <span>nro orden</span><span>147721</span>
			</p>
		</section>
		<section class="header">
			<div class="order-info">
				<div>
					<span class="label">Precio Total: </span><span class="order-info-data">PEN 320.10</span>
				</div>
				<div>
					<span class="label">Fecha de la Orden: </span><span class="order-info-data">19/05/2019</span>
				</div>
				<div>
					<span class="label">Estado: </span><span class="order-info-data">Pagado</span>
				</div>
			</div>
			<div class="order-payment">
				<div class="order-payment-wrapper">
					<div class="my-2">
						<span class="label">Direccion de envio: </span><span class="order-info-data">Calle independencia 120 - Piso 16 - Miraflores</span>
					</div>
					<app-button
						v-if="!flagAddVoucher"
						class="payment-btn"
						action="Añadir datos del deposito"
						:background="backgroundColor"
						:img="'/static/icons/hand.svg'"
						@click="addPaymentInfo"
					/>
				</div>
				<load-payment v-if="flagAddVoucher"/>
			</div>
		</section>
		<section class="table">
			<responsive-table
				align-left
				:columns="columns"
				:rows="rows"
				:pages="50"
			>
				<template slot-scope="{ row }">
					<td class="row-product">
						<div class="product-info-container">
							<img :src="row.product.img" alt="imagen del producto" class="product-img"/>
							<div class="text-xs-left">
								<h4 class="product-name">{{row.product.name}}</h4>
								<span class="product-description">{{row.product.description}}</span>
							</div>
						</div>
					</td>
					<td class="product-unit-price">{{row.unitPrice}}</td>
					<td class="product-quantity">{{row.quantity}}</td>
					<td class="product-sub">{{row.sub}}</td>
				</template>
			</responsive-table>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import appButton from '@/components/shared/buttons/app-button';
import leftComponent from '@/components/shared/icons/left-component';
import loadPayment from '@/components/profile/load-payment';
import responsiveTable from '@/components/shared/table/respondive-table';

function goTo() {
	this.$router.back();
}

function backgroundColor() {
	return `${process.env.COLOR_BASE}`;
}

function addPaymentInfo() {
	this.$store.commit('UPDATE_FLAG_ADD_COUCHER', true);
}

function data() {
	return {
		columns: [
			{ value: 'product', title: 'Producto', responsive: false },
			{ value: 'unitPrice', title: 'Precio Und', responsive: true },
			{ value: 'quantity', title: 'Cantidad', responsive: true },
			{ value: 'sub', title: 'Precio Subtotal', responsive: true },
		],
		rows: [
			{
				product: {
					img: '/static/img/resorte.jpg',
					description: 'Descripcion',
					name: 'nombre',
				},
				unitPrice: 320,
				quantity: 2,
				sub: 640,
			},
			{
				product: {
					img: '/static/img/resorte.jpg',
					description: 'Descripcion',
					name: 'nombre',
				},
				unitPrice: 320,
				quantity: 2,
				sub: 640,
			},
		],
	};
}

export default {
	name: 'user-order-details',
	components: {
		appButton,
		leftComponent,
		loadPayment,
		responsiveTable,
	},
	computed: {
		...mapGetters([
			'flagAddVoucher',
		]),
		backgroundColor,
	},
	data,
	methods: {
		addPaymentInfo,
		goTo,
	},
};
</script>
<style lang="scss" scoped>
	.product-info-container {
		align-items: center;
		display: grid;
		grid-column-gap: 20px;
		grid-template-columns: 50px 1fr;
	}

	.row-product {

		@media (max-width: 600px) {
			border: none;
		}
	}

	.product-img {
		height: 34px;
		object-fit: contain;
		width: 50px;
	}

	.table {
		margin: 0 50px;

		@media (max-width: 600px) {
			margin: 0 10px;
		}

		td {
			padding: 10px 30px;
		}
	}

	.product-name {
		font-family: font(bold);
		font-size: size(medium);
		grid-column: 1;
		grid-row: 1;

		@media (max-width: 600px) {
			font-size: size(small);
		}
	}

	.product-description,
	.product-img {

		@media (max-width: 600px) {
			display: none;
		}
	}

	.product-unit-price {
		grid-column: 1;
		grid-row: 2;

		@media (max-width: 600px) {
			background-color: color(background);
			font-size: size(small);
		}
	}

	.product-quantity {
		grid-column: 2;
		grid-row: 2;

		@media (max-width: 600px) {
			background-color: color(background);
			font-size: size(small);
		}
	}

	.product-sub {
		grid-column: 3;
		grid-row: 2;

		@media (max-width: 600px) {
			background-color: color(background);
			font-size: size(small);
		}
	}

	.header {
		margin: 0 30px 30px;

		@media (max-width: 600px) {
			margin: 0 0px 30px;
		}
	}

	.order-info {
		align-items: center;
		border-bottom: 1px solid color(border);
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 10px 40px 0;
		padding: 10px 0;
	}

	.order-payment {
		margin: 0 30px;
		padding: 10px 0;
	}

	.label {
		color: color(dark);
		font-family: font(bold);
		font-size: size(small);
	}

	.order-info-data {
		color: color(dark);
	}

	.nav {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: 15px 24px 10px;
	}

	.order-head {
		color: color(primary);
		font-family: font(demi);
		font-size: size(large);
		margin-bottom: 0;
		text-transform: uppercase;

		@media (max-width: 600px) {
			font-size: size(small);
		}
	}

	.order-state {
		font-family: font(bold);
	}

	.order-payment-wrapper {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}
</style>
