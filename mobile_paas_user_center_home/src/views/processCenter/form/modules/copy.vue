<template>
  <v-form :is-edit='true' is-copy></v-form>
</template>

<script>
  import VForm from './url-form'

  export default {
    name: 'FlowDefformCopy',
    components: { VForm }
  }
</script>

