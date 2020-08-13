<template>
	<div>
		<section class="summary-header-container">
			<div class="summary-header">
				<div>
					<h2 class="title">{{addressPickUp}}</h2>
					<p class="data" :style="`color:${globalColors.title}`">
						<span>{{responsible.fullname}},</span>
						<span>{{countryLabels.dni}}: {{responsible.dni}},</span>
						<span>Teléfono: {{responsible.phone}}.</span>
					</p>
					<p class="address">Dirección: {{address}}</p>
				</div>
				<div>
					<h2 class="title">Solicitud de Factura</h2>
					<p class="billing-data" :style="`color:${globalColors.title}`">
						<span>RUC: {{billing.ruc}},</span>
						<span>Razón social: {{billing.rzSocial}},</span>
						<span>Domicilio fiscal: {{billing.address}}.</span>
					</p>
				</div>
			</div>
		</section>
		<section class="summary-content-container">
			<h2 class="title" :style="`color:${globalColors.primary}`">Resumen de compra</h2>
			<div class="summary-content">
				<div class="products-in-order">
					<productInSummary
						class="products"
						v-for="(product, productIndex) in order.details"
						:key="productIndex"
						:product="product"
					/>
				</div>
				<div></div>
			</div>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import deliveryWays from '@/shared/enums/waysDeliveries';
import productInSummary from '@/components/products/product-in-summary';

const { store, house } = deliveryWays;

function addressPickUp() {
	const shop = 'Recojo en tienda';
	const delivery = 'Envío a domicilio';
	return this.isHome ? delivery : shop;
}

function isHome() {
	return this.flagPickUp === house.value;
}

function isStore() {
	return this.flagPickUp === store.value;
}

function address() {
	const { addressLine1, parish, city, province } = this.addressObject;
	return `${addressLine1} - ${parish.name} - ${city.name}, ${province.name}.`;
}

function billing() {
	return this.order.dataBill;
}

export default {
	name: 'page-new-summary-order',
	components: {
		productInSummary,
	},
	computed: {
		...mapGetters({
			addressObject: 'getDeliveryAddress',
			flagPickUp: 'getFlagPickUp',
			order: 'getOrderInfo',
			responsible: 'getResponsible',
		}),
		address,
		addressPickUp,
		billing,
		isHome,
		isStore,
	},
};
</script>
<style lang="scss" scoped>
.summary-header-container {
	border-bottom: 1px solid color(border);
	margin-bottom: 3rem;
	padding: 1.5rem 3rem;

	.summary-header {
		display: grid;
		grid-gap: 4rem;
		grid-template-columns: 1fr;
		font-family: font(regular);
		font-size: size(medium);
		margin: 0 auto;
		max-width: 900px;
		
		@media (min-width: 600px) {
			grid-template-columns: 1fr 1fr;
		}
	
		.title {
			font-family: font(bold) !important;
			font-size: size(medium) !important;
			margin-bottom: 0.5rem;
		}
		.data {
			display: grid;
			grid-auto-flow: row;
			margin-bottom: 0;
	
			@media (min-width: 900px) {
				grid-auto-flow: column;
			}
		}
		.billing-data {
			display: grid;
			grid-auto-flow: row;
			margin-bottom: 0;
		}
	}
}

.summary-content-container {
	padding: 0 2.5rem;

	.title {
		background-color: color(background);
		font-family: font(bold) !important;
		margin-bottom: 2.5rem;
		padding: 1rem;
		text-align: center;
	}

	.summary-content {
		border-radius: 8px;
		// box-shadow: 0 2px 9px 0 rgba(0, 0, 0, 0.19);
		display: grid;
		margin: 0 auto;
		margin-bottom: 3rem;
		max-width: 1024px;

		@media (min-width: 768px) {
			grid-template-columns: 1fr 1fr;
		}
	
		.products-in-order {
			
			@media (min-width: 768px) {
				border-right: 2px solid color(border);
			}
			.products {
				margin-bottom: 3.5rem;
			}
		}
	
	}
}

</style>