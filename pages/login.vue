<template>
  <div>
    <UContainer class="max:w-sm space-y-4">

       <!-- Login Title -->
      <p class="font-title">Login</p>

      <!-- Login Form -->
      <UForm :schema="schema" :state="state" class="space-y-4" @submit="DoLogin">
    <UFormGroup label="Email" name="email">
      <UInput v-model="state.email" />
    </UFormGroup>

      <!-- Password Input Field -->
    <UFormGroup label="Password" name="password">
      <UInput v-model="state.password" type="password" />
    </UFormGroup>

    <!-- Submit Button -->
    <UButton type="submit">
      Submit
    </UButton>
  </UForm>
    </UContainer>

    <!-- Debug: Display email and password (to be removed) -->
    <pre>{{ email }} {{ password }}</pre>
  </div>
</template>

<script lang="ts" setup>

import { ref, inject, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { object, string, type InferType } from 'yup'
import type { FormSubmitEvent } from '#ui/types'
// import alex_first_api from '~/server/client'

// Define form schema
const schema = object({
  email: string().email('Invalid email').required('Required'),
  password: string()
    .required('Required')
})

// Define form schema type
type Schema = InferType<typeof schema>

// Reactive state to store email and password input values
const state = reactive({
  email: undefined,
  password: undefined
})

// async function onSubmit (event: FormSubmitEvent<Schema>) {
//   // Do something with event.data
// }


// Setup routing
const router = useRouter()

// Ref variables for user email, password, and login state
const email = ref('')
const password = ref('')
const working = ref(false)
const token = ref<string | null>(null);

// Inject method to set user info
const setUserInfo = inject('setUserInfo') as any

// Function to handle login request
const DoLogin = async () => {
  working.value = true
  //Let's factorize the code above thanks to /secret/api/plugins/clients.ts
  const resultJSON = await alex_first_api.login({email: state.email,
      password: state.password})

    // If login is successful, save user info and redirect based on user role
    if (resultJSON.success) {
      const userRole = resultJSON.role;
      setUserInfo(resultJSON)
      router.push(`/${userRole}`);
      return
    }
    alert('Wrong username or password')
    working.value = false
  }

  // Ref for loading state
  const loading = ref(true);

// Function to fetch token for verification
const fetchToken = async () => {
  const response = await fetch('/api/users/verify', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!response.ok) {
    throw new Error('Failed to verify token');
  }
  return await response.json();
};

// Function to check if the user is already logged in
const CheckLogin = async () => {
  try {
    const decodedToken = await fetchToken();

    // If token is valid and user has a role, navigate to their role-based page
    if (decodedToken.role) {
      router.push(`/${decodedToken.role}`);
    }
  } catch (err) {
    // If token verification fails, show error message and redirect to login page
    console.error('Error during token verification:', err);
    alert('Please log in');
    router.push('/login');
  } finally {
    loading.value = false;
  }
};

// Check login status when the component is mounted
onMounted(() => {
  CheckLogin();
});

</script>
