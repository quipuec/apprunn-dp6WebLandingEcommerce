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
				<span>Total: {{getCurrencySymbol}}. {{getOrderTotal | currencyFormat}}</span>
			</div>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import { getDeeper, isEmpty } from '@/shared/lib';
import WayPayments from '@/shared/enums/wayPayment';

function created() {
	this.updateFlags();
}

function updateFlags() {
	if (this.isPeru) {
		this.showSuccessVisa = !isEmpty(getDeeper('gatewayAuthorizationResponse')(this.getOrderInfo));
		this.showSuccessDeposit = !isEmpty(getDeeper('wayPaymentId')(this.getOrderInfo));
		this.showFailure = !isEmpty(getDeeper('gatewayErrorCode')(this.getOrderInfo));
	} else {
		const code = getDeeper('wayPayment.code')(this.getOrderInfo);
		this.showFailure = !isEmpty(getDeeper('gatewayErrorCode')(this.getOrderInfo));
		this.showSuccessVisa = !this.showFailure && WayPayments.creditCard.code === code;
		this.showSuccessDeposit = !this.showFailure && WayPayments.deposit.code === code;
	}
}

function getFullName() {
	return getDeeper('typePerson.fullName')(this.user);
}

function getOrderNumber() {
	return getDeeper('number')(this.getOrderInfo);
}

function getOrderCreatedAt() {
	return getDeeper('createdAt')(this.getOrderInfo);
}

function getOrderTotal() {
	return (this.getTotalToBuy - this.discount) + this.getShippingCost;
}

function discount() {
	const percentage = this.user.discount;
	const amount = this.getTotalToBuy * (Number(percentage) / 100);
	return Number(amount.toFixed(2));
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

function wayPaymentIdHandler(newWayPayment) {
	this.showSuccessDeposit = Boolean(newWayPayment);
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
			'getShippingCost',
			'getTotalToBuy',
			'user',
		]),
		discount,
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
		updateFlags,
		wayPaymentIdHandler,
	},
	watch: {
		'getOrderInfo.wayPaymentId': wayPaymentIdHandler,
		getOrderInfo: {
			deep: true,
			handler: updateFlags,
		},
	},
};
</script>
<style lang="scss" scoped>
	.thanks-content {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 0 58px;
	}

	.thanks-message {
		font-family: font(bold);
		font-size: size(sbig);
		text-transform: uppercase;

		@media (max-width: 600px) {
			margin-bottom: 50px;
			text-align: center;
		}
	}

	.thanks-order-summary {
		font-family: font(demi);
		font-size: size(medium);

		@media (max-width: 600px) {
			align-items: center;
			display: flex;
			flex-direction: column;
			margin: auto;

			span {
				border-bottom: 1px solid color(dark);
				margin-bottom: 10px;
				padding-bottom: 10px;
				text-align: center;
				width: 100%;
			}

			span:last-child {
				border-bottom: none;
			}
		}
	}

	.separater {
		margin: 0 15px;

		@media (max-width: 600px) {
			display: none;
		}
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
