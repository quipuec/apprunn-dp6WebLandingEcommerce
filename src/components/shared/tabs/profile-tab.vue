<template>
	<section class="tabs-container">
		<button
			type="button"
			v-for="status in getStates"
			:key="status.id"
			:value="status.id"
			:class="['tab-btn', { 'active': activeTab === status.id }]"
			@click="selectIt"
		>{{status.name}}</button>
	</section>
</template>
<script>
import { mapGetters } from 'vuex';

function selectIt($e) {
	this.activeTab = Number($e.target.value);
	this.$emit('status-changed', this.activeTab);
}

function data() {
	return {
		activeTab: 1,
	};
}

export default {
	name: 'profile-tab',
	computed: {
		...mapGetters([
			'getStates',
		]),
	},
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
