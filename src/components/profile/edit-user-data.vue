<template>
	<div>
		<div class="form-container">
			<form class="user-form">
				<app-input class="user-name" placeholder="Nombre"/>
				<app-input class="user-dni" placeholder="DNI"/>
				<app-input class="user-lastname" placeholder="Apellido"/>
				<app-input class="user-ruc" placeholder="RUC"/>
				<app-select class="user-gender" placeholder="Género"/>
				<app-input class="user-postcode" placeholder="Código postal"/>
				<app-select class="user-department" placeholder="Departamento"/>
				<app-input class="user-phone" placeholder="Teléfono"/>
<<<<<<< HEAD
<<<<<<< HEAD
				<app-input class="user-province" placeholder="Provincia"/>
				<app-input class="user-district" placeholder="Distrito"/>
=======
				<app-select class="user-district" placeholder="Distrito"/>
				<app-select class="user-province" placeholder="Provincia"/>
>>>>>>> 4bbac2dea6c68d4baa6c0eeae52cc1172c9a0837
=======
				<app-select class="user-district" placeholder="Distrito"/>
				<app-select class="user-province" placeholder="Provincia"/>
>>>>>>> 4411ae3d5b20b6cff15fd2950565fa43c86673aa
			</form>
			<section class="btn-section mb-2">
				<app-button
					:background="colorSecondary"
					action="Guardar"
					class="action-button save"
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
import appButton from '@/components/shared/buttons/app-button';
import appInput from '@/components/shared/inputs/app-input';
import appSelect from '@/components/shared/inputs/app-select';
import cameraComponent from '@/components/shared/icons/camera-component';
import editComponent from '@/components/shared/icons/edit-component';

function goBack() {
	this.$router.back();
}

function loadAvatar() {}

function data() {
	return {
		colorBase: process.env.COLOR_BASE,
		colorSecondary: process.env.COLOR_SECONDARY,
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
	data,
	methods: {
		goBack,
		loadAvatar,
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
		margin-bottom: 20px;
		margin-left: 40px;
	}

	.section-title {
		color: color(primary);
		font-family: font(bold);
		font-size: size(large);
		margin-bottom: 50px;
		margin-left: 40px;
		text-transform: uppercase;

		@media (max-width: 500px) {
			margin-bottom: 20px;
		}
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

