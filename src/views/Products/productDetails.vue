<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
            <h4>
            <RouterLink to="/products" class="btn btn-primary float-end">Back</RouterLink>
          </h4>
          <h4>Product Details</h4>
        </div>
        <div class="card-body">
          <div v-if="product">
            <p><strong>Name:</strong> {{ product.name }}</p>
            <p><strong>Description:</strong> {{ product.description }}</p>
            <p><strong>SKU Number:</strong> {{ product.skuNumber }}</p>
            <p><strong>Category:</strong> {{ product.category }}</p>
            <p><strong>Supplier:</strong> {{ product.supplier }}</p>
            <p><strong>Number Available:</strong> {{ product.numberAvailable }}</p>
            <p><strong>Price:</strong> {{ product.price }}</p>
            <p><strong>Created At:</strong> {{ product.created_at }}</p>
          </div>
          <div v-else>
            <p>Loading...</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    name: 'ProductDetails',
    data() {
      return {
        product: null
      };
    },
    created() {
      this.getProductDetails();
    },
    methods: {
      getProductDetails() {
        const productId = this.$route.params.id;
        axios.get(`http://127.0.0.1:8000/api/product/${productId}`)
          .then(res => {
            this.product = res.data.products;
          })
          .catch(error => {
            console.error('Error fetching product details:', error.message);
          });
      }
    }
  };
  </script>
  