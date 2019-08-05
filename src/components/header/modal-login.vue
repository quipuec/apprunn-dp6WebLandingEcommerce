<template>
	<div class="modal-login">
		<div>
			<span class="label-modal">¿Tienes una cuenta?</span>
			<app-button 
				:background="colorBase"
				action="Iniciar Sesión"
				thin
				class="mb-3"
				@click="goToPag('login')"
				/>
			<span class="label-modal">¿No tienes una cuenta?</span>
			<app-button 
				background="white"
				action="Crear cuenta"
				:color="colorBorder"
				:border="colorBorder"
				@click="goToPag('register')"
				thin/>
		</div>
	</div>
</template>
<script>
const appButton = () => import('@/components/shared/buttons/app-button');

function goToPag(name) {
	this.goTo(name);
	this.$emit('close-modal');
}

function data() {
	return {
		colorBase: process.env.COLOR_BASE,
		colorBorder: process.env.COLOR_BORDER,
	};
}

export default {
	name: 'modal-login',
	data,
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


