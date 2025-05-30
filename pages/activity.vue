<template>
    <div class="flex flex-col gap-6 p-10 min-h-screen bg-gray-100">
        <div class="w-2/3 mx-auto space-y-6">
            <div class="space-y-2">
                <h1 class="text-2xl font-bold">Developer Training - May 4th</h1>
                <p>Learn how to develop on the XRP Ledger.</p>
            </div>

            <UButton v-if="!showContent" label="Start the activity" @click="generateAndShowContent" />

            <div v-else class="space-y-6">
                <hr />
                <div class="flex flex-col gap-4">
                    <UCollapsible class="flex flex-col gap-2">
                        <p>A
                            <UButton label="wallet" color="neutral" variant="subtle"
                                trailing-icon="i-lucide-chevron-down" block class="w-fit"
                                :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }" />
                            has been created just for you!
                        </p>
                        <template #content>
                            <div class="space-y-4 border-2 border-gray-200 rounded-lg p-6">
                                <UAlert color="error" variant="subtle" title="Important"
                                    description="Do not use this wallet for mainnet transactions. The private key is not securly stored."
                                    icon="i-lucide-triangle-alert" />
                                <div class="grid grid-cols-2 gap-4">

                                    <p class="font-bold">Classic address</p>
                                    <code class="bg-white p-3 rounded-lg text-sm">{{ generated.studentWallet.classicAddress }}</code>

                                    <p class="font-bold">Private key</p>
                                    <div class="mt-2">
                                        <code
                                            class="bg-white p-3 rounded-lg text-sm w-full">{{ showPrivateKey ? generated.studentWallet.prvKey : '••••••••••••••••••' }}</code>
                                        <UButton color="gray" variant="ghost" size="xs" icon
                                            @click="showPrivateKey = !showPrivateKey">
                                            <UIcon
                                                :name="showPrivateKey ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" />
                                        </UButton>
                                    </div>
                                </div>
                            </div>
                        </template>
                    </UCollapsible>

                    <hr />
                    <p class="font-bold">{{ content.name }}</p>
                    <p>{{ content.description }}</p>
                    <div v-if="content.data">
                        <div v-for="(section, i) in content.data" :key="i" class="mb-4">
                            <p class="font-bold" v-if="section.type === 'title'">{{ section.value }}</p>
                            <p v-else-if="section.type === 'body'" class="text-sm">{{ section.value }}</p>
                            <code v-else-if="section.type === 'code'"
                                class="bg-white p-3 rounded text-sm block">{{ section.value }}</code>
                            <code class="bg-white p-3 rounded text-sm block" v-else-if="section.type === 'link'"
                                :href="section.value">
            {{ section.value }}
        </code>
                        </div>
                    </div>
                </div>
                <UButton label="Next" :disabled class="w-fit" color="neutral" variant="outline" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const content = ref(null)
const generated = ref(null)
const error = ref(null)
const showContent = ref(false)
const showPrivateKey = ref(false)

async function generateAndShowContent() {
    try {
        const response = await $fetch('http://localhost:3000/api/interactive', {
            method: 'POST',
            body: {
                type: 'memo',
                contentId: '6839ae73eba73ff0e14ca1c7'
            }
        })

        content.value = response.content
        generated.value = response.generated

        showContent.value = true
    } catch (err) {
        console.error('❌ Failed to call /api/interactive:', err)
        error.value = err
    }
}

</script>