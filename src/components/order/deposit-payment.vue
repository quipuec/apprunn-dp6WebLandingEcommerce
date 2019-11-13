<template>
	<div class="deposit-container">
		<div class="deposit-wrapper" v-if="stepFour">
			<div class="deposit-select-bank">
				<img :src="logo.pichincha" alt="logo de banco" class="icon-bank-ecuador">
			</div>
			<h4 class="deposit-title">¡Gracias por comprar en MRC!</h4>
			<p class="deposit-content">Tienes hasta 24 horas para efectuar el pago, puedes utilizar la Banca por Internet Pichincha , Agentes del Pichincha (hasta S/ 800.00) y Oficinas Pichincha a Nivel nacional con tu número de pedido.</p>
		</div>
		<div class="deposit-wrapper" v-else>
			<v-radio-group  v-model="selectedBankEcu">
				<div class="deposit-select-bank">
					<v-radio value="pichincha"></v-radio>
					<img :src="logo.pichincha" alt="logo de banco" class="icon-bank-ecuador">
				</div>
				<h4 class="deposit-title">Banco Pichincha</h4>
				<p class="deposit-content">Tienes hasta 24 horas para efectuar el pago, puedes utilizar la Banca por Internet Pichincha , Agentes del Pichincha y Oficinas Pichincha a Nivel nacional con tu número de pedido.</p>
			</v-radio-group>
		</div>
		<div class="bank-account-container">
			<h4
				:style="`color: ${globalColors.primary};`"
				class="deposit-bank"
			>Cuenta Bancaria MRC:</h4>
			<p class="deposit-account-bank">
				<span>Nombre de Cuenta:  MRC S.A.C.</span>
				<span>Nro de Cuenta : 193-87656767-0-81</span>
			</p>
		</div>
	</div>
</template>
<script>

function stepFour() {
	return this.$route.meta.step === 4;
}

function data() {
	return {
		logo: {
			bbva: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/logo-bbva.png',
			bcp: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/logo-bcp.png',
			pichincha: 'https://japi-static.s3.amazonaws.com/japi-sales-error/banco-pichincha.jpg',
		},
		selectedBank: 'bcp',
		selectedBankEcu: 'pichincha',
	};
}

export default {
	name: 'deposit-payment',
	computed: {
		stepFour,
	},
	data,
};
</script>
<style lang="scss" scoped>
	.deposit-container {
		align-items: flex-start;
		color: color(dark);
		display: flex;
		flex-wrap: wrap;
		font-family: font(medium);
		justify-content: space-between;
		margin-top: 40px;
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
		width: 345px;

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
</style>