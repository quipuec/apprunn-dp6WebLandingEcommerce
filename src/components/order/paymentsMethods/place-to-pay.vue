<template>
<div>
	<div class="conditions">
		<v-checkbox
			class="check"
			v-model="checkbox"
		>
		</v-checkbox>
<<<<<<< HEAD
		<span>Acepto los <a :href="conditionsAndTermsLink" target="_blank">términos y condiciones</a></span>
=======
		<span>Acepto los <button type="button" @click="conditionsAndTermsLink">términos y condiciones</button></span>
>>>>>>> production-fintimas
	</div>
	<div class="placetopay-styles-container">
		<button
			:disabled="!checkbox"
			type="button"
			class="placetopay-styles"
			@click="linkGenerator"
		>
			<img :src="imgLink" alt="imagen de placetopay">
		</button>
	</div>
</div>
</template>
<script>
import { mapState } from 'vuex';
<<<<<<< HEAD
=======

function conditionsAndTermsLink() {
	const findIt = this.help.find((h) => {
		const name = this.normalize(h.name);
		return name === 'terminos y condiciones';
	});
	const [item] = findIt.section;
	const link = findIt;
	const newItem = item.name.split(' ').join('-');
	const newLink = link.name.split(' ').join('-');
	this.$router.push(`/ayuda/apartado/${newItem}/seccion/${newLink}`);
}

function normalize(str) {
	return str.toLowerCase().normalize('NFD')
		.replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, '$1$2')
		.normalize();
}
>>>>>>> production-fintimas

function conditionsAndTermsLink() {
	const findIt = this.help.find((h) => {
		debugger;
		const name = h.name.toLowerCase().normalize('NFD')
			.replace(/([aeio])\u0301|(u)[\u0301\u0308]/gi, '$1$2')
			.normalize();
		return name === 'terminos y condiciones';
	});
	debugger;
	return findIt;
}
async function linkGenerator() {
	const url = `payment-gateway/${this.code}/checkout`;
	const body = {
		categoryCode: this.categoryCode,
		commerceCode: process.env.COMMERCE_CODE,
		ipAddress: this.ipAddress,
		orderId: this.orderId,
		uri: this.uri,
	};
	try {
		const { data: response } = await this.$httpSales.post(url, body);
		window.open(response.data.url, '_self');
	} catch (error) {
		this.showNotification(
			'Ocurrió un error al generar el enlace de pago. Recargue y vuelva a intentarlo por favor',
			'error',
		);
		console.log(error);
	}
}

function data() {
	return {
		checkbox: false,
		link: null,
	};
}

export default {
	name: 'placetopay',
	computed: {
		...mapState({
			help: state => state.commerce.helperCenter,
		}),
<<<<<<< HEAD
		conditionsAndTermsLink,
=======
>>>>>>> production-fintimas
	},
	data,
	methods: {
		conditionsAndTermsLink,
		linkGenerator,
		normalize,
	},
	props: {
		categoryCode: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		imgLink: {
			type: String,
			required: true,
		},
		ipAddress: {
			type: String,
			required: true,
		},
		orderId: {
			type: Number,
			required: true,
		},
		uri: {
			type: String,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>
.placetopay-styles-container {
	border: 1px solid #E75A32;
	font-weight: bold;
	padding: 0.5rem 1.5rem;
	transition-duration: 250ms;
	max-width: fit-content;

	.placetopay-styles {
		align-items: center;
		background-color: white;
		display: flex;
		justify-content: center;
		text-decoration: none;
		&[disabled] {
			cursor: not-allowed;
			opacity: 0.4;
		}
	}
	&:hover {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		transform: scale(1.05);
	}
}

.conditions {
	align-items: center;
	display: flex;

	.check {
		margin-right: 1rem;
		max-width: 2rem;
	}
}
</style>