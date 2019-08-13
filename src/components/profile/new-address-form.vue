<template>
	<form class="new-addres-form">
		<app-input
			placeholder="Alias"
			class="mx-1 my-1 address-name"
			v-model="newAddress.name"
		>
			<span v-if="$v.newAddress.name.$invalid">El alias es requerido</span>
		</app-input>
		<app-select
			placeholder="Departamento"
			class="mx-1 my-1 address-department"
			v-model="newAddress.departmentId"
		>
			<span v-if="$v.newAddress.departmentId.$invalid">El departamento es requerido</span>
		</app-select>
		<app-select
			placeholder="Provincia"
			class="mx-1 my-1 address-province"
			v-model="newAddress.provinceId"
		>
			<span v-if="$v.newAddress.provinceId.$invalid">La provincia es requerida</span>
		</app-select>
		<app-select
			placeholder="Distrito"
			class="mx-1 my-1 address-district"
			v-model="newAddress.districtId"
		>
			<span v-if="$v.newAddress.districtId.$invalid">El distrito es requerido</span>
		</app-select>
		<app-input
			placeholder="Dirección"
			class="mx-1 my-1 address-location"
			v-model="newAddress.address"
		>
			<span v-if="$v.newAddress.address.$invalid">La dirección es requerida</span>
		</app-input>
		<plus-component @click="addNewAddress" class="add-new-address-btn"/>
	</form>	
</template>
<script>
import { required } from 'vuelidate/lib/validators';

const appInput = () => import('@/components/shared/inputs/app-input');
const appSelect = () => import('@/components/shared/inputs/app-select');
const plusComponent = () => import('@/components/shared/icons/plus-component');

function addNewAddress() {
	this.$store.dispatch('NEW_ADDRESS', this.newAddress);
}

function validations() {
	return {
		newAddress: {
			address: { required },
			departmentId: { required },
			districtId: { required },
			name: { required },
			provinceId: { required },
		},
	};
}

function data() {
	return {
		newAddress: {
			address: '',
			departmentId: null,
			districtId: null,
			name: '',
			provinceId: null,
		},
	};
}

export default {
	name: 'new-address-form',
	components: {
		appInput,
		appSelect,
		plusComponent,
	},
	data,
	methods: {
		addNewAddress,
	},
	validations,
};
</script>
<style lang="scss" scoped>
	.new-addres-form {
		align-items: flex-start;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin: 0 50px 30px;
	}

	.address-name,
	.address-department,
	.address-province,
	.address-district {
		flex: 1 1 30%;

		@media (max-width: 600px) {
			flex: 1 1 33%;
		}
	}

	.address-location {
		flex: 1 1 56%;
	}

	.add-new-address-btn {
		flex: 1 1 5%;
		margin-top: 7px;
	}

	@media (max-width: 600px) {
		.address-name {
			order: 1;
		}

		.address-department {
			order: 2;
		}

		.address-district {
			order: 3;
		}

		.address-province {
			order: 4;
		}

		.address-location,
		.add-new-address-btn {
			order: 5;
		}
	}
</style>