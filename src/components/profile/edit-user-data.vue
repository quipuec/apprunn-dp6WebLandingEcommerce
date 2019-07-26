<template>
	<div>
		<section class="user-header">
			<edit-component class="mr-3"/>
			<camera-component @click="loadAvatar"/>
		</section>
		<section>
			<h3 class="section-title">Mis datos personales</h3>
		</section>
		<div class="form-container">
			<form class="user-form">
				<app-input class="user-name" placeholder="Nombre"/>
				<app-input class="user-dni" placeholder="DNI"/>
				<app-input class="user-lastname" placeholder="Apellido"/>
				<app-input class="user-ruc" placeholder="RUC"/>
				<app-input class="user-gender" placeholder="Género"/>
				<app-input class="user-postcode" placeholder="Código postal"/>
				<app-input class="user-department" placeholder="Departamento"/>
				<app-input class="user-phone" placeholder="Teléfono"/>
				<app-input class="user-district" placeholder="Distrito"/>
				<app-input class="user-email" placeholder="Correo"/>
			</form>
			<section class="btn-section">
				<app-button save action="Guardar" class="action-button save"/>
				<app-button cancel action="Cancelar" class="action-button cancel"/>
			</section>
		</div>
	</div>
</template>
<script>

function loadAvatar() {}

export default {
	name: 'edit-user-profile',
	components: {
		appButton: () => import('@/components/shared/buttons/app-button'),
		appInput: () => import('@/components/shared/inputs/app-input'),
		cameraComponent: () => import('@/components/shared/icons/camera-component'),
		editComponent: () => import('@/components/shared/icons/edit-component'),
	},
	methods: {
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
			.user-name, .user-lastname, .user-ruc, .user-email {
				grid-column: 1/3;
			}

			.user-lastname {
				grid-row: 2;
			}

			.user-dni, .user-gender {
				grid-row: 3;
			}

			.user-department, .user-district {
				grid-row: 4;
			}

			.user-ruc {
				grid-row: 5;
			}

			.user-postcode, .user-phone {
				grid-row: 6;
			}

			.user-email {
				grid-row: 7;
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

