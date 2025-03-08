<template>
  <div class="flex justify-center items-center min-h-screen bg-gray-100">
    <UCard class="max-w-md w-full p-6 shadow-lg">
      <h2 class="text-2xl font-semibold text-center mb-4">Register</h2>
      
      <form @submit.prevent="submit" class="space-y-4">
        
        <UInput v-model="form.firstName" label="First Name" placeholder="Enter first name" required />
        <UInput v-model="form.lastName" label="Last Name" placeholder="Enter last name" required />
        <UInput v-model="form.email" label="Email" type="email" placeholder="Enter your email" required />
        <UInput v-model="form.password" label="Password" type="password" placeholder="Enter password" required />

        <USelect v-model="form.role" label="Role">
          <USelectOption value="student">Student</USelectOption>
          <USelectOption value="teacher">Teacher</USelectOption>
        </USelect>

        <UButton type="submit" color="primary" :loading="loading" block>
          Register
        </UButton>

        <p v-if="success" class="text-green-600 text-center">Registered successfully!</p>
      </form>
    </UCard>
  </div>
</template>

<script setup>
import { useAuthStore } from '~/stores/auth';
import { ref } from 'vue';

const auth = useAuthStore();
const form = ref({ firstName: '', lastName: '', email: '', password: '', role: 'student' });
const loading = ref(false);
const success = ref(false);

const submit = async () => {
  loading.value = true;
  success.value = await auth.register(form.value);
  loading.value = false;
};
</script>