<template>
	<div class="filters-category">
		<div class="section-filter-row">
			<p class="title-section">Filtros</p>
			<button @click="openFilters">
				<img
				src="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/arrow-down-sign-to-navigate.svg" 
				alt="" 
				width="16px" 
				height="13px"
				v-if="closeFilters">
			</button>
			<button @click="closeCategory">
				<img
				v-if="openUp"
				src="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/up-arrow.svg" 
				alt="" 
				width="16px" 
				height="13px">
			</button>
		</div>
		<div v-if="contentFilters">
			<p class="text-price">Precio</p>
      	<v-layout row>
        	<v-flex shrink style="width: 60px">
          	<v-text-field
						v-model="value3[0]"
						class="mt-0"
						hide-details
						single-line
						type="number"
          	></v-text-field>
        	</v-flex>
        	<v-flex class="pl-3">
          	<v-range-slider
            	v-model="value3"
            	:max="60"
            	:min="7"
            	:step="10"
          	></v-range-slider>
        	</v-flex>
        	<v-flex shrink style="width: 20px">
						<v-text-field
							v-model="value3[1]"
							class="mt-0 number"
							hide-details
							single-line
							type="number"
						></v-text-field>
        </v-flex>
      </v-layout>
					<input type="text" class="input-price">
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
import appSelect from '@/components/shared/inputs/app-select';

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
		closeFilters: true,
		contentFilters: false,
		openUp: false,
		value3: [7, 60],
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
	},
};
</script>

<style lang="scss" scoped>
.filters-category {
	border-top: 1px solid #eaeaea;
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
	width: 55%;
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
</style>
