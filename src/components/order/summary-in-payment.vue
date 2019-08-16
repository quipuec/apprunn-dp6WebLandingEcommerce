<template>
	<div class="summary-main-container">
		<div class="summary-grid" name="delivery" v-if="isNotEmptyDelivery">
			<img :src="iconSvg.location" alt="ícono de localización">
			<div class="summary-content-delivery">
				<h4 class="summary-title">Envío a domicilio</h4>
				<span class="">
					<span>mariana, Ramirez</span>
					<span class="mx-3">DNI: 79183783</span>
					<span>Teléfono: 970127070</span>
				</span>
				<span>Dirección: Calle independencia 120 - Miraflores - Lima, Perú</span>
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
	</div>
</template>
<script>
import lib from '@/shared/lib';

function isNotEmptyBilling() {
	return !(lib.isEmpty(this.billing));
}

function isNotEmptyDelivery() {
	return !(lib.isEmpty(this.delivery));
}

function data() {
	return {
		iconSvg: {
			location: '/static/icons/red-localization.svg',
			bill: '/static/icons/red-bill.svg',
		},
	};
}

export default {
	name: 'summary-in-payment',
	computed: {
		isNotEmptyBilling,
		isNotEmptyDelivery,
	},
	data,
	props: {
		delivery: {
			default: () => {},
			type: Object,
		},
		billing: {
			default: () => {},
			type: Object,
		},
	},
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