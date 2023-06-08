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
                        Productos
                      </h6>
  
                      <!-- Title -->
                      <h1 class="header-title">
                        Editar Producto
                      </h1>
  
                    </div>
                  </div> <!-- / .row -->
                  <div class="row align-items-center">
                    <div class="col">
  
                      <!-- Nav -->
                      <ul class="nav nav-tabs nav-overflow header-tabs">
                        <li class="nav-item">
        
                          <router-link  class="nav-link" to="/producto">
                            Todos los productos
                          </router-link>
                        </li>
  
                        <li class="nav-item">
                          <a class="nav-link active"> Editar producto</a>
  
                        </li>
  
                      </ul>
  
                    </div>
                  </div>
                </div>
              </div>
  
  
              

              <template v-if="load_data">
          <div class="row">
            <div class="col-12 text-center">
              <div class="spinner-border" role="status">
                <span class="visually-hidden"> Loading

                </span>

              </div>

            </div>

          </div>
         </template>
         
              <template v-if="!load_data">
                <div>
                  <div class="mb-7">
                <div class="row justify-content-between align-items-center">
                  <div class="col">
                    <div class="row align-items-center">
                      <div class="col-auto">
                        <!-- Avatar -->
                        <div class="avatar">
                          <img class="avatar-img rounded-circle" :src="str_image" alt="...">
                        </div>
                      </div>
                      <div class="col ms-n2">
                        <!-- Heading -->
                        <h4 class="mb-1">
                          <b>Portada</b>
                        </h4>
                        <!-- Text -->
                        <small class="text-muted">
                          PNG or JPG no bigger than 1000px wide and tall.
                        </small>
                      </div>
                    </div> <!-- / .row -->
                  </div>
                  <div class="col-auto">
                    <!-- Button -->
                    <label for="file-upload" class="btn btn-sm btn-primary">
                      Upload
                    </label>
                    <input style="display:none" id="file-upload" type="file" v-on:change="uploadImage($event)" />
                  </div>
                </div> <!-- / .row -->
                <!-- Divider -->
                <hr class="my-5">

                <div class="row">
                 
                  <div class="col-12 col-md-12">
                    <!-- Email address -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="mb-1">
                        Título del producto
                      </label>
                      <!-- Form text -->
                      <small class="form-text text-muted">
                        This contact will be shown to others publicly, so choose it carefully.
                      </small>
                      <!-- Input -->
                      <input type="text" class="form-control" placeholder="Título del producto" v-model="producto.titulo">
                    </div>

                  </div>

                  <div class="col-12 col-md-6">
                  <!-- First name -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label">
                      Categoria
                    </label>
                    <small class="form-text text-muted">
                      This contact will be shown to others publicly, so choose it carefully.
                    </small>
                    <!-- Input -->
                    <select name="" class="form-select" v-model="producto.categoria" v-on:change="getSubCategoria($event)">
                      <option value="" disabled selected>Seleccionar</option>
                      <option :value="item.categoria.titulo" v-for="item in categorias">{{ item.categoria.titulo }}</option>
                      
                    </select>
                  </div>
                </div>


                
                <div class="col-12 col-md-6">
                  <!-- First name -->
                  <div class="form-group">
                    <!-- Label -->
                    <label class="form-label">
                      Subcategoria
                    </label>
                    <small class="form-text text-muted">
                      This contact will be shown to others publicly, so choose it carefully.
                    </small>
                    <!-- Input -->
                    <select name="" class="form-select" v-model="producto.subcategoria">
                      <option value="" disabled selected>Seleccionar</option>
                      <option :value="item.titulo" v-for="item in subcategorias">{{ item.titulo }}</option>
                      
                      
                    </select>
                  </div>
                </div>


                  <div class="col-12 col-md-6">
                    <!-- Last name -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="form-label">
                     Variedad
                      </label>
                      <!-- Input -->
                      <input type="text" 
                      class="form-control" placeholder="Titulo de la variedad" v-model="producto.str_variedad">
                    </div>
                  </div>
                
                  <!--variedad-->

                  <div class="col-12 col-md-6">
                    <!-- Last name -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="form-label">
                        Precio
                      </label>
                      <!-- Input -->
                      <input type="number" 
                      readonly
                      class="form-control" placeholder="Precio" v-model="producto.precio">
                    </div>
                  </div>

                  <div class="col-12 col-md-12">
                    <!-- Phone -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="form-label">
                        Extracto
                      </label>
                      <!-- Input -->
                      <textarea class="form-control" id="" rows="3" placeholder="Extracto"
                        v-model="producto.extracto"></textarea>
                    </div>
                  </div>
                </div> <!-- / .row -->
  
                <div class="row">
                  <div class="col-12 col-md-6">
                    <!-- Public profile -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="mb-1">
                        Producto publicado
                      </label>
                      <!-- Form text -->
                      <small class="form-text text-muted">
                        Making your profile public means that anyone on the Dashkit network will be able to find you.
                      </small>
                      <div class="row">
                        <div class="col-auto">
                          <!-- Switch -->
                          <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="switchOne" v-model="producto.estado" />
                            <label class="form-check-label" for="switchOne"></label>
                          </div>
                        </div>
                        <div class="col ms-n2">
                          <!-- Help text -->
                          <small class="text-muted">
                            Borrador activado
                          </small>
                        </div>
                      </div> <!-- / .row -->
                    </div>
                  </div>
                  <div class="col-12 col-md-6">
                    <!-- Allow for additional Bookings -->
                    <div class="form-group">
                      <!-- Label -->
                      <label class="mb-1">
                        En descuento
                      </label>
                      <!-- Form text -->
                      <small class="form-text text-muted">
                        If you are available for hire outside of the current situation, you can encourage others to hire
                        you.
                      </small>
                      <div class="row">
                        <div class="col-auto">
                          <!-- Switch -->
                          <div class="form-check form-switch">
                            <input class="form-check-input" type="checkbox" id="switchTwo" v-model="producto.descuento" />
                            <label class="form-check-label" for="switchTwo"></label>
                          </div>
                        </div>
                        <div class="col ms-n2">
                          <!-- Help text -->
                          <small class="text-muted">
                            Descuento desactivado
                          </small>
                        </div>
                      </div> <!-- / .row -->
                    </div>
                  </div>
                </div> <!-- / .row -->

                <button class="btn btn-primary mt-5" v-on:click="validar()">
                  Actualizar producto
                </button>

                <!-- Divider -->
                <hr class="mt-4 mb-5">
                <!-- Button -->
                
                <!--Variedades-->
                <div class="row justify-content-between align-items-center mb-5">
    <div class="col-12">

        <!-- Heading -->
        <h2 class="mb-2">
            Variedades de producto
        </h2>

        <!-- Text -->
        <p class="text-muted mb-xl-0">
        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ipsa dolore aspernatur, beatae id quod consequuntur.
        </p>
    </div>
    
