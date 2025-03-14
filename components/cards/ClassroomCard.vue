<template>
    <UCard class="w-sm">
        <template #header>
            <h3>{{ classroom.title }}</h3>
        </template>
        <p>{{ classroom.description || "No description available." }}</p>
        <template #footer>
            <div class="flex gap-2">
                <UButton>
                    <UIcon name="i-heroicons-arrow-right" />
                    Open
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
    classroom: {
        type: Object,
        required: true
    }
});
</script>