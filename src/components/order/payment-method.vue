<template>
	<div>
		<deposit-methods v-if="isNotStorePickUp"/>
	</div>
</template>
<script>
import depositMethods from '@/components/order/deposit-payment';
import { mapGetters } from 'vuex';
import PickUp from '@/shared/PickUp';
import { getDeeper } from '@/shared/lib';

function isNotStorePickUp() {
	return getDeeper('flagPickUp')(this.getOrderInfo) === PickUp.myDirection;
}

export default {
	name: 'payment-method',
	components: {
		depositMethods,
	},
	computed: {
		...mapGetters([
			'getOrderInfo',
		]),
		isNotStorePickUp,
	},
};
</script>