<template>
  <div class="base-gif-form">
    <Arco.Form :model="form" auto-label-width>
      <template v-for="item in config">
        <Arco.FormItem :field="item.name" :label="item.label">
          <component
            :is="Arco[item.component]"
            v-model="form[item.name]"
            v-bind="{ ...item.props }"
          >
            <template #suffix>
              <span style="font-size: 12px">{{ item.unit }}</span>
            </template>
          </component>
          <template #extra>{{ item.desc }}</template>
        </Arco.FormItem>
      </template>
    </Arco.Form>
  </div>
</template>
<script setup lang="ts">
import * as Arco from '@arco-design/web-vue'
import { computed } from 'vue'

interface PropsType {
  mode: 'image' | 'video'
  aspect: number
  modelValue: any
  config: any
}
const props = defineProps<PropsType>()

const emit = defineEmits(['update:modelValue'])

const form = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value),
})
</script>
