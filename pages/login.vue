<template>
    <div class="flex justify-center min-h-screen items-center bg-gray-100">
        <UCard class="max-w-md p-6 shadow-lg">
            <h2 class="text-2xl font-semibold text-center mb-6">Welcome back!</h2>

            <form @submit.prevent="submit" class="space-y-4 mb-6">
                <UInput v-model="form.email" label="Email" type="email" placeholder="Enter your email" required class="w-full" />
                <UInput v-model="form.password" label="Password" type="password" placeholder="Enter password" required class="w-full" />

                <UButton type="submit" color="primary" :loading="loading" block>
                    Login
                </UButton>

                <p v-if="errorMessage" class="text-red-500 text-center">{{ errorMessage }}</p>
            </form>

            <div class="text-sm text-center space-x-2">
                <ULink to="/register">Need an account?</ULink>
                <ULink disabled>Forgot your password?</ULink>
            </div>
        </UCard>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const form = ref({ email: '', password: '' });
const loading = ref(false);
const errorMessage = ref('');

const submit = async () => {
    loading.value = true;
    errorMessage.value = '';

    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form.value),
        });

        if (!response.ok) {
            throw new Error('Server responded with an error');
        }

        let data;
        try {
            data = await response.json();
            if (!data) throw new Error('Empty response from server');
        } catch (jsonError) {
            throw new Error('Invalid JSON response from server');
        }

        if (!data.token) {
            throw new Error('Missing authentication token in response');
        }

        localStorage.setItem('auth_token', data.token);
        router.push('/dashboard');
    } catch (error) {
        console.error("Login Request Failed:", error);
        errorMessage.value = error.message;
    } finally {
        loading.value = false;
    }
};


</script>
