<template>
	<div>
		<section class="thanks-header-container">
			<div class="thanks-success" v-if="showSuccessDeposit">
				<span>Gracias por su compra, su pedido fue realizado con éxito</span>
				<div class="close" @click="closeDeposit">X</div>
			</div>
			<div class="thanks-success" v-if="showSuccessVisa">
				<span>Gracias por su compra, su pago fue procesado, su pedido fue realizado con éxito</span>
				<div class="close" @click="closeVisa">X</div>
			</div>
			<div class="thanks-fail" v-if="showFailure">
				<span>Lo sentimos, el pago no pudo ser procesado, su pedido fue cancelado</span>
				<div class="close" @click="closeFailure">X</div>
			</div>
		</section>
		<section class="thanks-content">
			<h1 class="thanks-message">¡Gracias, {{getFullName}} por tu compra!</h1>
			<div class="thanks-order-summary">
				<span>Pedido No. {{getOrderNumber}}</span> <span class="separater">|</span>
				<span>Comprado el {{getOrderCreatedAt | formatDate}}</span> <span class="separater">|</span>
				<span>Total: {{getCurrencySymbol}}. {{getOrderTotal}}</span>
			</div>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import lib from '@/shared/lib';

function created() {
	this.showSuccessVisa = !lib.isEmpty(this.getOrderInfo.gatewayAuthorizationResponse);
	this.showSuccessDeposit = !lib.isEmpty(this.getOrderInfo.wayPaymentId);
	this.showFailure = !lib.isEmpty(this.getOrderInfo.gatewayErrorCode);
}

function getFullName() {
	return lib.getDeeper('typePerson.fullName')(this.user);
}

function getOrderNumber() {
	return lib.getDeeper('number')(this.getOrderInfo);
}

function getOrderCreatedAt() {
	return lib.getDeeper('createdAt')(this.getOrderInfo);
}

function getOrderTotal() {
	return lib.getDeeper('total')(this.getOrderInfo);
}

function closeFailure() {
	this.showFailure = !this.showFailure;
}

function closeVisa() {
	this.showSuccessVisa = !this.showSuccessVisa;
}

function closeDeposit() {
	this.showSuccessDeposit = !this.showSuccessDeposit;
}

function data() {
	return {
		showSuccessDeposit: true,
		showSuccessVisa: true,
		showFailure: true,
	};
}

export default {
	name: 'thanks-message',
	computed: {
		...mapGetters([
			'getCurrencySymbol',
			'getOrderInfo',
			'user',
		]),
		getFullName,
		getOrderCreatedAt,
		getOrderNumber,
		getOrderTotal,
	},
	created,
	data,
	methods: {
		closeDeposit,
		closeFailure,
		closeVisa,
	},
};
</script>
<style lang="scss" scoped>
	.thanks-content {
		align-items: center;
		display: flex;
		justify-content: space-between;
		margin: 0 58px;
	}

	.thanks-message {
		font-family: font(bold);
		font-size: size(sbig);
		text-transform: uppercase;
	}

	.thanks-order-summary {
		font-family: font(demi);
		font-size: size(medium);
	}

	.separater {
		margin: 0 15px;
	}

	.thanks-fail,
	.thanks-success {
		align-items: center;
		color: white;
		display: flex;
		font-family: font(medium);
		font-size: size(large);
		justify-content: space-between;
		padding: 16px 58px;
	}

	.thanks-success {
		background-color: color(success);
	}

	.thanks-fail {
		background-color: color(error);
	}

	.thanks-header-container {
		margin-bottom: 70px;
	}

	.close {
		cursor: pointer;
		font-family: font(bold);
	}
</style>
