<template>
  <div class="page">
    <BaseTable
      v-model:selected="selected"
      :options="{
        rowSelection: { type: 'radio' },
      }"
      :data="items"
      :operates="operates"
      :columns="columns"
    />
  </div>
</template>
<script setup lang="tsx">
import { FileUtils } from '@/utils'
import { useVideo } from './useVideo'
import { BaseTable } from '@/components'
import { computed } from 'vue'
import Profile from './profile.vue'

const { selected, items, onAddItem, onRemoveItems, onConvertItems } = useVideo()

const operates = computed(() => [
  {
    text: '导入视频',
    type: 'primary',
    onClick: () => onAddItem(),
  },
  {
    text: '批量删除',
    type: 'primary',
    disabled: selected.value.length <= 0,
    onClick: () => onRemoveItems(selected.value),
  },
  {
    text: '转化选择项',
    type: 'primary',
    disabled: selected.value.length <= 0,
    onClick: () => onConvertItems(),
  },
])

const columns = [
  {
    title: '基础信息',
    dataIndex: 'name',
    width: 400,
    render: ({ record }: any) => <Profile data={record} />,
  },
  {
    title: '视频分辨率',
    dataIndex: 'dpi',
    align: 'center',
    render: ({ record }: any) => `${record.dpi.width} * ${record.dpi.height}`,
  },
  {
    title: '视频时长(秒)',
    dataIndex: 'duration',
    align: 'center',
  },
  {
    title: '视频类型',
    dataIndex: 'type',
    align: 'center',
  },
  {
    title: '最后编辑时间',
    dataIndex: 'lastModified',
    align: 'center',
  },
]
</script>
<style lang="scss" scoped>
.page {
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  padding: 15px;
  background-color: var(--color-bg-1);
  border: 1px solid var(--color-border);
  .page-title {
    font-size: 16px;
    font-weight: bold;
    color: var(--color-neutral-8);
  }
}
</style>
./useVideo
