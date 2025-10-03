<template>
  <div class="min-h-screen flex items-center justify-center p-3">
    <div class="bg-white py-15  px-30 text-center max-w-md rounded-lg shadow-lg"> 
      <h1 class="text-2xl font-semibold text-gray-900 mb-6"> 
        Error Test
      </h1>
      <button 
        @click="throwError" 
        class="px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white font-medium rounded-md hover:from-red-600 hover:to-red-700 transition-all duration-200 shadow-lg"
      >
        Throw Error 
      </button>
    </div>
  </div>
</template>

<script setup>
function throwError() {
  throw new Error('Test error from Vue page')
}
</script>


