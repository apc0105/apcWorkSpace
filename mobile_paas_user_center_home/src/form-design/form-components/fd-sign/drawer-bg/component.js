export default {
  name: 'fd-sign-drawer-bg',
  props: {
    size: Number,
  },
  data(){
    return {}
  },
  computed: {
    style(){
      const styles = []
      styles.push(`width:${this.size}`)
      styles.push(`height:${this.size}`)
      return styles.join(';')
    }
  },
  mounted() {
  },
  methods: {}
}
