<template>
	<form class="new-address-form">
		<app-input
			placeholder="Alias"
			class="mx-2 my-1 name-field field"
			v-model="newAddress.name"
		>
			<span v-if="$v.newAddress.name.$invalid">El alias es requerido</span>
		</app-input>
		<app-select
			item-text="name"
			item-value="id"
			placeholder="Departamento"
			class="mx-2 my-1 department-field field"
			:items="departments"
			@input="selectDepartment"
			v-model="newAddress.department"
		>
			<span v-if="$v.newAddress.department.$invalid">El departamento es requerido</span>
		</app-select>
		<app-select
			item-text="name"
			item-value="id"
			placeholder="Distrito"
			class="mx-2 my-1 district-field field"
			:items="districts"
			:disabled="!newAddress.department"
			@input="selectDistrict"
			v-model="newAddress.district"
		>
			<span v-if="$v.newAddress.district.$invalid">El distrito es requerido</span>
		</app-select>
		<app-select
			item-text="name"
			item-value="id"
			placeholder="Provincia"
			class="mx-2 my-1 province-field field"
			:items="provinces"
			:disabled="!newAddress.district"
			v-model="newAddress.province"
		>
			<span v-if="$v.newAddress.province.$invalid">La provincia es requerida</span>
		</app-select>
		<app-input
			placeholder="Dirección"
			class="mx-2 my-1 address-field field"
			v-model="newAddress.address"
		>
			<span v-if="$v.newAddress.address.$invalid">La dirección es requerida</span>
		</app-input>
		<app-input
			placeholder="Nro"
			class="mx-2 my-1 number-field field"
			v-model="newAddress.number"
		>
			<span v-if="$v.newAddress.number.$invalid">El número es requerido</span>
		</app-input>
		<app-input
			placeholder="Referencia"
			type="email"
			class="mx-2 my-1 reference-field field"
			v-model="newAddress.reference"
		>
			<span v-if="$v.newAddress.reference.$invalid">La referencia es requerida</span>
		</app-input>
	</form>
</template>
<script>
import { required } from 'vuelidate/lib/validators';
import { mapGetters } from 'vuex';

const appInput = () => import('@/components/shared/inputs/app-input');
const appSelect = () => import('@/components/shared/inputs/app-select');

function created() {
	this.$store.dispatch('LOAD_DEPARTMENTS', this);
}

function selectDepartment(id) {
	this.clearGeoFields();
	this.$store.dispatch('LOAD_DISTRICTS', { context: this, departmentId: id });
}

function selectDistrict(id) {
	this.clearProvinceField();
	this.$store.dispatch('LOAD_PROVINCES', { context: this, districtId: id });
}

function clearGeoFields() {
	this.newAddress.district = '';
	this.clearProvinceField();
}

function clearProvinceField() {
	this.newAddress.province = '';
}

function validations() {
	return {
		newAddress: {
			address: { required },
			department: { required },
			district: { required },
			name: { required },
			number: { required },
			province: { required },
			reference: { required },
		},
	};
}

function data() {
	return {
		newAddress: {
			address: '',
			department: '',
			district: '',
			name: '',
			number: '',
			province: '',
			reference: '',
		},
	};
}

export default {
	name: 'new-address',
	components: {
		appInput,
		appSelect,
	},
	computed: {
		...mapGetters([
			'departments',
			'districts',
			'provinces',
		]),
	},
	created,
	data,
	methods: {
		clearGeoFields,
		clearProvinceField,
		selectDepartment,
		selectDistrict,
	},
	validations,
};
</script>
<style lang="scss" scoped>
	.new-address-form {
		align-items: center;
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.field {
		height: 68px;
	}

	.name-field,
	.department-field {
		flex: 1 1 48%;
	}
	
	.district-field,
	.province-field {
		flex: 1 1 40%;
	}

	.address-field {
		flex: 1 1 75%;
	}

	.number-field {
		flex: 1 1 20%;
	}

	.reference-field {
		flex: 60%;
	}
</style>
