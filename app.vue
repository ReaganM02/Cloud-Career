<template>
  <div>
    <NuxtLayout>
      <NuxtLoadingIndicator :duration="2000" :throttle="100" color="#000" />
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>
