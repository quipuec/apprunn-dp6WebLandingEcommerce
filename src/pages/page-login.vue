<template>
	<div>
		<form-container
			facebook
			:background-image="backgroundImage"
			:color="globalColors.primary"
			:disabled="disabled"
			:heading-image="headingImage"
			:img-height="width > 768 ? '39.3' : '38'"
			title="Iniciar Sesión"
			@on-submit="initSession"
			@on-authenticate="authenticate"
		>
			<login-form
				:model="model"
				:validatons="$v"
				@set-model="setModel"
			></login-form>
		</form-container>
	</div>
</template>

<script>
	import { email, required } from 'vuelidate/lib/validators';
	import formContainer from '@/components/shared/account/form-container';
	import loginForm from '@/components/shared/account/login-form';

	function created() {
		this.setWidth();
		if (this.$route.params.tokenValidate) {
			this.tokenVerification(this.$route.params.tokenValidate);
		}
	}

	async function aclAuthentication(params) {
		const body = {
			email: params.email,
			codeApp: process.env.APP_CODE,
			provider: 2,
			extUserId: params.id,
		};
		try {
			const { data: response } = await this.$httpAcl.post('signin/auth', body);
			if (response.msg === 'USER_NOT_FOUND') {
				this.goTo('register', { query: params });
			} else if (response.msg === 'USER_NOT_VALIDATED') {
				this.showNotification(
					'Se le ha enviado un correo para la validación de su cuenta.',
					'info',
				);
				({ email: this.model.email } = params);
				this.model.password = null;
			} else if (response.data && response.data.token) {
				localStorage.clear();
				localStorage.setItem(`${process.env.STORAGE_USER_KEY}::token`, response.data.token);
				this.$store.dispatch('setToken', response.data.token);
				this.getCustomerData();
				this.$store.dispatch('UPDATE_PRODUCT_FILTER', this.getFilters[0].id);
				this.$store.dispatch('LOAD_PRODUCTS', { context: this });
				this.goTo('page-home');
			}
		} catch (err) {
			this.showGenericError();
		}
	}

	async function afterAuthenticate() {
		try {
			const token = this.$auth.getToken();
			const { data: response } = await this.$http.get(
				'https://graph.facebook.com/v4.0/me?fields=id,email,first_name,last_name',
				{ params: { access_token: token } },
			);
			this.aclAuthentication(response);
		} catch (err) {
			this.showGenericError();
		}
	}

	async function authenticate(provider) {
		try {
			await this.$auth.authenticate(provider);
			this.afterAuthenticate();
		} catch (err) {
			this.showGenericError();
		}
	}

	function cleanForm() {
		this.model = {
			email: null,
			lastname: null,
			name: null,
			password: null,
		};
	}

	function disabled() {
		return this.$v.$invalid || this.loading;
	}

	async function getCustomerData() {
		const headers = {
			Authorization: `Bearer ${this.token}`,
		};
		const { data: userInfo } = await this.$httpSales.get('customers/current', { headers });
		userInfo.avatar = userInfo.urlImage || process.env.DEFAULT_AVATAR;
		userInfo.fullName = userInfo.typePerson.fullName;
		userInfo.showCustomerDiscountMessage = true;
		this.$store.dispatch('setUser', userInfo);
	}

	async function initSession() {
		this.loading = true;
		const body = { ...this.model };
		const headers = {
			Authorization: `Bearer ${process.env.TOKEN}`,
		};
		body.codeApp = process.env.APP_CODE;
		try {
			const { data: response } = await this.$httpAcl.post(
				'authenticate',
				body,
				{ headers },
			);
			const { token } = response;
			if (token) {
				localStorage.clear();
				localStorage.setItem(`${process.env.STORAGE_USER_KEY}::token`, token);
				this.$store.dispatch('setToken', token);
				this.$store.dispatch('SET_CURRENCY_DEFAULT', this);
				this.$store.dispatch('LOAD_COMMERCE_INFO', this);
				this.getCustomerData();
				this.cleanForm();
				this.goTo('page-home');
			}
		} catch (err) {
			if (err.status === 500) {
				this.showGenericError();
			}
		} finally {
			this.loading = false;
		}
	}

	function mounted() {
		window.addEventListener('resize', this.setWidth);
	}

	function setModel({ model, value }) {
		this.model[model] = value;
	}

	function setWidth() {
		this.width = window.innerWidth;
	}

	async function tokenVerification(token) {
		const headers = {
			Authorization: `Bearer ${token}`,
		};
		try {
			await this.$httpAcl.post('confirm/email', null, { headers });
			this.showNotification('Su cuenta ha sido activada, ingrese sus datos.');
		} catch (err) {
			if (err.status === 500) {
				this.showGenericError();
			} else if (err.status === 401) {
				if (err.data.message === 'TOKEN_HAS_EXPIRED') {
					this.showGenericError('El enlace ha expirado. Se le ha enviado un nuevo enlace al correo.');
				}
			}
		}
	}

	function validations() {
		return {
			model: {
				email: {
					required,
					email,
				},
				password: {
					required,
				},
			},
		};
	}

	function data() {
		return {
			backgroundImage: process.env.FORM_BACKGROUND,
			headingImage: '/static/img/sign-in.svg',
			loading: false,
			model: {
				email: null,
				password: null,
			},
			params: {},
			width: 0,
		};
	}

	export default {
		name: 'page-login',
		components: {
			formContainer,
			loginForm,
		},
		computed: {
			disabled,
		},
		created,
		data,
		methods: {
			aclAuthentication,
			afterAuthenticate,
			authenticate,
			cleanForm,
			getCustomerData,
			initSession,
			setModel,
			setWidth,
			tokenVerification,
		},
		mounted,
		props: {
			tokenValidate: null,
		},
		validations,
	};
</script>
