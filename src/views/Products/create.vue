<template>
    <div class="container mt-5">
      <div class="card">
        <div class="card-header">
            <h4>
            <RouterLink to="/products" class="btn btn-primary float-end">Back</RouterLink>
          </h4>
          <h4>Add Products</h4>
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
            <button type="button" @click="saveProduct" class="btn btn-primary">Save</button>
          </div>
        </div>
      </div>
    </div>
  </template>
<script>
import axios from 'axios';

export default {
  name: 'productCreate',
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
  methods: {
    saveProduct() {
      axios.post('http://127.0.0.1:8000/api/product', this.model.product)
        .then(res => {
          console.log(res);
          alert(res.data.message);
          this.$router.push({ path: '/products' });
          this.model.product = {
            name: '',
            description: '',
            skuNumber: '',
            category: '',
            supplier: '',
            numberAvailable: '',
            price: ''        
          }
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
