import { createVNode, render } from 'vue'
import BaseGif from './BaseGif.vue'

export function createBaseGifModal(mode: 'image' | 'video', sources: any) {
  return new Promise((resolve) => {
    const instance = createVNode(BaseGif, { mode, resolve, sources })
    const template = document.createElement('div')
    render(instance, template)
    const vnode = instance.el as HTMLElement
    document.body.appendChild(vnode)
  })
}
