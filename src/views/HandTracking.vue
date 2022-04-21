<template>
  <div
    class="applikasi"
    style="display: flex; flex-direction: column; overflow: auto"
  >
    <div style="bottom: 400px" class="container">
      <video ref="input_video" width="100%" height="100%"></video>
      <canvas
        class="output_canvas"
        ref="output_canvas"
        :width="width"
        :height="height"
      ></canvas>
    </div>
    <div>
      <p v-for="(text, index) in arrayTest" :key="index">{{ text }}</p>
    </div>
  </div>
</template>
<script>
import { Hands, HAND_CONNECTIONS } from "@mediapipe/hands";
import { Camera } from "@mediapipe/camera_utils";
import { drawConnectors, drawLandmarks } from "@mediapipe/drawing_utils";
export default {
  name: "HandModel",
  data: function () {
    return {
      number: null,
      ctx: null,
      width: null,
      height: null,
      arrayTest: [],
      firstY: null,
    };
  },
  computed: {
    inputVideo() {
      return this.$refs.input_video;
    },
  },
  mounted() {
    this.ctx = this.$refs.output_canvas.getContext("2d");
    console.log(this.ctx, "ctx");
    this.init();
  },
  methods: {
    async init() {
      for (let index = 0; index < 150; index++) {
        this.arrayTest.push("testing");
      }
      const hands = new Hands({
        locateFile: (file) => {
          console.log(file, "file45656456");
          return `https://cdn.jsdelivr.net/npm/@mediapipe/hands/${file}`;
        },
      });
      hands.setOptions({
        maxNumHands: 1,
        modelComplexity: 1,
        minDetectionConfidence: 0.5,
        minTrackingConfidence: 0.5,
      });
      hands.onResults(this.onResults);
      // console.log(hands, "hands ============== <<<<<<<<<<<<<");
      const camera = new Camera(this.inputVideo, {
        onFrame: async () => {
          // console.log("on frame", this.inputVideo);
          await hands.send({ image: this.inputVideo });
        },
      });
      // console.log("camera");
      camera.start();
      // console.log("camera start");
    },
    onResults(results) {
      // console.log(
      //   results,
      //   "results =================================================================== <<<<<<<<"
      // );
      this.width = results.image.width;
      this.height = results.image.height;
      this.ctx.save();
      this.ctx.clearRect(0, 0, results.image.width, results.image.height);
      this.ctx.drawImage(
        results.image,
        0,
        0,
        results.image.width,
        results.image.height
      );
      this.findHands(results);
      this.ctx.restore();
    },
    findHands(results, draw = true) {
      // console.log(results, "firstHands");
      if (results.multiHandLandmarks) {
        for (const landmarks of results.multiHandLandmarks) {
          // this.firstY = results.multiHandLandmarks[8].y;
          // console.log(landmarks, "lolololo");
          //  const landmarks = results.multiHandLandmarks[index]
          // console.log(landmarks[8].y, "index finger");
          this.testScroll(landmarks[8].y);
          drawConnectors(this.ctx, landmarks, HAND_CONNECTIONS, {
            color: "#00FF00",
            lineWidth: 5,
          });
          if (draw) {
            drawLandmarks(this.ctx, landmarks, {
              color: "#FF0000",
              lineWidth: 2,
            });
          }
        }
      }
    },
    testScroll(y) {
      // const container = document.querySelector(".applikasi");
      // // console.log(container, "kwkwk");
      // // container.scroll(0, y * 1000);
      // var a = container.scrollTop;

      // var b = container.scrollHeight - container.clientHeight;
      // var c = a / b;
      var limit = Math.max(
        document.body.scrollHeight,
        document.body.offsetHeight,
        document.documentElement.clientHeight,
        document.documentElement.scrollHeight,
        document.documentElement.offsetHeight
      );
      console.log(limit, "limit scroll");
      if (this.firstY > y) {
        console.log("scroll up");
      } else {
        console.log("scroll down");
      }
      console.log(window.pageYOffset, "scroll", y);
      window.scroll(0, y * limit);
      this.firstY = y;
    },
  },
};
</script>

<style scoped>
.output_canvas {
  width: 100%;
  height: 631px;
}
</style>
