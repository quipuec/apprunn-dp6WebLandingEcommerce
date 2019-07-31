<template>
	<div class="section-links">
		<div v-for="(item, index) in sections" :key="index">
			<p class="title-section-links">{{item.title}}</p>
			<ul v-for="(link, index) in item.links" :key="index">
				<li>
					<a :href="link.link" class="section-link">
						{{link.name}}
					</a>
				</li>
			</ul>
		</div>
	</div>
</template>

<script>
function data() {
	return {
		sections: [
			{
				title: 'Información',
				links: [
					{
						link: '/',
						name: 'Ubicación y horas de trabajo',
					},
					{
						link: '/',
						name: 'Sobre Nosotros',
					},
					{
						link: '/',
						name: 'Términos y condiciones',
					},
					{
						link: '/',
						name: 'Politicas de privacidad y confidencialidad',
					},
					{
						link: '/',
						name: 'No encuentro lo que quiero',
					},
					{
						link: '/',
						name: 'Buscamos proveedores',
					},
				],
			},
			{
				title: 'Pago y envío',
				links: [
					{
						link: '/',
						name: 'Forma de Pago',
					},
					{
						link: '/',
						name: 'Forma de entrega',
					},
					{
						link: '/',
						name: 'Tiempo de Envio',
					},
				],
			},
			{
				title: 'Políticas de la empresa',
				links: [
					{
						link: '/',
						name: 'Politica de garantía',
					},
					{
						link: '/',
						name: 'Politicas de privacidad',
					},
					{
						link: '/',
						name: 'Politicas de devolución o cambio',
					},
					{
						link: '/',
						name: 'Garantía',
					},
				],
			},
			{
				title: 'Servicio al cliente',
				links: [
					{
						link: '/',
						name: 'Contáctenos',
					},
					{
						link: '/',
						name: '¿Cómo ganar y usar tus Puntos?',
					},
					{
						link: '/',
						name: '¿Cómo comprar?',
					},
					{
						link: '/',
						name: 'Preguntas Frecuentes',
					},
					{
						link: '/',
						name: 'Seguir su pedido',
					},
					{
						link: '/',
						name: 'Reclamos',
					},
					{
						link: '/',
						name: '¿Cómo usar tus puntos?',
					},
				],
			},
		],
	};
}

export default {
	name: 'section-links',
	data,
};
</script>

<style lang="scss" scoped>
ul, ol {
	list-style: none;
	padding-left: 0;
}

.title-section-links {
	color: color(dark);
	font-family: font(heavy);
	font-size: size(xlarge);
}

.section-link {
	color: color(dark);
	font-family: font(regular);
	font-size: size(small);
	text-decoration: none;
}

.section-links {
	display: grid;
  grid-column-gap: 93px;
	grid-template-columns: auto auto auto auto;
	padding: 0 38px;
}
</style>
