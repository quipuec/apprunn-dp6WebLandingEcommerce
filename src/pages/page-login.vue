<template>
	<layout-login>
		<div class="main-login" :style="`background-image: url(${companyBgUrl})`">
			<div class="background-opacity"></div>
			<section class="login">
				<div class="login-logo">
					<img
						src="/static/img/icons/logo-praktico.svg"
						alt="praktiko logo"
						height="131"
						width="345"
					>
				</div>
				<form class="login-inputs" id="login-form" @submit.prevent="signin">
					<v-layout wrap align-center justify-center>
						<v-flex xs12>
							<v-text-field
								autocomplete="off"
								background-color="transparent"
								box
								class="login-input"
								:height="48"
								hide-details
								placeholder="Email/Usuario"
								type="email"
								v-model="user"
							></v-text-field>
						</v-flex>
						<v-flex xs12 pt-2>
							<v-text-field
								autocomplete="off"
								background-color="transparent"
								box
								class="login-input"
								:height="48"
								hide-details
								placeholder="Contraseña"
								type="password"
								v-model="password"
							>
							</v-text-field>
							<v-tooltip right name="none">
								<v-icon slot="activator" class="icon-eyes">visibility</v-icon>
							</v-tooltip>
						</v-flex>
					</v-layout>
				</form>
				<div class="login-footer">
					<v-btn type="submit"
						form="login-form"
						class="login-btn"
						:loading="isLoading"
						:class="{ disabled: isLoading }"
						accesskey="13"
						:disabled="isLoading"
					>
						Iniciar Sesión
					</v-btn>
				</div>
				<a href="">
					<p class="text-password">¿Olvidaste tu contraseña?</p>
				</a>
			</section>
		</div>
	</layout-login>
</template>

<script>
import helper from '@/shared/helper';

const { getLocalData } = helper;

async function signin() {
	const surveyId = getLocalData('surveyId');
	window.localStorage.clear();
	this.isLoading = true;
	const userData = {
		email: this.user,
		password: this.password,
		codeApp: process.env.APP_CODE,
	};
	try {
		const response = await this.$httpAcl.post('authenticate', userData);
		const user = response.data;
		const inLocalStorage = JSON.stringify(user);
		const { token, codeProject, codeUser } = user;
		const theme = JSON.stringify({
			primary: '#487fff',
			secondary: '#545a54',
			success: '#5ed52b',
			white: '#ffffff',
			gray: '#e9e9e9',
			info: '#606560',
			accent: '#005CAF',
			error: '#f42b17',
			warning: '#FFB74C',
		});
		localStorage.setItem(`${process.env.STORAGE_USER_KEY}::token`, token);
		this.$store.dispatch('setToken', token);
		if (surveyId) {
			localStorage.setItem(`${process.env.STORAGE_USER_KEY}::surveyId`, surveyId);
		}
		localStorage.setItem(process.env.STORAGE_USER_KEY, inLocalStorage);
		localStorage.setItem(`${process.env.STORAGE_USER_KEY}::codeProject`, codeProject);
		localStorage.setItem(`${process.env.STORAGE_USER_KEY}::codeUser`, codeUser);
		localStorage.setItem(`${process.env.STORAGE_USER_KEY}::theme`, theme);
		this.getUserData();
	} catch (e) {
		this.$store.dispatch('showSnackBar', {
			text: 'Sus credenciales no son válidas',
			color: 'error',
		});
	} finally {
		this.isLoading = false;
	}
}

async function getUserData() {
	const surveyId = getLocalData('surveyId');
	try {
		const { data: response } = await this.$httpPraktiko.get('employee/current');
		const responseString = JSON.stringify(response);
		localStorage.setItem(`${process.env.STORAGE_USER_KEY}::praktiko-user`, responseString);
		this.$store.dispatch('setUser', response);
		if (Number(response.flagAdmin) !== 1) {
			if (surveyId) {
				this.goTo('page-polls', { params: { id: surveyId } });
			} else {
				this.goTo('survey');
			}
		} else {
			this.goTo('working-environment');
		}
	} catch (err) {
		if (err.status === 500) {
			this.showGenericError();
		}
	}
}

function data() {
	return {
		companyBgUrl: '/static/img/login/background-praktiko.jpg',
		companyLoginLogo: process.env.COMPANY_LOGIN_LOGO,
		user: '',
		password: '',
		isLoading: false,
	};
}

export default {
	name: 'page-login',
	data,
	methods: {
		getUserData,
		signin,
	},
};
</script>

<style lang="scss" scoped>
.text-password {
	border-style: none;
	color: map-get($colors, primary);
	font-size: map-get($sizes, medium);
	margin-top: 20.5px;
	text-align: center;
	text-decoration: none !important;
}

.main-login {
	@include flex-around;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 100vh;

	.login {
		left: 150px;
		position: absolute;
		text-align: center;
		width: 315px;
		z-index: 5;

		.login-logo {
			margin-bottom: 91px;
		}

		.login-header {
			color: map-get($colors, white);
			font-family: map-get($fonts, lato-regular);
			font-size: map-get($sizes, medium22);
			margin: 0 auto 54px;
			width: 314px;
		}

		.login-inputs {
			font-size: 24px;
			margin-bottom: 30px;
			position: relative;
			width: 100%;

			.login-inputs-txt {
				@include flex-space-between;

				.login-inputs-group {
					width: 90%;

					.login-input {
						@include txt-config(open-regular, medium16);
						color: map-get($colors, white);
						height: 60px;
						outline: none;
						width: 100%;
					}

					.login-error-message {
						@include txt-config(open-regular, small);
						color: map-get($colors, red-error);
						float: left;
					}
				}
			}

			.login-spacer {
				border: 1px solid map-get($colors, subheaderText);
				opacity: 0.7;
				width: 100%;
			}
		}

		.login-footer {
			@include flex-around;

			.login-footer-pass {
				color: map-get($colors, blue-btn);
				font-family: map-get($fonts, open-regular);
				font-size: map-get($sizes, medium16);
			}

			.login-btn {
				background-color: map-get($colors, primary);
				@include btn(
					#37abd0,
					white,
					100px,
					48px,
					280px,
					auto,
					center,
					lato-bold,
					medium18
				);
				outline: none;
			}

			.login-btn:active {
				@include active-btn;
				font-size: 18px !important;
			}

			.disabled {
				@include btn(
					white,
					#37abd0,
					100px,
					48px,
					280px,
					auto,
					center,
					lato-bold,
					medium18
				);
			}
		}
	}
	
	.login-info {
		.login-info-text {
			color: map-get($colors, white);
			font-family: map-get($fonts, lato-regular);
			font-size: map-get($sizes, medium18);
			margin-bottom: 30px;
		}

		.login-info-btn {
			@include btn(
				blue-btn,		
				white,
				5px,
				45px,
				127px,
				auto,
				center,
				lato-regular,
				large
			);
			cursor: pointer;
			display: block;
			text-decoration: none !important;
		}

		.login-info-btn:active {
			@include active-btn;
		}
	}
}

@keyframes autofill {
	to {
		color: white;
		background: transparent;
	}
}

input:-webkit-autofill {
	animation-name: autofill;
	animation-fill-mode: both;
	background-color: transparent !important;
}

.background-opacity {
	background-image: linear-gradient(280deg, rgba(255, 255, 255, 0.41),
		rgba(255, 255, 255, 0.96) 76%,
		rgba(255, 255, 255, 0.96));
	bottom: 0;
	left: 0;
	position: absolute;
	right: 0;
	top: 0;	
}

.icon-eyes {
	position: absolute;
	top: 70px;
	right: 20px;
}
</style>
