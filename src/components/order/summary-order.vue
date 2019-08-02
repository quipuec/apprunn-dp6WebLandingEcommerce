<template>
	<div>
		<app-button v-if="!getOrderId" action='Hacer pedido' @click='makeOrder'/>
		<app-button v-else action='Pagar' @click="goTo('buy-payment')"/>
	</div>
</template>
<script>
import appButton from '@/components/shared/buttons/app-button';
import { mapGetters } from 'vuex';

function makeOrder() {
	const body = this.buildBody();
	this.$store.dispatch('CREATE_ORDER', { context: this, body });
}

function buildBody() {
	return {
		flagKardex: 1,
		flagPickUp: 2,
		paymentStateId: 1,
		comments: 'Comment created by a test',
		additionalInfo: null,
		warehouseId: 493,
		warehouseName: 'Lima',
		warehouseAddress: '',
		deliveryAddress: null,
		responsiblePickUp: {
			name: 'Celso Espinoza',
			dni: '44556677',
			phone: '998877665',
			email: 'espinoza.arce13@gmail.com',
		},
		details: [
			{
				productId: 1,
				discount: 10.45,
				quantity: 10,
				warehouseId: 493,
				warehouseName: 'nombre del almacen',
			},
			{
				productId: 2,
				discount: 0.54,
				quantity: 15,
				warehouseId: 493,
				warehouseName: 'nombre del almacen',
			},
		],
		customerAddress: {
			type: 1,
			name: 'Mansión en Palo Alto',
			addressLine1: 'Dirección de Palo Alto',
			zipcode: '94301',
			documentNumber: '38726496',
		},
		commerceCode: process.env.COMMERCE_CODE,
	};
}

export default {
	name: 'summary-order',
	components: {
		appButton,
	},
	computed: {
		...mapGetters([
			'getOrderId',
			'getProductsToBuy',
		]),
	},
	methods: {
		buildBody,
		makeOrder,
	},
};
</script>
