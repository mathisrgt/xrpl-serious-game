<template>
    <UCard class="w-full">
        <template #header>
            <h3>{{ activity.name }}</h3>
        </template>
        <p>{{ activity.description }}</p>
        <template #footer>
            <div class="flex gap-2">
                <UButton href="/activity">
                    <UIcon name="i-heroicons-play" />
                    Start
                </UButton>
                <DeleteButton :id="activity._id" type="activities" @deleted="handleDelete" />
            </div>
        </template>
    </UCard>
</template>

<script setup>
import DeleteButton from '@/components/buttons/DeleteButton.vue';

defineProps({
    activity: {
        type: Object,
        required: true
    }
});

const emit = defineEmits(['deleted']);

const handleDelete = (id) => {
    emit('deleted', id);
};
</script>
