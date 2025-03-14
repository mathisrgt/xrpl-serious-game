<template>
    <div class="flex flex-wrap gap-8">
        <UCard class="w-sm flex items-center justify-center p-4">
            <CreateCourseButton @courseCreated="handleCourseCreated" />
        </UCard>

        <CourseCard 
            v-for="course in courses" 
            :course="course" 
            :key="course._id" 
            @deleted="removeCourse" 
        />
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { UCard } from '#components';
import CourseCard from '@/components/cards/CourseCard.vue';
import CreateCourseButton from '@/components/buttons/CreateCourseButton.vue';

const courses = ref([]);

/**
 * Fetch courses from the API
 */
const fetchCourses = async () => {
    try {
        const response = await fetch('/api/courses');
        if (!response.ok) throw new Error('Failed to fetch courses');

        courses.value = await response.json();
    } catch (error) {
        console.error("Error fetching courses:", error);
    }
};

/**
 * Handle a newly created course
 */
const handleCourseCreated = (newCourse) => {
    courses.value.push(newCourse);
};

/**
 * Remove a deleted course from the list
 */
const removeCourse = (id) => {
    courses.value = courses.value.filter(course => course._id !== id);
};

onMounted(fetchCourses);
</script>
