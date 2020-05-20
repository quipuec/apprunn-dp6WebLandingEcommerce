<template>
<div>
	<button
		type="button"
		class="yape-btn"
		:style="`border:1px solid ${globalColors.base}`"
		@click="show = !show"
	>
		<span class="yape-btn-content">Pague con: </span>
		<img
			src="https://lh3.googleusercontent.com/y5S3ZIz-ohg3FirlISnk3ca2yQ6cd825OpA0YK9qklc5W8MLSe0NEIEqoV-pZDvO0A8=s180-rw"
			alt="logo_yape"
		>
	</button>
	<modal v-model="show" max-width="fit-content">
		<div class="yape-modal-container">
			<div class="modal-close">
				<button type="button" @click="show = false">X</button>
			</div>
			<div class="modal-header">
				<img
					src="https://lh3.googleusercontent.com/y5S3ZIz-ohg3FirlISnk3ca2yQ6cd825OpA0YK9qklc5W8MLSe0NEIEqoV-pZDvO0A8=s180-rw"
					alt="logo_yape"
				>
				<ol>
					<li>
						<span class="bold">Escanea</span> el QR.</li>
					<li>
						<span class="bold">Ingresa</span> el monto a pagar y listo.</li>
				</ol>
			</div>
			<div class="modal-amount">
				<span class="amount-title">Monto a pagar</span>
				<output
					class="amount"
					:style="`color:${globalColors.title}`"
				>S/ 115.00</output>
			</div>
			<div class="modal-qr">
				<img :src="urlImage" alt="yape_qr">
			</div>
			<div class="modal-send">
				<app-input
					placeholder="Número de celular"
					class="mx-2 phone-number"
					v-model="phone"
				>
					<small
						v-if="!phone"
						class="validate-text"
					>El número de celular es requerido</small>
				</app-input>
				<button
					:disabled="!phone"
					type="button"
					:style="`background-color:${globalColors.secondary}`"
				>Enviar</button>
			</div>
		</div>
	</modal>
</div>
</template>
<script>
import modal from '@/components/shared/modal/modal-component';
import appInput from '@/components/shared/inputs/app-input';

function data() {
	return {
		phone: '',
		show: false,
	};
}
export default {
	name: 'yape-component',
	components: {
		appInput,
		modal,
	},
	data,
	props: {
		urlImage: {
			required: true,
			type: String,
		},
	},
};
</script>
<style lang="scss" scoped>
.yape-btn {
	align-items: center;
	background-color: white;
	border-radius: 12px;
	display: flex;
	justify-content: space-between;
	padding: 10px 20px;
	transition: background-color, color 150ms ease-in-out;
	width: 180px;

	.yape-btn-content {
		font-family: font(bold);
		font-size: size(large);
	}

	img {
		border-radius: 50%;
		height: 45px;
		width: 45px;
	}

	&:hover {
		background-color: #7D349B;
		color: white;
	}
}

.yape-modal-container {
	align-items: center;
	background-color: white;
	border-radius: 10px;
	display: flex;
	flex-direction: column;
	font-family: font(regular);
	padding: 30px;

	.modal-close {
		align-items: center;
		color: #7D349B;
		display: flex;
		font-family: font(bold);
		justify-content: flex-end;
		width: 100%;

		button {
			font-size: 30px;
			height: 30px;
			width: 30px;
		}
	}

	.modal-header {
		align-items: center;
		display: flex;
		justify-content: space-between;

		img {
			border-radius: 50%;
			height: 65px;
			width: 65px;
		}
	}

	.modal-amount {
		align-items: center;
		display: flex;
		flex-direction: column;

		.amount-title {
			font-size: size(large);
		}

		.amount {
			font-family: font(bold);
			font-size: size(sbig);
		}
	}

	.modal-qr {
		align-items: center;
		border: 2px solid #7D349B;
		border-radius: 28px;
		display: flex;
		height: 230px;
		justify-content: center;
		margin: 25px 0;
		padding: 20px;
		width: 220px;

		img {
			height: 100%;
			width: 100%;
		}
	}

	.modal-send {
		align-items: flex-start;
		display: flex;
		height: 46px;

		.phone-number {
			width: 100%;

			.app-input {
				height: inherit;
			}
		}

		button {
			border-radius: 4px;
			color: white;
			height: inherit;
			width: 108px;
		}

		button:disabled {
			cursor: not-allowed;
			opacity: 0.25;
		}
	}
}

.validate-text {
	color: color(error);
}

.bold {
	font-family: font(bold);
}
</style>