<template>
  <div class="container-media-company border">
		<media-company-data
			class="border-right"
			image="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/customer-service.png"
			image-width="30"
			image-height="29"
			description=" (511) 326-0933 
			(511) 326-8056"
		></media-company-data>
		<media-company-data
			class="border-right"
			image="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/address.svg"
			image-width="23"
			image-height="32"
			description="Av. Circunvalación #1857, Urb. El Pino San Luis"
		></media-company-data>
		<media-company-data
			image="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/open-email.svg"
			image-width="24"
			image-height="29"
			description="info@mrc.com.pe"
		></media-company-data>
	</div>
</template>

<script>
const mediaCompanyData = () => import('@/components/shared/company/media-company-data');

export default {
	components: {
		mediaCompanyData,
	},
	name: 'container-company-data',
};
</script>


<style lang="scss" scoped>
	.border {
		background: map-get($colors, primary);
		padding: 10px 0;
	}

	.container-media-company {
		display: flex;
		min-height: 87px;
	}

	.border-right {
		border-right: 1px solid map-get($colors, white);
	}
</style>
