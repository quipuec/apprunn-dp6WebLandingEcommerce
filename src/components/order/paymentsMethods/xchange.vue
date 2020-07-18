<template>
	<div>
		<div id="ButtonPaybox" class="xchange-btn"></div>
		<div v-show="false">
			<!-- correo del usuario de la cuenta xchange -->
			<input type="text" id="PayboxRemail" :value="email">
			<!-- correo del usuario que está comprando -->
			<input type="text" id="PayboxSendmail" :value="getResponsible.email">
			<!-- Nombre del usuario xchange -->
			<input type="text" id="PayboxRename" :value="username">
			<!-- Nombre del usuario que realiza el pedido -->
			<input type="text" id="PayboxSendname" :value="getResponsible.fullname">
			<!-- Monto del pedido -->
			<input type="text" id="PayboxAmount" :value="getOrderInfo.total">
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

function mounted() {
	// this.loadXchangeData();
	document.addEventListener('xchange-success', this.xchangeHandlerSuccess);
	document.addEventListener('xchange-error', this.xchangeHandlerError);
}

async function loadXchangeData() {
	const body = {
		orderId: '',
		commerceCode: '',
	};
	const url = 'payment-transaction/checkout-exchange';
	const { data: res } = await this.$httpSales.post(url, body);
	this.email = res.email;
	this.username = res.username;
}

function xchangeHandlerSuccess() {
	this.showNotification('Transacción exitosa', 'success');
	this.$store.dispatch('MAKE_ORDER', { flagFinish: true, context: this });
}

function xchangeHandlerError(error) {
	this.showNotification('Error. La transacción no se completó por un error', 'error');
	console.log(error);
}

function data() {
	return {
		email: 'donuterapia@gmail.com',
		username: 'Ivan',
	};
}

export default {
	name: 'xchange',
	computed: {
		...mapGetters([
			'getOrderInfo',
			'getResponsible',
		]),
	},
	data,
	methods: {
		loadXchangeData,
		xchangeHandlerError,
		xchangeHandlerSuccess,
	},
	mounted,
};
</script>
<style lang="scss" scoped>
.xchange-btn {

	button {
		width: 210px !important;
	}
}
</style>