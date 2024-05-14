<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
          <h4>
            <RouterLink to="/products" class="btn btn-primary float-end">Back</RouterLink>
          </h4>
          <h4>Edit Product</h4>
        </div>
        <div class="card-body">
          <ul class="alert alert-warning" v-if="Object.keys(errorList).length > 0">
            <li class="mb-0 ms-3" v-for="(error, index) in errorList" :key="index">
              {{ error }}
            </li>
          </ul>
         
          <div v-for="(field, key) in model.product" :key="key" class="mb-3">
            <label :for="key">{{ key }}</label>
            <input type="text" v-model="model.product[key]" :class="{ 'is-invalid': errorList[key] }" class="form-control">
            <div class="invalid-feedback" v-if="errorList[key]">
              {{ errorList[key][0] }}
            </div>
          </div>
          <div class="mb-3">
            <button type="button" @click="updateProduct" class="btn btn-primary">Update</button>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import axios from 'axios';

export default {
  name: 'ProductEdit',
  data() {
    return {
      errorList: {},
      model: {
        product: {
          name: '',
          description: '',
          skuNumber: '',
          category: '',
          supplier: '',
          numberAvailable: '',
          price: ''
        }
      }
    };
  },
  mounted(){
    //console.log(this.$route.params.id);
    
    this.getProductData(this.$route.params.id);
    this.productId = this.$route.params.id;

  },
  methods: {
    getProductData(productId){
        axios.get(`http://127.0.0.1:8000/api/product/${productId}`).then(res=>{
            console.log(res.data.products);

            this.model.product.name = res.data.products.name;
            this.model.product.description = res.data.products.description;
            this.model.product.skuNumber = res.data.products.skuNumber;
            this.model.product.category = res.data.products.category;
            this.model.product.supplier = res.data.products.supplier;
            this.model.product.numberAvailable = res.data.products.numberAvailable;
            this.model.product.price = res.data.products.price;
        })
        .catch(function (error) {
            if(error.response){
                if(error.response.status = 404){
                    alert(error.response.data.message);
                }
            }
        });
        
        },
    updateProduct() {
      const productId = this.$route.params.id;
      axios.put(`http://127.0.0.1:8000/api/product/${productId}/edit`, { ...this.model.product, id: productId })
        .then(res => {
          console.log(res);
          alert(res.data.message);
          this.$router.push({ path: '/products' });
          
          this.errorList = '';
        })
        .catch(error => {
          if (error.response && error.response.data && error.response.data.errors) {
          5
            this.errorList = error.response.data.errors;
          } else {
            console.error('Error:', error.message);
          }
        });
    }
  }
};
</script>
