<template>
	<div class="modal-login">
		<div>
			<span class="label-modal">¿Tienes una cuenta?</span>
			<app-button 
				background="#f01d1d"
				action="Iniciar Sesión"
				thin
				class="mb-3"
				/>
			<span class="label-modal">¿No tienes una cuenta?</span>
			<app-button 
				background="white"
				action="Crear cuenta"
				color="#4a4a4a"
				border="#e6e6e6"
				thin/>
		</div>
	</div>
</template>
<script>
import appButton from '@/components/shared/buttons/app-button';

export default {
	name: 'modal-login',
	components: {
		appButton,
	},
};
</script>
<style lang="scss" scoped>
	.modal-login {
		align-items: center;
		background-color: color(white);
		border-radius: 7px;
		box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.18);
		display: flex;
		justify-content: center;
		height: 190px;
		width: 246px;
	}

	.label-modal {
		color: color(base);
		font-family: font(regular);
	}
</style>


