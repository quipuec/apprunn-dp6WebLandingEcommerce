import l from '@/shared/lib';
import GlobalFeatures from '@/class/globalFeatures';

class ProductDetails {
	constructor(childrens) {
		this.childrens = childrens;
		this.filteredFeatures = [];
		this.selectedFeatures = {};
		this.selectedProduct = {};
		this.selectedProductsArray = [];
		this.globalFeatures = new GlobalFeatures(childrens);
	}
	checkAllFeaturesAreSelected() {
		if (this.selectedProductsArray.length === 1) {
			const selectedFeaturesLen = Object.values(this.selectedFeatures).length;
			const productFeaturesLen = this.selectedProductsArray[0].features.length;
			if (selectedFeaturesLen !== productFeaturesLen) {
				const features = l.map(
					l.setNewProperty('isSelected', true),
					this.selectedProductsArray[0].features,
				);
				this.globalFeatures.update(features);
			}
			this.globalFeatures.allAvailable();
			this.clearFilteredFeatures();
			this.clearSelectedFeatures();
		}
	}
	clearFilteredFeatures() {
		this.filteredFeatures = [];
	}
	clearSelectedFeatures() {
		this.selectedFeatures = {};
	}
	getFeatures() {
		return this.globalFeatures.get();
	}
	geProductDetails() {
		return this.selectedProductsArray[0];
	}
	featureSelected(feature) {
		if (l.isEmpty(this.selectedFeatures)) {
			this.globalFeatures.allUnSelected();
		}
		this.updateSelectedFeatures.call(this, feature);
		this.setFilteredProducts.call(this);
		this.globalFeatures.update(this.filteredFeatures);
		this.checkAllFeaturesAreSelected.call(this);
	}
	firstProductSelected(product) {
		this.globalFeatures.init();
		this.productSelected(product);
	}
	productSelected(product) {
		if (product.features.length > 0) {
			product.features.forEach(this.featureSelected.bind(this));
		} else {
			this.updateSelectedProducts([product]);
		}
	}
	setFilteredProducts() {
		let localCache = this.childrens;
		const features = [];
		Object.values(this.selectedFeatures).forEach((f) => {
			const products = [];
			localCache.forEach((c) => {
				const index = c.features.findIndex(fea => fea.value === f.value);
				if (index > -1) {
					products.push(c);
					c.features.forEach((eleFea) => {
						const indexFeatures = features.findIndex(el => el.value === eleFea.value);
						if (indexFeatures === -1) {
							features.push(eleFea);
						}
					});
				}
			});
			localCache = [...products];
		});
		this.updateFilteredFeatures(features);
		this.updateSelectedProducts(localCache);
	}
	updateSelectedFeatures(feature) {
		this.selectedFeatures[feature.id] = feature;
	}
	updateSelectedProducts(productsCollection) {
		[this.selectedProduct] = productsCollection;
		this.selectedProductsArray = productsCollection;
	}
	updateFilteredFeatures(features) {
		const newFeatures = features.map((feature) => {
			const selectedFeatures = Object.values(this.selectedFeatures);
			const isSelected = selectedFeatures.some(f => f.value === feature.value);
			return l.setNewProperty('isSelected', isSelected)(feature);
		});
		this.filteredFeatures = [...newFeatures];
	}
	updateQuantity(q) {
		this.selectedProduct.quantity = q;
	}
}

export default ProductDetails;
