<template>
  <div class="p-10 mx-auto space-y-6 w-2/3 min-h-screen">
    <h1 class="text-2xl font-bold">New content</h1>

    <UForm :state="form" @submit="submitContent" class="space-y-6">
      <div>
        <UFormGroup class="space-y-2">

          <div class="space-y-2 my-4">
            <h2 class="text-lg font-semibold">Header</h2>
            <hr />
          </div>

          <UFormField label="Name*" name="name">
            <UInput v-model="form.name" required label="Name" class="w-full" placeholder="Enter a name" />
          </UFormField>

          <UFormField label="Description*" name="description">
            <UTextarea v-model="form.description" class="w-full" placeholder="Enter a description" />
          </UFormField>

          <UFormField label="Type*" name="type">
            <USelect v-model="form.type" :items="contentTypes" required class="w-full" />
          </UFormField>
        </UFormGroup>
      </div>

      <div class="space-y-4">
        <div class="space-y-2 my-4">
          <h2 class="text-lg font-semibold">Content</h2>
          <hr />
        </div>

        <p v-if="form.data.length === 0" class="text-gray-500">
          No content added yet.
        </p>

        <div v-for="(section, index) in form.data" :key="index" class="rounded space-y-1 flex flex-col gap-2">
          <div class="flex gap-2 justify-between">
            <USelect v-model="section.type" :items="sectionTypes" class="w-40" />
            <UButton color="error" variant="soft" :loading="loading" size="xs" @click="removeSection(index)">
              <UIcon name="i-lucide-trash-2" />
            </UButton>
          </div>
          <UInput v-if="section.type === 'title'" v-model="section.value" placeholder="Enter title" />
          <UTextarea v-else-if="section.type === 'body'" v-model="section.value" placeholder="Enter text body" />
          <UInput v-else-if="section.type === 'link'" v-model="section.value" placeholder="Enter URL" />
          <UTextarea v-else-if="section.type === 'code'" v-model="section.value" placeholder="Enter code"
            color="neutral" variant="outline" :highlight="true" />
        </div>

        <div class="space-x-2">
          <UButton @click="addSection" variant="soft">Add</UButton>
          <UButton type="submit" class="mt-4" :disabled="form.data.length === 0 || !form.name || !form.type" @click="handleSubmit">
            Save
          </UButton>
        </div>
      </div>
    </UForm>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter();
const loading = ref(false);

const contentTypes = ref(['qcm', 'onchain', 'lesson', 'document'])
const sectionTypes = ref(['title', 'body', 'link', 'code'])

const form = ref({
  name: '',
  description: '',
  type: '',
  data: []
})

function addSection() {
  form.value.data.push({ type: 'title', value: '' })
}

function removeSection(index) {
  form.value.data.splice(index, 1)
}

async function handleSubmit() {
  try {
    await $fetch('/api/content', {
      method: 'POST',
      body: form.value
    });
    router.push('/dashboard');
  } catch (error) {
    console.error('Failed to submit content', error);
  }
}
</script>
