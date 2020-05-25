import props from './props'

export default {
  props: props,
  data(){
    return {
      // timestamp: new Date().getTime()
    }
  },
  created(){
    // this.updateTimestamp()
  },
  mounted(){
  },
  methods: {
    input(e){
      this.$emit('input', e)
      this.triggerChange(e)
    },
    triggerChange(e){
      if (typeof this.data.onChange == 'function') {
        this.updateTimestamp()
        this.updateParent()
        this.data.onChange(e, this.vo, this.field, this)
      }
    },
    updateParent(){
      this.$emit('update')
    },
    updateTimestamp(){
      // this.timestamp = this.getTimestamp()
      // if (this.vo) {
      //   this.vo['timestamp'] = this.getTimestamp()
      // }
    },
    getTimestamp(){
      return new Date().getTime()
    },
  }
}
