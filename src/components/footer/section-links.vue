<template>
	<div class="section-links">
		<div v-for="(item, index) in sections" :key="index" class="mb-2">
			<p
				:class="[
					'title-section-links',
					{ 'loading loading-dark': indeterminate },
				]">{{item.title}}</p>
			<ul v-for="(link, index) in item.links" :key="index">
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
</template>

<script>
import { mapGetters } from 'vuex';

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
	};
}

export default {
	name: 'section-links',
	computed: {
		...mapGetters([
			'indeterminate',
		]),
	},
	data,
};
</script>

<style lang="scss" scoped>
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
	padding: 44px 101px 0 101px;

	@media (max-width: 925px) {
		align-items: center;
		flex-direction: column;
		padding: 0 5px;
	}
}

.mb-2 {
	margin-bottom: 24px !important;
}
</style>
