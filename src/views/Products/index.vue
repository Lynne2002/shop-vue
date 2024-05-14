<template>
    <div class="container">
      <div class="card">
        <div class="card-header">
          <h4>
            Products
            <RouterLink to="/products/create" class="btn btn-primary float-end">Add Product</RouterLink>
          </h4>
        </div>
        <div class="card-body">
          <table class="table table-bordered">
            <thead>
              <tr>
                <th>Product ID</th>
                <th>Product name</th>
                <th>Product description</th>
                <th>skuNumber</th>
                <th>Category</th>
                <th>Supplier</th>
                <th>Number Available</th>
                <th>Price</th>
                <th>Created At</th>
                <th>Action</th>         
              </tr>
            </thead>
            <tbody v-if="this.products.length > 0">
              <tr v-for="product in products" :key="product.id">
                <td>{{ product.id }}</td>
                <td>{{ product.name }}</td>
                <td>{{ product.description }}</td>
                <td>{{ product.skuNumber }}</td>
                <td>{{ product.category }}</td>
                <td>{{ product.supplier}}</td>
                <td>{{ product.numberAvailable }}</td>
                <td>{{ product.price}}</td>
                <td>{{ product.created_at}}</td>
                <td>
               
                
                  <button type="button" class="btn btn-primary" @click="viewProduct(product.id)">View Details</button>
                  <button type="button" class="btn btn-success" @click="editProduct(product.id)">Edit</button>
                  <button type="button" class="btn btn-danger" @click="deleteProduct(product.id)">Delete</button>
                </td>
              </tr>
            </tbody>
            <tbody v-else>
              <tr>
                <td colspan="7">Loading...</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  import { RouterLink } from 'vue-router';
  
  export default {
    name: 'products',
    data() {
      return {
        products: []
      }
    },
    mounted() {
      this.getProducts();
    },
    methods: {
      getProducts() {
        axios.get('http://127.0.0.1:8000/api/products').then(res => {
          this.products = res.data.products;
        }).catch(error => {
          console.error('Error fetching products:', error.message);
        });
      },
      viewProduct(productId) {
        this.$router.push({ name: 'ProductDetails', params: { id: productId } });
      },
      editProduct(productId) {
        this.$router.push({ name: 'ProductEdit', params: { id: productId } });
      },
      deleteProduct(productId) {
       
        if(confirm('Are you sure you want to delete this data?')){
            console.log(productId);
       
            axios.delete(`http://127.0.0.1:8000/api/product/${productId}/delete`).then(res =>{
                alert(res.data.message);
                this.getProducts();
            })
            .catch(function (error){
                if(error.response){
                    if(error.response.status == 404){
                        alert(error.response.data.message)
                    }
                }
            });
        }
       
      }
    },
    components: {
      RouterLink
    }
  };
  </script>