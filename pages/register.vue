<template>
    <div class="flex justify-center min-h-screen items-center bg-gray-100">
        <UCard class="max-w-md w-full p-6 shadow-lg">
            <h2 class="text-2xl font-semibold text-center mb-6">Register</h2>

            <form @submit.prevent="submit" class="space-y-4">
                <UInput v-model="form.firstName" label="First Name" placeholder="Enter first name" required class="w-full" />

                <UInput v-model="form.lastName" label="Last Name" placeholder="Enter last name" required class="w-full" />

                <UInput v-model="form.email" label="Email" type="email" placeholder="Enter your email" required class="w-full" />

                <UInput v-model="form.password" label="Password" type="password" placeholder="Enter password"
                    required class="w-full" />

                <USelect v-model="form.role" label="Role" :items="roles" class="w-full" />


                <UButton type="submit" color="primary" :loading="loading" block>
                    Register
                </UButton>

                <p v-if="success" class="text-green-600 text-center">Registered successfully!</p>
            </form>
        </UCard>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const roles = ref([
  {
    label: 'Student',
    value: 'student'
  },
  {
    label: 'Teacher',
    value: 'teacher'
  },
])
const form = ref({ firstName: '', lastName: '', email: '', password: '', role: 'student' });
const loading = ref(false);
const success = ref(false);

const submit = async () => {
    loading.value = true;
    loading.value = false;
};
</script>