<template>
	<div class="app-banner-cupons"
	:style="`background-image: url(${webImage})`"
	>
		<p class="title-banner">CUPONES</p>
		<div>
			<div class="box-coupons">
			</div>
		</div>
	</div>	
</template>

<script>
import lib from '@/shared/lib';

function mounted() {

}

function webImage() {
	return lib.getDeeper('webImage')(this.data);
}

export default {
	name: 'app-banner-cupons',
	mounted,
	computed: {
		webImage,
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
	},
};
</script>

<style lang="scss" scoped>
.app-banner-cupons {
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 435px;
	padding: 44px 85px;
	width: 100%;
}

.title-banner {
	color: color(white);
	font-family: font(bold);
	font-size: 48px;
	text-align: center;
}

.box-coupons {
	border: 1px solid #979797;
	background-color: white;
	height: 248px;
	width: 363px;
}
</style>