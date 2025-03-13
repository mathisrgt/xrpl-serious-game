<template>
    <div class="flex justify-center min-h-screen items-center bg-gray-100">
        <UCard class="max-w-md p-6 shadow-lg">
            <h2 class="text-2xl font-semibold text-center mb-6">Welcome back!</h2>

            <UForm @submit.prevent="submit" class="space-y-4 mb-6">
                <UInput v-model="form.email" label="Email" type="email" placeholder="Enter your email" required
                    class="w-full" />

                <UInput v-model="form.password" label="Password" type="password" placeholder="Enter password" required
                    class="w-full" />

                <UButton type="submit" color="primary" :loading="loading" block>
                    Login
                </UButton>
            </UForm>

            <div class="text-sm text-center space-x-2">
                <ULink to="/register">Need an account?</ULink>
                <ULink to="/register">Forgot your password?</ULink>
            </div>
        </UCard>
    </div>
</template>

<script setup>
import { UForm } from '#components';
import { ref } from 'vue';

const form = ref({ email: '', password: '' });
const loading = ref(false);

const submit = async () => {
    loading.value = true;
    loading.value = false;
};
</script>