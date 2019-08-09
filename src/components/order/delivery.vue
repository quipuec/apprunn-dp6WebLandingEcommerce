<template>
	<div>
		<section class="delivery">
			<app-button-order
				button-title="Envío a Domicilio"
				class="btn"
				:active="getFlagPickUp === 1"
				@click="selected(1)"
			>
				<location-svg :active="getFlagPickUp === 1"/>
			</app-button-order>
			<app-button-order
				button-title="Recoger en Tienda"
				class="btn"
				@click="selected(2)"
				:active="getFlagPickUp === 2"
			>
				<coffee-svg :active="getFlagPickUp === 2"/>
			</app-button-order>
		</section>
		<section>
			<form class="responsible">
				<app-input
					placeholder="Persona responsable de recibir"
					class="mx-2 my-2 responsible-field"
					v-model="responsible.name"
				>
					<span v-if="$v.responsible.name.$invalid">El nombre es requerido</span>
				</app-input>
				<app-input
					placeholder="DNI"
					class="mx-2 my-2 responsible-field"
					v-model="responsible.dni"
				>
					<span v-if="$v.responsible.dni.$invalid">El DNI es requerido</span>
				</app-input>
				<app-input
					placeholder="Celular"
					class="mx-2 my-2 responsible-field"
					v-model="responsible.phone"
				>
					<span v-if="$v.responsible.phone.$invalid">El teléfono es requerido</span>
				</app-input>
				<app-input
					placeholder="Correo"
					type="email"
					class="mx-2 my-2 responsible-field"
					v-model="responsible.email"
				>
					<span v-if="!$v.responsible.email.required">El correo es requerido</span>
					<span v-if="!$v.responsible.email.email">El correo es inválido</span>
				</app-input>
			</form>
		</section>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import { required, email } from 'vuelidate/lib/validators';

const appButtonOrder = () => import('@/components/shared/buttons/app-button-order');
const appInput = () => import('@/components/shared/inputs/app-input');
const locationSvg = () => import('@/components/shared/icons/location');
const coffeeSvg = () => import('@/components/shared/icons/coffee-shop');

function selected(val) {
	this.$store.commit('SET_FLAG_PICKUP', val);
}

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
	name: 'delivery',
	components: {
		appButtonOrder,
		appInput,
		coffeeSvg,
		locationSvg,
	},
	computed: {
		...mapGetters([
			'getFlagPickUp',
		]),
	},
	data,
	methods: {
		selected,
	},
	validations,
};
</script>
<style lang="scss" scoped>
	.delivery {
		align-items: center;
		display: flex;
		justify-content: space-between;
		width: 100%;
	}

	.btn {
		flex: 1 1 40%;
		margin: 0 10px;

		@media (max-width: 600px) {
			font-size: size(msmall);
		}
	}

	.responsible {
		align-items: center;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 30px;
	}

	.responsible-field {
		flex: 1 1 47%;
		height: 68px;
	}
</style>