</div>

<div class="row mb-5">
    <div class="col-lg-5">
        <small class="text-muted">
            Proveedor
        </small>
        <input type="text" class="form-control" placeholder="Empresa proveedora" v-model="variedad.proveedor">
    </div>
    <div class="col-lg-5">
        <small class="text-muted">
            Variedad
        </small>
        <input type="text" class="form-control" placeholder="Modelos, colores..." v-model="variedad.variedad">
    </div>
    <div class="col">
            <small class="text-muted">
            Acción*
        </small> <br>
        <button class="btn btn-primary btn-block" style="width: 100% !important;" v-on:click="validar_variedad()">Agregar</button>
    </div>
</div>

<div class="card">
    <div class="card-body" v-if="variedades.length >=1">

        <!-- List group -->
        <div class="list-group list-group-flush my-n3">
        
        <div class="list-group-item" v-for="item in variedades">
            <div class="row align-items-center" >
            <div class="col">

                <!-- Heading -->
                <h4 class="mb-1">
                  <!--Imprimimos las variedades-->
                  {{item.variedad.toUpperCase()}}
               </h4>

                <!-- Text -->
                <small class="text-muted">
                  
                <!--Imprimimos el sku-->  
                <b>SKU:</b>  {{item.sku.toUpperCase()}}
                </small>
            </div>
            
            <div class="col">

              <!-- Heading -->
              <h4 class="mb-1">
              <!--Imprimimos las variedades-->
                 {{item.stok}}
                 
              </h4>
              <!-- Text -->
              <small class="text-muted">
                unidades
               </small>
              </div>

            <div class="col-auto">

                <!-- Button -->
                <button v-if="item.stok == 0" class="btn btn-sm btn-danger" type="button" v-b-modal="'delete-'+item._id">
                Eliminar
                </button>

                <button v-if="item.stok >= 1" disabled class="btn btn-sm btn-danger" type="button" >
                Eliminar
                </button>


                 
                <b-modal centered :id="'delete-'+item._id" title="BootstrapVue" title-html="<h4 class='card-header-title'><b>Add a member</b></h4>" @ok="eliminar(item._id)">
                      <p class="my-4">{{item._id}}</p>
                         </b-modal>

            </div>
            </div> <!-- / .row -->
        </div>
       
        </div>

    </div>

    <div class="card-body" v-if="variedades.length == 0">
      <div class="row">
        <div class="col-12 text-center">
          <img src="/assets/img/reloj.gif" alt="" style="width:80px">

        </div>



      </div>
    

    </div>
