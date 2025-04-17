<template>
    <div class="space-y-4">
        <h2 class="text-xl font-bold flex gap-2">Activities <CreateActivityButton @activityCreated="handleActivityCreated" /></h2>
        <div class="grid grid-cols-2 gap-6">
            <!-- <ActivityCard 
            v-for="activity in activities" 
            :activity="activity" 
            :key="activity._id" 
            @deleted="removeActivity" 
        /> -->

            <ActivityCard
                :activity="{ name: 'Memo', description: 'Each student has to send a transaction to a solution account send in the memo of a transaction sent to his account.', content: 'Hey 👋 Welcome to this activity. The goal of this activity is for you to discover the memo feature in a transaction on the XRP Ledger.' }" />
            <ActivityCard
                :activity="{ name: 'Multisig', description: 'Students have to work together to setup a multisig and send a transaction to a solution account.', content: 'Hey 👋 Welcome to this activity. You are about to create a multisig account with different signers from your classroom.' }" />
        </div>
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
