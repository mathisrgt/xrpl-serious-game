<template>
    <UCard class="w-sm">
        <template #header>
            <h3>Activity</h3>
        </template>
        <p>{{ activity.content }}</p>
        <template #footer>
            <div class="flex gap-2">
                <UButton>
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
