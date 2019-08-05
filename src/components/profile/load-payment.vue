<template>
	<div>
		<h3 class="title-deposit">Datos del depósito</h3>
		<div v-if="voucherLoaded" class="voucher-loaded">
			<div class="voucher-data">
				<span class="voucher-label">Nro de Depósito: </span>
				<span>1232134323423</span>
			</div>
			<img src="" alt="foto del voucher" class="voucher-img">
			<app-button :background="bgSaveBtn" action="Editar" class="action-button save" @click="editVoucherData"/>
		</div>
		<div v-else class="deposit-fields">
			<app-input placeholder="Nro de depósito" class="deposit"/>
			<app-input placeholder="Foto de Voucher" class="voucher"/>
		</div>
		<div class="btn-section" v-if="!voucherLoaded">
			<app-button :background="bgSaveBtn" action="Guardar" class="action-button save" @click="loadVoucher"/>
			<app-button :background="bgCancelBtn" action="Cancelar" class="action-button cancel" @click="goBack"/>
		</div>
	</div>
</template>
<script>
import appButton from '@/components/shared/buttons/app-button';
import appInput from '@/components/shared/inputs/app-input';

function bgSaveBtn() {
	return process.env.COLOR_SECONDARY;
}

function bgCancelBtn() {
	return process.env.COLOR_BASE;
}

function goBack() {
	this.$store.commit('UPDATE_FLAG_ADD_VOUCHER', false);
}

function loadVoucher() {
	this.voucherLoaded = true;
}

function editVoucherData() {
	this.voucherLoaded = false;
}

function data() {
	return {
		voucherLoaded: false,
	};
}

export default {
	name: 'load-payment',
	components: {
		appButton,
		appInput,
	},
	computed: {
		bgCancelBtn,
		bgSaveBtn,
	},
	data,
	methods: {
		editVoucherData,
		goBack,
		loadVoucher,
	},
};
</script>
<style lang="scss" scoped>
	.btn-section {
		align-items: center;
		display: flex;
		justify-content: center;
	}

	.action-button {
		height: 38px;
		margin: 10px;
		max-width: 172px;
		width: 100%;
	}

	.deposit-fields {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
	}

	.voucher,
	.deposit {
		margin: 10px;
		width: 287px;
	}

	.title-deposit {
		color: color(primary);
		font-family: font(bold);
		font-size: size(large);
		text-transform: uppercase;
	}

	.voucher-loaded {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
	}

	.voucher-data {
		color: color(dark);
		font-size: size(medium);
	}

	.voucher-label {
		font-family: font(bold);
	}

	.voucher-img {
		height: 80px;
		margin: 20px;
		width: 140px;
	}
</style>

