<template>
	<form class="responsible">
		<app-input
			placeholder="Persona responsable de recibir"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.name"
		>
			<span v-if="$v.responsible.name.$invalid">El nombre es requerido</span>
		</app-input>
		<app-input
			placeholder="DNI"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.dni"
		>
			<span v-if="$v.responsible.dni.$invalid">El DNI es requerido</span>
		</app-input>
		<app-input
			placeholder="Celular"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.phone"
		>
			<span v-if="$v.responsible.phone.$invalid">El teléfono es requerido</span>
		</app-input>
		<app-input
			placeholder="Correo"
			type="email"
			class="mx-2 my-1 responsible-field"
			v-model="responsible.email"
		>
			<span v-if="!$v.responsible.email.required">El correo es requerido</span>
			<span v-if="!$v.responsible.email.email">El correo es inválido</span>
		</app-input>
	</form>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators';

const appInput = () => import('@/components/shared/inputs/app-input');

function validations() {
	return {
		responsible: {
			dni: { required },
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
	data,
	validations,
};
</script>
<style lang="scss" scoped>
	.responsible {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 30px;
	}

	.responsible-field {
		flex: 1 1 48%;
		height: 68px;
	}
</style>
