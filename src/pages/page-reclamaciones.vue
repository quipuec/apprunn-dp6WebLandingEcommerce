<template>
	<div class="reclamations-container">
		<h2 class="main-title">Libro de reclamanciones</h2>
		<div class="section">
			<h3>Razón social: {{getCommerceData.rzSocial}}</h3>
			<h3>RUC: {{getCommerceData.documentNumber}}</h3>
		</div>
		<form>
			<div class="section">
				<label class="input">
					Fecha
					<app-input
						type="date"
						placeholder="Fecha"
						v-model="date"
					/>
				</label>
			</div>
			<div class="section">
				<h4>1. Identificación del consumidor reclamante</h4>
				<label class="input">
					Nombre
					<app-input
						type="text"
						v-model="name"
						placeholder="Nombre"
					/>
				</label>
				<label class="input">
					Domicilio
					<app-input
						type="text"
						v-model="address"
						placeholder="Domicilio"
					/>
				</label>
				<label class="input">
					Documento de identidad
					<app-input
						type="text"
						v-model="documentNumber"
						placeholder="Documento Identidad (DNI, CE)"
					/>
				</label>
				<label class="input">
					Teléfono o celular
					<app-input
						type="tel"
						v-model="phone"
						placeholder="Teléfono"
					/>
				</label>
				<label class="input">
					Correo electrónico
					<app-input
						type="email"
						v-model="email"
						placeholder="Correo"
					/>
				</label>
				<label class="input">
					Padres (en caso de ser menor de edad)
					<app-input
						type="text"
						v-model="parents"
						placeholder="Padre o Madre (en caso de ser menor de edad)"
					/>
				</label>
			</div>
			<div class="section">
				<h4>2. Identificación del bien contratado</h4>
				<div>
					<label for="product">
						Producto
						<input
							class="radio"
							type="radio"
							name="product"
							id="product"
							value="product"
							@input="typesGood"
						/>
					</label>
					<label for="services">
						Servicios
						<input
							class="radio"
							type="radio"
							name="product"
							id="services"
							value="services"
							@input="typesGood"
						/>
					</label>
				</div>
				<label class="input">
					Monto reclamado
					<app-input
						type="text"
						v-model="reclamationAmount"
						placeholder="Monto reclamado"
					/>
				</label>
				<label class="input">
					Descripción
					<text-area
						rows="5"
						placeholder="Descripción"
						v-model="reclamationDescription"
					></text-area>
				</label>
			</div>
			<div class="section">
				<h4>3. Detalle de la reclamación y pedido del consumidor</h4>
				<label for="reclamo">
					Reclamo
					<input
						class="radio"
						type="radio"
						name="reclamacion"
						id="reclamo"
						value="reclamo"
						@input="reclamo"
					>
				</label>
				<label for="queja">
					Queja
					<input
						class="radio"
						type="radio"
						name="reclamacion"
						id="queja"
						value="queja"
						@input="reclamo"
					>
				</label>
				<text-area rows="5"
					placeholder="Detalle"
					v-model="reclamationDetails"
				></text-area>
				<text-area
					class="consumer-order"
					rows="5"
					placeholder="Pedido"
					v-model="reclamationOrder"
				></text-area>
				<div class="sign">
					<h5 :style="`border-top:1px solid ${globalColors.base}`">Firma del consumidor</h5>
				</div>
			</div>
			<div class="section">
				<h4>4. Observaciones y acciones adoptadas por el proveedor</h4>
				<label>
					Fecha de comunicación de la respuesa
					<app-input
						class="input"
						type="date"
						v-model="answerDate"
					/>
					<text-area
						rows="5"
						placeholder="Observaciones"
						v-model="anwerDescription"
					></text-area>
					<div class="sign">
						<h5 :style="`border-top:1px solid ${globalColors.base}`">Firma del proveedor</h5>
					</div>
				</label>
			</div>
			<button
				type="button"
				class="send-reclamation"
				:style="`background-color:${globalColors.primary}`"
			>Enviar Reclamación</button>
		</form>
		<small><b>RECLAMO:</b> Disconformidad relacionada a los productos o servicios</small>
		<small><b>QUEJA:</b> Disconformidad no relacionada a los productos o servicios; o malestar o descontento specto a la atención al público</small>
	</div>
</template>
<script>
import appInput from '@/components/shared/inputs/app-input';
import textArea from '@/components/shared/inputs/text-area';
import { mapGetters } from 'vuex';

function reclamo({ target }) {
	this.reclamationType = target.value;
}

function typesGood({ target }) {
	this.productType = target.value;
}

function data() {
	return {
		address: '',
		answerDate: '',
		anwerDescription: '',
		date: '',
		documentNumber: '',
		email: '',
		name: '',
		productType: '',
		reclamationAmount: 0,
		reclamationDescription: '',
		reclamationDetails: '',
		reclamationOrder: '',
		reclamationType: '',
		parents: '',
		phone: '',
	};
}

export default {
	name: 'page-reclamaciones',
	components: {
		appInput,
		textArea,
	},
	computed: {
		...mapGetters([
			'getCommerceData',
		]),
	},
	data,
	methods: {
		reclamo,
		typesGood,
	},
};
</script>
<style lang="scss" scoped>
.reclamations-container {
	margin: auto;
	padding-top: 20px;
	width: 500px;

	.main-title {
		margin-bottom: 15px;
		text-align: center;
	}

	.section {
		margin: 10px 0;
	}

	.input {
		margin-bottom: 15px;
		text-align: left;
		width: 100%;
	}

	.radio {
		margin: 10px 0;

		&:last-child {
			margin-right: 40px;
		}
	}

	.consumer-order {
		margin: 10px 0;
	}

	.sign {
		align-items: flex-end;
		display: flex;
		height: 80px;
		justify-content: center;
		width: 100%;
	}

	.send-reclamation {
		color: white;
		font-family: font(bold);
		height: 50px;
		width: 100%;
	}
}
.flex {
	display: flex;
}

.items-center {
	align-items: center;
}

.justify-center {
	justify-content: center;
}

.text-center {
	text-align: center;
}

.flex50 {
	flex: 1 1 50%;
}

.col {
	flex-direction: column;
}

.w-full {
	width: 100%;
}
</style>