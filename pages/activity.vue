<template>
    <div class="flex flex-col gap-6 p-10 min-h-screen bg-gray-100">
        <div class="w-2/3 mx-auto space-y-6">
            <div class="space-y-2">
                <h1 class="text-2xl font-bold">Memo
                    <!-- <UIcon name="bx:pencil" /> -->
                </h1>
                <p>Understand how works memos and how to use them on the XRP Ledger.</p>
                <!-- <UIcon name="bx:pencil" /> -->
            </div>
            
            <UButton v-if="!showActivity" label="Start the activity" @click="showActivity = true" />
            <div v-else class="space-y-6">
                <hr />
                <div class="flex flex-col gap-4">
                    <p class="font-bold">
                        Hey 👋 Welcome to the memo activity.
                    </p>

                    <UCollapsible class="flex flex-col gap-2">
                        <p>A
                            <UButton label="wallet" color="neutral" variant="subtle"
                                trailing-icon="i-lucide-chevron-down" block class="w-fit"
                                :ui="{ trailingIcon: 'group-data-[state=open]:rotate-180 transition-transform duration-200' }" />
                            has been created just for you!
                        </p>
                        <template #content>
                            <div class="grid grid-cols-2 gap-4 border-2 border-gray-200 rounded p-6">
                                <p class="font-bold">Classic address</p>
                                <code class="bg-white p-3 rounded-lg text-sm">command line</code>
                                <p class="font-bold">Public key</p>
                                <code class="bg-white p-3 rounded-lg text-sm">command line</code>
                                <p class="font-bold">Private key</p>
                                <div class="w-full block">
                                    <code
                                        class="bg-white p-3 rounded-lg text-sm w-full">{{ showPrivateKey ? privateKey : '••••••••••••••••••' }}</code>
                                    <UButton color="gray" variant="ghost" size="xs" icon
                                        @click="showPrivateKey = !showPrivateKey">
                                        <UIcon :name="showPrivateKey ? 'i-heroicons-eye-slash' : 'i-heroicons-eye'" />
                                    </UButton>
                                </div>
                            </div>
                        </template>
                    </UCollapsible>

                    <p class="font-bold">Step 1</p>
                    <p>A transation has been send to your wallet. Take a look to the memo! 👀</p>
                    <code class="bg-white p-3 rounded-lg text-sm">https://devnet.xrpl.org/</code>
                    <p class="font-bold">Step 2</p>
                    <p>Follow the instructions and execute the transaction.</p>
                    <p class="font-bold">Step 3</p>
                    <p>Waiting for the transaction to complete the activity.</p>
                    <div class="bg-white p-6 rounded-lg text-sm">
                        <UProgress />
                    </div>
                </div>
                <UButton label="Next" :disabled class="w-fit" color="neutral" />
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue'

const showPrivateKey = ref(false)
const showActivity = ref(false)
const privateKey = '0xPrivateKey'
</script>