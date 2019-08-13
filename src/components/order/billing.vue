<template>
<div>
	<div class="billing-switch">
		<v-switch
			hide-details
			label="Solicitar Factura"
			class="billing-style"
			v-model="wantBill"
		></v-switch>
	</div>	
	<form class="billing-form">
		<app-input
			placeholder="Razón Social"
			class="mx-2 my-1 rzSocial-field"
			v-model="billing.rzSocial"
			@input="validateForm"
		>
			<span v-if="$v.billing.rzSocial.$invalid">La razón social es requerida</span>
		</app-input>
		<app-input
			placeholder="Número de RUC"
			class="mx-2 my-1 ruc-field"
			v-model="billing.ruc"
			@input="validateForm"
		>
			<span v-if="$v.billing.ruc.$invalid">El RUC es requerido</span>
		</app-input>
		<app-input
			placeholder="Dirección de domicilio fiscal"
			class="mx-2 my-1 address-field"
			v-model="billing.address"
			@input="validateForm"
		>
			<span v-if="$v.billing.address.$invalid">El domicilio fiscal es requerido</span>
		</app-input>
	</form>
</div>
</template>
<script>
import { required, requiredIf } from 'vuelidate/lib/validators';

const appInput = () => import('@/components/shared/inputs/app-input');

function validateForm() {
	if (!this.$v.$invalid) {
		this.$store.commit('SET_BILLING_INFO', this.billing);
	}
}

function validations() {
	return {
		billing: {
			address: { required },
			bill: { required: requiredIf(() => this.wantBill) },
			ruc: { required },
			rzSocial: { required },
		},
	};
}

function data() {
	return {
		billing: {
			address: '',
			ruc: '',
			rzSocial: '',
		},
		wantBill: true,
	};
}

export default {
	name: 'billing',
	components: {
		appInput,
	},
	data,
	methods: {
		validateForm,
	},
	validations,
};
</script>
<style lang="scss" scoped>
	.billing-switch {
		margin-bottom: 30px;
	}
	
	.billing-form {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.rzSocial-field,
	.ruc-field {
		flex: 1 1 40%;
	}

	.address-field {
		flex: 1 1 100%;
	}
</style>

