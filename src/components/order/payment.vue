<template>
	<div>
		<products-buyed/>
		<section class="section-container">
			<div class="section-title">
				<img :src="logo.section" alt="logo del método de pago">
				<h2 class="payment-section-title">método de pago</h2>
			</div>
			<div class="methods-container">
				<app-button
					v-for="method in waysPayment"
					:key="method.id"
					max-width="360px"
					class="method-item"
					:action="method.name"
					:active="paymentMethodSelected === method.code"
					:background="globalColors.secondary"
					:border="globalColors.secondary"
					@click="onSelect(method)"
				/>
			</div>
			<component class="component-container"
				:is="paymentMethodSelectedComponent"
			></component>
		</section>
	</div>
</template>
<script>
import appButton from '@/components/shared/buttons/app-button';

const depositPayment = () => import('@/components/order/deposit-payment');
const productsBuyed = () => import('@/components/order/products-buyed');
const recievedPayment = () => import('@/components/order/recieved-payment');
const visaPayment = () => import('@/components/order/visa-payment');

function created() {
	this.loadWayPayment();
}

function onSelect(method) {
	this.paymentMethodSelected = method.code;
	const bankAccountId = method.code === 'IBD' ? 1 : null;
	this.$store.commit('SET_WAY_PAYMENT', { wayPayment: method.id, id: bankAccountId });
}

function paymentMethodSelectedComponent() {
	const opt = {
		CDC: 'visaPayment',
		PPR: 'recievedPayment',
		IBD: 'depositPayment',
	};
	return opt[this.paymentMethodSelected];
}

async function loadWayPayment() {
	({ data: this.waysPayment } = await this.$httpSales.get('way-payment'));
	this.paymentMethodSelected = 'IBD';
}

function data() {
	return {
		logo: {
			section: '/static/icons/payment.svg',
		},
		paymentMethodSelected: '',
		waysPayment: [],
	};
}

export default {
	name: 'payment',
	components: {
		depositPayment,
		appButton,
		productsBuyed,
		recievedPayment,
		visaPayment,
	},
	computed: {
		paymentMethodSelectedComponent,
	},
	created,
	data,
	methods: {
		loadWayPayment,
		onSelect,
	},
};
</script>
<style lang="scss" scoped>
	.methods-container {
		align-items: center;
		display: grid;
		grid-gap: 20px;
		grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
		
		@media (max-width: 600px) {
			margin: 0 20px;
		}
	}

	.component-container {

		@media (max-width: 600px) {
			margin: 0 20px;
		}
	}

	.payment-section-title {
		font-size: size(large);
		font-family: font(bold);
		margin-left: 12px;
		text-transform: uppercase;
	}

	.section-title {
		align-items: baseline;
		display: flex;
		justify-content: flex-start;
		margin-bottom: 40px;
	}

	.section-container {
		margin-bottom: 30px;
	}
</style>