</div>

                <!--Variedades-->
                


       
       
              </div>
                </div>
              </template>
  
  
  
            </div>
          </div> <!-- / .row -->
        </div>
  
      </div>
    </div>
  </template>
     
  <script>
  // @ is an alias to /src
  import Sidebar from '@/components/Sidebar.vue';
  import TopNav from '@/components/TopNav.vue';
  import ErrorNotFound from '@/components/ErrorNotFound.vue';
  import axios from 'axios';
  
  export default {
    name: 'EditProductoApp',
    components: {
      Sidebar,
      TopNav,
      ErrorNotFound
      
  
    },
    //metodo que devuelve variables con sus valores
    data() {
      //devolvemos un objeto producto
      return {
        //a la imegn del producto le ponemos una imagen por defecto
        str_image: '/assets/img/avatar-1.jpg',
        producto: {
          categoria: '',
          estado: false,
          descuento: false,
          portada: undefined,
          subcategoria:''
        },
        portada: undefined,
        variedad:{},
        variedades:[],
        categorias:[],
        subcategorias:[],
        data:false,
        load_data:true,
      }
    },
  
    methods: {

        init_data(){
          this.load_data=true;
        axios.get(this.$url+'/obtener_producto_admin/'+this.$route.params.id,{
            headers: {
                'Content-Type': 'application/json',
                'Authorization': this.$store.state.token,
                }
}).then((result)=>{
  if(result.data == '')
  {
    this.data=false;
  }else {
        //poenmos los datos del producto en los campos y la imagen que se va a editar
        this.producto=result.data;
    this.str_image = this.$url+'/obtener_portada_producto/'+this.producto.portada;

  }
  this.load_data=false;

});
        },
      //metodo para cargar una imagen
      uploadImage($event) {
        var image;
        //si hay una imagen seleccionada
        if ($event.target.files.length >= 1) {
          //poenmos el valor de la imagen en una varibale
          image = $event.target.files[0];
        }
  
        //validamos el tamaño de la imagen
        if (image.size <= 100000) {
          //validamos que sea una imagen
          if (image.type == 'image/jpeg' || image.type == 'image/png' || image.type == 'image/webp' || image.type == 'image/jpg') {
            this.str_image = URL.createObjectURL(image);
            this.portada = image;
            this.producto.portada = this.portada;
  
          } else {
            this.$notify({
              group: 'foo',
              title: 'ERROR',
              text: 'El recurso debe ser una imagen',
              type: 'error'
            });
            this.portada = undefined;
          }
        } else {
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: 'El tamaño debe ser menor a 1 MB',
            type: 'error'
          });
          this.portada = undefined;
        }
        console.log(image)
  
  
      },
      //validar los campos del producto
      validar() {
  
        if (!this.producto.titulo) {
  
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: 'Ingrese el titulo del producto',
            type: 'error'
          });
  
        } else if (!this.producto.categoria) {
  
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: 'Seleccione la categoria del producto',
            type: 'error'
          });
  
        } else if (!this.producto.subcategoria) {
  
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: 'Seleccione la subcategoria del producto',
            type: 'error'
          });

      } else if (!this.producto.extracto) {
  
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: 'Ingrese el extracto del producto',
            type: 'error'
          });
          //si no se envia el campo con el apellido
        } else if (!this.producto.str_variedad) {
  
  this.$notify({
    group: 'foo',
    title: 'ERROR',
    text: 'Ingrese la variedad del producto',
    type: 'error'
  });
} else if (this.producto.portada == undefined) {
  
          this.$notify({
            group: 'foo',
            title: 'ERROR',
            text: 'Ingrese la portada del producto',
            type: 'error'
          });
          //cuando todo esta correcto
        } else {
          //registramos
          this.actualizar();
        }
      },
      //metodo para registrar un usuario
      actualizar(){
          var data;
          var content = '';
          if(this.portada != undefined){
            content = 'multipart/form-data';
            data = new FormData();
            data.append('titulo',this.producto.titulo);
            data.append('categoria',this.producto.categoria);
            data.append('subcategoria',this.producto.subcategoria);
          data.append('extracto',this.producto.extracto);
            data.append('estado',this.producto.estado);
          data.append('str_variedad',this.producto.str_variedad);
            data.append('descuento',this.producto.descuento);
            data.append('portada',this.producto.portada); //IMAGEN
          }else{
              content = 'application/json';
              data = this.producto;
          }

          axios.put(this.$url+'/actualizar_producto_admin/'+this.$route.params.id,data,{
              headers: {
                  'Content-Type': content,
                  'Authorization' : this.$store.state.token
              }
          }).then((result)=>{
              
              if(result.data.message){
                this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: result.data.message,
                    type: 'error'
                });
              }else{
                  this.$notify({
                    group: 'foo',
                    title: 'SUCCESS',
                    text: 'Se actualizó el producto.',
                    type: 'success'
                });
              }
              
          })


      },
      validar_variedad(){
        //validamos de que los campos no se queden vacios
        if (!this.variedad.proveedor) {
  
              this.$notify({
                group: 'foo',
                title: 'ERROR',
                text: 'Ingrese el proveedor del producto',
                type: 'error'
              });

             } else  if (!this.variedad.variedad) {
  
                  this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: 'Ingrese la variedad del producto',
                    type: 'error'
                  });

                }else {
                  //si todo esta bien a los campos le ponemos su respectivo valor
                  this.variedad.producto= this.$route.params.id;
                  this.variedad.sku = this.generar_sku();
                 this.registro_variedad();
                }
      },
      registro_variedad(){

        axios.post(this.$url+'/registro_variedad_producto',this.variedad,{
          headers: {
                'Content-Type': 'application/json',
                'Authorization': this.$store.state.token,
          }
        }).then((result)=>{
          //cada vez que se agrega una variedad se limpian los inputs y se muestra la notificacion
          this.variedad={};
          this.$notify({
                    group: 'foo',
                    title: 'SUCCESS',
                    text: 'Se agrego la nueva variedad',
                    type: 'success'
                });
                this.init_variedades();

        });
      },
      //genera un codigo apartir del nombre del producto,proveedor y variedad 
      generar_sku(){
        // de cada campo mencionado tomamos las primeras 3 letras
        let sku = this.producto.titulo.substr(0,3)+''+this.producto.str_variedad.substr(0,3)+''+this.variedad.variedad.substr(0,3)+''+this.variedad.proveedor.substr(0,3);
        return sku.toUpperCase();
      },

      init_variedades(){
        axios.get(this.$url+'/obtener_variedades_producto/'+this.$route.params.id,{
          headers:  {
                'Content-Type': 'application/json',
                'Authorization': this.$store.state.token,
          }
        }).then((result)=>{
          this.variedades= result.data;
          console.log(result);
          //cada vez que se agrega una variedad se limpian los inputs y se muestra la notificacion
          // this.variedad={};
          // this.$notify({
          //           group: 'foo',
          //           title: 'SUCCESS',
          //           text: 'Se agrego la nueva variedad',
          //           type: 'success'
          //       });

        });


      },
      eliminar(id){
        axios.delete(this.$url+'/eliminar_variedad_producto/'+id,{
          headers:  {
                'Content-Type': 'application/json',
                'Authorization': this.$store.state.token,
          }
        }).then((result)=>{

          if(result.data.message){
            this.$notify({
                    group: 'foo',
                    title: 'ERROR',
                    text: result.data.message,
                    type: 'error'
                });
          }else{
            this.$notify({
                    group: 'foo',
                    title: 'SUCCESS',
                    text: 'Se elimino la variedad',
                    type: 'success'
                });
                this.init_variedades();
          }

              });

      }, 
         init_categorias(){
          axios.get(this.$url+'/listar_categorias_admin',{
              headers:{
                  'Content-Type': 'application/json',
                  'Authorization': this.$store.state.token,
              }
          }).then((result)=>{
              
              this.categorias = result.data;
              this.subcategorias = this.categorias.filter(item => item.categoria.titulo == this.producto.categoria)[0].subcategorias;

          });
      },
      getSubCategoria(event){
      //   console.log(event.target.value);
      //   console.log(this.producto.categoria);

      //   for(var item of this.categorias){
      //     if(item.categoria.titulo == event.target.value){
      //       this.subcategorias = item.subcategorias;
      //     }
      //   }
      //   console.log(this.subcategorias);
      // }
      this.subcategorias = this.categorias.filter(item => item.categoria.titulo == event.target.value)[0].subcategorias;
  }
    },

    beforeMount(){
        this.init_data();
        this.init_variedades();
        this.init_categorias();
    }
  }
  </script>
     