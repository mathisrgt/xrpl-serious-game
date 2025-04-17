<template>
    <div class="flex flex-wrap gap-8">
        <UCard class="w-sm flex items-center justify-center p-4">
            <CreateActivityButton @activityCreated="handleActivityCreated" />
        </UCard>

        <!-- <ActivityCard 
            v-for="activity in activities" 
            :activity="activity" 
            :key="activity._id" 
            @deleted="removeActivity" 
        /> -->

        <ActivityCard :activity="{content: 'Blablabla'}"/>
        <ActivityCard :activity="{content: 'Blablabla'}"/>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { UCard } from '#components';
import ActivityCard from '@/components/cards/ActivityCard.vue';
import CreateActivityButton from '@/components/buttons/CreateActivityButton.vue';

const activities = ref([]);

/**
 * Fetch activities from the API
 */
const fetchActivities = async () => {
    try {
        const response = await fetch('/api/activities');
        if (!response.ok) throw new Error('Failed to fetch activities');

        activities.value = await response.json();
    } catch (error) {
        console.error("Error fetching activities:", error);
    }
};

/**
 * Handle a newly created activity
 */
const handleActivityCreated = (newActivity) => {
    activities.value.push(newActivity);
};

/**
 * Remove a deleted activity from the list
 */
const removeActivity = (id) => {
    activities.value = activities.value.filter(activity => activity._id !== id);
};

onMounted(fetchActivities);
</script>
