<template>
  <div>
		<form-container
			:background-image="backgroundImage"
			:color="globalColors.primary"
			:disabled="disabled"
			:heading-image="headingImage"
			:img-height="width > 768 ? '39.3' : '38'"
			title="¿Olvidaste tu <br> contraseña?"
			title-btn="Enviar"
			@on-submit="restorePassword"
		>
			<div v-if="isVisibleMessage">
				<img src="" alt="">
				<span>Se le ha enviado un correo electrónico con instrucciones 
					para crear una nueva contraseña</span>
			</div>
			<restore-form
				v-else
				:model="model"
				:validatons="$v"
				@set-model="setModel"/>
		</form-container>
	</div>
</template>
<script>
	import { email, required } from 'vuelidate/lib/validators';

	const formContainer = () => import('@/components/shared/account/form-container');
	const restoreForm = () => import('@/components/shared/account/restore-form');

	function mounted() {
		window.addEventListener('resize', this.setWidth);
	}

	function created() {
		this.setWidth();
	}

	function setWidth() {
		this.width = window.innerWidth;
	}

	function setModel({ model, value }) {
		this.model[model] = value;
	}

	function validations() {
		return {
			model: {
				email: {
					required,
					email,
				},
			},
		};
	}

	function disabled() {
		return this.$v.$invalid;
	}

	async function restorePassword() {
		const body = {
			email: this.model.email,
			codeApp: process.env.APP_CODE,
		};
		try {
			await this.$httpAcl.post('password/email', body);
			this.isVisibleMessage = true;
		} catch (err) {
			if (err.status === 400) {
				if (err.data.message === 'CUSTOMER_NOT_FOUND') {
					this.showGenericError('El usuario no existe');
				}
			} else {
				this.showGenericError();
			}
		}
	}

	function data() {
		return {
			backgroundImage: process.env.FORM_BACKGROUND,
			headingImage: '/static/img/sign-in.svg',
			width: 0,
			model: {
				email: null,
			},
			loading: false,
			isVisibleMessage: false,
		};
	}

	export default {
		name: 'page-restore-password',
		components: {
			formContainer,
			restoreForm,
		},
		computed: {
			disabled,
		},
		created,
		data,
		methods: {
			setWidth,
			setModel,
			restorePassword,
		},
		mounted,
		validations,
	};
</script>