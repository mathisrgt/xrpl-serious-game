<template>
    <div class="flex flex-col gap-6 p-10 min-h-screen bg-gray-100">
        <div class="w-2/3 mx-auto space-y-10">
            <h1 class="text-2xl font-bold text-center">Hey User, Welcome Back ☀️</h1>
            <div class="space-y-6">
                <h1 class="text-2xl font-bold">Dashboard</h1>
                <div class="flex flex-col gap-4">
                    <h2 class="text-xl font-bold">Classrooms</h2>
                    <ClassroomsList />
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import ClassroomsList from '@/components/lists/ClassroomsList.vue';

</script>