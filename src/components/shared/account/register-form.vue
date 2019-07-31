<template>
	<div class="register-form">
		<v-layout wrap align-start justify-center>
			<v-flex xs5 pr-2 pb-2 text-xs-left>
				<app-input
					placeholder="Nombre"
					:value="model.name"
					@input="$emit('set-model', { model: 'name', value: $event.target.value })"
				></app-input>
				<span class="error-message" v-if="validatons.model.name.$invalid">
					El nombre es requerido
				</span>
			</v-flex>
			<v-flex xs7 pb-2 text-xs-left>
				<app-input
					placeholder="Apellidos"
					:value="model.lastname"
					@input="$emit('set-model', { model: 'lastname', value: $event.target.value })"
				></app-input>
				<span class="error-message" v-if="validatons.model.lastname.$invalid">
					El apellido es requerido
				</span>
			</v-flex>
			<v-flex xs12 pb-2 text-xs-left>
				<app-input
					type="email"
					placeholder="E-mail"
					:value="model.email"
					@input="$emit('set-model', { model: 'email', value: $event.target.value })"
				></app-input>
				<span class="error-message" v-if="!validatons.model.email.required">
					El email es requerido
				</span>
				<span class="error-message" v-if="!validatons.model.email.email">
					Ingrese un email válido
				</span>
			</v-flex>
			<v-flex xs12 pb-2 text-xs-left>
				<app-input
					type="password"
					placeholder="Contraseña"
					:value="model.password"
					@input="$emit('set-model', { model: 'password', value: $event.target.value })"
				></app-input>
				<span class="error-message" v-if="validatons.model.password.$invalid">
					La contraseña es requerida
				</span>
			</v-flex>
			<v-flex xs12 text-xs-left>
				<app-input
					type="password"
					placeholder="Verificar contraseña"
					:value="passwordVerified"
					@input="$emit('set-model', { model: 'passwordVerified', value: $event.target.value })"
				></app-input>
				<span class="error-message" v-if="!validatons.passwordVerified.required">
					Vuelva a escribir la contraseña
				</span>
				<span class="error-message" v-else-if="!validatons.passwordVerified.sameAsPassword">
					Las contraseñas no coinciden
				</span>
			</v-flex>
			<v-flex xs12 text-xs-left>
				<v-checkbox
					class="form-check"
					:value="flagTyc"
					:color="checkColor"
					hide-details
					@change="$emit('set-model', { model: 'flagTyc', value: $event })"
				>
					<label slot="label" class="form-label">
						Aceptar
						<router-link to="#">Términos y Condiciones</router-link>
					</label>
				</v-checkbox>
			</v-flex>
		</v-layout>
	</div>
</template>

<script>
	const appInput = () => import('@/components/shared/inputs/app-input');

	/* eslint-disable arrow-body-style */

	export default {
		name: 'register-form',
		components: {
			appInput,
		},
		props: {
			checkColor: String,
			flagTyc: {
				default: false,
				type: Boolean,
			},
			model: {
				default: () => {},
				type: Object,
			},
			password: [Number, String],
			passwordVerified: [Number, String],
			validatons: {
				default: () => {
					return {
						model: {
							email: {},
							lastname: {},
							name: {},
							password: {},
						},
						passwordVerified: {},
					};
				},
				type: Object,
			},
		},
	};
</script>

<style lang="scss" scoped>
	.register-form {
		padding: 19.9px 30px 15.4px;

		@media (min-width: 768px) {
			padding: 16px 36px 30px;
		}
	}

	.form-label {
		color: color(border);
		font-family: font(demi);
		font-size: size(xsmall);
	}

	.form-check {
		margin-top: 9px !important;
		padding-top: 0px !important;

		@media (min-width: 768px) {
			margin-top: 13px !important;
		}
	}

	.error-message {
		color: color(primary);
		font-size: size(xsmall);
	}
</style>