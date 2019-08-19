<template>
	<div class="summary-main-container">
		<div class="summary-grid" name="delivery">
			<img :src="iconSvg.location" alt="ícono de localización">
			<div class="summary-content-delivery">
				<h4 class="summary-title">{{pickUpName}}</h4>
				<span class="">
					<span>{{getResponsibleName}}</span>
					<span class="mx-3">DNI: {{getDni}}</span>
					<span>Teléfono: {{getPhone}}</span>
				</span>
				<span>Dirección: {{getDirection}}</span>
			</div>
		</div>
		<div class="summary-grid" name="billing" v-if="isNotEmptyBilling">
			<img :src="iconSvg.bill" alt="ícono de factura">
			<div class="summary-content">
				<h4 class="summary-title">Solicitud de Factura</h4>
				<div>
					<span class="mr-3">RUC: 20676555658</span>
					<span>Razón Social: Apprun, SAC</span>
				</div>
				<span>Domicilio fiscal: Calle independencia 120 - Miraflores - Lima, Perú</span>
			</div>
		</div>
		<div class="summary-grid" name="billing" v-if="stepFour">
			<img :src="iconSvg.pay" alt="ícono de factura">
			<div class="summary-content">
				<h4 class="summary-title">Método de pago</h4>
				<span></span>
			</div>
		</div>
	</div>
</template>
<script>
import lib from '@/shared/lib';
import { mapGetters } from 'vuex';

function isNotEmptyBilling() {
	const dataBill = lib.getDeeper('dataBill')(this.getOrderInfo);
	return !(lib.isEmpty(dataBill));
}

function pickUpName() {
	return lib.getDeeper('pickUpName')(this.getOrderInfo);
}

function getResponsibleName() {
	return lib.getDeeper('responsiblePickUp.name')(this.getOrderInfo);
}

function getDni() {
	return lib.getDeeper('responsiblePickUp.dni')(this.getOrderInfo);
}

function getPhone() {
	return lib.getDeeper('responsiblePickUp.phone')(this.getOrderInfo);
}

function getDirection() {
	return lib.getDeeper('deliveryAddress.addressLine1')(this.getOrderInfo);
}

function stepFour() {
	return this.$route.meta.step === 4;
}

function data() {
	return {
		iconSvg: {
			location: '/static/icons/red-localization.svg',
			bill: '/static/icons/red-bill.svg',
			pay: '/static/icons/pay.svg',
		},
	};
}

export default {
	name: 'summary-in-payment',
	computed: {
		...mapGetters([
			'getOrderInfo',
		]),
		getDirection,
		getDni,
		getPhone,
		getResponsibleName,
		isNotEmptyBilling,
		pickUpName,
		stepFour,
	},
	data,
};
</script>
<style lang="scss" scoped>
	.summary-main-container {
		align-items: center;
		display: flex;
		justify-content: space-around;
	}

	.summary-grid {
		align-items: flex-start;
		color: color(dark);
		display: grid;
		font-family: font(regular);
		grid-column-gap: 8px;
		grid-template-columns: 15px 1fr;
	}

	.summary-title {
		font-family: font(bold);
	}

	.summary-content-delivery {
		align-items: flex-start;
		display: grid;
		grid-template-rows: repeat(3, 1fr);
	}
</style>