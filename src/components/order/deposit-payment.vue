<template>
	<div class="deposit-container">
		<div class="deposit-wrapper">
			<v-radio-group  v-model="selectedBank">
				<div class="deposit-select-bank">
					<v-radio value="bcp"></v-radio>
					<img :src="logo.bcp" alt="logo de banco">
				</div>
				<h4 class="deposit-title">Banco de crédito BCP</h4>
				<p class="deposit-content">Tienes hasta 24 horas para efectuar el pago, puedes utilizar la Banca por Internet BCP , Agentes del BCP (hasta S/ 800.00) y Oficinas BCP a Nivel nacional con tu número de pedido.</p>
			</v-radio-group>
		</div>
		<div class="bank-account-container">
			<h4 class="deposit-bank">Cuenta Bancaria MRC:</h4>
			<p class="deposit-account-bank">
				<span>Nombre de Cuenta:  MRC S.A.C.</span>
				<span>Nro de Cuenta : 193-87656767-0-81</span>
			</p>
		</div>
	</div>
</template>
<script>

function data() {
	return {
		logo: {
			bbva: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/logo-bbva.png',
			bcp: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/logo-bcp.png',
		},
		selectedBank: 'bcp',
	};
}

export default {
	name: 'deposit-payment',
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
		color: color(primary);
		font-size: size(medium);
		font-family: font(bold);

		@media (max-width: 600px) {
			color: color(secondary);
		}
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
	}

	.deposit-select-bank {
		align-items: flex-start;
		display: flex;
		justify-content: flex-start;
	}
</style>