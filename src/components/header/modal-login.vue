<template>
	<div class="modal-login">
		<div>
			<span class="label-modal">¿Tienes una cuenta?</span>
			<app-button 
				thin
				class="mb-3"
				@click="goToPag('login')"
				action="Iniciar Sesión"
				:background="globalColors.primary"
				/>
			<span class="label-modal">¿No tienes una cuenta?</span>
			<app-button 
				thin
				background="white"
				action="Crear cuenta"
<<<<<<< HEAD
				:color="colorBorder"
				:border="colorBorder"
				@click="goTo('register')"
=======
				:color="globalColors.base"
				:border="globalColors.base"
				@click="goToPag('register')"
>>>>>>> 4749de324f71e736ee3ad585fcb85169cf7d0b34
			/>
		</div>
	</div>
</template>
<script>
const appButton = () => import('@/components/shared/buttons/app-button');

function goToPag(name) {
	this.goTo(name);
	this.$emit('close-modal');
}

export default {
	name: 'modal-login',
	components: {
		appButton,
	},
	methods: {
		goToPag,
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
		height: 190px;
		justify-content: center;
		width: 246px;
	}

	.label-modal {
		color: color(base);
		font-family: font(regular);
		font-size: size(xsmall);
	}
</style>


