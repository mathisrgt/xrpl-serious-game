<template>
    <div class="flex flex-wrap gap-8">
        <ClassroomCard v-for="classroom in classrooms" :key="classroom.id" :classroom="classroom" />
        <UCard class="w-sm flex items-center justify-center p-4">
            <UButton>
                <UIcon name="i-heroicons-plus" />
                Create a new classroom
            </UButton>
        </UCard>
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { UCard } from '#components';
import ClassroomCard from '@/components/cards/ClassroomCard.vue';

const classrooms = ref([
    { id: 1, title: "Classroom #1", description: "Lorem ipsum dolor sit amet." },
    { id: 2, title: "Classroom #2", description: "This is another classroom." },
    { id: 3, title: "Classroom #3", description: "A more advanced classroom." },
    { id: 4, title: "Classroom #4", description: "The most advanced classroom." }
]);
</script>