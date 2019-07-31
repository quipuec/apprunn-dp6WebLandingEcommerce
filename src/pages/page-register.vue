<template>
	<div>
		<form-container
			:background-image="backgroundImage"
			:color="baseColor"
			:disabled="disabled"
			:heading-image="headingImage"
			:img-height="width > 768 ? '39.3' : '38'"
			title="Crear Cuenta"
			@on-click="createAccount"
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

	async function createAccount() {
		debugger;
		const body = { ...this.model };
		body.codeApp = process.env.APP_CODE;
		body.codeCompany = process.env.ACL_COMPANY_CODE;
		body.codeProject = process.env.CODE_PROJECT;
		body.codeRole = process.env.ROLEBASIC;
		try {
			await this.$httpSales.post('customers-public', body);
			this.showNotification('La cuenta ha sido creada exitosamente.');
		} catch (err) {
			this.showGenericError();
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
			this[model] = value.target.value;
		} else {
			if (model === 'password') {
				this[model] = value.target.value;
			}
			this.model[model] = value.target.value;
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