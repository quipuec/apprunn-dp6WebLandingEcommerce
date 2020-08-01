<template>
	<div class="placetopay-styles-container">
		<a
			target="_blank"
			class="placetopay-styles"
			:href="link"
		>
			<img :src="imgLink" alt="imagen de placetopay">
		</a>
	</div>
</template>
<script>
function created() {
	this.linkGenerator();
}

async function linkGenerator() {
	const url = `payment-gateway/${this.code}/checkout`;
	const body = {
		categoryCode: this.categoryCode,
		commerceCode: process.env.COMMERCE_CODE,
		ipAddress: this.ipAddress,
		orderId: this.orderId,
		uri: this.uri,
	};
	const { data: res } = await this.$httpSales.post(url, body);
	this.link = res.data.url;
}

function data() {
	return {
		link: null,
	};
}

export default {
	name: 'placetopay',
	created,
	data,
	methods: {
		linkGenerator,
	},
	props: {
		categoryCode: {
			type: String,
			required: true,
		},
		code: {
			type: String,
			required: true,
		},
		imgLink: {
			type: String,
			required: true,
		},
		ipAddress: {
			type: String,
			required: true,
		},
		orderId: {
			type: Number,
			required: true,
		},
		uri: {
			type: String,
			required: true,
		},
	},
};
</script>
<style lang="scss" scoped>
.placetopay-styles-container {
	font-weight: bold;
	transition-duration: 250ms;
	max-width: fit-content;

	.placetopay-styles {
		align-items: center;
		background-color: white;
		display: flex;
		justify-content: center;
		text-decoration: none;
	}
	&:hover {
		box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.25);
		transform: scale(1.05);
	}
}
</style>