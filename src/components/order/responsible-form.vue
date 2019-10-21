<template>
	<form class="responsible">
		<app-input
			placeholder="Persona responsable de recibir"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.name"
			@input="validateForm"
		>
			<span v-if="$v.responsible.name.$invalid">El nombre es requerido</span>
		</app-input>
		<app-input
			placeholder="DNI"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.dni"
			@input="validateForm"
		>
			<span v-if="$v.responsible.dni.$invalid">El DNI es requerido</span>
		</app-input>
		<app-input
			placeholder="Celular"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.phone"
			@input="validateForm"
		>
			<span v-if="$v.responsible.phone.$invalid">El teléfono es requerido</span>
		</app-input>
		<app-input
			placeholder="Correo"
			type="email"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.email"
			@input="validateForm"
		>
			<span v-if="!$v.responsible.email.required">El correo es requerido</span>
			<span v-if="!$v.responsible.email.email">El correo es inválido</span>
		</app-input>
	</form>
</template>
<script>
import { required, email, minLength, maxLength } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

const appInput = () => import('@/components/shared/inputs/app-input');

function mounted() {
	if (this.getOrderInfo.responsiblePickUp) {
		this.responsible = { ...this.getOrderInfo.responsiblePickUp };
	} else {
		const { dni, email: mail, name, phone } = this.user;
		this.responsible = { dni, name, email: mail, phone };
	}
	console.log(this.getOrderInfo.responsiblePickUp);
	this.validateForm();
}

function validateForm() {
	this.$store.commit('SET_RESPONSIBLE', null);
	if (!this.$v.$invalid) {
		this.$store.commit('SET_RESPONSIBLE', this.responsible);
	}
}

function validations() {
	return {
		responsible: {
			dni: {
				required,
				minLength: minLength(8),
				maxLength: maxLength(9),
			},
			email: { email, required },
			name: { required },
			phone: { required },
		},
	};
}

function data() {
	return {
		responsible: {
			dni: '',
			email: '',
			name: '',
			phone: '',
		},
	};
}

export default {
	name: 'responsible-form',
	components: {
		appInput,
	},
	computed: {
		...mapGetters([
			'user',
			'getOrderInfo',
		]),
	},
	data,
	methods: {
		validateForm,
	},
	mounted,
	validations,
};
</script>
<style lang="scss" scoped>
	.responsible {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 20px;
	}

	.responsible-field {
		flex: 1 1 47%;
		height: 68px;
	}
</style>
