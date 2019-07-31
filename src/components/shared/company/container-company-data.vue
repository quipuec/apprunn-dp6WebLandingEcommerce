<template>
  <div class="container-company-data padding-container">
		<media-company-data
			image="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/customer-service.png"
			image-height="30"
			border-right="#ffffff"
			family="medium"
			description="(511) 326-0933 
			(511) 326-8056"
		></media-company-data>
		<media-company-data
			image="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/address.svg"
			image-height="32"
			border-right="#ffffff"
			family="medium"
			description="Av. Circunvalación #1857, Urb. El Pino San Luis"
		></media-company-data>
		<media-company-data
			image="https://s3.amazonaws.com/apprunn-acl/COM-PRU-01/ARQ88/image/open-email.svg"
			image-height="29"
			family="medium"
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
	.padding-container {
		background: color(primary);
		border-radius: 5px;
		padding: 9px 0;

		@media (max-width: 715px) {
			padding: 5px 0;
		}
	}

	.container-company-data {
		display: flex;
		height: 86px;
		width: 701px;
		
		@media screen and (max-width: 715px) {
			height: 52px;
			width: 326px;
		}
	}
</style>
