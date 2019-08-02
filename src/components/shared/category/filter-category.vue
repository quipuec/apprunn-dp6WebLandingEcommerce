<template>
	<div class="background-gray">
		<div class="filter-category">
			<img src="/static/img/icons/shock-absorber.svg" alt="">
			<p class="title-category">Resortes</p>
			<div class="content-image-arrow">
				<button @click="closeList">
					<img
					v-if="arrowDown"
					src="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/up-arrow.svg" 
					alt="" 
					width="16px" 
					height="13px"
					>
				</button>
				<button @click="openList">
					<img
					v-if="arrowUp"
					src="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/arrow-down-sign-to-navigate.svg" 
					alt="" 
					width="16px" 
					height="13px">
				</button>
			</div>
		</div>
		<div v-if="openArrow">
			<div class="content-list" v-for="(item, index) in categories" :key="index">
				<li>
					<span class="title-list">{{item.title}}</span>
  			</li>
				<ul v-for="(filter, index) in item.filters" :key="index">
    			<li class="item-li">{{filter.name}}</li>
  			</ul>
			</div>
		</div>
	</div>
</template>

<script>
function data() {
	return {
		categories: [
			{
				title: 'Automotriz',
				filters: [
					{
						id: 1,
						name: '4x4',
					},
					{
						id: 2,
						name: 'Sistema a Gas',
					},
					{
						id: 3,
						name: 'Tuning',
					},
					{
						id: 4,
						name: 'Competencia',
					},
				],
			},
			{
				title: 'Minería',
			},
			{
				title: 'Ferrocarriles y Vagones',
			},
			{
				title: 'Puerta de Garaje',
			},
			{
				title: 'Industria en General',
			},
		],
		openArrow: false,
		arrowUp: true,
		arrowDown: false,
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
	data,
	name: 'filter-category',
	methods: {
		closeList,
		openList,
	},
};
</script>

<style lang="scss" scoped>
li {
	color: color(dark);
	&:hover {
		color: color(secondary);
	}
}

.title-category {
	color: color(red-category);
	font-family: font(bold);
	font-size: 18px;
	margin: 0 0 0 10px;
}

.filter-category {
	align-items: center;
	border-bottom: 3px solid color(red-category); 
	display: flex;
	padding-bottom: 13px;
}

.content-image-arrow {
	margin-left: 30px;
}

.title-list {
	color: color(base);
	font-family: font(regular);
	font-size: 14px;
}

.background-gray {
	background-color: #f9f9f9;
	padding: 57px 22px;
	width: 30%;
}

.content-list {
	margin-top: 15px;
}

.item-li:hover {
	color: color(secondary);
	font-family: font(bold);
}

.title-list:hover {
	color: color(secondary);
	font-family: font(demi);
}
</style>
