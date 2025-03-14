<template>
    <div>
        <UModal v-model="isModalOpen">
            <UButton>
                <UIcon name="i-heroicons-plus" />
                Create a new course
            </UButton>
            
            <template #content>
            <UCard>
                <template #header>
                    <h2 class="text-lg font-bold">Create a new course</h2>
                </template>

                <UForm @submit.prevent="submitCourse" class="flex flex-col gap-4">
                    <UInput v-model="course.title" label="Course Title" required placeholder="Enter title" />
                    <UTextarea v-model="course.description" label="Description" placeholder="Enter course description" />

                    <div class="flex justify-end">
                        <UButton type="submit" color="primary" :loading="loading" label="Create" />
                    </div>
                </UForm>
            </UCard>
        </template>
        </UModal>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const isModalOpen = ref(false);
const loading = ref(false);
const course = ref({
    title: '',
    description: ''
});

const emit = defineEmits(['courseCreated']);

const submitCourse = async () => {
    loading.value = true;

    try {
        const response = await fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(course.value)
        });

        if (!response.ok) throw new Error('Failed to create course');

        const newCourse = await response.json();
        emit('courseCreated', newCourse);
        isModalOpen.value = false;
        course.value = { title: '', description: '' };
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loading.value = false;
    }
};
</script>
