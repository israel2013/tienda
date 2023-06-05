<template>
  <div id="app">
<!-- mandamos llamar la barra de navegacion-->
<!--
 lo comentamos porque no queremos que se mueste en el logm
  <Sidebar/>

-->
<notifications group="foo" />
    <router-view/>
  </div>
</template>

<script>
//importamos el archivo que contiene la barra de navegacion
import Sidebar from '@/components/Sidebar.vue';

export default{
  components:{
    Sidebar
  }

}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale; 
  color: #2c3e50;
  height: 100vh !important;
}
a{
  color: #6e84a3 !important;
}
</style>
