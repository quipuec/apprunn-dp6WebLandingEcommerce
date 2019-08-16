<template>
  <div>
		<form-container
			:background-image="backgroundImage"
			:color="globalColors.base"
			:disabled="false"
			:heading-image="headingImage"
			:img-height="width > 768 ? '39.3' : '38'"
			title="¿Olvidaste tu <br> contraseña?"
		>
			<P>KAKAKA</P>
		</form-container>
	</div>
</template>
<script>
	const formContainer = () => import('@/components/shared/account/form-container');
	const loginForm = () => import('@/components/shared/account/login-form');

	function mounted() {
		window.addEventListener('resize', this.setWidth);
	}

	function created() {
		this.setWidth();
	}

	function setWidth() {
		this.width = window.innerWidth;
	}

	function data() {
		return {
			backgroundImage: process.env.FORM_BACKGROUND,
			headingImage: '/static/img/sign-in.svg',
			width: 0,
		};
	}

	export default {
		name: 'page-restore-password',
		components: {
			formContainer,
			loginForm,
		},
		created,
		data,
		methods: {
			setWidth,
		},
		mounted,
	};
</script>