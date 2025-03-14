<template>
    <div class="flex flex-wrap gap-8">
        <CourseCard v-for="course in courses" :course="course" :key="course.id" />
        <UCard class="w-sm flex items-center justify-center p-4">
            <UButton>
                <UIcon name="i-heroicons-plus" />
                Create a new course
            </UButton>
        </UCard>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { UCard } from '#components';
import CourseCard from '@/components/cards/CourseCard.vue';

const courses = ref([
    { id: 1, title: "Course #1", progress: 20, description: "Lorem ipsum dolor sit amet." },
    { id: 2, title: "Course #2", progress: 50, description: "This is another course." },
    { id: 3, title: "Course #3", progress: 75, description: "A more advanced course." },
    { id: 4, title: "Course #4", progress: 100, description: "The most advanced course." },
    { id: 5, title: "Course #5", progress: 100, description: "The most advanced course." },
]);
</script>