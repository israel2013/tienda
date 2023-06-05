<template>
  <div>

    <Sidebar />
    <!-- MAIN CONTENT -->
    <div class="main-content">


      <TopNav />

      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-12 col-lg-10 col-xl-8">

            <!-- Header -->
            <div class="header mt-md-5">
              <div class="header-body">
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Pretitle -->
                    <h6 class="header-pretitle">
                      Colaboradores
                    </h6>

                    <!-- Title -->
                    <h1 class="header-title">
                      Edit colaborador
                    </h1>

                  </div>
                </div> <!-- / .row -->
                <div class="row align-items-center">
                  <div class="col">

                    <!-- Nav -->
                    <ul class="nav nav-tabs nav-overflow header-tabs">
                      <li class="nav-item">
                        <router-link to="/colaborador" class="nav-link"> Todos los colaboradores</router-link>

                      </li>
                      <li class="nav-item">
                        <router-link to="/colaborador/create" class="nav-link active">Nuevo colaborador</router-link>

                      </li>

                    </ul>

                  </div>
                </div>
              </div>
            </div>

            <!--validamos si data es true
             mostramos la ventana de edicion 
            -->
            <template v-if="data">
              <div>
                <div class="row">
                  <div class="col-12 col-md-6">

                    <!-- First name -->
                    <div class="form-group">

                      <!-- Label -->
                      <label class="form-label">
                        Nombres
                      </label>

                      <!-- Input -->
                      <!--Agregamos el v-model-->
                      <input type="text" class="form-control" v-model="colaborador.nombres" placeholder="Nombre completo">

                    </div>

                  </div>
                  <div class="col-12 col-md-6">

                    <!-- Last name -->
                    <div class="form-group">

                      <!-- Label -->
                      <label class="form-label">
                        Apellidos
                      </label>

                      <!-- Input -->
                      <!--Agregamos el v-model-->
                      <input type="text" class="form-control" v-model="colaborador.apellidos"
                        placeholder="Apellido completo">

                    </div>

                  </div>
                  <div class="col-12">

                    <!-- Email address -->
                    <div class="form-group">

                      <!-- Label -->
                      <label class="mb-1">
                        Correo electrónico
                      </label>

                      <!-- Form text -->
                      <small class="form-text text-muted">
                        This contact will be shown to others publicly, so choose it carefully.
                      </small>

                      <!-- Input -->
                      <!--Agregamos el v-model-->
                      <input type="email" class="form-control" v-model="colaborador.email"
                        placeholder="Correo electronico">

                    </div>

                  </div>

                  <div class="col-12 col-md-6">

                    <!-- Birthday -->
                    <div class="form-group">

                      <!-- Label -->
                      <label class="form-label">
                        Cargo
                      </label>

                      <!-- Input -->
                      <!--Agregamos el v-model-->
                      <select name="" class="form-select" v-model="colaborador.rol">
                        <option value="" disabled selected>Seleccionar</option>
                        <option value="Administrador">Administrador</option>
                        <option value="Vendedor">Vendedor</option>
                        <option value="Inventariado">Inventariado</option>
                      </select>
                    </div>

                  </div>

                </div> <!-- / .row -->
                <!-- Divider -->
                <hr class="my-5">

                <!-- Button -->
                <!--ponemos a la escucha el boton y mandamos llamar el metodo validad -->
                <button type="button" class="btn btn-primary" v-on:click="validar()">
                  Actualizar colaborador
                </button>

              </div>
            </template>

            <!--pegamos la vista del error-->
            <template v-if="!data">

              <div>
      <ErrorNotFound/>
              </div>
            </template>




            <br><br>

          </div>
        </div> <!-- / .row -->
      </div>

    </div>
  </div>
</template>
      
<script>
// @ is an alias to /src
//importamos nuestra barra de navegacion 
import Sidebar from '@/components/Sidebar.vue';
import TopNav from '@/components/TopNav.vue';
import ErrorNotFound from '@/components/ErrorNotFound.vue';

import axios from 'axios';

export default {
  name: 'EditColaboradorApp',

  data() {
    return {
      colaborador: {
        rol: ''
      },
      id: this.$route.params.id,
      data: false,

    }

  },

  methods: {

    init_data() {
      //consulta a la base de datos
      //como se van a tomar datos de la db se utiliza get
      //el metodo recibe la url y el encabezado
      axios.get(this.$url + '/obtener_usuario_admin/' + this.id, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': this.$store.state.token,
        }
        //promesas
        //obtenemos el resultado
      }).then((result) => {
        //validamos si el resultado esta vacio o no 
        //si hay un error lo capturamos y lo mostramos
        //la bandera data sirve para mostrar la vista de edicion , es falsa no la muestra
        if (result.data == "") {
          this.data = false
        } else {
          this.data = true;
          this.colaborador=result.data;
        }
        console.log(this.data);
      }).catch((error) => {
        console.log(error) ;
      });

    },

    //este metodo sirve para validar los campo
    validar() {
      //si no se envia el campo con el nombre
      if (!this.colaborador.nombres) {

        this.$notify({
          group: 'foo',
          title: 'ERROR',
          text: 'Ingrese los nombres',
          type: 'error'
        });
        //si no se envia el campo con el apellido
      } else if (!this.colaborador.apellidos) {

        this.$notify({
          group: 'foo',
          title: 'ERROR',
          text: 'Ingrese los apellidos',
          type: 'error'
        });

        //si no se envia el campo con el email
      } else if (!this.colaborador.email) {
        this.$notify({
          group: 'foo',
          title: 'ERROR',
          text: 'Ingrese el correo electronico',
          type: 'error'
        });

        //si no se envia el campo con el rol
      } else if (!this.colaborador.rol) {
        this.$notify({
          group: 'foo',
          title: 'ERROR',
          text: 'Seleccione el rol',
          type: 'error'
        });

        //si todo esta bien creamos el colaborador
      } else {
        this.actualizarColaborador();
      }
    },
    //metodo para crear un colcaborador
    actualizarColaborador(){
      //a axios le pasamos una url (es donde esta el metodo para registrar), le pasamos el cuerpo del colaborador y la cabecera 
      //con las promesas capturamos el resultados y el error
    axios.put(this.$url+'/actualizar_usuario_admin/'+this.id,this.colaborador,{
    headers:{
      'Content-Type':'application/json',
      'Authorization':this.$token
    }
    }).then((result)=>{
      this.$notify({
          group: 'foo',
          title: 'SUCCESS',
          text: 'Se actualizo el colaborador',
          type:'sucess'
    });
    this.$router.push({name:'colaborador-index'});
    }).catch((error)=>{
    console.log(error);
    });

    },
  },
  //metodo para mostrar una notificacion 
  mounted() {
    console.log(this.id);
  },

//sirve
  beforeMount() {
    this.init_data();
  },
  //cargamos  los componentes
  components: {
    Sidebar,
    TopNav,
    ErrorNotFound
  }
}
</script>
      