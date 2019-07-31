<template>
	<div class="app-footer">
		<section-links></section-links>
		<div class="content-company-footer">
			<p class="company-footer">© 2019   www.mrc.com  Todos los Derechos reservados.</p>
		</div>
	</div>
</template>

<script>
const sectionLinks = () => import('@/components/footer/section-links.vue');

export default {
	name: 'app-footer',
	components: {
		sectionLinks,
	},
};
</script>

<style lang="scss" scoped>
.company-footer {
	color: color(base);
	font-family: font(regular);
	font-size: size(small);
	margin-bottom: 0;
	padding: 17px 0 0 35px;

	@media (max-width: 750px) {
		padding-left: 0;
		text-align: center;	
	}
}

.content-company-footer {
	border-top: 1px solid color(base);
	margin-top: 17px;
	padding-bottom: 17px;
}

.app-footer {
	width: 100%;
}
</style>
