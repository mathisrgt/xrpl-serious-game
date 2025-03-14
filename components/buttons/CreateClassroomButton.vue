<template>    
    <UModal v-model="isModalOpen">
            <UButton>
                <UIcon name="i-heroicons-plus" />
                Create a new classroom
            </UButton>

            <template #content>
                <UCard>
                    <template #header>
                        <h2 class="text-lg font-bold">Create a new classroom</h2>
                    </template>

                    <UForm @submit.prevent="submitClassroom" :state="classroom" class="flex flex-col gap-4">
                        <UInput v-model="classroom.name" label="Classroom Name" required placeholder="Enter name" />

                        <div class="flex justify-end">
                            <UButton type="submit" color="primary" :loading="loading" label="Create" />
                        </div>
                    </UForm>
                </UCard>
            </template>
        </UModal>
</template>

<script setup>
import { ref } from 'vue';

const isModalOpen = ref(false);
const loading = ref(false);
const classroom = ref({
    name: '',
});

const emit = defineEmits(['classroomCreated']);

const submitClassroom = async () => {
    console.log("Submitting classroom: ", classroom.value);

    loading.value = true;

    try {
        const response = await fetch('/api/classrooms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(classroom.value)
        });

        if (!response.ok) throw new Error('Failed to create classroom');

        const newClassroom = await response.json();
        emit('classroomCreated', newClassroom);
        isModalOpen.value = false;
        classroom.value = { name: '' };
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loading.value = false;
    }
};
</script>
