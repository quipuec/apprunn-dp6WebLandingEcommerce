<template>
	<div class="filters-category">
		<div class="section-filter-row">
			<div class="content-filter-title">
				<button-image
				:data="iconFilter"
				></button-image>
				<p class="title-section">Filtros</p>
			</div>
			<div>
				<button-image
				:data="arrowUp"
				@click-image="closeCategory"
				v-if="openUp">
				</button-image>
				<button-image
				@click-image="openFilters"
				:data="arrowDown"
				v-if="closeFilters"></button-image>
			</div>
		</div>
		<div class="content-filter" v-if="contentFilters">
			<p class="text-price">Precio</p>
      	<v-layout row>
      		<v-flex shrink class="input-number-price-min">
          	<v-text-field
						class="mt-0"
						hide-details
						single-line
						type="number"
          	></v-text-field>
        	</v-flex>
        	<v-flex class="pl-3">
          	<v-range-slider
            	:step="1">
						</v-range-slider>
        	</v-flex>
      		<v-flex shrink class="input-number-price-max">
						<v-text-field
							class="mt-0 number"
							hide-details
							single-line
							type="number"
						></v-text-field>
        	</v-flex>
      	</v-layout>
		  	<div class="content-number">
					<p class="number-filter">{{getCurrencySymbol}} {{filters.priceMin}}</p>
					<p class="number-filter">{{getCurrencySymbol}} {{filters.priceMax}}</p>
				</div>
				<app-input
				class="field"
				type="text"
				v-model="filters.price" />
				<v-layout mt-5 mb-5>
					<app-select 
					item-text="name"
					item-value="id"
					class="input-filter" 
					placeholder="Marca"
					v-model="filters.brand"/>
				</v-layout>
				<v-layout mt-3 mb-5>
					<app-select 
					item-text="name"
					item-value="id"
					class="input-filter" 
					placeholder="Modelo"
					v-model="filters.model"/>
				</v-layout>
				<v-layout mt-3 mb-5>
					<app-select 
					item-text="name"
					item-value="id"
					class="input-filter" 
					placeholder="Año"
					v-model="filters.year"/>
				</v-layout>
				<v-layout mb-5>
					<app-select 
					item-text="name"
					item-value="id"
					class="input-filter" 
					placeholder="Lado"
					v-model="filters.side"/>
				</v-layout>
				<v-layout mb-3>
					<app-select 
					item-text="name"
					item-value="id"
					class="input-filter" 
					placeholder="Tipo"
					v-model="filters.type"/>
				</v-layout>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex';
import appInput from '@/components/shared/inputs/app-input';
import appSelect from '@/components/shared/inputs/app-select';
import buttonImage from '@/components/shared/buttons/app-button-image';


function closeCategory() {
	this.closeFilters = true;
	this.contentFilters = true;
	this.openUp = false;
}

function openFilters() {
	this.closeFilters = false;
	this.contentFilters = false;
	this.openUp = true;
}

function data() {
	return {
		filters: {
			brand: '',
			model: '',
			side: '',
			price: '',
			priceMin: 7,
			priceMax: 60,
			type: null,
			year: null,
		},
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
		iconFilter: {
			image: '/static/img/icons/filter-category-red.svg',
			name: 'icon-filter',
			height: 21,
		},
		closeFilters: true,
		contentFilters: true,
		openUp: false,
	};
}

export default {
	data,
	name: 'filters-category',
	computed: {
		...mapGetters([
			'getCurrencySymbol',
			'token',
		]),
	},
	methods: {
		closeCategory,
		openFilters,
	},
	components: {
		appInput,
		appSelect,
		buttonImage,
	},
};
</script>

<style lang="scss" scoped>
.filters-category {
	border-top: 1px solid color(border);
	padding-top: 40px;
}

.title-section {
	color: color(primary);
	font-family: font(bold);
	font-size: size(xlarge);
	margin: 0 0 0 11px;
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
	padding: 0 20px 15px 20px;
	width: 100%;
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

.input-number-price-min {
	width: 75px;
}

.input-number-price-max {
	width: 20px;
}

.content-filter {
	padding: 0 30px;
}

.icon-filter {
	height: 21px;
}

.content-filter-title {
	display: flex;
}
</style>
