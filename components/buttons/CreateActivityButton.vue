<template>
    <div>
        <UModal v-model="isModalOpen">
            <UButton @click="isModalOpen = true">
                <UIcon name="i-heroicons-plus" />
            </UButton>

            <template #content>
                <UCard>
                    <template #header>
                        <h2 class="text-lg font-bold">New Activity</h2>
                    </template>

                    <UForm @submit.prevent="submitActivity" class="space-y-4">
                        <!-- <UInput v-model="activity.content" label="Activity Content" required placeholder="Enter content" /> -->
                        <div class="flex flex-col gap-2">
                            <UInput label="Activity name" required placeholder="Enter the name" />
                            <UTextarea label="Activity description" required
                                placeholder="Enter a description of this activity" />
                        </div>
                        <div class="flex justify-end gap-2">
                            <UButton type="submit" color="primary" :loading="loading">
                                Create
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
