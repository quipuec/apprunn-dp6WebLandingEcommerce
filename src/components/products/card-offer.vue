<template>
  <div class="card-offer">
		<div>
			<span class="card-offer-title">{{data.name}}</span>
			<div class="card-offer-discont" :style="`background-color: ${globalColors.primary}`">-{{data.priceDiscount}}%</div>
			<button class="card-offer-btn" :style="`color: ${globalColors.secondary}`">Comprar ahora</button>
			<div class="container-border">
				<div class="border-big" :style="`background-color: ${globalColors.secondary}`"></div>
				<div class="border-small" :style="`background-color: ${globalColors.secondary}`"></div>
			</div>
		</div>
		<div>
			<img 
				:src="data.urlImage" 
				:alt="data.name"
				class="card-offer-image">
		</div>
	</div>
</template>
<script>
export default {
	name: 'card-offer',
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
};
</script>
<style lang="scss" scoped>
	.card-offer {
		align-items: center;
		box-shadow: inset 0 -1px 2px 0 rgba(0, 0, 0, 0.21);
		display: flex;
		height: 138px;
		justify-content: space-between;
		margin-bottom: 17px;
		max-width: 337px;
		padding: 17px 34px;

		.card-offer-title {
			text-transform: uppercase;
			font-family: font(bold);
			font-size: size(small);
		}

		.card-offer-discont {
			border-radius: 6px;
			color: color(white);
			font-family: font(bold);
			font-size: size(msmall);
			height: 17px;
			padding: 3px 0;
			margin-bottom: 5px;
			text-align: center;
			width: 42px;
		}

		.card-offer-btn {
			font-size: size(small);
			font-family: font(bold);
		}
		
		.border-big {
			border-radius: 3px;
			height: 3px;
			width: 82px;
		}

		.border-small {
			border-radius: 3px;
			height: 3px;
			margin-left: 2px;
			width: 4px;
		}

		.card-offer-image {
			height: 104px;
		}

		.container-border {
			display: flex;
		}

		@media screen and (max-width: 764px) {
			box-shadow: inset 0 0 3px 0 rgba(0, 0, 0, 0.21);
			margin-bottom: 0;
			max-width: none;
			width: 100vw;
		}
	}
</style>