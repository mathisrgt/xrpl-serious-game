<template>
    <div>
        <UModal v-model="isModalOpen">
            <UButton color="error" @click="openModal">
            <UIcon name="i-heroicons-trash" />
            Delete
        </UButton>
        <template #content>
            <UCard>
                <template #header>
                    <h2 class="text-lg font-bold">Confirm Deletion</h2>
                </template>

                <p>Are you sure you want to delete this {{ formattedType }}?</p>

                <div class="flex justify-end gap-4 mt-4">
                    <UButton color="gray" @click="closeModal">Cancel</UButton>
                    <UButton color="error" :loading="loading" @click="deleteItem">Delete</UButton>
                </div>
                </UCard>
            </template>
        </UModal>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';

const props = defineProps({
    id: { type: String, required: true }, 
    type: { 
        type: String, 
        required: true, 
        validator: (value) => ['classrooms', 'courses', 'students', 'teachers'].includes(value) 
    }
});

const emit = defineEmits(['deleted']);

const isModalOpen = ref(false);
const loading = ref(false);

const formattedType = computed(() => {
    return props.type.charAt(0).toUpperCase() + props.type.slice(1);
});

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};

const deleteItem = async () => {
    loading.value = true;
    console.log("Deleting item: ", props.id);
    
    try {
        const response = await fetch(`/api/${props.type}/${props.id}`, {
            method: 'DELETE'
        });

        if (!response.ok) throw new Error(`Failed to delete ${props.type}`);

        emit('deleted', props.id);
        
        closeModal();
    } catch (error) {
        console.error(`Error deleting ${props.type}:`, error);
    } finally {
        loading.value = false;
    }
};
</script>
