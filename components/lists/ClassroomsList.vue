<template>
    <div class="flex flex-wrap gap-8">
        <UCard class="w-sm flex items-center justify-center p-4">
            <CreateClassroomButton @classroomCreated="handleClassroomCreated" />
        </UCard>
        <ClassroomCard v-for="classroom in classrooms" :key="classroom._id" :classroom="classroom" />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { UCard } from '#components';
import ClassroomCard from '@/components/cards/ClassroomCard.vue';
import CreateClassroomButton from '@/components/buttons/CreateClassroomButton.vue';

const classrooms = ref([]);

/**
 * Fetch classrooms from the API
 */
const fetchClassrooms = async () => {
    try {
        const response = await fetch('/api/classrooms');
        if (!response.ok) throw new Error('Failed to fetch classrooms');

        classrooms.value = await response.json();
    } catch (error) {
        console.error("Error fetching classrooms:", error);
    }
};

/**
 * Handle a newly created classroom
 */
const handleClassroomCreated = (newClassroom) => {
    classrooms.value.push(newClassroom);
};

onMounted(fetchClassrooms);
</script>
