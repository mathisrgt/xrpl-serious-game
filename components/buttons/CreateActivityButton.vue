<template>
    <div>
        <UModal v-model="isModalOpen">
            <UButton @click="isModalOpen = true">
            <UIcon name="i-heroicons-plus" />
            Create a new activity
        </UButton>
        
            <template #content>
            <UCard>
                <template #header>
                    <h2 class="text-lg font-bold">Create a New Activity</h2>
                </template>

                <UForm @submit.prevent="submitActivity" class="space-y-4">
                    <UInput v-model="activity.content" label="Activity Content" required placeholder="Enter content" />

                    <div class="flex justify-end gap-2">
                        <UButton color="gray" @click="isModalOpen = false">Cancel</UButton>
                        <UButton type="submit" color="primary" :loading="loading">
                            Create Activity
                        </UButton>
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
const activity = ref({
    content: '',
});

const emit = defineEmits(['activityCreated']);

const submitActivity = async () => {
    loading.value = true;

    try {
        const response = await fetch('/api/activities', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(activity.value)
        });

        if (!response.ok) throw new Error('Failed to create activity');

        const newActivity = await response.json();
        emit('activityCreated', newActivity);
        isModalOpen.value = false;
        activity.value = { content: '' };
    } catch (error) {
        console.error('Error:', error);
    } finally {
        loading.value = false;
    }
};
</script>
