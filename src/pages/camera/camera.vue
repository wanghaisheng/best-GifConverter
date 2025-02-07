<template>
  <Modal
    v-model:visible="visible"
    title="摄像头录制"
    width="650px"
    unmount-on-close
    draggable
    :body-style="{
      padding: '10px',
    }"
    :closable="false"
    :esc-to-close="false"
    :mask-closable="false"
  >
    <div class="container">
      <div class="camera-record-tip" v-show="cameraStatus === 2">
        <div class="tip-dot"></div>
        <div class="tip-second">{{ timer.second }}</div>
      </div>
      <div class="camera-loading" v-show="cameraStatus === 0">loading...</div>
      <video class="camera-player" ref="video" />
    </div>

    <template #footer>
      <Button @click="methods.onModalClose">关闭窗口</Button>
      <Button
        v-show="cameraStatus === 1"
        type="primary"
        @click="methods.onRecordStart"
      >
        开始录制
      </Button>
      <Button
        v-show="cameraStatus === 2"
        type="primary"
        status="danger"
        @click="methods.onRecordStop"
      >
        结束录制
      </Button>
      <Button
        v-show="cameraStatus === 3"
        type="primary"
        @click="methods.onRecordRestart"
      >
        重新录制
      </Button>
      <Button
        v-show="cameraStatus === 3"
        type="primary"
        @click="methods.onVideoSave"
      >
        保存
      </Button>
    </template>
  </Modal>
</template>
<script setup lang="ts">
import { Modal, Button } from '@arco-design/web-vue'
import { ref, onMounted, reactive } from 'vue'

interface PropsType {
  resolve: (result: Blob) => {}
}
const props = defineProps<PropsType>()

const visible = ref(true)
const video = ref()

const timer = reactive({
  interval: 0,
  startTime: 0,
  second: '',
})
//摄像头状态
//0: 摄像头未开启，录制未开始
//1: 摄像头已开启，录制未开始
//2: 摄像头已开启，录制进行中
//3: 摄像头已关闭，录制已结束
const cameraStatus = ref<0 | 1 | 2 | 3>(0)
//存放摄像头视频数据
let cameraData: Blob[] = []
//存放摄像头视频流
let cameraStream: MediaStream = new MediaStream()
//存放摄像头录制器
let cameraRecorder: MediaRecorder

const methods = {
  //打开摄像头
  async onCameraOpen() {
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: true })
    //获取摄像头视频分辨率, 用于设置视频播放器的高度
    const videoTrack = cameraStream.getVideoTracks()[0]
    const { width, height } = videoTrack.getSettings()
    const clientWidth = video.value?.clientWidth
    const clientHeight = clientWidth * (height! / width!)
    video.value!.style.height = `${clientHeight}px`
    //将摄像头视频流设置给视频播放器
    video.value!.srcObject = cameraStream
    video.value!.controls = false
    video.value.addEventListener(
      'loadedmetadata',
      () => {
        video.value.play()
        cameraStatus.value = 1
      },
      {
        once: true,
      }
    )
  },
  //关闭摄像头
  onCameraClose() {
    cameraStream.getTracks().forEach((track) => track.stop())
    cameraStatus.value = 0
  },
  //开始录制
  onRecordStart() {
    video.value.srcObject = cameraStream
    video.value.controls = false
    video.value.play()
    cameraData = []
    cameraStatus.value = 2
    cameraRecorder = new MediaRecorder(cameraStream, { mimeType: 'video/mp4' })
    cameraRecorder.start()

    timer.startTime = 0
    const loop = () => {
      timer.startTime++
      const hours = String(Math.floor(timer.startTime / 3600)).padStart(2, '0')
      const minutes = String(
        Math.floor((timer.startTime % 3600) / 60)
      ).padStart(2, '0')
      const seconds = String(timer.startTime % 60).padStart(2, '0')
      timer.second = `${hours}:${minutes}:${seconds}`
    }
    loop()
    timer.interval = window.setInterval(loop, 1000)

    cameraRecorder.addEventListener('dataavailable', (event) =>
      cameraData.push(event.data)
    )
    cameraRecorder.addEventListener('stop', () => {
      video.value.srcObject = null
      video.value.src = URL.createObjectURL(new Blob(cameraData))
      video.value.play()
      video.value.controls = true
    })
  },
  //结束录制
  onRecordStop() {
    cameraRecorder?.stop()
    methods.onCameraClose()
    if (timer.interval) {
      clearInterval(timer.interval)
    }
    cameraStatus.value = 3
  },
  //重新录制
  async onRecordRestart() {
    // methods.onCameraOpen()
    cameraStream = await navigator.mediaDevices.getUserMedia({ video: true })
    methods.onRecordStart()
  },
  onModalClose() {
    visible.value = false
    methods.onCameraClose()
  },
  onVideoSave() {
    visible.value = false
    props.resolve(new Blob(cameraData))
  },
}
onMounted(() => {
  methods.onCameraOpen()
})
</script>
<style lang="scss" scoped>
.container {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  .camera-player {
    width: 100%;
    background-color: #000;
  }
  .camera-loading {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 999;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    font-family: Furore;
    font-size: 20px;
    font-weight: 400;
    color: #fff;
    background-color: rgba(0, 0, 0, 50%);
  }
  .camera-record-tip {
    position: absolute;
    top: 20px;
    display: flex;
    align-items: center;
    .tip-dot {
      width: 10px;
      height: 10px;
      margin-right: 5px;
      background-color: red;
      border-radius: 50%;
      animation: blink 0.5s infinite;
    }
    .tip-second {
      font-family: Furore;
      color: #fff;
    }
  }
}

// 闪烁动画
@keyframes blink {
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}
</style>
