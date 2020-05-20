<template>
	<div class="deposit-container">
		<div class="deposit-wrapper" v-if="stepFour">
			<h4 class="deposit-title">¡Gracias por comprar en {{getCommerceData.name}}!</h4>
			<p class="deposit-content">Tienes hasta 24 horas para efectuar el pago en cualquiera de nuestros bancos afiliados con tu número de pedido.</p>
		</div>
		<div class="deposit-wrapper" v-else>
			<h2 v-if="thereAreNoBanksAccounts">No existen cuentas bancarias configuradas</h2>
			<div v-else>
				<online-deposits :deposits="filtered"/>
				<v-radio-group  v-model="selectedBank" row>
					<v-radio 
						:label="bank.bank.name" 
						:value="bank.bankId"
						v-for="bank in getBankAccounts" 
						:key="bank.id">
					</v-radio>
				</v-radio-group>
			</div>
		</div>
		<div v-if="!thereAreNoBanksAccounts">
			<ul class="mb-1">
				<li
					v-for="account in bankAccounts"
					:key="account.id"
				>
					<span
						class="bank-account-info font-bold"
					>{{account.name}}: </span>
					<span>{{account.accountNumber}}</span>
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import { deposit } from '@/shared/enums/wayPayment';
import onlineDeposits from '@/components/order/deposit-payments';


function created() {
	this.selectedBank = this.getBankAccounts[0].bankId;
	this.getDeposits();
}

function getDeposits() {
	const { id } = this.getCommerceData.wayPayment.find(g => g.code === deposit.code);
	const { gatewayConfiguration } = this.getWaypaymentsByCommerce.find(
		g => g.wayPaymentId === id,
	);
	this.filtered = gatewayConfiguration;
}

function stepFour() {
	return this.$route.meta.step === 4;
}

function selectedBank(value) {
	this.$store.commit('SET_BANK_ACCOUNT', value);
}

function bankAccounts() {
	const index = this.getBankAccounts.findIndex(b => b.bankId === this.selectedBank);
	if (index > -1) {
		return this.getBankAccounts[index].accounts;
	}
	return this.getBankAccounts[0].accounts;
}

function thereAreNoBanksAccounts() {
	return this.getBankAccounts.length === 0;
}

function data() {
	return {
		filtered: [],
		selectedBank: null,
	};
}

export default {
	name: 'deposit-payment',
	components: {
		onlineDeposits,
	},
	created,
	computed: {
		...mapGetters([
			'getBankAccounts',
			'getCommerceData',
			'getWaypaymentsByCommerce',
		]),
		stepFour,
		bankAccounts,
		thereAreNoBanksAccounts,
	},
	data,
	methods: {
		getDeposits,
	},
	watch: {
		selectedBank,
	},
};
</script>
<style lang="scss" scoped>
	.deposit-container {
		color: color(dark);
		font-family: font(medium);
		margin-top: 40px;

		@media (max-width: 768px) {
			padding: 0 20px;
		}
	}

	.deposit-content {
		font-size: size(small);
	}

	.deposit-title {
		font-size: size(medium);
		margin: 30px 0 10px;
	}

	.deposit-bank {
		font-size: size(medium);
		font-family: font(bold);
	}

	.deposit-account-bank {
		color: color(dark);
		display:flex;
		flex-direction: column;
		font-family: font(demi);
		font-size: size(medium);
		margin-bottom: 0;
		white-space: nowrap;
	}

	.bank-account-container {
		background-color: color(white);
		border: solid 1px color(border);
		border-radius: 3px;
		padding: 25px 35px;
		text-align: center;

		@media (max-width: 600px) {
			margin: auto;
		}
	}

	.deposit-wrapper {
		width: 656px;

		@media (max-width: 768px) {
			width: auto;
		}

		@media (max-width: 600px) {
			margin: 0 auto 30px;
		}
	}

	.deposit-select-bank {
		align-items: center;
		display: flex;
		justify-content: flex-start;
	}

	.icon-bank-ecuador {
		height: 70px;
		width: 105px;
	}

	.font-bold {
		font-family: font(bold);
	}
</style>