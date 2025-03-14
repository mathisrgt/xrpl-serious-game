<template>
    <UCard class="w-sm">
        <template #header>
            <h3>{{ course.title }}</h3>
            <UProgress :model-value="course.progress" />
        </template>
        <p>{{ course.description || "No description available." }}</p>
        <template #footer>
            <div class="flex gap-2">
                <UButton>
                    <UIcon name="i-heroicons-arrow-right" />
                    Continue
                </UButton>
                <UButton color="warning">
                    <UIcon name="i-heroicons-pencil" />
                    Edit
                </UButton>
                <UButton color="error">
                    <UIcon name="i-heroicons-trash" />
                    Delete
                </UButton>
            </div>
        </template>
    </UCard>
</template>

<script setup>
defineProps({
    course: {
        type: Object,
        required: true
    }
});
</script>