<template>
	<div>
		<button
			class="data-fast-btn"
			type="button"
			@click="getTokenId"
		>Data Fast
		</button>
		<modal v-model="showModal" max-width="420px" @input="closeModal">
			<div ref="data-fast" class="modal-data-fast" v-if="showModal">
				<h3 v-if="loading">Cargando...</h3>
			</div>
		</modal>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import modal from '@/components/shared/modal/modal-component';

async function getTokenId() {
	const body = {
		orderId: this.getOrderId,
		commerceCode: this.getCommerceData.code,
	};
	const url = 'payment-transaction/dataweb/checkouts';
	const { data: response } = await this.$httpSales.post(url, body);
	this.checkoutId = response.id;
	this.createDataFastForm();
}

function createDataFastForm() {
	const dataFastScript = document.createElement('script');
	const src = `${process.env.DATA_FAST_URL}${this.checkoutId}`;
	dataFastScript.setAttribute('src', src);
	this.showModal = true;
	setTimeout(() => {
		const el = this.$refs['data-fast'];
		el.appendChild(dataFastScript);
		this.insertForm();
	});
	this.loadingFn();
}

function loadingFn() {
	setTimeout(() => {
		this.loading = false;
	}, 2200);
}

function insertForm() {
	const dataFastForm = document.createElement('form');
	const commerceCode = `commerceCode=${this.getCommerceData.code}`;
	const purchaseNumber = `purchaseNumber=${this.getOrderId}`;
	const redirect = 'uri=resumen-de-mi-pedido';
	const url = `${this.baseUrl}?${commerceCode}&${purchaseNumber}&${redirect}`;
	dataFastForm.setAttribute('action', url);
	dataFastForm.setAttribute('method', 'get');
	dataFastForm.setAttribute('data-brands', 'VISA MASTER DINERS AMEX DISCOVER');
	dataFastForm.setAttribute('id', 'datafast-form');
	dataFastForm.setAttribute('class', 'paymentWidgets');
	const el = this.$refs['data-fast'];
	el.appendChild(dataFastForm);
}

function baseUrl() {
	return `${process.env.SALES_URL}/payment-transaction/checkouts/validate`;
}

function closeModal(val) {
	if (!val) {
		this.loading = true;
	}
}

function data() {
	return {
		checkoutId: null,
		loading: true,
		show: false,
		showModal: false,
	};
}

export default {
	name: 'data-fast',
	components: {
		modal,
	},
	computed: {
		...mapGetters([
			'getCommerceData',
			'getOrderId',
		]),
		baseUrl,
	},
	data,
	methods: {
		closeModal,
		createDataFastForm,
		getTokenId,
		insertForm,
		loadingFn,
	},
};
</script>
<style lang="scss" scoped>
.data-fast-btn {
	background-color: #184D73;
	border-radius: 5px;
	color: white;
	font-family: font(bold);
	font-size: size(big);
	height: 50px;
	overflow: hidden;
	width: 100%;
}

.modal-data-fast {
    align-items: center;
	background-color: white;
    display: flex;
    justify-content: center;
    padding: 30px;
}
</style>