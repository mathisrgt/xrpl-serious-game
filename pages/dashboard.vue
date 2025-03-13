<template>
    <div class="flex flex-col gap-6 p-10 min-h-screen bg-gray-100">
        <h1 class="text-2xl font-bold">Dashboard</h1>
        <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Courses</h2>
            <div class="flex gap-4">
                <UCard class="w-sm">
                    <template #header>
                        <h3>Course #1</h3>
                        <UProgress :model-value="20" />
                    </template>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
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
                <UCard class="w-xs flex items-center justify-center p-4">
                    <UButton>
                        <UIcon name="i-heroicons-plus" />Create a new course
                    </UButton>
                </UCard>
            </div>
        </div>
        <div class="flex flex-col gap-4">
            <h2 class="text-xl font-bold">Classrooms</h2>
            <div class="flex gap-4">
                <UCard class="w-sm">
                    <template #header>
                        <h3>Classroom #1</h3>
                    </template>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
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
                <UCard class="w-xs flex items-center justify-center p-4">
                    <UButton>
                        <UIcon name="i-heroicons-plus" />Create a new classroom
                    </UButton>
                </UCard>
            </div>
        </div>
    </div>
</template>
<script>
import { UCard, UTable } from '#components';

</script>