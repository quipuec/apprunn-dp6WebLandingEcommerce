<template>
	<div class="form-bulletin">
		<div class="content-description">
			<p class="text-subscription">Suscríbete a Boletín</p>
			<div class="content-email">
				<input type="text" placeholder="Ingresa tu correo Electrónico" class="input-form">
				<button class="button-form">Suscríbete</button>
			</div>
		</div>
		<div class="form-bulletin-description-company">
			<div class="content-date-company">
				<img src="/static/img/icons/telephone-1.svg" alt="">
				<p class="item-date-company">[511] 326-0933 
				[511] 326-8056</p>
			</div>
			<div class="content-date-company">
				<img src="/static/img/icons/mail.svg" alt="">
				<p class="item-date-direction">Av. Circunvalación #1857, 
				Urb. El Pino - San Luis</p>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'form-bulletin',
};
</script>

<style lang="scss">
.button-form {
	background-color: color(dark);
	border-bottom-right-radius: 6px;
	border-top-right-radius: 6px;
	bottom: 1px;
	color: color(white);
	font-family: font(demi);
	font-size: size(medium);
	min-height: 39px;
	position: relative;
	width: 128px;
}

.text-subscription {
	color: color(dark);
	font-family: font(demi);
	font-size:  size(medium);
	margin-bottom: 45px;
	text-align: center;

	@media (max-width: 850px) {
		margin-bottom: 31px;
		text-align: center;
	}
}

.text-subscription::before {
		border-top: 1px solid color(base);
		content: '';
		color: color(dark);
		height: 3px;
		left: 10px;
  		position: absolute;
		top: 9px;
		width: 110px;
	@media (max-width: 850px) {
		left: 15px;
		width: 80px;
	}

}

.text-subscription::after {
	border-top: 1px solid color(base);
	color: color(dark);
	content: '';
	height: 3px;
	position: absolute;
	right: 8px;
	top: 9px;
	width: 110px;

	@media (max-width: 850px) {
		right: 12px;
		width: 80px;
	}
}

.form-bulletin {
	align-items: center;
	background-color: color(background);
	box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.08);
	display: flex;
	justify-content: space-around;
	height: 209px;
	padding: 40px 0;
	width: 100%;

	@media (max-width: 850px) {
		flex-direction: column;
		height: 411px;
		padding: 15px 0;
	}
}

.item-date-company {
	color: color(dark);
	font-family: font(bold);
	font-size: 16px;
	margin: 0 0 0 20px;
	max-width: 136px;

	@media (max-width: 850px) {
		font-size: size(xlarge);
		max-width: 151px;
		padding-top: 17px;
	}
}

.content-date-company {
	align-items: center;
	color: color(dark);
	display: flex;
	margin-top: 11px;

	@media (max-width: 850px) {
		flex-direction: column;
	}
}

.item-date-direction {
	font-size: size(minmedium);
	margin: 0 0 0 20px;
	max-width: 170px;

	@media (max-width: 850px) {
		padding-top: 17px;
		text-align: center;
	}
}

.input-form {
	border: 1px solid color(dark);
	border-radius: 6px;
	bottom: 1px;
	font-size: size(minmedium);
	left: 8px;
	min-height: 39px;
	padding-left: 13px;
	position: relative;
	width: 282px;

	@media (max-width: 650px) {
		font-size: size(minmedium);
		padding-left: 13px;
		width: 197px;
	}
}

.form-bulletin-description-company {
	@media (max-width: 850px) {
		display: flex;
    flex-direction: column-reverse;
		margin-top: 50px;
	}
}

.content-description {
	position: relative;
}

.content-email {
	align-items: center;
	display: flex;
}
</style>
