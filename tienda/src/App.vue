<template>
  <div id="app">

    <!--Mandamos llamar nuestros componentes que van a tener todas visats de manera global-->
    <Header />

    <router-view/>
    <!--footer-->
    <Footer />
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Footer from '@/components/Footer.vue'

export default {
  components:{
    Header,
    Footer
  }
}

</script>

