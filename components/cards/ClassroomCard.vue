<template>
    <UCard class="w-sm">
        <template #header>
            <h3 class="font-bold">{{ classroom.name }}</h3>
        </template>
        <p>{{ classroom.description || "No description available." }}</p>
        <template #footer>
            <div class="flex gap-2">
                <UButton href="/classroom">
                    <UIcon name="i-heroicons-arrow-right" />
                    Open
                </UButton>
                <DeleteButton :id="classroom._id" type="classrooms" @deleted="removeClassroom" />
            </div>
        </template>
    </UCard>
</template>

<script setup>
import DeleteButton from '@/components/buttons/DeleteButton.vue';

const props = defineProps({
    classroom: { type: Object, required: true }
});

const emit = defineEmits(['deleted']);

const removeClassroom = (id) => {
    emit('deleted', id);
};
</script>
