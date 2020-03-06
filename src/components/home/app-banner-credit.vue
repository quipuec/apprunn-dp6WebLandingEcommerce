

<template>
	<div
	class="app-banner-credit"
	:style="`background-image: url(${webImage})`"
	>
		<div class="content-btn">
			<button class="btn-submit"
			:style="`background-color: ${globalColors.primary}`">
				{{ titleBtn }}
				<a
				v-if="webLink"
				:href="webLink"
				target="_blank"
				class="link-credit">
				</a>
			</button>
		</div>
	</div>
</template>

<script>
import { getDeeper } from '@/shared/lib';
import { mapGetters } from 'vuex';

function webImage() {
	return getDeeper('webImage')(this.data);
}

function webLink() {
	return getDeeper('webLink')(this.data);
}

export default {
	name: 'app-banner-credit',
	computed: {
		webImage,
		webLink,
		...mapGetters([
			'getCreditBanner',
		]),
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		titleBtn: {
			type: String,
			default: '',
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
	padding-top: 13px;
	width: 165px;

	@media (max-width: 1000px) {
		top: 57%;
		right: 17%;
	}
}

.app-banner-credit {
	align-items: flex-end;
	background-position: center;
	background-repeat: no-repeat;
	background-size: cover;
	display: flex;
	height: 283px;
	justify-content: center;
	padding: 40px;
	position: relative;
	width: 100%;

	@media (min-width: 600px) {
		align-items: center;
		justify-content: flex-end;
	}

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

.link-credit {
	color: color(white);
	text-decoration: none;
}

.link-credit {
	bottom: 0;
	display: block;
	height: 47px;
	left: 0;
	position: relative;
	right: 0;
	top: -37px;
	width: 165px;
}

.content-btn {

	@media (min-width: 600px) {
		margin-top: 100px;
		margin-right: 80px;
	}

	@media (min-width: 1000px) {
		margin-right: 200px;
	}

	@media (min-width: 1370px) {
		margin-right: 400px;
	}
}
</style>