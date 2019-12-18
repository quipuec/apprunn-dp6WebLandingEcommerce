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
					v-for="method in getWaysPayments"
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
import { mapGetters } from 'vuex';
import appButton from '@/components/shared/buttons/app-button';
import { isEmpty } from '@/shared/lib';

const depositPayment = () => import('@/components/order/deposit-payment');
const productsBuyed = () => import('@/components/order/products-buyed');
const recievedPayment = () => import('@/components/order/recieved-payment');
const visaPayment = () => import('@/components/order/visa-payment');

function created() {
	if (isEmpty(this.getWaysPayments)) {
		this.$store.dispatch('SET_WAY_PAYMENT', this);
		this.$store.dispatch('SET_BANK_ACCOUNTS', this);
	} else {
		this.onSelect(this.getWaysPayments[0]);
	}
}

function onSelect(method) {
	this.$store.commit('SET_WAY_PAYMENT', { wayPayment: null, bankAccountId: null });
	this.paymentMethodSelected = method.code;
	if (method.code === 'IBD') {
		const firstBank = this.getBankAccounts[0].bankId;
		this.$store.commit('SET_WAY_PAYMENT', { wayPayment: method.id, bankAccountId: firstBank });
	}
}

function paymentMethodSelectedComponent() {
	const opt = {
		CDC: 'visaPayment',
		PPR: 'recievedPayment',
		IBD: 'depositPayment',
	};
	return opt[this.paymentMethodSelected];
}

function getWaysPayments() {
	this.onSelect(this.getWaysPayments[0]);
}

function data() {
	return {
		logo: {
			section: '/static/icons/payment.svg',
		},
		paymentMethodSelected: '',
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
		...mapGetters([
			'getWaysPayments',
			'getBankAccounts',
		]),
		paymentMethodSelectedComponent,
	},
	created,
	data,
	methods: {
		onSelect,
	},
	watch: {
		getWaysPayments,
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