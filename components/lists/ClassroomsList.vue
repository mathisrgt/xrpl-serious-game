<template>
    <div class="flex flex-wrap gap-8">
        <UCard class="w-sm flex items-center justify-center p-4">
            <CreateClassroomButton @classroomCreated="handleClassroomCreated" />
        </UCard>
        <ClassroomCard v-for="classroom in classrooms" :key="classroom.id" :classroom="classroom" />
    </div>
</template>
<script setup>
import { ref } from 'vue';
import { UCard } from '#components';
import ClassroomCard from '@/components/cards/ClassroomCard.vue';
import CreateClassroomButton from '@/components/buttons/CreateClassroomButton.vue';

const classrooms = ref([
    { id: 1, title: "Classroom #1", description: "Lorem ipsum dolor sit amet." },
    { id: 2, title: "Classroom #2", description: "This is another classroom." },
    { id: 3, title: "Classroom #3", description: "A more advanced classroom." },
    { id: 4, title: "Classroom #4", description: "The most advanced classroom." }
]);

const handleClassroomCreated = (newClassroom) => {
    classrooms.value.push(newClassroom);
};
</script>