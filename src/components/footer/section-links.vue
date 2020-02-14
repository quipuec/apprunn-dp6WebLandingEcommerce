<template>
	<div class="footer-main-container">
		<div class="section-links">
			<div v-for="(item, index) in sections" :key="index" class="mb-2">
				<p
					:class="[
						'title-section-links',
						{ 'loading loading-dark': indeterminate },
					]">{{item.title}}</p>
				<ul v-for="(link, indexLink) in item.links" :key="indexLink">
					<li>
						<router-link
							to="/help"
							:class="[
								'section-link',
								{ 'loading': indeterminate },
							]"
						>
							{{link}}
						</router-link>
					</li>
				</ul>
			</div>
		</div>
		<div class="credit-cards" v-if="existcreditsCard">
			<img
				v-for="(card, cardIndex) in creditCards"
				:key="cardIndex"
				:src="card.url"
				:alt="card.alt"
			>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import { isEmpty } from '@/shared/lib';

function existcreditsCard() {
	if (!isEmpty(this.getCommerceData)) {
		const cards = this.getCommerceData.wayPayment.find(c => c.code === 'CDC');
		return Boolean(cards);
	}
	return false;
}

function data() {
	return {
		sections: [
			{
				title: 'Información',
				links: [
					'Ubicación y horas de trabajo',
					'Sobre Nosotros',
					'Términos y condiciones',
					'Politicas de privacidad y confidencialidad',
					'No encuentro lo que quiero',
					'Buscamos proveedores',
				],
			},
			{
				title: 'Pago y envío',
				links: [
					'Forma de Pago',
					'Forma de entrega',
					'Tiempo de Envio',
				],
			},
			{
				title: 'Políticas de la empresa',
				links: [
					'Politica de garantía',
					'Politicas de privacidad',
					'Politicas de devolución o cambio',
					'Garantía',
				],
			},
			{
				title: 'Servicio al cliente',
				links: [
					'Contáctenos',
					'¿Cómo ganar y usar tus Puntos?',
					'¿Cómo comprar?',
					'Preguntas Frecuentes',
					'Seguir su pedido',
					'Reclamos',
					'¿Cómo usar tus puntos?',
				],
			},
		],
		creditCards: [
			{ url: 'static/img/creditCards/visa.png', alt: 'visa' },
			{ url: 'static/img/creditCards/mastercard.png', alt: 'mastercard' },
			{ url: 'static/img/creditCards/american.png', alt: 'american express' },
			{ url: 'static/img/creditCards/diners.png', alt: 'diners' },
		],
	};
}

export default {
	name: 'section-links',
	computed: {
		...mapGetters([
			'getCommerceData',
			'indeterminate',
		]),
		existcreditsCard,
	},
	data,
};
</script>

<style lang="scss" scoped>
.footer-main-container {
	padding: 44px 101px 20px 101px;
	
	@media (max-width: 925px) {
		padding: 0 5px;
	}
}

ul, ol {
	list-style: none;
	padding-left: 0;

	@media (max-width: 925px) {
		text-align: center;
	}
}

.title-section-links {
	color: color(dark);
	font-family: font(heavy);
	font-size: size(xlarge);

	@media (max-width: 925px) {
		font-size: size(minmedium);
		text-align: center;
	}
}

.section-link {
	color: color(dark);
	font-family: font(regular);
	font-size: size(minmedium);
	text-decoration: none;
}

.section-links {
	display: flex;
	justify-content: space-between;

	@media (max-width: 925px) {
		align-items: center;
		flex-direction: column;
	}
}

.mb-2 {
	margin-bottom: 24px !important;
}

.credit-cards {
	align-items: center;
	display: flex;
	justify-content: flex-start;

	img {
		height: 27px;
		margin-right: 30px;
	}
}
</style>
