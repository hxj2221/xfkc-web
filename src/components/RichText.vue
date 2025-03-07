<template>
  <div ref="richtext">
    <textarea :id="Id" />
  </div>
</template>
<script>
import { getToken } from '@/utils/auth'
import { mapGetters } from 'vuex'
// 富文本组件
export default {
  name: 'RichText',
  model: {
    prop: 'text',
    event: 'change'
  },
  props: {

    text: {
      default: '',
      type: String
    },
    upcatalog: {
      default: '',
      type: String
    },
    placeholder: {
      default: '请输入详细内容',
      type: String
    },
    config: {
      type: Object,
      default: () => {
        return {
          theme: 'modern',
          height: 300
        }
      }
    },
    url: {
      default: '',
      type: String
    },
    accept: {
      default: 'image/jpeg, image/png',
      type: String
    },
    withCredentials: {
      default: false,
      type: Boolean
    },
    showstate: {
      default: false,
      type: Boolean
    }
  },
  data() {
    const Id = Date.now()
    return {
      cos: null,
      videoUploading: false,
      showMobile: false,
      InitState: false,
      Content: '',
      Onfocus: false,
      pathInput: null, // function 视频地址拷贝至插件的地址栏中
      Id: Id,
      Editor: null,
      DefaultConfig: {
        // GLOBAL
        language: 'zh_CN',
        height: 500,
        theme: 'modern',
        menubar: false,
        toolbar: 'styleselect | fontselect | formatselect | fontsizeselect | forecolor backcolor | bold italic underline strikethrough | image  media | table | alignleft aligncenter alignright alignjustify | outdent indent | numlist bullist | preview removeformat  hr | paste code  link | undo redo | fullscreen ',
        plugins: `
            paste
            importcss
            image
            code
            table
            advlist
            fullscreen
            link
            lists
            textcolor
            colorpicker
            hr
            preview
            media
          `,
        forced_root_block: 'p',
        force_p_newlines: true,
        // importcss_append: true,

        // CONFIG: ContentStyle 这块很重要， 在最后呈现的页面也要写入这个基本样式保证前后一致， `table`和`img`的问题基本就靠这个来填坑了
        content_style: `
            *                         { padding:0; margin:0; }
            html, body                { height:100%; }
            img                       { max-width:100%; display:block;height:auto; }
            a                         { text-decoration: none; }
            iframe                    { width: 100%; }
            p                         { line-height:1.6; margin: 0px; }
            table                     { word-wrap:break-word; word-break:break-all; max-width:100%; border:none; border-color:#999; }
            .mce-object-iframe        { width:100%; box-sizing:border-box; margin:0; padding:0; }
            ul,ol                     { list-style-position:inside; }
          `,

        insert_button_items: 'image link | inserttable',

        // CONFIG: Paste
        paste_retain_style_properties: 'all',
        paste_word_valid_elements: '*[*]', // word需要它
        paste_data_images: true, // 粘贴的同时能把内容里的图片自动上传，非常强力的功能
        paste_convert_word_fake_lists: false, // 插入word文档需要该属性
        paste_webkit_styles: 'all',
        paste_merge_formats: true,
        nonbreaking_force_tab: false,
        paste_auto_cleanup_on_paste: false,

        // CONFIG: Font
        fontsize_formats: '10px 11px 12px 14px 16px 18px 20px 24px',

        // CONFIG: StyleSelect
        style_formats: [
          {
            title: '首行缩进',
            block: 'p',
            styles: { 'text-indent': '2em' }
          },
          {
            title: '行高',
            items: [
              { title: '1', styles: { 'line-height': '1' }, inline: 'span' },
              { title: '1.5', styles: { 'line-height': '1.5' }, inline: 'span' },
              { title: '2', styles: { 'line-height': '2' }, inline: 'span' },
              { title: '2.5', styles: { 'line-height': '2.5' }, inline: 'span' },
              { title: '3', styles: { 'line-height': '3' }, inline: 'span' }
            ]
          }
        ],

        // FontSelect
        font_formats: `
            微软雅黑=微软雅黑;
            宋体=宋体;
            黑体=黑体;
            仿宋=仿宋;
            楷体=楷体;
            隶书=隶书;
            幼圆=幼圆;
            Andale Mono=andale mono,times;
            Arial=arial, helvetica,
            sans-serif;
            Arial Black=arial black, avant garde;
            Book Antiqua=book antiqua,palatino;
            Comic Sans MS=comic sans ms,sans-serif;
            Courier New=courier new,courier;
            Georgia=georgia,palatino;
            Helvetica=helvetica;
            Impact=impact,chicago;
            Symbol=symbol;
            Tahoma=tahoma,arial,helvetica,sans-serif;
            Terminal=terminal,monaco;
            Times New Roman=times new roman,times;
            Trebuchet MS=trebuchet ms,geneva;
            Verdana=verdana,geneva;
            Webdings=webdings;
            Wingdings=wingdings,zapf dingbats`,

        // Tab
        tabfocus_elements: ':prev,:next',
        object_resizing: true,

        // Image
        image_advtab: false,

        // CONFIG: Media
        media_live_embeds: true,
        media_alt_source: false,
        media_poster: false,
        media_dimensions: false,
        media_filter_html: false,
        media_url_resolver: (data, resolve, reject) => {
          // 检测URL的文件扩展名来确定视频类型
          let videoType = 'video/mp4'; // 默认类型
          const url = data.url.toLowerCase();
          
          if (url.endsWith('.webm')) {
            videoType = 'video/webm';
          } else if (url.endsWith('.ogg') || url.endsWith('.ogv')) {
            videoType = 'video/ogg';
          } else if (url.endsWith('.mov')) {
            videoType = 'video/quicktime';
          } else if (url.endsWith('.avi')) {
            videoType = 'video/x-msvideo';
          } else if (url.endsWith('.wmv')) {
            videoType = 'video/x-ms-wmv';
          } else if (url.endsWith('.flv')) {
            videoType = 'video/x-flv';
          } else if (url.endsWith('.3gp')) {
            videoType = 'video/3gpp';
          }
          
          // 直接解析URL，不做额外处理
          resolve({
            html: `<video controls="controls" width="100%" height="auto"><source src="${data.url}" type="${videoType}" />您的浏览器不支持视频播放</video>`
          });
        },
        // imagetools_toolbar: 'rotateleft rotateright | flipv fliph | editimage imageoptions'
      }
    }
  },
  computed: {
    ...mapGetters(['baseApi', 'fileUploadApi']),
    headers() {
      return {
        Authorization: getToken()
      }
    }
  },
  watch: {
    text(val, old) {
      this.Content = val
      if (this.Onfocus === false && (old === '')) {
        window.tinymce.activeEditor.setContent(val)
      }
      if (this.Onfocus === false) {
        window.tinymce.activeEditor.setContent(val)
      }
    },
    showstate(val) {
      this.showMobile = val
    },
    showMobile(val) {
      this.$emit('update:showstate', val)
    }

  },

  beforeMount() {

  },

  mounted() {
    this.init()
  },

  beforeDestroy() {
    // 销毁tinymce
    this.$emit('on-destroy')
    window.tinymce.remove(`#${this.Id}`)
  },

  methods: {

    onVideoSuccess(url) {
      this.pathInput(url)
    },
    onVideoProgress(obj) {
      const percent = Math.ceil(obj.percent * 100)
      if (percent < 100) {
        window.tinymce.activeEditor.setProgressState(true)// 是否显示loading状态：1（显示）0（隐藏）
      } else {
        window.tinymce.activeEditor.setProgressState(false)
      }
    },
    insertVideo(url, type = 'video/mp4') {
      try {
        // 直接插入视频标签
        const videoHtml = `
          <p>
            <video controls="controls" width="100%" height="auto">
              <source src="${url}" type="${type || 'video/mp4'}" />
              您的浏览器不支持视频播放
            </video>
          </p>
        `
        window.tinymce.activeEditor.insertContent(videoHtml)
        // 通知内容变化
        window.tinymce.activeEditor.fire('change')
      } catch (error) {
        console.error('插入视频时出错:', error)
      }
    },
    init() {
      const self = this

      this.Editor = window.tinymce.init({
        init_instance_callback: self.initComplete(),
        // 默认配置
        ...this.DefaultConfig,
        file_picker_types: 'media',
        file_picker_callback: (cb, value, meta) => {
          // 创建一个隐藏的文件输入框
          const input = document.createElement('input')
          input.setAttribute('type', 'file')
          
          // 设置接受的文件类型，支持常见视频格式
          if (meta.filetype === 'media') {
            input.setAttribute('accept', 'video/*')
          }
          
          // 监听文件选择事件
          input.onchange = () => {
            const file = input.files[0]
            if (!file) return
            
            // 创建FormData对象用于上传
            const formData = new FormData()
            formData.append('file', file)
            formData.append('path', '/richtext')
            
            // 显示上传进度
            window.tinymce.activeEditor.setProgressState(true)
            
            // 发送上传请求
            const xhr = new XMLHttpRequest()
            xhr.open('POST', `${self.baseApi}/api/localStorage/upload`)
            xhr.setRequestHeader('Authorization', getToken())
            
            xhr.onload = function() {
              // 隐藏上传进度
              window.tinymce.activeEditor.setProgressState(false)
              
              if (xhr.status !== 201) {
                // 上传失败
                self.$emit('on-upload-fail')
                console.error('上传失败:', xhr.responseText)
                return
              }
              
              try {
                // 上传成功，获取返回的URL
                const json = JSON.parse(xhr.responseText)
                const url = self.$comm.url(json.path)
                
                // 直接插入视频，而不是调用回调
                self.insertVideo(url, file.type)
              } catch (error) {
                console.error('处理上传响应时出错:', error)
              }
            }
            
            xhr.onerror = function() {
              window.tinymce.activeEditor.setProgressState(false)
              console.error('上传请求失败')
            }
            
            xhr.send(formData)
          }
          
          // 触发文件选择对话框
          input.click()
        },
        // 图片上传
        images_upload_handler: function(blobInfo, success, failure) {
          const xhr = new XMLHttpRequest()
          const formData = new FormData()
          xhr.withCredentials = self.withCredentials
          xhr.open('POST', `${self.baseApi}/api/localStorage/upload`)
          xhr.onload = function() {
            if (xhr.status !== 201) {
              // 抛出 'on-upload-fail' 钩子
              self.$emit('on-upload-fail')
              failure('上传失败: ' + xhr.status)
              return
            }

            const json = JSON.parse(xhr.responseText)
            console.log(self.$comm.url(json.path))

            success(self.$comm.url(json.path))
          }
          formData.append('file', blobInfo.blob())
          formData.append('path', '/richtext')
          xhr.setRequestHeader('Authorization', getToken())
          xhr.send(formData)
        },

        // prop内传入的的config
        ...this.config,

        // 挂载的DOM对象
        selector: `#${this.Id}`,
        setup: (editor) => {
          // 抛出 'on-ready' 事件钩子
          editor.on(
            'init', () => {
              self.loading = false
              self.$emit('on-ready')
              editor.setContent(self.text)
            }
          )
          // 抛出 'input' 事件钩子，同步value数据
          editor.on(
            'input change undo redo', () => {
              self.Content = editor.getContent()
              self.$emit('change', editor.getContent())
            }
          )

          editor.on(
            'focus', () => {
              self.Onfocus = true
            }
          )

          editor.on(
            'blur', () => {
              self.Onfocus = false
            }
          )
        }
      })
    },
    initComplete() {
      this.InitState = true
    }
  }
}
</script>
