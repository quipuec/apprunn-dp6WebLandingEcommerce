import l from '@/shared/lib';

class ProductDetails {
	constructor(childrens) {
		this.childrens = childrens;
		this.featuresSelected = {};
		this.selectedProduct = {};
		this.globalFeatures = [];
	}
	buildGlobalFeatures() {
		this.globalFeatures = this.childrens[0].category.features;
		this.childrens.forEach(this.setFeaturesValuesToGlobalFeatures.bind(this));
	}
	getFeatures() {
		return this.globalFeatures;
	}
	geProductDetails() {
		return this.selectedProduct;
	}
	featureSelected(feature) {
		this.updateGlobalFeatures.call(this, feature);
		this.updateFeaturesSelected.call(this, feature);
		this.productsFiltered.call(this);
	}
	firstProductSelected(product) {
		this.buildGlobalFeatures();
		product.features.forEach(this.featureSelected.bind(this));
	}
	productsFiltered() {
		let localCache = this.childrens;
		Object.values(this.featuresSelected).forEach((f) => {
			const products = [];
			localCache.forEach((c) => {
				const index = c.features.findIndex(fea => fea.value === f.value);
				if (index > -1) {
					products.push(c);
				}
			});
			localCache = [...products];
		});
		this.updateSelectedProducts(localCache);
	}
	setFeaturesValuesToGlobalFeatures({ features }) {
		features.forEach((feature) => {
			const { id, value } = feature;
			const index = this.globalFeatures.findIndex(fea => fea.id === id);
			const currentFeature = this.globalFeatures[index];
			if (currentFeature.values) {
				const indexValue = currentFeature.values.findIndex(item => item.value === value);
				if (indexValue === -1) {
					currentFeature.values.push(feature);
				}
			} else {
				currentFeature.values = [{ ...feature }];
			}
		});
	}
	updateFeaturesSelected(feature) {
		this.featuresSelected[feature.id] = feature;
	}
	updateSelectedProducts(productsCollection) {
		[this.selectedProduct] = productsCollection;
	}
	updateGlobalFeatures(feature) {
		const globalIndex = this.globalFeatures.findIndex(item => item.id === feature.id);
		this.globalFeatures[globalIndex].values.map(l.setNewProperty('isSelected', i => i.value === feature.value));
	}
	updateQuantity(q) {
		this.selectedProduct.quantity = q;
	}
}

export default ProductDetails;
