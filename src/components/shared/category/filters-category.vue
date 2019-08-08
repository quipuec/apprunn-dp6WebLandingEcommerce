<template>
	<div class="filters-category">
		<div class="section-filter-row">
			<p class="title-section">Filtros</p>
				<button-image
				:data="arrowUp"
				@click-image="openFilters"
				v-if="closeFilters">
				</button-image>
				<button-image
				@click-image="closeCategory"
				:data="arrowDown"
				v-if="openUp"></button-image>
		</div>
		<div v-if="contentFilters">
			<p class="text-price">Precio</p>
      	<v-layout row>
        	<v-flex shrink style="width: 60px">
          	<v-text-field
						class="mt-0"
						hide-details
						single-line
						type="number"
          	></v-text-field>
        	</v-flex>
        	<v-flex class="pl-3">
          	<v-range-slider
            	:step="1"
          	>
			</v-range-slider>
        	</v-flex>
        	<v-flex shrink style="width: 20px">
				<v-text-field
					class="mt-0 number"
					hide-details
					single-line
					type="number"
				></v-text-field>
        	</v-flex>
      	</v-layout>
		  			<div class="content-number">
				<p class="number-filter">7$</p>
				<p class="number-filter">60$</p>
			</div>
					<input type="text" class="input-price" placeholder="40$">
				<v-layout mt-5 mb-5>
					<app-select class="input-filter" placeholder="Marca"/>
				</v-layout>
				<v-layout mt-3 mb-5>
					<app-select class="input-filter" placeholder="Modelo"/>
				</v-layout>
				<v-layout mt-3 mb-5>
					<app-select class="input-filter" placeholder="Año"/>
				</v-layout>
				<v-layout mb-5>
					<app-select class="input-filter" placeholder="Lado"/>
				</v-layout>
				<v-layout mb-3>
					<app-select class="input-filter" placeholder="Tipo"/>
				</v-layout>
		</div>
	</div>
</template>

<script>
const appSelect = () => import('@/components/shared/inputs/app-select');
const buttonImage = () => import('@/components/shared/buttons/app-button-image');


function closeCategory() {
	this.contentFilters = false;
	this.openUp = false;
	this.closeFilters = true;
}

function openFilters() {
	this.contentFilters = true;
	this.openUp = true;
	this.closeFilters = false;
}

function data() {
	return {
		arrowUp: {
			image: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/arrow-down-sign-to-navigate.svg',
			name: 'up',
			height: 15,
		},
		arrowDown: {
			image: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/up-arrow.svg',
			name: 'down',
			height: 15,
		},
		closeFilters: true,
		contentFilters: false,
		openUp: false,
	};
}

export default {
	data,
	name: 'filters-category',
	methods: {
		openFilters,
		closeCategory,
	},
	components: {
		appSelect,
		buttonImage,
	},
};
</script>

<style lang="scss" scoped>
.filters-category {
	border-top: 1px solid color(borderBtn);
	padding-top: 40px;
}

.title-section {
	color: color(primary);
	font-family: font(bold);
	font-size: size(xlarge);
	margin-bottom: 0;
}

.text-price {
	color: color(base);
	font-family: font(regular);
	font-size: size(medium);
	margin: 19px 0 0 0;
}

.section-filter-row {
	align-items: center;
	border-bottom: 3px solid color(primary);
	display: flex;
	justify-content: space-between;
	padding-bottom: 10px;
	width: 63%;
}

.input-price {
	background-color: color(white);
	border: solid 1px color(border);
	border-radius: 4px;
	color: color(base);
	font-family: font(regular);
	font-size: 12px;
	height: 24px;
	margin-top: 9px;
	padding-left: 10px;
	width: 92px;
}

.input-filter {
	height: 26px;
	width: 100%;
}

.number {
	position: relative;
	right: 20px;
}

.number-filter {
	color: color(base);
	font-family: font(regular);
	font-size: size(small);
}

.content-number {
	display: flex;
	justify-content: space-between;
	width: 78%;
}
</style>
