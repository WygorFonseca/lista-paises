<template>
  <div id="app" class="h-100">
    <transition name="fade-transition" mode="out-in">
      <router-view />
    </transition>
    <!-- <router-view :loading="loading" :countries="countries" /> -->
  </div>
</template>

<script>
export default {
  name: 'App',
  // props: ['countries', 'loading'],
}
</script>
