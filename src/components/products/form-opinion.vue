<template>
	<form class="form-option">
		<div>
			<div class="form-title">CALIFICANOS</div>
			<v-rating
				background-color="#f8e71c"
				color="#f8e71c"
				v-model="value"
			>
			</v-rating>
		</div>
		<div class="form-group">
			<textarea
				placeholder="Describe Tu experiencia"
				v-model="model.description"
				class="form-textarea"
			/>
			<app-button
				:background="globalColors.primary"
				action="Enviar"
				class="form-btn"
				type="button"
				:class="{'disabled': disabledBtn}"
				:disabled="disabledBtn"
				@click="sendOpinion"
			/>
		</div>
	</form>
</template>
<script>
import { mapGetters } from 'vuex';

const appButton = () => import('@/components/shared/buttons/app-button');

function data() {
	return {
		value: null,
		model: {
			description: null,
			name: null,
			avatar: null,
		},
	};
}

function disabledBtn() {
	return !(this.model.description && this.value);
}

async function sendOpinion() {
	if (!this.token) {
		this.showGenericError('Para realizar una opinión tiene que registrarse');
	} else {
		const idProduct = this.$route.params.id;
		const body = {
			description: this.model.description,
			typeQuestionAnswer: 3,
			rating: this.value,
			additionalInformation: {
				customerImage: this.user.urlImage,
				name: `${this.user.name} ${this.user.lastname}`,
			},
		};
		try {
			await this.$httpProducts.post(`question-answer/${idProduct}/product`, body);
			this.clearForm();
			this.$emit('update');
		} catch (error) {
			this.showGenericError();
		}
	}
}

function clearForm() {
	this.model.description = null;
	this.value = null;
}

export default {
	name: 'form-opinion',
	data,
	components: {
		appButton,
	},
	computed: {
		disabledBtn,
		...mapGetters([
			'token',
			'user',
		]),
	},
	methods: {
		sendOpinion,
		clearForm,
	},
};
</script>
<style lang="scss">
	.form-option {
		display: flex;
		justify-content: space-between;
		margin-bottom: 34px;

		.form-title {
			font-family: font(demi);
			font-size: size(small);
			margin-bottom: 0px;
			padding-left: 0.5rem;

			@media screen and (max-width: 996px) {
				text-align: center;
			}
		}

		@media screen and (max-width: 996px) {
			align-items: center;
			flex-direction: column;
		}
	}

	.form-group {
		width: 70%;

		@media screen and (max-width: 996px) {
			width: 100%;
		}
	}

	.form-textarea {
		background: color(disabled);
		border: 1px solid color(border);
		border-radius: 4px;
		font-family: font(regular);
		font-size: size(medium);
		height: 86px;
		margin-bottom: 18px;
		outline: none;
		padding: 12px;
		resize: none;
		width: 100%;
	}

	.form-btn {
		margin-left: auto;
		width: 127px;

		&.disabled {
			opacity: 0.2;
		}

		@media screen and (max-width: 996px) {
			margin: auto;
		}
	}
</style>

