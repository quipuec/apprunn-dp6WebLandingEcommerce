<template>
	<div class="form-option">
		<div>
			<div class="form-title">CALIFICANOS</div>
			<v-rating
				background-color="#ffcc03" 
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
				:disabled="disabledBtn"
				@click="sendOpinion"
			/>
		</div>
	</div>
</template>
<script>
// import { mapGetters } from 'vuex';
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
	// if (!this.token) {
	// 	this.$message({
	// 		message: 'Para realizar una opinión tiene que registrarse',
	// 		showClose: true,
	// 		type: 'error',
	// 	});
	// } else {
	// 	const idProduct = this.$route.params.id;
	// 	const token = this.token;
	// 	const headers = {
	// 		Authorization: `Bearer ${token}`,
	// 	};
	// 	const body = {
	// 		description: this.model.description,
	// 		typeQuestionAnswer: 3,
	// 		rating: this.value,
	// 		additionalInformation: {
	// 			customerImage: this.model.avatar,
	// 			name: this.model.name,
	// 		},
	// 	};
	// 	try {
	// 		await this.$httpQtc.post(`question-answer/${idProduct}/product`, body, { headers });
	// 		this.clearForm();
	// 		this.$emit('update');
	// 	} catch (error) {
	// 		this.$message({
	// 			message: 'Error',
	// 			showClose: true,
	// 			type: 'error',
	// 		});
	// 	}
	// }
}

// function clearForm() {
// 	this.model.description = null;
// 	this.value = null;
// }


// function setData(value) {
// 	if (value) {
// 		setTimeout(() => {
// 			const dataNew = this.getUserInfo;
// 			this.model.name = dataNew.fullName;
// 			this.model.avatar = this.$store.state.user.avatar;
// 		}, 300);
// 	} else {
// 		this.clearForm();
// 	}
// }

// function created() {
// 	if (this.token) {
// 		const dataNew = this.getUserInfo;
// 		this.model.name = dataNew.typePerson.fullName;
// 		this.model.avatar = this.$store.state.user.avatar;
// 	}
// }

export default {
	name: 'form-opinion',
	data,
	components: {
		appButton,
	},
	computed: {
		disabledBtn,
		// ...mapGetters([
		// 	'token',
		// 	'getUserInfo',
		// ]),
	},
	// created,
	methods: {
		sendOpinion,
		// clearForm,
	},
	watch: {
		// token: setData,
	},
};
</script>
<style lang="scss">
	.form-option {
		display: flex;
		justify-content: space-between;
		margin: 34px 0;

		.form-title {
			font-family: font(demi);
			font-size: size(small);
			margin-bottom: 15px;
		}
	}

	.form-group {
		width: 70%;
	}

	.form-textarea {
		background: color(gray);
		border: 1px solid color(border);
		border-radius: 4px;
		font-family: font(demi);
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
	}
</style>

