<template>
	<div class="section-category">
		<div class="filter-category">
			<img :src="$route.query.categories.webImage" alt="" width="22px" height="21px">
			<p class="title-category">{{$route.query.categories.title}}</p>
			<div>
				<button-image
				:data="iconDown"
				@click-image="closeList"
				v-if="!arrowUp"
				></button-image>
				<button-image
				@click-image="openList"
				v-if="arrowUp"
				:data="iconUp"
				></button-image>
			</div>
		</div>
		<div v-if="openArrow">
			<div class="content-list" v-for="(item, index) in categories" :key="index">
				<li @click="filterSubCategory">
					<span class="title-list">{{item.title}}</span>
  			</li>
				<ul v-for="(filter, index) in item.filters" :key="index" class="list-filter">
    			<li class="item-li">{{filter.name}}</li>
  			</ul>
			</div>
		</div>
	</div>
</template>

<script>
const buttonImage = () => import('@/components/shared/buttons/app-button-image');

function filterSubCategory() {
	this.$emit('filter');
}

function data() {
	return {
		iconDown: {
			image: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/up-arrow.svg',
			name: 'up',
			height: 15,
		},
		iconUp: {
			image: 'https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/arrow-down-sign-to-navigate.svg',
			name: 'up',
			height: 15,
		},
		openArrow: true,
		arrowDown: false,
		arrowUp: false,
	};
}

function closeList() {
	this.openArrow = false;
	this.arrowUp = true;
	this.arrowDown = false;
}

function openList() {
	this.openArrow = true;
	this.arrowUp = false;
	this.arrowDown = true;
}

export default {
	name: 'filter-category',
	components: {
		buttonImage,
	},
	data,
	methods: {
		closeList,
		filterSubCategory,
		openList,
	},
	props: {
		categories: {
			type: Array,
			default: () => [],
		},
	},
};
</script>

<style lang="scss" scoped>
li {
	color: color(dark);

}

.title-category {
	color: color(primary);
	font-family: font(bold);
	font-size: size(xlarge);
	margin: 0 0 0 10px;
	width: 100%;
}

.filter-category {
	align-items: center;
	border-bottom: 3px solid color(primary); 
	display: flex;
	padding-bottom: 13px;
}

.title-list {
	color: color(base);
	cursor: pointer;
	font-family: font(regular);
	font-size: size(medium);
}

.section-category {
	padding: 56px 0;
	width: 100%;
}

.content-list {
	margin-top: 15px;
	min-width: 207px;
}

.item-li:active {
	color: color(secondary);
	font-family: font(bold);
}

.list-filter {
	list-style: none;
}
</style>
