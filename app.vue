<template>
  <NuxtLayout class="bg-gray-100">
    <UNavigationMenu color="neutral" variant="link" :items="items" class="w-2/3 mx-auto px-4" />
    <NuxtPage/>
  </NuxtLayout>
</template>

<script setup lang="ts">
import { UNavigationMenu } from '#components';
import type { NavigationMenuItem } from '@nuxt/ui';

const items = ref<NavigationMenuItem[][]>([
  [
    {
      // label: 'Serious Game',
      icon: 'i-lucide-home',
      to: '/dashboard'
    }
  ],
  [
    // {
    //   label: 'GitHub',
    //   icon: 'i-simple-icons-github',
    //   to: 'https://github.com/xrpl-commons',
    //   target: '_blank'
    // },
    {
      // label: 'Account',
      icon: 'codicon:account',
      to: '/account',
    }
  ]
])
</script>
