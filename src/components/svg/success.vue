<template>
	<svg
		xmlns="http://www.w3.org/2000/svg"
		viewBox="-4 -5 82 83"
	>
		<defs>
			<path id="prefix__a" d="M69.657 2.809c-3.125-3.132-8.189-3.132-11.314 0L24 37.246l-10.343-10.37c-3.124-3.132-8.188-3.132-11.314 0-3.124 3.132-3.124 8.212 0 11.345l16 16.044c1.563 1.565 3.61 2.349 5.657 2.349 2.048 0 4.095-.784 5.657-2.35l40-40.11c3.124-3.132 3.124-8.212 0-11.345z"/>
		</defs>
		<g fill="none" fill-rule="evenodd" transform="translate(0 8.3)">
			<mask id="prefix__b" fill="#fff">
				<use xlink:href="#prefix__a"/>
			</mask>
			<use fill-rule="nonzero" xlink:href="#prefix__a"/>
			<g fill="#129937" mask="url(#prefix__b)">
				<path d="M0 0H103.68V96.36H0z" transform="translate(-20.16 -17.06)"/>
			</g>
		</g>
	</svg>
</template>
<script>
export default {
	name: 'success-icon',
};
</script>
<style lang="scss" scoped>
svg {
	use, g {
		fill: color(success);
	}
}
</style>