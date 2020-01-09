<template>
<div
v-if="webImage || mobileImage"
class="app-banner-plans"
:class="[big ? 'big' : null, small ? 'small' : null]">
		<a href="#">
			<div
			:class="[
			'banner-plans-height',
			big ? 'big' : null, small ? 'small' : null,]">
			<div class="opacity">
				<picture>
					<source :srcset="webImage" media="(min-width: 600px)">
					<img :src="mobileImage">
				</picture>
			</div>
		</div>
	</a>
</div>
</template>

<script>
import lib from '@/shared/lib';

function webImage() {
	return lib.getDeeper('webImage')(this.data);
}

function mobileImage() {
	return lib.getDeeper('mobileImage')(this.data);
}

export default {
	name: 'app-banner-plans',
	computed: {
		webImage,
		mobileImage,
	},
	props: {
		data: {
			type: Object,
			default: () => {},
		},
		big: {
			type: Boolean,
			default: false,
		},
		small: {
			type: Boolean,
			default: false,
		},
	},
};
</script>

<style lang="scss" scoped>
.app-banner-plans {
	background-color: color(white);
	height: 389px;
	padding: 12px 7%;

	@media (max-width: 764px) {
		padding: 7px 5%;
	}

	&.big {
		padding: 0;
		position: relative;

		@media (max-width: 764px) {
			height: 400px;
		}
	}

	&.small {
		padding: 0;
	}
}

.big {
	height: 378px;

	@media (max-width: 764px) {
		height: 420px;
	}
}

img {
	height: 378px;
	object-fit: fill;
	width: 100%;
}

.banner-plans-height {
	height: 100%;
}

.opacity::before {
	background-image: linear-gradient(to bottom, rgba(0, 78, 156, 0.61), rgba(0, 78, 156, 0.61));
	content: '';
	position: absolute;
	top: 0;
	right: 0;
	left: 0;
	bottom: 0;
}
</style>