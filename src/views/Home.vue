<template>
  <div>
    <embed
      v-if="embedSrc"
      type="video/webm"
      :src="embedSrc"
      width="100%"
      style="max-height: 50rem; min-height: 20rem"
    />
    <!-- <label for=""> no telp</label> -->
    <!-- <input v-model="phoneNumber" type="text" @keyup="telepon" /> -->

    <div style="border: black solid 2px">
      <input @change="handleChange" type="file" name="" id="" />
    </div>

    <h1>hello ini home</h1>
    <input
      type="file"
      name=""
      id="image-ktp"
      accept="image/*"
      capture="camera"
      @change="setImage"
    />
    <div class="img-cropper">
      <vue-cropper
        ref="cropper"
        :src="imgSrc"
        alt="Source Image"
        v-if="imgSrc"
        :aspect-ratio="826 / 533"
      >
      </vue-cropper>
    </div>
    <div class="actions">
      <button @click="DeleteImage">Delete image</button>
      <!-- <a href="#" role="button" @click.prevent="zoom(0.2)"> Zoom In </a>
      <a href="#" role="button" @click.prevent="zoom(-0.2)"> Zoom Out </a> -->
      <!-- <a href="#" role="button" @click.prevent="move(-10, 0)"> Move Left </a>
      <a href="#" role="button" @click.prevent="move(10, 0)"> Move Right </a>
      <a href="#" role="button" @click.prevent="move(0, -10)"> Move Up </a>
      <a href="#" role="button" @click.prevent="move(0, 10)"> Move Down </a> -->
      <a href="#" role="button" @click.prevent="rotate(90)"> Rotate +90deg </a>
      <a href="#" role="button" @click.prevent="rotate(-90)"> Rotate -90deg </a>
      <!-- <a ref="flipX" href="#" role="button" @click.prevent="flipX"> Flip X </a>
      <a ref="flipY" href="#" role="button" @click.prevent="flipY"> Flip Y </a> -->
      <a href="#" role="button" @click.prevent="cropImage"> Crop </a>
      <a href="#" role="button" @click.prevent="reset"> Reset </a>
      <!-- <a href="#" role="button" @click.prevent="getData"> Get Data </a>
      <a href="#" role="button" @click.prevent="setData"> Set Data </a> -->
      <!-- <a href="#" role="button" @click.prevent="getCropBoxData">
        Get CropBox Data
      </a>
      <a href="#" role="button" @click.prevent="setCropBoxData">
        Set CropBox Data
      </a> -->
      <!-- <a href="#" role="button" @click.prevent="showFileChooser">
        Upload Image
      </a> -->
    </div>
    <textarea v-model="data" />
    <section class="preview-area">
      <button style="border: 2px solid black" @click="sendImage">
        Send Cropped Image
      </button>
      <p>{{ apiReturning }}</p>
      <p>Preview</p>
      <div class="preview" />
      <p>Cropped Image</p>
      <div class="cropped-image">
        <img v-if="cropImg" :src="cropImg" alt="Cropped Image" />
        <div v-else class="crop-placeholder" />
      </div>
    </section>
    <button @click="videoToggle" class="video-tggl">video</button>
    <v-easy-camera
      :fullscreen="true"
      :overlayMask="overlayPath"
      v-model="picture"
      :fullscreenZIndex="1"
      @input="onInput"
      v-if="false"
    ></v-easy-camera>
  </div>
</template>

