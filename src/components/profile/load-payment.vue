<template>
	<div>
		<h3
			:style="`color: ${globalColors.primary};`"
			class="title-deposit">Datos del depósito</h3>
		<div v-if="voucherLoaded" class="voucher-loaded">
			<div class="voucher-data">
				<span class="voucher-label">Nro de Depósito: </span>
				<span>{{getValue('number', getOrderInfo)}}</span>
			</div>
			<img :src="deposit.urlImage" alt="foto del voucher" class="voucher-img">
			<app-button :background="bgSaveBtn" action="Editar" class="action-button save" @click="editVoucherData"/>
		</div>
		<div v-else class="deposit-fields">
			<div class="deposit-container">
				<app-input
					placeholder="Nro de depósito"
					class="deposit"
					v-model="deposit.number"
				/>
				<small v-if="!$v.deposit.number.required" class="err-message">El número de depósito es requerido</small>
			</div>
			<div class="voucher-container">
				<UploadImage
					placeholder="Foto de Voucher"
					class="voucher"
					@url-image="getUrlImage"
					v-model="deposit.urlImage"
				/>
				<small v-if="!$v.deposit.urlImage.required" class="err-message">La imagen del comprobante es requerida</small>
			</div>
		</div>
		<div class="btn-section" v-if="!voucherLoaded">
			<app-button :background="bgCancelBtn" action="Cancelar" class="action-button cancel" @click="goBack"/>
			<app-button
				class="action-button save"
				action="Guardar"
				:disabled="$v.$invalid"
				:background="bgSaveBtn"
				@click="loadVoucher"
			/>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import { required } from 'vuelidate/lib/validators';
import appButton from '@/components/shared/buttons/app-button';
import appInput from '@/components/shared/inputs/app-input';
import lib from '@/shared/lib';
import UploadImage from '@/components/shared/upload-image';

function created() {
	if (this.getOrderInfo && this.getOrderInfo.additionalInfo) {
		const { depositNumber, urlVoucher } = this.getOrderInfo.additionalInfo;
		this.voucherLoaded = true;
		this.deposit = {
			number: depositNumber,
			urlImage: urlVoucher,
		};
	}
}

function bgSaveBtn() {
	return process.env.COLOR_SECONDARY;
}

function bgCancelBtn() {
	return process.env.COLOR_PRIMARY;
}

function goBack() {
	this.$store.commit('UPDATE_FLAG_ADD_VOUCHER', false);
}

async function loadVoucher() {
	if (!this.$v.$invalid) {
		await this.updateOrderWithVoucher(this.deposit);
		this.voucherLoaded = true;
	}
}

async function updateOrderWithVoucher(deposit) {
	const body = {
		depositNumber: deposit.number,
		urlVoucher: deposit.urlImage,
	};
	const id = this.$route.params.id;
	try {
		this.$store.commit('SET_ORDER_INFO', lib.merge(this.getOrderInfo, { additionalInfo: body }));
		await this.$httpSales.patch(`orders/${id}/voucher`, body);
		this.showNotification('Comprobante agregado exitosamente', 'success');
	} catch (error) {
		this.showNotification(`${error}`, 'error');
	}
}

function editVoucherData() {
	this.voucherLoaded = false;
}

function getUrlImage(urlImage) {
	this.deposit.urlImage = urlImage;
}

function getValue(route, order) {
	return lib.getDeeper(route)(order);
}

function handlerOrderUpdate(newVal) {
	if (newVal) {
		const { depositNumber, urlVoucher } = newVal;
		this.deposit = {
			number: depositNumber,
			urlImage: urlVoucher,
		};
	}
}

function validations() {
	return {
		deposit: {
			number: { required },
			urlImage: { required },
		},
	};
}

function data() {
	return {
		deposit: {
			number: '',
			urlImage: '',
		},
		voucherLoaded: false,
	};
}

export default {
	name: 'load-payment',
	components: {
		appButton,
		appInput,
		UploadImage,
	},
	computed: {
		...mapGetters([
			'getOrderInfo',
		]),
		bgCancelBtn,
		bgSaveBtn,
	},
	created,
	data,
	methods: {
		editVoucherData,
		getUrlImage,
		getValue,
		goBack,
		loadVoucher,
		updateOrderWithVoucher,
	},
	validations,
	watch: {
		'getOrderInfo.additionalInfo': handlerOrderUpdate,
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

	.voucher-container,
	.deposit-container {
		flex: 1 1 40%;
		height: 80px;
	}

	.voucher,
	.deposit {
		width: 287px;
	}

	.title-deposit {
		font-family: font(bold);
		font-size: size(large);
		margin-bottom: 20px;
		text-transform: uppercase;
	}

	.voucher-loaded {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-evenly;
	}

	.voucher-data {
		color: color(dark);
		font-size: size(medium);
	}

	.voucher-label {
		font-family: font(bold);
	}

	.voucher-img {
		height: 140px;
		margin: 0 20px;
		object-fit: contain;
		width: 80px;
	}

	.err-message {
		color: color(error);
		margin-left: 10px;
	}
</style>

