<template>
	<div class="tabs-help">
		<div class="content-help">
			<div class="w-100">
				<div class="title-help">CENTRO DE AYUDA</div>
					<div
						v-for="(help, index) in helps" 
						:key="index">
						<div class="title-tabs">
							{{help.title}}
						<div>
							<button-image
							:data="openArrow"
							class="icon-close"
							v-if="!help.deploy"
							@click-image="deploy(index)"
							></button-image>
							<button-image
							:data="closeArrow"
							class="icon-close"
							@click-image="deploy(index)"
							v-if="help.deploy"
							></button-image>
						</div>
					</div>
					<div v-if="!help.deploy">
						<div v-for="(item, indexItem) in help.items" :key="indexItem">
							<button-image
							:data="iconTabs"
							:class="[
							{ 'active-help' : currentHelp === item }
							]"
							@click-image="seeThisHelp(item)"
							class="item-tabs"
							:name="item"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>	
		<div class="content-components">
			<component
				:is="currentHelpComponent"
			></component>
		</div>
		<app-slider
		class="slider-help"
		:title="currentHelp"
		v-model="open">
			<component
			:is="currentHelpComponent"
			></component>
		</app-slider>
	</div>
</template>

<script>
const warranty = () => import('@/components/help/warranty');
const appSlider = () => import('@/components/help/app-slider');
const buttonImage = () => import('@/components/shared/buttons/app-button-image');

function seeThisHelp(help) {
	const opts = {
		Garantía: warranty,
	};
	this.currentHelp = help;
	this.currentHelpComponent = opts[help];
	this.open = true;
}

function deploy(index) {
	this.helps[index].deploy = !this.helps[index].deploy;
}

function data() {
	return {
		iconTabs: {
			image: '',
			height: 0,
			name: '',
		},
		widthDesktop: 0,
		width: 0,
		openArrowTabs: true,
		arrowTabs: false,
		listHelp: true,
		openArrow: {
			image: '/static/img/icons/arrow-gray-help.svg',
			height: 13,
			name: 'open',
		},
		closeArrow: {
			image: '/static/img/icons/arrow-down-gray.svg',
			name: 'close',
			height: 13,
		},
		currentHelpComponent: warranty,
		currentHelp: '',
		helps: [
			{
				id: 1,
				deploy: false,
				title: 'INFORMACIÓN',
				items: [
					'Ubicación y Horario de Trabajo',
					'Sobre Nosotros',
					'Término y Condiciones',
					'Politicas de Privacidad y Confidencialidad',
					'No encuentro lo que quiero',
					'Buscamos Proveedores',
				],
			},
			{
				id: 2,
				deploy: false,
				title: 'PAGO Y ENVÍO',
				items: [
					'Forma de Pago',
					'Forma de Entrega',
					'Tiempo de Envio',
				],
			},
			{
				id: 3,
				deploy: false,
				title: 'POLÍTICAS DE LA EMPRESA',
				items: [
					'Política de garantía',
					'Políticas de privacidad',
					'Política de devolución o cambio',
					'Garantía',
				],
			},
			{
				id: 4,
				deploy: false,
				title: 'SERVICIO AL CLIENTE',
				items: [
					'Contáctenos',
					'¿Cómo ganar y usar tus Puntos?',
					'¿Cómo comprar?',
					'Preguntas Frecuentes',
					'Seguir su pedido',
					'Reclamos',
				],
			},
		],
		open: false,
	};
}

export default {
	data,
	name: 'tabs-help',
	components: {
		appSlider,
		buttonImage,
		warranty,
	},
	methods: {
		deploy,
		seeThisHelp,
	},
};
</script>

<style lang="scss" scoped>
.list-help {
	@media (min-width: 950px) {
		display: none;
	}
}

.list-responsive {
	@media (min-width: 950px) {
		display: none;
	}
}

.tabs-help {
	display: flex;
	justify-content: space-between;
	padding: 20px;
	width: 100%;
}

.title-help {
	border-bottom: 5px solid color(secondary);
	color: color(secondary);
	font-family: font(bold);
	font-size: size(large);
	padding-bottom: 7px;
}

.title-tabs {
	align-items: center;
	border-bottom: 2px solid color(disabled);
	color: color(dark);
	display: flex;
	justify-content: space-between;
	font-family: font(bold);
	font-size: font(medium);
	margin-top: 22px;
	padding-bottom: 6px;
}

.item-tabs {
	color: color(base);
	font-family: font(heavy);
	font-size: size(small);
	padding: 8px 0;
	text-align: left;
	width: 100%;
}

.content-components {
	padding-left: 77px;
	width: 75%;

	@media (max-width: 950px) {
		display: none;
	}
}

.content-help {
	width: 25%;

	@media (max-width: 950px) {
		width: 100%;
	}
}

.w-100 {
	width: 100%;
}

.active-help {
	color: color(primary);
	font-family: font(bold);
	font-size: 12px;
}

.slider-help {
	@media (min-width: 949px) {
		display: none;
	}
}

.icon-close {
	@media (min-width: 950px) {
		display: none;
	}
}

.list-help-desktop {
	@media (min-width: 950px) {
		display: block;
	}
}
</style>
