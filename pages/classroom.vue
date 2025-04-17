<template>
    <div class="flex flex-col gap-6 p-10 min-h-screen bg-gray-100">
        <h1 class="text-2xl font-bold">IE Madrid March 2025 <UIcon name="bx:pencil" /></h1>
        <p>Description <UIcon name="bx:pencil" /></p>
        <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Students</h2>
            <StudentList />
        </div>
        <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Activities</h2>
            <ActivityList />
        </div>
    </div>
</template>

<script setup>
import ActivityList from '~/components/lists/ActivityList.vue';
import StudentList from '~/components/lists/StudentList.vue';

</script>