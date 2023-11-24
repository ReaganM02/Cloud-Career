<script lang="ts" setup>
import { mixed, object, string } from 'yup'
definePageMeta({
  layout: 'user'
})

const formSchema = [
  object({
    firstName: string().required('First Name is required.'),
    lastName: string().required('Last Name is required.'),
    email: string().required('Email is required.').email('Invalid email.'),
    password: string().required('Password is required.').min(10, 'Password is too short.')
  }),
  object({
    companyName: string().required('Company Name is required.'),
    websiteLink: string().required('Website link is required.').url('Invalid URL'),
    companyLogo: mixed().required('Company Logo is required.')
  })
]

const initialValues = {
  firstName: 'Reagan',
  lastName: 'Mahinay',
  email: 'reagan@gmail.com',
  password: 'Reagan12345',
  companyName: 'Test',
  websiteLink: 'https://google.com'
}

async function handleCreateAcount (_formData:object) {
}

</script>
<template>
  <div>
    <h1 class="nunito text-zinc-900 text-[25px] text-center">
      Create an Account
    </h1>
    <FormWizard :validation-schema="formSchema" :initial-values="initialValues" class="mt-4" @submit="handleCreateAcount">
      <FormStep>
        <FormField name="firstName" label="First Name" />
        <FormField name="lastName" label="Last Name" class="mt-4" />
        <FormField type="email" name="email" label="Email" class="mt-4" />
        <FormField type="password" name="password" label="Password" class="mt-4" />
      </FormStep>
      <FormStep>
        <FormField name="companyName" label="Company Name" />
        <FormField name="websiteLink" label="Website Link" class="mt-4" />
        <FormFile name="companyLogo" label="Company Logo" class="mt-4" />
      </FormStep>
    </FormWizard>
  </div>
</template>
<style scoped lang="css">

</style>
