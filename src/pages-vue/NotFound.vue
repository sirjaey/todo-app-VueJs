<template>
  <div class="min-h-screen flex items-center justify-center p-4 w-full">
    <div class="bg-white p-8 text-center max-w-md rounded-lg shadow-lg">
      <h1 class="text-4xl font-bold text-gray-900 mb-4">
        Page Not Found
      </h1>
      <p class="text-gray-600 mb-6">
        The page you're looking for doesn't exist.
      </p>
      <router-link 
        to="/" 
        class="inline-block px-6 py-3 bg-gradient-to-r from-[#ae0fde] to-[#c937f6] text-white font-medium rounded-lg shadow-lg hover:from-[#ae0fde] hover:to-[#c937f6] transition-all duration-200"
      >
        Go home
      </router-link>
    </div>
  </div>
</template>

<script setup>

</script>


