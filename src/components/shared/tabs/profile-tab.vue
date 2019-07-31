<template>
	<section class="tabs-container">
		<button
			@click="selectIt"
			:value="1"
			:class="['tab-btn', { 'active': activeTab === '1' }]"
			type="button"
		>Solicitado</button>
		<button
			@click="selectIt"
			:value="2"
			:class="['tab-btn', { 'active': activeTab === '2' }]"
			type="button"
		>En camino</button>
		<button
			@click="selectIt"
			:value="3"
			:class="['tab-btn', { 'active': activeTab === '3'	}]"
			type="button"
		>Entregado</button>
	</section>
</template>
<script>

function selectIt($e) {
	this.activeTab = $e.target.value;
}

function data() {
	return {
		activeTab: '1',
	};
}

export default {
	name: 'profile-tab',
	data,
	methods: {
		selectIt,
	},
};
</script>
<style lang="scss" scoped>
	.tabs-container {
		align-items: center;
		background-color: color(border);
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
		display: flex;
	}

	.tab-btn {
		flex: 1 1 33%;
		font-family: font(bold);
		font-size: size(small);
		height: 31px;
	}

	.active {
		background-color: color(disabled);
		border-top-left-radius: 6px;
		border-top-right-radius: 6px;
		color: color(dark);
	}
</style>
