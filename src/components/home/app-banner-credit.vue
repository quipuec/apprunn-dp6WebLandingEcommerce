

<template>
	<div
	class="app-banner-credit"
	:style="`background-image: url(${webImage})`"
	>
		<div class="section-banner">
			<span class="title-banner">CRÉDITO DIRECTO</span>
			<div>
				<span class="description-banner">HAZ TU SOLICITUD DE CRÉDITO</span>
				<button class="btn-submit"
				:style="`background-color: ${globalColors.primary}`"
				>SOLICITA AQUÍ</button>
			</div>
		</div>
	</div>
</template>

<script>
import lib from '@/shared/lib';
import { mapGetters } from 'vuex';

function webImage() {
	return lib.getDeeper('webImage')(this.data);
}

export default {
	name: 'app-banner-credit',
	computed: {
		webImage,
		...mapGetters([
			'getCreditBanner',
		]),
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
.btn-submit {
	color: color(white);
	border-radius: 7px;
	font-family: font(bold);
	font-size: size(large);
	height: 47px;
	margin-left: 10px;
	width: 165px;
}

.app-banner-credit {
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	height: 283px;
	padding: 16px 26px;
	width: 100%;

	@media (max-width: 764px) {
		height: 310px;
	}
}

.big {
	height: 283px;

	@media (max-width: 764px) {
		height: 295px;
	}
}

.title-banner {
	color: color(white);
	font-family: font(bold);
	font-size: 55px;
}

.description-banner {
	color: color(white);
	font-family: font(bold);
	font-size: size(sbig);
}

.section-banner {
	align-items: center;
	border: 1px solid color(white);
	display: flex;
	justify-content: center;
	flex-direction: column;
	padding: 60px;
}
</style>