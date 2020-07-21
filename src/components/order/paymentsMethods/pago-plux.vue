<template>
	<div>
		<button @click="openPagoPlux" type="button" class="pago-plux-img"></button>
		<div id="ButtonPaybox" ref="pagopluxbtn" style="visibility:hidden"></div>
		<div v-show="false">
			<!-- correo del usuario de la cuenta xchange -->
			<input type="text" id="PayboxRemailPlux" :value="payboxRemail">
			<!-- correo del usuario que está comprando -->
			<input type="text" id="PayboxSendmailPlux" :value="payboxSendmail">
			<!-- Nombre del usuario xchange -->
			<input type="text" id="PayboxRenamePlux" :value="payboxRename">
			<!-- Nombre del usuario que realiza el pedido -->
			<input type="text" id="PayboxSendnamePlux" :value="payboxSendname">
			<!-- sub total base sin impuesto  -->
			<input type="text" id="PayboxBase0" :value="payboxBase0">
			<!-- sub total base con impuesto  -->
			<input type="text" id="PayboxBase12" :value="payboxBase12">
			<!-- descripción  -->
			<input type="text" id="PayboxDescriptionPlux" :value="payboxDescription">
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

function openPagoPlux() {
	this.mountData();
	this.mountJQ();
	this.mountPagoPlux();
	this.loadXchangeData();
	const btn = this.$refs.pagopluxbtn.children.pay;
	btn.click();
}

function mountPagoPlux() {
	const PagoPluxScript = document.createElement('script');
	PagoPluxScript.setAttribute('src', 'https://sandbox-paybox.pagoplux.com/paybox/index.js');
	const body = document.querySelector('body');
	body.appendChild(PagoPluxScript);
}

function mountJQ() {
	const JQScript = document.createElement('script');
	JQScript.setAttribute('src', 'https://code.jquery.com/jquery-3.4.1.js');
	const body = document.querySelector('body');
	body.appendChild(JQScript);
}

function mountData() {
	const Data = document.createElement('script');
	Data.setAttribute('type', 'text/javascript');
	Data.innerHTML = `var data = {
		PayboxRemail: "#PayboxRemailPlux",
		PayboxSendmail: "#PayboxSendmailPlux",
		PayboxRename: "#PayboxRenamePlux",
		PayboxSendname: "#PayboxSendnamePlux",
		PayboxBase0: "#PayboxBase0",
		PayboxBase12: "#PayboxBase12",
		PayboxDescription: "#PayboxDescriptionPlux",
		PayboxProduction: false,
		PayboxLanguage: "es",
	}`;
	const body = document.querySelector('body');
	body.appendChild(Data);
}

function mounted() {
	window.onAuthorize = (response) => {
		if (response.status === 'succeeded') {
			this.xchangeHandlerSuccess(response);
		} else {
			this.xchangeHandlerError(response);
		}
	};
}

async function loadXchangeData() {
	const body = {
		orderId: this.getOrderInfo.id,
		commerceCode: process.env.COMMERCE_CODE,
	};
	const url = 'payment-gateway/pagoplux/checkout';
	const { data: res } = await this.$httpSales.post(url, body);
	this.payboxRemail = res.payboxRemail;
	this.payboxRename = res.payboxRename;
	this.payboxBase0 = res.payboxBase0;
	this.payboxBase12 = res.payboxBase12;
	this.payboxSendmail = res.payboxSendmail;
	this.payboxSendname = res.payboxSendname;
	this.payboxDescription = res.payboxDescription;
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
		payboxRemail: '',
		payboxRename: '',
		payboxBase0: '',
		payboxBase12: '',
		payboxSendmail: '',
		payboxSendname: '',
		payboxDescription: '',
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
		mountData,
		mountJQ,
		mountPagoPlux,
		openPagoPlux,
		xchangeHandlerError,
		xchangeHandlerSuccess,
	},
	mounted,
};
</script>
<style lang="scss" scoped>
.xchange-btn {
	visibility: hidden;
	button {
		width: 210px !important;
	}
}

.pago-plux-img {
	background-image: url('https://www.pagoplux.com/wp-content/uploads/2020/04/pagoplux-logo.png');
	background-position: center;
	background-size: contain;
	height: 50px;
	transition-duration: 250ms;
	width: 100%;

	&:hover {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		transform: scale(1.05);
	}
}
</style>