<template>
  <div class="d-flex align-items-center bg-auth border-top border-top-2 border-primary" style="height:100% !important">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-12 col-md-5 col-xl-4 my-5">

          <!-- Heading -->
          <h1 class="display-4 text-center mb-3">
            Iniciar Sesion
          </h1>

          <!-- Subheading -->
          <p class="text-muted text-center mb-5">
            Panel administrador
          </p>

          <!-- Form -->
          <form>

            <!-- Email address -->
            <div class="form-group">

              <!-- Label -->
              <label class="form-label">
                Correo electrónico
              </label>

              <!--Mensaje de alerta
              se usa el v-if para validar que la variable msm_error solo se muestre cuando no sea vacia
              -->

              <div v-if="msm_error" class="alert alert-danger" role="alert">

                <!--Imprimimos la variable que contiene el error-->
                {{ msm_error }}

              </div>

              <!-- Input -->
              <input type="email" class="form-control" v-model="email" placeholder="name@address.com">

            </div>

            <!-- Password -->
            <div class="form-group">
              <div class="row">
                <div class="col">

                  <!-- Label -->
                  <label class="form-label">
                    Contraseña
                  </label>

                </div>

              </div> <!-- / .row -->

              <!-- Input group -->
              <div class="input-group input-group-merge">

                <!-- Input -->
                <input class="form-control" type="password" v-model="password" placeholder="Enter your password">

                <!-- Icon -->
                <span class="input-group-text">
                  <i class="fe fe-eye"></i>
                </span>

              </div>
            </div>

            <!-- Submit -->
            <button class="btn btn-lg w-100 btn-primary mb-3" type="button" v-on:click="validar">
              Ingresar
            </button>



          </form>

        </div>
      </div> <!-- / .row -->
    </div> <!-- / .container -->


  </div>
</template>
  
<script>

import axios from 'axios';
import store from '@/store/index';

//propiedades
export default {
  name: 'LoginApp',
  data() {
    return {
      email: '',
      password: '',
      msm_error: ''
    }
  },

  created() {

    console.log(this.$url);

  },
  methods: {
    //metodo para validar los input
    //este metodo se manda llamr en el boton
    validar() {
      //validamos que exista informacion en los inputs
      if (!this.email) {
        this.msm_error = 'Ingrese un email'

      } else if (!this.password) {
        this.msm_error = 'Ingrese una contraseña'

      } else {
        this.msm_error = '';
        this.login();
      }
      console.log(this.msm_error);
    },
    //
    login() {
      //guardamos el email y la contraseña en un objeto 
      let data = {
        email: this.email,
        password: this.password
      }
      //
      axios.post(this.$url+'/login_usuario', data,{
        headers:{
          'Content-type':'application/json'
        }
      }).then((result) =>{

        //validamos que 
        if(result.data.data == undefined){
          this.msm_error = result.data.message;
        }

        //validamos que el token contenga la llave de acceso 
        if(result.data.token){
        //almacenamos el token y el objeto usuario
      this.$store.dispatch('saveToken',result.data.token);
        //nos redirigimos a otra pagina 
        this.$router.push({name:'dashboard'});
       // console.log(result);
        }
      }).catch(()=>{
        console.log(error);
      });
    }
  },
  components: {
  }
}
</script>
  