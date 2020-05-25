<template>
  <div>
    <full-page ref="fullpage" :options="options" id="fullpage">
      <div class="section">
        <home />
      </div>
      <div class="section">
        <menus />
      </div>
    </full-page>
  </div>
</template>
<script>
import home from './index'
import menus from './menu'
export default {
  components: {
    home,
    menus
  },

  data () {
    return {
      options: {
        licenseKey: 'YOUR_KEY_HEERE',
        menu: '#menu'
        // anchors: ['page1', 'page2', 'page3']
        // sectionsColor: ['#41b883', '#ff5f45', '#0798ec']
      }
    }
  }
}
</script>
