<template>
    <div class="flex flex-col gap-6 p-10 min-h-screen bg-gray-100">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Activities</h2>
            <ActivityList />
        </div>
        <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Courses</h2>
            <CoursesList />
        </div>
        <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Classrooms</h2>
            <ClassroomsList />
        </div>
    </div>
</template>

<script setup>
import ActivityList from '@/components/lists/ActivityList.vue';
import CoursesList from '@/components/lists/CoursesList.vue';
import ClassroomsList from '@/components/lists/ClassroomsList.vue';

</script>