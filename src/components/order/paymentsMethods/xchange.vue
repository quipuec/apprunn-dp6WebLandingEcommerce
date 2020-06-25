<template>
	<div>
		<div id="ButtonPaybox" class="xchange-btn"></div>
		<div v-show="false">
			<!-- correo del usuario de la cuenta xchange -->
			<input type="text" id="PayboxRemail" value="donuterapia@gmail.com">
			<!-- correo del usuario que está comprando -->
			<input type="text" id="PayboxSendmail" :value="getResponsible.email">
			<!-- Nombre del usuario xchange -->
			<input type="text" id="PayboxRename" value="Ivan">
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
	document.addEventListener('xchange-success', this.xchangeHandlerSuccess);
}

function xchangeHandlerSuccess() {
	this.$store.dispatch('MAKE_ORDER', { flagFinish: true, context: this });
}

export default {
	name: 'xchange',
	computed: {
		...mapGetters([
			'getOrderInfo',
			'getResponsible',
		]),
	},
	methods: {
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