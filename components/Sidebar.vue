<template>
  <aside class="w-64 hidden md:flex flex-col bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-full"
    :class="opened ? 'translate-x-0' : '-translate-x-full'">
    
    <div class="h-16 flex items-center px-6 border-b border-gray-200 dark:border-gray-800">
      <UIcon name="i-heroicons-cube" class="w-6 h-6 text-primary-500" />
      <span class="ml-2 font-bold text-lg">Menu</span>
    </div>

    <div class="flex-1 overflow-y-auto py-4">
      <UVerticalNavigation :links="links" />
    </div>

    <UButton icon="i-heroicons-x-mark" color="gray" />
    
    <div class="p-4 border-t border-gray-200 dark:border-gray-800">
      <UDropdown :items="[{ label: 'Sign out', icon: 'i-heroicons-arrow-left-on-rectangle' }]">
        <UButton variant="ghost" color="gray" class="w-full">
          <div class="flex items-center gap-3">
             <UAvatar src="https://avatars.githubusercontent.com/u/739984?v=4" size="xs" />
             <span class="truncate">User Name</span>
          </div>
        </UButton>
      </UDropdown>
    </div>

  </aside>
</template>

<script setup>
const props = defineProps({
  opened: {
    type: Boolean
  }
})

const opened = computed(() => {
  return props.opened
})

const links = [
  {
    label: 'Home',
    icon: 'i-heroicons-home',
    to: '/dashboard'
  },
  {
    label: 'Users',
    icon: 'i-heroicons-users',
    to: '/dashboard/users'
  },
  {
    label: 'Settings',
    icon: 'i-heroicons-cog-6-tooth',
    to: '/dashboard/settings'
  }
]
</script>