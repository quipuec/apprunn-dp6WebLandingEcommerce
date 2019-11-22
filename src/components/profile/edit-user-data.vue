	<template>
	<div>
		<div class="form-container">
			<form class="user-form">
				<app-input class="user-name" placeholder="Nombre" v-model="userData.name"/>
				<app-input class="user-dni" :placeholder="labelCountry" v-model="userData.dni"/>
				<app-input class="user-lastname" placeholder="Apellido" v-model="userData.lastname"/>
				<app-input class="user-ruc" placeholder="RUC" v-model="userData.ruc"/>
				<app-select
					class="user-gender"
					placeholder="Género"
					item-text="title"
					item-value="id"
					:items="genders"
					v-model="userData.gender"
				/>
				<app-input class="user-postcode" placeholder="Código postal" v-model="userData.postalCode"/>
				<app-select
					class="user-department"
					placeholder="Departamento"
					item-text="name"
					item-value="id"
					:items="departments"
					v-model="userData.provinceId"
					@input="selectDepartment"
				/>
				<app-input class="user-phone" placeholder="Teléfono" v-model="userData.phone"/>
				<app-select
					class="user-district"
					placeholder="Distrito"
					item-text="name"
					item-value="id"
					:items="districts"
					v-model="userData.parishId"
				/>
				<app-select
					class="user-province"
					placeholder="Provincia"
					item-text="name"
					item-value="id"
					:items="provinces"
					v-model="userData.cityId"
					@input="selectProvince"
				/>
			</form>
			<section class="btn-section mb-2">
				<app-button
					action="Guardar"
					class="action-button save"
					:background="colorSecondary"
					@click="saveUserInfo"
				/>
				<app-button
					:background="colorBase"
					action="Cancelar"
					class="action-button cancel"
					@click="goBack"
				/>
			</section>
		</div>
	</div>
</template>
<script>
import { mapGetters } from 'vuex';
import appButton from '@/components/shared/buttons/app-button';
import appInput from '@/components/shared/inputs/app-input';
import appSelect from '@/components/shared/inputs/app-select';
import cameraComponent from '@/components/shared/icons/camera-component';
import editComponent from '@/components/shared/icons/edit-component';
import lib from '@/shared/lib';

function created() {
	this.userData = this.user || this.userData;
}

function goBack() {
	this.$router.back();
}

function loadAvatar() {}

function saveUserInfo() {
	const body = this.buildBody(this.userData);
	try {
		this.$store.dispatch('UPDATE_USER_DATA', { context: this, body });
		this.showNotification('Actualización exitosa');
		this.$router.push({ name: 'user-data-details' });
	} catch (error) {
		this.showGenericError('No fue posible actualizar los datos');
	}
}

function buildBody(userData) {
	return lib.compose(
		lib.setNewProperty('name', userData.name),
		lib.setNewProperty('lastname', userData.lastname),
		lib.setNewProperty('rzSocial', userData.rzSocial),
		lib.setNewProperty('address', userData.address),
		lib.setNewProperty('phone', userData.phone),
		lib.setNewProperty('phoneNumbers', userData.phoneNumbers),
		lib.setNewProperty('ruc', userData.ruc),
		lib.setNewProperty('dni', userData.dni),
		lib.setNewProperty('gender', userData.gender),
		lib.setNewProperty('postalCode', userData.postalCode),
		lib.setNewProperty('provinceId', userData.provinceId),
		lib.setNewProperty('cityId', userData.cityId),
		lib.setNewProperty('countryId', userData.countryId),
		lib.setNewProperty('parishId', userData.parishId),
	)({});
}

function selectDepartment(id) {
	this.userData.cityId = null;
	this.userData.parishId = null;
	this.$store.commit('SET_PROVINCES', []);
	this.$store.commit('SET_DISTRICTS', []);
	this.$store.dispatch('LOAD_PROVINCES', { context: this, provinceId: id });
}

function selectProvince(id) {
	this.userData.parishId = null;
	this.$store.commit('SET_DISTRICTS', []);
	this.$store.dispatch('LOAD_DISTRICTS', { context: this, cityId: id });
}

function labelCountry() {
	return lib.getDeeper('company.country.countryCode')(this.user) === 'ECU' ? 'Cédula' : 'DNI';
}

function data() {
	return {
		colorBase: process.env.COLOR_BASE,
		colorSecondary: process.env.COLOR_SECONDARY,
		userData: {
			cityId: null,
			dni: '',
			gender: null,
			lastname: '',
			name: '',
			parishId: null,
			phone: '',
			postalCode: '',
			provinceId: null,
			ruc: '',
		},
	};
}

export default {
	name: 'edit-user-profile',
	components: {
		appButton,
		appInput,
		appSelect,
		cameraComponent,
		editComponent,
	},
	computed: {
		...mapGetters([
			'departments',
			'districts',
			'genders',
			'provinces',
			'user',
		]),
		labelCountry,
	},
	created,
	data,
	methods: {
		buildBody,
		goBack,
		loadAvatar,
		saveUserInfo,
		selectDepartment,
		selectProvince,
	},
};
</script>
<style lang="scss" scoped>
	.form-container {
		margin: auto;
		padding: 0 40px;

		@media (max-width: 500px) {
			padding: 0;
		}
	}

	.user-header {
		display: flex;
		margin-bottom: 20px;
		margin-left: 40px;
	}

	.user-form {
		align-items: center;
		display: grid;
		grid-column-gap: 10px;
		grid-row-gap: 15px;
		grid-template-columns: 1fr 1fr;
		margin-bottom: 55px;

		@media (max-width: 768px) {
			.user-name, .user-lastname, .user-ruc, .user-district {
				grid-column: 1/3;
			}

			.user-lastname {
				grid-row: 2;
			}

			.user-dni, .user-gender {
				grid-row: 3;
			}

			.user-department, .user-province {
				grid-row: 4;
			}

			.user-ruc {
				grid-row: 6;
			}

			.user-postcode, .user-phone {
				grid-row: 7;
			}

			.user-district {
				grid-row: 5;
			}
		}
	}

	.btn-section {
		align-items: center;
		display: flex;
		justify-content: flex-end;

		@media(max-width: 745px) {
			justify-content: space-between;
		}
	}

	.action-button {
		height: 38px;
		max-width: 172px;
		width: 100%;
	}

	.save {
		margin-right: 10px;
	}
</style>

