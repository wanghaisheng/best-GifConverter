<template>
  <Modal
    v-model:visible="visible"
    class="base-gif"
    title="参数配置"
    width="850px"
    unmount-on-close
    draggable
    :closable="false"
    :esc-to-close="false"
    :mask-closable="false"
  >
    <BaseGifForm
      v-model="form"
      :mode="mode"
      :aspect="aspect"
      :config="config"
    />
    <BaseGifPreview
      :mode="mode"
      :result="convertResult"
      :percent="convertProgress"
      :code="stateCode"
    />

    <template #footer>
      <Button @click="onClose">关闭</Button>
      <Button @click="onConvert" type="primary">生成预览</Button>
      <Button @click="onSave" type="primary">保存动图</Button>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import { useGif } from './useGif'
import { onMounted, ref } from 'vue'
import { Modal, Button } from '@arco-design/web-vue'
import BaseGifForm from './BaseGifForm.vue'
import BaseGifPreview from './BaseGifPreview.vue'

interface PropsType {
  mode: 'image' | 'video'
  sources: any[]
  resolve: (result: any) => any
}
const props = defineProps<PropsType>()

const visible = ref(true)

const {
  config,
  form,
  aspect,
  stateCode,
  convertProgress,
  convertResult,
  onConvert,
  onSave,
} = useGif(props.mode, props.sources)

const onClose = () => {
  visible.value = false
}
onMounted(() => {
  onConvert()
})
</script>
<style lang="scss">
.base-gif {
  .arco-modal-body {
    box-sizing: border-box;
    display: grid;
    grid-template-columns: 300px auto;
    grid-gap: 20px;
  }
}
</style>
