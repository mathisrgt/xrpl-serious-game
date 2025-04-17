<template>
    <div>
        <UModal v-model="isModalOpen">
            <UButton @click="isModalOpen = true" color="neutral" variant="outline">
                <UIcon name="i-heroicons-plus" />
            </UButton>
            <template #content>
                <UCard>
                    <template #header>
                        <h2 class="text-lg font-bold">Invitation link</h2>
                    </template>
                    <p class="text-center">Share the invitation with your students.</p>
                    <NuxtImg src="qr-code.png" class="mx-auto m-2" />
                    <div class="flex justify-end gap-4 mt-4">
                        <UButton color="neutral" variant="link" class="text-center">
                            <UIcon name="i-lucide-link" /> Copy link
                        </UButton>
                        <UButton color="neutral">Done</UButton>
                    </div>
                </UCard>
            </template>
        </UModal>
    </div>
</template>

<script setup>
import { NuxtImg } from '#components';
import { ref, computed } from 'vue';

const emit = defineEmits(['deleted']);

const isModalOpen = ref(false);

const openModal = () => {
    isModalOpen.value = true;
};

const closeModal = () => {
    isModalOpen.value = false;
};
</script>
