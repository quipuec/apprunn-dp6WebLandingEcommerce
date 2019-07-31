<template>
	<div>
		<form-container
			:background-image="backgroundImage"
			:color="baseColor"
			:disabled="disabled"
			:heading-image="headingImage"
			:img-height="width > 768 ? '39.3' : '38'"
			title="Crear Cuenta"
			@on-submit="createAccount"
		>
			<register-form
				:check-color="baseColor"
				:flag-tyc="flagTyc"
				:model="model"
				:password-verified="passwordVerified"
				:validatons="$v"
				@set-model="setModel"
			></register-form>
		</form-container>
	</div>
</template>

<script>
	import { email, required, sameAs } from 'vuelidate/lib/validators';

	const formContainer = () => import('@/components/shared/account/form-container');
	const registerForm = () => import('@/components/shared/account/register-form');

	function created() {
		this.setWidth();
	}

	function cleanForm() {
		this.flagTyc = false;
		this.model = {
			email: null,
			lastname: null,
			name: null,
			password: null,
		};
		this.password = null;
		this.passwordVerified = null;
	}

	async function createAccount() {
		this.loading = true;
		const body = { ...this.model };
		const headers = {
			Authorization: `Bearer ${process.env.TOKEN}`,
		};
		body.codeApp = process.env.APP_CODE;
		body.codeProject = process.env.CODE_PROJECT;
		body.codeRole = process.env.ROLE_CODE;
		try {
			await this.$httpSales.post('customers-public', body, { headers });
			this.cleanForm();
			this.showNotification('La cuenta ha sido creada exitosamente.');
			const self = this;
			setTimeout(() => {
				self.showNotification('Se le ha enviado un correo electrónico para validar su cuenta.');
			}, 5050);
		} catch (err) {
			if (err.status === 400) {
				if (err.data.message === 'CUSTOMER_EXIST_ERROR') {
					this.showGenericError('El email ya ha sido registrado.');
				}
			} else if (err.status === 500) {
				this.showGenericError();
			}
		} finally {
			this.loading = false;
		}
	}

	function disabled() {
		return this.$v.$invalid || this.loading;
	}

	function mounted() {
		window.addEventListener('resize', this.setWidth);
	}

	function setModel({ model, value }) {
		if (model === 'passwordVerified' || model === 'flagTyc') {
			this[model] = value;
		} else {
			if (model === 'password') {
				this[model] = value;
			}
			this.model[model] = value;
		}
	}

	function setWidth() {
		this.width = window.innerWidth;
	}

	function validations() {
		return {
			model: {
				email: {
					required,
					email,
				},
				lastname: {
					required,
				},
				name: {
					required,
				},
				password: {
					required,
				},
			},
			passwordVerified: {
				required,
				sameAsPassword: sameAs('password'),
			},
		};
	}

	function data() {
		return {
			backgroundImage: process.env.FORM_BACKGROUND,
			baseColor: process.env.COLOR_BASE,
			flagTyc: false,
			headingImage: '/static/img/sign-up.svg',
			loading: false,
			model: {
				email: null,
				lastname: null,
				name: null,
				password: null,
			},
			password: null,
			passwordVerified: null,
			width: 0,
		};
	}

	export default {
		name: 'page-register',
		components: {
			formContainer,
			registerForm,
		},
		computed: {
			disabled,
		},
		created,
		data,
		methods: {
			cleanForm,
			createAccount,
			setModel,
			setWidth,
		},
		mounted,
		validations,
	};
</script>

<style lang="scss" scoped>

</style>