<script>
// @ is an alias to /src
import EasyCamera from "easy-vue-camera";
import VueCropper from "vue-cropperjs";
import "cropperjs/dist/cropper.css";
export default {
  name: "Home",
  data() {
    return {
      isCameraOn: false,
      picture: null,
      overlayPath: require("@/assets/overlay.png"),
      cameraInput: null,
      imgSrc: null,
      cropImg: "",
      data: null,
      apiReturning: "",
      phoneNumber: "",
      timeout: null,
      embedSrc: "",
    };
  },
  computed: {
    input: {
      get() {
        return this.phoneNumber;
      },
      set(val) {
        if (this.timeout) clearTimeout(this.timeout);
        this.timeout = setTimeout(() => {
          this.phoneNumber = val;
        }, 300);
      },
    },
  },
  methods: {
    videoToggle() {
      this.isCameraOn = !this.isCameraOn;
    },
    handleChange() {
      console.log(event.target.files[0], "ini bentuk file");
      this.embedSrc = URL.createObjectURL(event.target.files[0]);
    },
    telepon() {
      // console.log(e, "keyup");
      // const regex = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;
      // if (this.phoneNumber.match(regex)) {
      this.phoneNumber = this.phoneNumber.replace(/^(\+62|62|0)/, "");
      // }
      // console.log(regex.exec(this.phoneNumber), "regex");
      // this.phoneNumber = regex.exec(this.phoneNumber)
      //   ? (this.phoneNumber = regex.exec(this.phoneNumber)[0])
      //   : (this.phoneNumber = "");
      // var x = this.phoneNumber
      //   .replace(/\D/g, "")
      //   .match(/^(\+62|62)?[\s-]?0?8[1-9]{1}\d{1}[\s-]?\d{4}[\s-]?\d{2,5}$/);
      // console.log(x, "ini x");
      // this.phoneNumber = !x[2]
      //   ? x[1]
      //   : "(" + x[1] + ") " + x[2] + (x[3] ? "-" + x[3] : "");
      // console.log(x);
    },
    DeleteImage() {
      this.imgSrc = null;
      this.cropImg = null;
      this.data = null;
      document.getElementById("image-ktp").value = null;
      // this.setImage();
    },
    async onInput(value) {
      // console.log("onInput", value);
      const file = this.dataURLtoFile(value, "ktp.png");
      // console.log(this.onSubmit(value), "onSubmit");
      console.log(file);
      const formData = new FormData();
      formData.append("ktp", file, "ktp.png");
      try {
        console.log("masuk");
        const data = await fetch("http://localhost:5000/upload", {
          body: formData,
          method: "post",
        });
        console.log(data, "data");
      } catch (error) {
        console.log(error);
      }
    },
    async sendImage() {
      try {
        var vx = this;
        const file = this.dataURLtoFile(this.cropImg, "ktp.jpg");
        // let blobImage = null
        console.log(file.size, file.size / 1024, "file", file);
        const blobURL = window.URL.createObjectURL(file);
        const img = new Image();
        img.src = blobURL;
        img.onload = async function (ev) {
          console.log(ev);
          window.URL.revokeObjectURL(blobURL);
          const canvas = document.createElement("canvas");
          canvas.width = 826;
          canvas.height = 533;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0, 826, 533);
          const formData = new FormData();
          canvas.toBlob(
            function (blob) {
              // console.log(blob.size, blob.size / 1024, "blob");
              // console.log(blob);
              vx.blobToDataURL(blob, async (b64) => {
                const image64 = vx.dataURLtoFile(b64, "ktp.png");
                formData.append("ktp", image64, "ktp.png");
                console.log("masuk");
                const data = await fetch(
                  "https://9f06-103-140-35-230.jp.ngrok.io/upload",
                  {
                    body: formData,
                    method: "post",
                  }
                );
                data.json().then((res) => {
                  console.log(res);
                  vx.apiReturning = res;
                });
              });
            },
            "image/jpg",
            0.8
          );
        };
      } catch (error) {
        console.log(error);
      }
    },
    blobToDataURL(blob, callback) {
      var a = new FileReader();
      a.onload = function (e) {
        callback(e.target.result);
      };
      a.readAsDataURL(blob);
    },
    dataURLtoFile(dataurl, filename) {
      var arr = dataurl.split(","),
        mime = arr[0].match(/:(.*?);/)[1],
        bstr = atob(arr[1]),
        n = bstr.length,
        u8arr = new Uint8Array(n);

      while (n--) {
        u8arr[n] = bstr.charCodeAt(n);
      }

      return new File([u8arr], filename, { type: mime });
    },
    overlay() {
      const overlay = document.getElementsByClassName("overlay-mask")[0];
      const divTop = document.createElement("div");
      const divbottom = document.createElement("div");
      const divFace = document.createElement("div");
      const divRight = document.createElement("div");
      const divLeft = document.createElement("div");

      divTop.className = "overlay-mask-top";
      divbottom.className = "overlay-mask-bottom";
      divRight.className = "overlay-mask-right";
      divLeft.className = "overlay-mask-left";
      divFace.className = "overlay-mask-face";
      overlay.appendChild(divTop);
      overlay.appendChild(divbottom);
      overlay.appendChild(divRight);
      overlay.appendChild(divLeft);
      overlay.appendChild(divFace);
    },
    cropImage() {
      // get image data for post processing, e.g. upload or setting image src
      this.cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
    },
    flipX() {
      const dom = this.$refs.flipX;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleX(scale);
      dom.setAttribute("data-scale", scale);
    },
    flipY() {
      const dom = this.$refs.flipY;
      let scale = dom.getAttribute("data-scale");
      scale = scale ? -scale : -1;
      this.$refs.cropper.scaleY(scale);
      dom.setAttribute("data-scale", scale);
    },
    getCropBoxData() {
      this.data = JSON.stringify(this.$refs.cropper.getCropBoxData(), null, 4);
    },
    getData() {
      this.data = JSON.stringify(this.$refs.cropper.getData(), null, 4);
    },
    move(offsetX, offsetY) {
      this.$refs.cropper.move(offsetX, offsetY);
    },
    reset() {
      this.$refs.cropper.reset();
    },
    rotate(deg) {
      this.$refs.cropper.rotate(deg);
    },
    setCropBoxData() {
      if (!this.data) return;
      this.$refs.cropper.setCropBoxData(JSON.parse(this.data));
    },
    setData() {
      if (!this.data) return;
      this.$refs.cropper.setData(JSON.parse(this.data));
    },
    setImage(e) {
      const file = e.target.files[0];
      if (file.type.indexOf("image/") === -1) {
        alert("Please select an image file");
        return;
      }
      if (typeof FileReader === "function") {
        const reader = new FileReader();
        reader.onload = (event) => {
          this.imgSrc = event.target.result;
          // rebuild cropperjs with the updated source
          this.$refs.cropper.replace(event.target.result);
        };
        reader.readAsDataURL(file);
      } else {
        alert("Sorry, FileReader API not supported");
      }
    },
    showFileChooser() {
      this.$refs.input.click();
    },
    zoom(percent) {
      this.$refs.cropper.relativeZoom(percent);
    },
  },
  components: {
    "v-easy-camera": EasyCamera,
    VueCropper,
  },

  mounted() {
    // this.overlay();
    // console.log(overlay)
    // overlay.setAttribute(
    //   "class",
    //   "overlay-mask overlay-mask-top overlay-mask-left overlay-mask-right overlay-mask-bottom"
    // );
  },
};
</script>
<style>
.video-tggl {
  z-index: 999;
}
.overlay-mask {
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  margin-top: 0 !important;
}
.overlay-mask-top {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  max-width: 100vw !important;
  height: 10vh !important;
  margin-top: 0 !important;
}
.overlay-mask-bottom {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  max-width: 100vw !important;
  height: 20vh !important;
  margin-top: 0 !important;
}
.overlay-mask-right {
  position: absolute;
  right: 0;
  width: 2vw;
  height: 100vh !important;
  background: rgba(0, 0, 0, 0.5);
  margin-top: 0 !important;
}
.overlay-mask-left {
  position: absolute;
  left: 0;
  width: 2vw;
  height: 100vh !important;
  background: rgba(0, 0, 0, 0.5);
  margin-top: 0 !important;
}
.overlay-mask-face {
  position: absolute;
  background: rgb(35 20 74 / 50%);
  width: 126px;
  height: 100px;
  top: 59%;
  border-radius: 10px;
  left: 50%;
}
</style>
