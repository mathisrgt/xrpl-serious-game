<template>
    <div>
        <table class="w-full">
            <thead>
                <tr class="bg-gray-100 text-left">
                    <th class="p-3 font-semibold">Username</th>
                    <th class="p-3 font-semibold">Email Address</th>
                    <th class="p-3 font-semibold">Progress</th>
                    <th class="p-3 font-semibold"></th>
                </tr>
            </thead>
            <tbody>
                <tr class="border-t">
                    <td class="p-3">sophie.martin</td>
                    <td class="p-3">sophie.martin@example.com</td>
                    <td class="p-3">
                        <UProgress v-model="values[0]" size="sm" class="mb-1" />
                        <span class="text-xs text-gray-600">82%</span>
                    </td>
                    <td class="p-3">
                        <UButton color="error" variant="soft">
                            <UIcon name="bx:trash" />
                        </UButton>
                    </td>
                </tr>
                <tr class="border-t">
                    <td class="p-3">leo.nguyen</td>
                    <td class="p-3">leo.nguyen@example.com</td>
                    <td class="p-3">
                        <UProgress v-model="values[1]" size="sm" class="mb-1" />
                        <span class="text-xs text-gray-600">65%</span>
                    </td>
                    <td class="p-3">
                        <UButton color="error" variant="soft">
                            <UIcon name="bx:trash" />
                        </UButton>
                    </td>
                </tr>
                <tr class="border-t">
                    <td class="p-3">emily.ross</td>
                    <td class="p-3">emily.ross@example.com</td>
                    <td class="p-3">
                        <UProgress v-model="values[2]" size="sm" class="mb-1" />
                        <span class="text-xs text-gray-600">91%</span>
                    </td>
                    <td class="p-3">
                        <UButton color="error" variant="soft">
                            <UIcon name="bx:trash" />
                        </UButton>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>


<script setup lang="ts">
    const values = ref([82, 65, 91])
</script>