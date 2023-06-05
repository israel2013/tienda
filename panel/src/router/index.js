import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store/index'
import HomeView from '../views/HomeView.vue'
//importamos nuestra vista de login 
import LoginApp from '../views/LoginApp.vue'
//importamos nuestra vista de colaborador
import CreateColaboradorApp  from '../views/colaboradores/CreateColaboradorApp.vue'
import indexColaboradorApp  from '../views/colaboradores/indexColaboradorApp.vue'
import jwt_decode  from 'jwt-decode'


Vue.use(VueRouter)

const routes = [
  
    //ruta principal , es el login 
    //colocamos las rutas en donde se encuentras las vistas de vue
    //el meta sirve para determinar cual es una ruta publica y privada, si esta en false es publica
  {path: '/',name: 'Login',component: LoginApp,meta: { requiresAuth: false } },
  {path: '/colaborador',name: 'colaborador-index',component: indexColaboradorApp,meta: { requiresAuth: true } },
  {path: '/colaborador/create',name: 'colaborador-create',component: CreateColaboradorApp,meta: { requiresAuth: true } },
  {path: '/colaborador/edit/:id',name: 'colaborador-edit',component:()=> import('@/views/colaboradores/EditColaboradorApp.vue'),meta: { requiresAuth: true } },
  {path: '/dashboard',name: 'dashboard',component:()=> import('@/views/DashboardApp.vue'),meta: { requiresAuth: true } },
  
  
  {path: '/producto/create',name: 'producto-create',component:()=> import('@/views/productos/CreateProductoApp.vue'),meta: { requiresAuth: true } },
  {path: '/producto',name: 'producto-index',component:()=> import('@/views/productos/IndexProductoApp.vue'),meta: { requiresAuth: true } },
  {path: '/producto/edit/:id',name: 'producto-edit',component:()=> import('@/views/productos/EditProductoApp.vue'),meta: { requiresAuth: true } },
  {path: '/producto/galeria/:id',name: 'producto-galeria',component:()=> import('@/views/productos/GaleriaProductoApp.vue'),meta: { requiresAuth: true } },


  {path: '/ingreso/create',name: 'ingreso-create',component:()=> import('@/views/ingreso/CreateIngresoApp.vue'),meta: { requiresAuth: true } },

  // {path: '/about', name: 'about',},  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

//este metodo protege las rutas 
//meddleware 
router.beforeEach((to, from,next) => {
  // ...
  // explicitly return false to cancel the navigation
  //si requiresAuth es true
if(to.matched.some(item=>item.meta.requiresAuth)){

  //si no enviamos un token no hay acceso y lo redireccionamos al login
  if(!store.state.token){
    next({
      name:'Login'
    })
  }

  try {
    jwt_decode(store.state.token)
  } catch (error) {
    next({
      name:'Login'
    })
  }


  //si la fecha de expiracion del token es menor o igual a la fecha actual quiere decir que el token expiro
  if(jwt_decode(store.state.token).exp*1000 <= new Date().getTime()){
   
    next({
      name:'Login'
    })
  }

next();

console.log('privada');
}else{
  console.log('publica');
  next();
}
})

export default router
