<template>
	<div>
		<h3 v-if="!show">¡ Recargue la pantalla !</h3>
		<button
			class="data-fast-btn"
			v-show="show"
			type="button"
			@click="createDataFastForm"
		>
			<img src="https://media-exp1.licdn.com/dms/image/C561BAQGPZh2xTzv5GQ/company-background_10000/0?e=1589554800&v=beta&t=NKiH-Qc6DZdtRd0iL5aDvWYq5rjrFGcOX9CUCqBl_pM" alt="">
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

function mounted() {
	this.getTokenId();
}

async function getTokenId() {
	const body = {
		orderId: this.getOrderId,
		commerceCode: this.getCommerceData.code,
	};
	const url = 'payment-transaction/dataweb/checkouts';
	const { data: response } = await this.$httpSales.post(url, body);
	this.checkoutId = response.id;
	this.show = true;
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
	const url = process.env.REDIRECT_URI;
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
	mounted,
};
</script>
<style lang="scss" scoped>
.data-fast-btn {
	height: 50px;
	overflow: hidden;
	width: 200px;

	img {
		height: 100%;
		transform: scale(2);
		width: auto;
	}
}

.modal-data-fast {
    align-items: center;
	background-color: white;
    display: flex;
    justify-content: center;
    padding: 30px;
}
</style>