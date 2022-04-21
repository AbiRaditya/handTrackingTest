<template>
  <div>
    <!-- <div style="border: black solid 2px">
      <input @change="handleChange" type="file" name="" id="" />
    </div>
    <embed
      v-if="embedSrc"
      type="video/webm"
      :src="embedSrc"
      width="100%"
      style="max-height: 50rem; min-height: 20rem"
    />
    <p class="error">{{ error }}</p>

    <p class="decode-result">
      Last result: <b>{{ result }}</b>
    </p>

    <qrcode-stream
      style="width: 500px"
      :track="selected.value"
      @decode="onDecode"
      @init="onInit"
    /> -->
    <div class="">
      <video class="input_video"></video>
      <canvas class="output_canvas" width="1280px" height="720px"></canvas>
    </div>
  </div>
</template>

<script>
// import { QrcodeStream } from "vue-qrcode-reader";
export default {
  components: {
    // QrcodeStream,
  },
  data() {
    const options = [
      { text: "nothing (default)", value: undefined },
      { text: "outline", value: this.paintOutline },
      { text: "centered text", value: this.paintCenterText },
      { text: "bounding box", value: this.paintBoundingBox },
    ];
    const selected = options[3];
    return {
      result: "",
      error: "",
      selected,
      options,
      embedSrc: "",
    };
  },
  methods: {
    onDecode(result) {
      this.result = result;
    },
    handleChange() {
      console.log(event.target.files[0], "ini bentuk file");
      this.embedSrc = URL.createObjectURL(event.target.files[0]);
    },
    async onInit(promise) {
      try {
        await promise;
      } catch (error) {
        if (error.name === "NotAllowedError") {
          this.error = "ERROR: you need to grant camera access permission";
        } else if (error.name === "NotFoundError") {
          this.error = "ERROR: no camera on this device";
        } else if (error.name === "NotSupportedError") {
          this.error = "ERROR: secure context required (HTTPS, localhost)";
        } else if (error.name === "NotReadableError") {
          this.error = "ERROR: is the camera already in use?";
        } else if (error.name === "OverconstrainedError") {
          this.error = "ERROR: installed cameras are not suitable";
        } else if (error.name === "StreamApiNotSupportedError") {
          this.error = "ERROR: Stream API is not supported in this browser";
        } else if (error.name === "InsecureContextError") {
          this.error =
            "ERROR: Camera access is only permitted in secure context. Use HTTPS or localhost rather than HTTP.";
        } else {
          this.error = `ERROR: Camera error (${error.name})`;
        }
      }
    },
    paintOutline(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const [firstPoint, ...otherPoints] = detectedCode.cornerPoints;

        ctx.strokeStyle = "red";

        ctx.beginPath();
        ctx.moveTo(firstPoint.x, firstPoint.y);
        for (const { x, y } of otherPoints) {
          ctx.lineTo(x, y);
        }
        ctx.lineTo(firstPoint.x, firstPoint.y);
        ctx.closePath();
        ctx.stroke();
      }
    },

    paintBoundingBox(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const {
          boundingBox: { x, y, width, height },
        } = detectedCode;

        ctx.lineWidth = 2;
        ctx.strokeStyle = "#007bff";
        ctx.strokeRect(x, y, width, height);
      }
    },

    paintCenterText(detectedCodes, ctx) {
      for (const detectedCode of detectedCodes) {
        const { boundingBox, rawValue } = detectedCode;

        const centerX = boundingBox.x + boundingBox.width / 2;
        const centerY = boundingBox.y + boundingBox.height / 2;

        const fontSize = Math.max(
          12,
          (50 * boundingBox.width) / ctx.canvas.width
        );
        console.log(boundingBox.width, ctx.canvas.width);

        ctx.font = `bold ${fontSize}px sans-serif`;
        ctx.textAlign = "center";

        ctx.lineWidth = 3;
        ctx.strokeStyle = "#35495e";
        ctx.strokeText(detectedCode.rawValue, centerX, centerY);

        ctx.fillStyle = "#5cb984";
        ctx.fillText(rawValue, centerX, centerY);
      }
    },
    logErrors(promise) {
      promise.catch(console.error);
    },
  },
  mounted() {
    // const videoElement = document.getElementsByClassName("input_video")[0];
    // const canvasElement = document.getElementsByClassName("output_canvas")[0];
    // const canvasCtx = canvasElement.getContext("2d");
    // const camera = new Camera(videoElement, {
    //   onFrame: async () => {
    //     await hands.send({ image: videoElement });
    //   },
    //   width: 1280,
    //   height: 720,
    // });
    // camera.start();
  },
};
</script>

<style scoped>
.error {
  font-weight: bold;
  color: red;
}
</style>
