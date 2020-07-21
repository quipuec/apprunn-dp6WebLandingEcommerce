<template>
	<div>
		<button @click="openXchange" type="button" class="xchange-img"></button>
		<div id="ButtonPaybox" class="xchange-btn" ref="xchangebtn"></div>
		<div v-show="false">
			<!-- correo del usuario de la cuenta xchange -->
			<input type="text" id="PayboxRemail" :value="payboxRemail">
			<!-- correo del usuario que está comprando -->
			<input type="text" id="PayboxSendmail" :value="payboxSendmail">
			<!-- Nombre del usuario xchange -->
			<input type="text" id="PayboxRename" :value="payboxRename">
			<!-- Nombre del usuario que realiza el pedido -->
			<input type="text" id="PayboxSendname" :value="payboxSendname">
			<!-- Monto del pedido -->
			<input type="text" id="PayboxAmount" :value="payboxAmount">
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';

function openXchange() {
	this.mountJQ();
	this.mountXchange();
	this.mountData();
	// const btn = this.$refs.xchangebtn.children.pay;
	// btn.click();
}

function mountXchange() {
	const Xchange = document.createElement('script');
	Xchange.setAttribute('src', 'https://cdn.xchange.la/paybox/index.js');
	const head = document.querySelector('head');
	head.appendChild(Xchange);
}

function mountJQ() {
	const JQScript = document.createElement('script');
	JQScript.setAttribute('src', 'https://code.jquery.com/jquery-2.2.4.js');
	const head = document.querySelector('head');
	head.appendChild(JQScript);
}

function mountData() {
	const Data = document.createElement('script');
	Data.setAttribute('type', 'text/javascript');
	Data.innerHTML = `var data = {
		PayboxRemail: "#PayboxRemail",
		PayboxSendmail: "#PayboxSendmail",
		PayboxRename: "#PayboxRename",
		PayboxSendname: "#PayboxSendname",
		PayboxAmount: "#PayboxAmount",
		PayboxProduction: false,
		PayboxLanguage: "es",
	}`;
	const head = document.querySelector('head');
	head.appendChild(Data);
}

function mounted() {
	window.onAuthorize = (response) => {
		if (response.status === 'succeeded') {
			this.xchangeHandlerSuccess(response);
		} else {
			this.xchangeHandlerError(response);
		}
	};
	this.loadXchangeData();
}

async function loadXchangeData() {
	const body = {
		orderId: this.getOrderInfo.id,
		commerceCode: process.env.COMMERCE_CODE,
	};
	const url = 'payment-gateway/xchange/checkout';
	const { data: res } = await this.$httpSales.post(url, body);
	this.payboxAmount = res.total;
	this.payboxRemail = res.email;
	this.payboxRename = res.username;
	this.payboxSendmail = res.responsibleEmail;
	this.payboxSendname = res.responsibleName;
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
		payboxAmount: '',
		payboxRemail: '',
		payboxRename: '',
		payboxBase0: '',
		payboxBase12: '',
		payboxSendmail: '',
		payboxSendname: '',
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
		mountXchange,
		openXchange,
		xchangeHandlerError,
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

.xchange-img {
	background-image: url('https://cdn.xchange.la/img/logos/logo-color.png');
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