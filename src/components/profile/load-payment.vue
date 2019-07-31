<template>
	<div>
		<h3 class="title-deposit">Datos del depósito</h3>
		<div class="deposit-fields">
			<app-input placeholder="Nro de depósito" class="deposit"/>
			<app-input placeholder="Foto de Voucher" class="voucher"/>
		</div>
		<div>

		</div>
		<div class="btn-section">
			<app-button save action="Guardar" class="action-button save"/>
			<app-button cancel action="Cancelar" class="action-button cancel" @click="goBack"/>
		</div>
	</div>
</template>
<script>
import appButton from '@/components/shared/buttons/app-button';
import appInput from '@/components/shared/inputs/app-input';

export default {
	name: 'load-payment',
	components: {
		appButton,
		appInput,
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
		justify-content: center;
	}

	.voucher,
	.deposit {
		margin: 10px;
		width: 287px;
	}

	.title-deposit {
		color: color(primary);
		font-family: font(bold);
		font-size: size(large);
		text-transform: uppercase;
	}
</style>

