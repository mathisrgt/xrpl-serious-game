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
            color="neutral" variant="outline" :highlight="true" 
          />
          <div v-else-if="section.type === 'question'" class="space-y-2">
  <UInput
    v-model="section.value"
    placeholder="Enter the question prompt"
    class="w-full"
  />

  <div v-for="(answer, i) in section.answers" :key="i" class="flex items-center gap-2">
    <UCheckbox
      v-model="section.correctAnswers[i]"
      :value="i"
    />
    <UInput
      v-model="section.answers[i]"
      placeholder="Answer option"
      class="flex-1"
    />
    <UButton icon="i-lucide-x" variant="ghost" size="xs" color="red" @click="section.answers.splice(i, 1)" v-if="section.answers.length >= 2" />
  </div>

  <UButton
    label="Add Answer"
    variant="soft"
    size="xs"
    class="mt-2"
    :disabled="section.answers.length >= 5"
    @click="section.answers.push('')"
  />
  <p class="text-xs text-gray-500">You must add at least 2 answers and select at least 1 correct answer.</p>
</div>      
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
const sectionTypes = ref(['title', 'body', 'link', 'code', 'question'])

const form = ref({
  name: '',
  description: '',
  type: '',
  data: []
})

function addSection() {
  form.value.data.push({ 
    type: 'title', 
    value: '',
  answers: [],
    correctAnswers: [] })
}

function removeSection(index) {
  form.value.data.splice(index, 1)
}

async function handleSubmit() {
  const valid = form.value.data.every(section => {
  if (section.type === 'question') {
    return section.answers.length >= 2 && section.correctAnswers.length >= 1
  }
  return true
})

if (!valid) {
  alert('Each question must have at least 2 answers and 1 correct answer.')
  return
}

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
