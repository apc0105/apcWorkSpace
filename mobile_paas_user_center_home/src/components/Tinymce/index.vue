<template>
  <div class="tinymce-container editor-container" :class="{fullscreen:fullscreen}">
    <div v-if="editDisable" v-html="value"/>
    <div v-else>
      <textarea class="tinymce-textarea" :id="tinymceId"></textarea>
      <div class="editor-custom-btn-container">
        <upload-image @success="uplodateCBK" button/>
      </div>
    </div>
  </div>
</template>

<script>
  import UploadImage from '@/components/UploadImage'
  import plugins from './plugins'
  import toolbar from './toolbar'

  export default {
    name: 'tinymce',
    components: { UploadImage },
    props: {
      id: {
        type: String
      },
      value: {
        type: String,
        default: ''
      },
      toolbar: {
        type: Array,
        required: false,
        default() {
          return []
        }
      },
      menubar: {
        default: 'file edit insert view format table'
      },
      height: {
        type: Number,
        required: false,
        default: 200
      },
      readonly: Boolean,
      disabled: Boolean,
    },
    data() {
      return {
        hasChange: false,
        hasInit: false,
        tinymceId: this.id || 'vue-tinymce-' + +new Date(),
        fullscreen: false
      }
    },
    watch: {
      value(val) {
        this.lazyUpdate(() => this.setContent(val))
      },
      height(val){
        this.lazyUpdate(() => {
          const val = this.getEditor().getContent()
          this.destroyTinymce()
          this.initTinymce()
          this.setContent(val)
        })
      },
      readonly(){
        this.initTinymce()
      },
      disabled(){
        this.initTinymce()
      }
    },
    computed: {
      editDisable(){
        return this.readonly || this.disabled
      }
    },
    mounted() {
      this.initTinymce()
    },
    activated() {
      this.initTinymce()
    },
    deactivated() {
      this.destroyTinymce()
    },
    methods: {
      initTinymce() {
        if (this.editDisable) {
          return
        }
        const _this = this
        window.tinymce.init({
          selector: `#${this.tinymceId}`,
          height: this.height,
          body_class: 'panel-body ',
          object_resizing: false,
          toolbar: this.toolbar.length > 0 ? this.toolbar : toolbar,
          menubar: this.menubar,
          plugins: plugins,
          end_container_on_empty_block: true,
          powerpaste_word_import: 'clean',
          code_dialog_height: 450,
          code_dialog_width: 1000,
          advlist_bullet_styles: 'square',
          advlist_number_styles: 'default',
          imagetools_cors_hosts: ['www.tinymce.com', 'codepen.io'],
          default_link_target: '_blank',
          link_title: false,
          init_instance_callback: editor => {
            if (_this.value) {
              editor.setContent(_this.value)
            }
            _this.hasInit = true
            editor.on('NodeChange Change KeyUp SetContent', () => {
              this.hasChange = true
              this.$emit('input', editor.getContent())
            })
          },
          setup(editor) {
            editor.on('FullscreenStateChanged', (e) => {
              _this.fullscreen = e.state
            })
          }
        })
      },
      destroyTinymce() {
        if (this.editDisable) {
          return
        }
        this.hasInit = true
        this.getEditor().destroy()
      },
      setContent(value) {
        this.getEditor().setContent(value)
      },
      getContent() {
        this.getEditor().getContent()
      },
      uplodateCBK(e){
        const _this = this
        _this.getEditor().insertContent(`<img class="wscnph" src="${e}" >`)
      },
      imageSuccessCBK(arr) {
        const _this = this
        arr.forEach(v => {
          _this.getEditor().insertContent(`<img class="wscnph" src="${v.url}" >`)
        })
      },
      lazyUpdate(cb){
        if (!this.hasChange && this.hasInit) {
          if (this.editDisable) {
            return
          }
          this.$nextTick(cb)
        }
      },
      getEditor(){
        return window.tinymce.get(this.tinymceId)
      }
    },
    destroyed() {
      this.destroyTinymce()
    }
  }
</script>

<style scoped>
  .tinymce-container {
    position: relative;
  }

  .tinymce-container > > > .mce-fullscreen {
    z-index: 10000;
  }

  .tinymce-textarea {
    visibility: hidden;
    z-index: -1;
  }

  .editor-custom-btn-container {
    position: absolute;
    right: 4px;
    top: 4px;
    line-height: 28px;
    /*z-index: 2005;*/
  }

  .fullscreen .editor-custom-btn-container {
    z-index: 10000;
    position: fixed;
    line-height: 28px;
  }

  .editor-upload-btn {
    display: inline-block;
  }
</style>
