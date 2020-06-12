<template>
<div>
	<section class="billing-header-content">
		<div class="billin-header">
			<img src="/static/icons/tax.svg" alt="ícono de impuestos">
			<h2 class="billing-section-title">Facturación</h2>
		</div>
	</section>
	<div class="billing-switch">
		<v-switch
			:readonly="disabledSwitch"
			hide-details
			:label="labelByCountry"
			class="billing-style"
			:value="getFlagBill"
			:input-value="getFlagBill"
			@change="changeBillSelection"
		></v-switch>
	</div>	
	<form class="billing-form" v-if="getFlagBill">
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
			:value="billing.ruc"
			@blur="onBlur"
		>
			<span v-if="$v.billing.ruc.$invalid">Documento {{rucWordByCountry}}</span>
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
import { required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';
import appInput from '@/components/shared/inputs/app-input';

function mounted() {
	if (this.getOrderInfo && this.getOrderInfo.dataBill) {
		const { address, ruc, rzSocial } = this.getOrderInfo.dataBill;
		this.billing = { address, ruc, rzSocial };
		this.changeBillSelection(true);
		this.validateForm();
	} else if (this.isEcuador) {
		this.changeBillSelection(true);
		this.disabledSwitch = true;
	}
}

function validateForm() {
	this.$store.commit('SET_BILLING_DATA', null);
	if (!this.$v.$invalid) {
		this.$store.commit('SET_BILLING_DATA', this.billing);
	}
}

function changeBillSelection(val) {
	this.$store.commit('SET_BILL_SELECTION', val);
}

function onBlur(val) {
	this.billing.ruc = val;
	this.$v.billing.ruc.$touch();
	this.showNotification('Validando documento', 'info');
}

function validatingDocumentNumber(val) {
	if (this.isPeru) {
		return true;
	}
	const countryCode = this.getLocalStorage('ecommerce::country');
	const url = `ruc/${val}?codeCountry=${countryCode}`;
	return this.$httpDocumentNumberValidating.get(url);
}

function validations() {
	if (this.isPeru) {
		const billing = {
			address: { required },
			ruc: { required },
			rzSocial: { required },
		};
		return { billing };
	}
	return {
		billing: {
			address: { required },
			ruc: {
				required,
				validatingDocumentNumber,
			},
			rzSocial: { required },
		},
	};
}

function rucWordByCountry() {
	return this.isPeru ? 'requerido' : 'inválido';
}

function handlerInvalid() {
	this.validateForm();
}

function labelByCountry() {
	return this.isEcuador ? 'Factura a terceros' : 'Solicitar Factura';
}

function data() {
	return {
		billing: {
			address: '',
			ruc: '',
			rzSocial: '',
		},
		disabledSwitch: false,
	};
}

export default {
	name: 'billing',
	components: {
		appInput,
	},
	computed: {
		...mapGetters([
			'getFlagBill',
			'getOrderInfo',
		]),
		labelByCountry,
		rucWordByCountry,
	},
	data,
	methods: {
		changeBillSelection,
		handlerInvalid,
		onBlur,
		validateForm,
		validatingDocumentNumber,
	},
	mounted,
	validations,
	watch: {
		'$v.$invalid': handlerInvalid,
	},
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

	.billin-header {
		color: color(dark);
		display: flex;
		font-size: size(medium);
		margin-bottom: 40px;
	}

	.billing-section-title {
		font-family: font(bold);
		font-size: size(large);
		margin-left: 20px;
		text-transform: uppercase;
	}

	.billing-text-regular {
		font-family: font(regular);
	}

	.billing-text-highlight {
		font-family: font(medium);
	}

	.billing-header-content {
		margin-bottom: 40px;
	}

	.billing-switch {
		margin-bottom: 30px;
	}
</style>

