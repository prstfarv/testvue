<template>
  <UCard 
    class="overflow-hidden"
    :ui="{ body: { padding: 'p-0' } }"
  >
    <!-- The Diagonal Pattern Container -->
    <div class="h-48 w-full bg-gray-50 dark:bg-gray-800 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(0,0,0,0.05)_10px,rgba(0,0,0,0.05)_11px)] flex items-center justify-center">
      <slot/>
    </div>
    
  </UCard>
</template>