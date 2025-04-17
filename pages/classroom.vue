<template>
    <div class="flex flex-col gap-6 p-10 min-h-screen bg-gray-100 overflow-y-auto">
        <div class="w-2/3 space-y-8 mx-auto">
            <!-- <UButton color="neutral" variant="soft" size="lg" href="/dashboard">
                <UIcon name="bx:left-arrow" />
            </UButton> -->
            <div class="space-y-2">
                <h1 class="text-2xl font-bold">IE Madrid March 2025
                    <UIcon name="bx:pencil" />
                </h1>
                <p>Description
                    <UIcon name="bx:pencil" />
                </p>
            </div>
            <div class="flex flex-col gap-4">
                <h2 class="text-xl font-bold">Students</h2>
                <StudentList />
            </div>
            <div class="flex flex-col gap-4">
                <ActivityList />
            </div>
        </div>
    </div>
</template>

<script setup>
import ActivityList from '~/components/lists/ActivityList.vue';
import StudentList from '~/components/lists/StudentList.vue';

</script>