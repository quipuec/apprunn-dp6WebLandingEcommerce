<template>
	<section class="tabs-container">
		<app-select
			class="order-states"
			item-text="name"
			item-value="id"
			:items="statesComputed"
			v-model="activeTab"
			@input="selectIt"
		/>
	</section>
</template>
<script>
import { mapGetters } from 'vuex';
import appSelect from '@/components/shared/inputs/app-select';

function selectIt(state) {
	this.$emit('status-changed', state);
}

function statesComputed() {
	return [].concat(this.all, this.getStates);
}

function data() {
	return {
		all: {
			id: null,
			name: 'Todos',
		},
		activeTab: null,
	};
}

export default {
	name: 'profile-tab',
	components: {
		appSelect,
	},
	computed: {
		...mapGetters([
			'getStates',
		]),
		statesComputed,
	},
	data,
	methods: {
		selectIt,
	},
};
</script>
<style lang="scss" scoped>
.tabs-container {

	.order-states {
		width: fit-content;
	}
}
</style>
