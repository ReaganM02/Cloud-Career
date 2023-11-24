<script lang="ts" setup>
interface Props {
  validationSchema: object[],
  loading?: boolean,
  initialValues?: object
}
const { validationSchema, loading, initialValues } = defineProps<Props>()
const emits = defineEmits(['submit'])

// Refs properties
const currentStepIdx = ref(0)
provide('CURRENT_STEP_INDEX', currentStepIdx)
const stepCounter = ref(0)
provide('STEP_COUNTER', stepCounter)

// Start of computed properties
const isLastStep = computed(() => {
  return currentStepIdx.value === stepCounter.value - 1
})

const hasPrevious = computed(() => {
  return currentStepIdx.value > 0
})

const currentSchema = computed(() => {
  return validationSchema[currentStepIdx.value]
})

const { handleSubmit, meta } = useForm({
  validationSchema: currentSchema,
  keepValuesOnUnmount: true,
  initialValues
})

// Start of functions
const onSubmit = handleSubmit((values) => {
  if (!isLastStep.value) {
    currentStepIdx.value++
    return
  }
  emits('submit', values)
})

function goToPrev () {
  if (currentStepIdx.value === 0) {
    return
  }
  currentStepIdx.value--
}

</script>
<template>
  <form @submit="onSubmit">
    <slot />
    <div class="mt-8 flex gap-4">
      <FormButton
        v-if="hasPrevious"
        label="Back"
        class="bg-zinc-200 text-zinc-600"
        @click="goToPrev"
      />
      <FormButton
        type="submit"
        :disabled="!meta.valid || loading"
        :loading="loading"
        :label="isLastStep ? 'Create Account' : 'Next'"
        class="disabled:bg-zinc-300 disabled:text-zinc-500"
      />
    </div>
  </form>
</template>
<style scoped lang="css"></style>
