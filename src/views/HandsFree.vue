<template>
  <!-- <div>
    <div id="wrapper-parent">
      <button
        :style="`background-color: ${colors[colorIndex]};`"
        class="button"
        @mouseenter="startHands"
      >
        start
      </button>
      <div id="wrapper">
        <video
          playsinline="true"
          muted="muted"
          id="my_video"
          ref="input_video"
        ></video>
        <canvas
          id="my_canvas"
          class="output_canvas"
          ref="output_canvas"
        ></canvas>
      </div>
      <p style="position: absolute; z-index: 1000; top: 50px">{{ testing }}</p>
      <p style="position: absolute; z-index: 1000; top: 70px">{{ testing2 }}</p>
      <radial-progress-bar
        :diameter="200"
        :completed-steps="completedSteps"
        :total-steps="totalSteps"
        :animateSpeed="100"
      >
        <p>Total steps: {{ totalSteps }}</p>
        <p>buttonCounter: {{ buttonCounter }}</p>
        <p>Completed steps: {{ completedSteps }}</p>
      </radial-progress-bar>
    </div>
    <p>{{ currentGesture }}</p>
    <p>{{ ready }}</p>
  </div> -->

  <!-- Section 1 -->
  <!-- component -->
  <div id="wrapper-parent">
    <div id="wrapper">
      <!-- <video
        playsinline="true"
        muted="muted"
        id="my_video"
        ref="input_video"
        name="input_video"
      ></video> -->
      <canvas id="my_canvas" class="output_canvas" ref="output_canvas"></canvas>
    </div>
    <card class="h-50 flex flex-col max-w-6xl mx-auto space-y-4">
      <div class="bg-green-500 rounded-lg py-6 p-3">
        {{ gestureForward }} | {{ currentGesture }} | fps: {{ fps }} | reveal :
        {{ reveal }} | reset : {{ reset }}
      </div>
      <div class="h-52 flex justify-between space-x-5">
        <div
          @click.prevent="increaseCompletedSteps"
          class="bg-yellow-500 rounded-lg sm:h-[70vh] py-6 w-full h-[80vh] p-3"
        >
          <p>
            one: {{ gesture1.gesture }} time :
            {{ gesture1.time | round }} time2: {{ gesture1.time2 | round }} |
            seconds : {{ completedSteps | round }}
          </p>
        </div>
        <div class="bg-red-500 rounded-lg py-6 w-full p-3">
          <p>two: {{ gesture2 }}</p>
        </div>
        <div
          class="hidden md:inline-block bg-purple-500 rounded-lg py-6 w-full p-3"
        >
          <p>three: {{ gesture3 }}</p>
          <div style="overflow: auto; height: 100px; max-width: 500px">
            <p v-for="(text, index) in loopTest" :key="`uwu${index}`">
              {{ text }}
            </p>
          </div>
        </div>
      </div>

      <div class="bg-blue-500 rounded-lg py-6 p-3">
        {{ gestureBackward }}
        <div
          class="grid overflow-x-auto"
          style="display: flex; max-width: 1000px; overflow: auto"
        >
          <div v-for="(text, index) in loopTest" :key="index">
            {{ text }}
          </div>
        </div>
      </div>
    </card>
    <radial-progress-bar
      :diameter="200"
      :completed-steps="completedSteps"
      :total-steps="2"
      :animateSpeed="300"
    >
      <p>one: {{ gesture1.gesture }}</p>
    </radial-progress-bar>
  </div>
</template>

<script>
import Handsfree from "handsfree";
import RadialProgressBar from "vue-radial-progress";
import _ from "lodash";
export default {
  data() {
    return {
      testing: 1,
      testing2: 0,
      isHand: false,
      completedSteps: 0,
      totalSteps: 100,
      currentGesture: "",
      ready: "",
      handsfree: null,
      cursor: null,
      cursorX: 0,
      cursorY: 0,
      buttonCounter: 0,
      buttonTimedOut: null,
      colors: [
        "orange",
        "blue",
        "green",
        "purple",
        "yellow",
        "pink",
        "brown",
        "grey",
      ],
      colorIndex: 0,
      gesture1: {
        gesture: 0,
        time: 0,
        time2: 0,
        seconds: 0,
        calc: 0,
        calc2: 0,
        calc3: 0,
      },
      gesture2: 0,
      gesture3: 0,
      gesture4: 0,
      gestureForward: 0,
      gestureBackward: 0,
      fpsCounter: 0,
      fpsTime: null,
      second: null,
      fps: 0,
      reset: 0,
      reveal: 0,
      beforeComplete: 0,
      loopTest: [],
    };
  },
  components: {
    RadialProgressBar,
  },
  created() {
    for (let i = 0; i < 1; i++) {
      this.loopTest.push(
        `index ke ${i} oaiwjdoiawjdoiawjdoawidjawoidjoawidjoawijdioawdjoawidjoawidjawoidjaowidjawoidjawoidjawoidjawoidjawoidjaowidjaowidjawoidjoawidawwijdwijdwijdiwjdwidjwi`
      );
    }
  },
  mounted() {
    this.cursor = document.querySelector(`.cursor`);
    // console.log(document.querySelector("#my_canvas"), "canvasku");
    // console.log(document.querySelector("#my_video"), "videoku");
    this.handsfree = new Handsfree({
      hands: {
        enabled: true,
        // The maximum number of hands to detect [0 - 4]
        maxNumHands: 1,

        // Minimum confidence [0 - 1] for a hand to be considered detected
        minDetectionConfidence: 0.8,

        // Minimum confidence [0 - 1] for the landmark tracker to be considered detected
        // Higher values are more robust at the expense of higher latency
        minTrackingConfidence: 0.5,
      },
      plugin: {
        pinchScroll: {
          enabled: false,

          // Number of frames over the same element before activating that element
          framesToFocus: 10,

          // Number of pixels the middle and thumb tips must be near each other to drag
          threshold: 20,

          // Number of frames where a hold is not registered before releasing a drag
          numThresholdErrorFrames: 5,

          // Speed multiplier
          speed: 0.5,
        },
        palmPointers: {
          enabled: true,

          // How much to offfset the pointers by
          // - This is useful for when the camera won't be in front of you
          // - This is also useful when working with multiple displays
          offset: {
            x: 0,
            y: 0,
          },

          // A multiplier to apply to moving the pointer
          speed: {
            x: 1.5,
            y: 1.5,
          },
        },
      },
      setup: {
        canvas: {
          hands: {
            // The canvas element to use
            $el: document.querySelector("#my_canvas"),
            height: 720,
            width: 1280,
          },
        },
        video: {
          // The video element to use
          $el: null,
          height: 720,
          width: 1280,
        },
        wrap: {
          $el: document.querySelector("#wrapper"),
          $parent: document.querySelector("#wrapper-parent"),
        },
      },
    });
    // console.log(this.handsfree.config, "config nya hands free");
    this.handsfree.enablePlugins("browser");
    // this.handsfree.on("data", (event) => {
    //   //event
    //   // const data = event.detail;
    //   console.log(event, "data.hands");
    // });
    document.addEventListener("handsfree-loading", (event) => {
      console.log(event, "loading");
    });
    this.handsfree.on("modelReady", (event) => {
      console.log(event, "event ready");
      this.ready = "ready";
    });
    document.addEventListener("handsfree-data", async (event) => {
      // console.log(event, "==== event");
      const data = event.detail;
      if (!data.hands) return;
      // console.log(data.hands, "hands====");
      // console.log(data.hands.pointer, "pointers");
      console.log(data.hands);
      if (data.hands.pointer[0].isVisible) {
        console.log(data.hands.pointer[0].isVisible, "is visible");
        // console.log(data.hands.pointer[0], "pointer");
        // if (data.hands.pointer[0].x < 300 && data.hands.pointer[0].y < 300) {
        // if (this.buttonCounter == 0) {
        // }
        // this.test();
        // await _.debounce(this.increaceButtonCounter, 1000);
        // if (this.buttonCounter < 100) {
        //   console.log("buttonCounter if", this.buttonCounter);
        //   if (this.buttonCounter == 0) {
        //     console.log("buttonCounter if 0", this.buttonCounter);
        //     // this.debounce(() => {
        // this.buttonCounter++;
        //     // }, 2500);
        //     // if (this.buttonTimedOut) {
        //     //   console.log("timeout if 0");
        //     //   // clearTimeout(this.buttonTimedOut);
        //     //   this.buttonTimedOut = null;
        //     //   this.increaceButtonCounter();
        //     // } else {
        //     console.log("timeout else 0");
        // this.buttonTimedOut = setTimeout(
        //   this.increaceButtonCounter,
        //   2000
        // );
        //     // }
        //     // this.buttonCounter++;
        //     // increase this.buttonCounter after 2 seconds
        //   } else {
        //     console.log("buttonCounter else lebih", this.buttonCounter);
        //     // clearTimeout(this.buttonTimedOut);
        //     // setTimeout(() => {
        //     this.buttonCounter++;
        //     // }, 1000);
        //   }
        // } else {
        //   console.log("buttonCounter else", this.buttonCounter);
        //   this.buttonCounter = 0;
        //   this.startHands();
        // }
        // }
        //   this.cursorX = data.hands.pointer[0].x;
        //   this.cursorY = data.hands.pointer[0].y;
      }
      // else {
      // this.buttonCounter = 0;
      // }
    });
    // document.addEventListener("mousemove", (e) => {
    //   console.log(e, "mousemove E");
    //   // this.cursor.style.left = this.cursorX + "px";
    //   // this.cursor.style.top = this.cursorY + "px";
    // });
    this.handsfree.on("finger-pinched-start-1", () => {
      console.log("pinched middle fingers");
    });
    this.handsfree.start();
    this.handsfree.showDebugger();
    // this.handsfree.plugin.pinchScroll.disable();
    this.handsfree.plugin.pinchScroll.enable();
    this.handsfree.use("logger", (data) => {
      let time = performance.now() / 1000;
      if (this.fpsTime) {
        let calc = time - this.fpsTime;
        // console.log(calc >= 1, "time", time, this.fpsTime);
        if (calc >= 1) {
          this.fps = this.fpsCounter;
          this.fpsCounter = 0;
          this.fpsTime = time;
        } else {
          this.fpsCounter++;
        }
      } else {
        this.fpsTime = time;
      }

      // this.fpsTime = this.fpsTime.toString();
      // console.log(this.fpsTime, "fpsTime");
      // if (!this.second) {
      //   this.second = this.fpsTime;
      // }
      // if (this.fpsTime != this.second) {
      //   this.second = this.fpsTime;
      //   this.fpsCounter = 0;
      //   this.fps = this.fpsCounter / 1000;
      // } else {
      //   this.fpsCounter++;
      // }

      // console.log(data, "wokwokwo", this.fpsTime);

      if (data.hands) {
        if (data.hands.gesture) {
          data.hands.gesture.forEach((element) => {
            if (element) {
              this.isHand = true;
              if (element.name == "increase") {
                this.gestureForward++;
                // this.increaceTesting();
              } else if (element.name == "decrease") {
                this.gestureBackward++;
                // this.decreaseTesting();
              } else if (element.name == "reset") {
                this.reset++;
                this.reveal = 0;
                if (this.reset > 15) {
                  document.getElementById("wrapper").style.display = "none";
                  this.reveal = 0;
                  this.reset = 0;
                }
                // this.completedSteps = 100;
                // this.handsfree.pause();
              } else if (element.name == "one") {
                this.reset = 0;
                this.reveal = 0;
                this.gesture1.gesture++;
                if (this.gesture1.time) {
                  this.gesture1.time2 = performance.now() / 1000;
                  this.gesture1.calc = this.gesture1.time2 - this.gesture1.time;
                  if (this.gesture1.calc > 1) {
                    this.gesture1.gesture = 0;
                    this.gesture1.time = 0;
                  } else {
                    // console.log(this.gesture1.calc, " this.gesture1.calculate");
                    if (this.gesture1.calc2) {
                      this.gesture1.calc3 = this.gesture1.calc2;
                    } else {
                      this.gesture1.calc2 = this.gesture1.calc;
                    }
                    if (this.completedSteps >= 2) {
                      this.completedSteps = 0;
                      this.handsfree.pause();
                      setTimeout(() => {
                        this.handsfree.unpause();
                      }, 2000);
                    } else {
                      this.completedSteps += this.gesture1.calc3;
                      // if (this.beforeComplete > 1) {
                      //   for (let i = 0; i < 5; i++) {
                      //     this.completedSteps += 0.2;
                      //   }
                      //   this.beforeComplete = 0;
                      // } else {
                      //   this.beforeComplete = this.gesture1.calc3;
                      // }
                      // if (!this.beforeComplete) {
                      // if (this.beforeComplete > 1) {
                      //   for (let i = 0; i < 10; i++) {
                      //     this.completedSteps += 0.1;
                      //   }
                      //   this.beforeComplete = 0;
                      // }
                      // this.beforeComplete += this.gesture1.calc3;
                      // }
                    }
                  }
                  // else {
                  //   this.gesture1.time = this.gesture1.time2;
                  // }
                  // this.gesture1.time = this.gesture1.time + element.time;
                  // console.log(this.gesture1.time, "time");
                } else {
                  this.gesture1.time = performance.now() / 1000;
                }
              } else if (element.name == "two") {
                this.gesture2++;
              } else if (element.name == "three") {
                this.gesture3++;
              } else if (element.name == "reveal") {
                // this.gesture4++;
                this.reveal++;
                this.reset = 0;
                if (this.reveal > 15) {
                  document.getElementById("wrapper").style.display = "unset";
                  this.reset = 0;
                  this.reveal = 0;
                }
              }

              this.currentGesture = element.name;
            } else {
              this.isHand = false;
            }
          });
        }
      }
    });
    this.handsfree.useGesture({
      name: "reset",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "FullCurl", 0.42857142857142855],
        ["addCurl", "Thumb", "HalfCurl", 1],
        ["addDirection", "Thumb", "VerticalUp", 1],
        ["addDirection", "Thumb", "DiagonalUpLeft", 0.42857142857142855],
        ["addCurl", "Index", "FullCurl", 1],
        ["addDirection", "Index", "DiagonalUpLeft", 1],
        ["addCurl", "Middle", "FullCurl", 1],
        ["addDirection", "Middle", "DiagonalUpLeft", 1],
        ["addCurl", "Ring", "FullCurl", 1],
        ["addDirection", "Ring", "VerticalUp", 1],
        ["addDirection", "Ring", "DiagonalUpLeft", 1],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "VerticalUp", 1],
        ["addDirection", "Thumb", "DiagonalUpRight", 0.42857142857142855],
        ["addDirection", "Index", "DiagonalUpRight", 1],
        ["addDirection", "Middle", "DiagonalUpRight", 1],
        ["addDirection", "Ring", "DiagonalUpRight", 1],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Index", 2],
        ["setWeight", "Middle", 2],
        ["setWeight", "Ring", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "increase",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "NoCurl", 1],
        ["addDirection", "Thumb", "DiagonalUpLeft", 1],
        ["addDirection", "Thumb", "VerticalUp", 0.36363636363636365],
        ["addCurl", "Index", "FullCurl", 1],
        ["addDirection", "Index", "DiagonalUpLeft", 1],
        ["addDirection", "Index", "HorizontalLeft", 0.2],
        ["addCurl", "Middle", "FullCurl", 1],
        ["addDirection", "Middle", "DiagonalUpLeft", 1],
        ["addDirection", "Middle", "HorizontalLeft", 0.6666666666666666],
        ["addCurl", "Ring", "FullCurl", 1],
        ["addDirection", "Ring", "HorizontalLeft", 1],
        ["addDirection", "Ring", "DiagonalUpLeft", 0.2],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "HorizontalLeft", 1],
        ["addDirection", "Pinky", "DiagonalDownLeft", 0.07142857142857142],
        ["addDirection", "Thumb", "DiagonalUpRight", 1],
        ["addDirection", "Index", "DiagonalUpRight", 1],
        ["addDirection", "Index", "HorizontalRight", 0.2],
        ["addDirection", "Middle", "DiagonalUpRight", 1],
        ["addDirection", "Middle", "HorizontalRight", 0.6666666666666666],
        ["addDirection", "Ring", "HorizontalRight", 1],
        ["addDirection", "Ring", "DiagonalUpRight", 0.2],
        ["addDirection", "Pinky", "HorizontalRight", 1],
        ["addDirection", "Pinky", "DiagonalDownRight", 0.07142857142857142],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Index", 2],
        ["setWeight", "Middle", 2],
        ["setWeight", "Ring", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "five",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "NoCurl", 1],
        ["addDirection", "Thumb", "DiagonalUpLeft", 1],
        ["addDirection", "Thumb", "HorizontalLeft", 0.5789473684210527],
        ["addCurl", "Index", "NoCurl", 1],
        ["addDirection", "Index", "VerticalUp", 1],
        ["addDirection", "Index", "DiagonalUpLeft", 0.6666666666666666],
        ["addCurl", "Middle", "NoCurl", 1],
        ["addDirection", "Middle", "VerticalUp", 1],
        ["addDirection", "Middle", "DiagonalUpLeft", 0.3888888888888889],
        ["addDirection", "Middle", "DiagonalUpRight", 0.2777777777777778],
        ["addCurl", "Ring", "NoCurl", 1],
        ["addDirection", "Ring", "VerticalUp", 1],
        ["addDirection", "Ring", "DiagonalUpLeft", 0.09090909090909091],
        ["addDirection", "Ring", "DiagonalUpRight", 0.2727272727272727],
        ["addCurl", "Pinky", "NoCurl", 1],
        ["addDirection", "Pinky", "DiagonalUpRight", 1],
        ["addDirection", "Pinky", "VerticalUp", 0.42857142857142855],
        ["addDirection", "Thumb", "DiagonalUpRight", 1],
        ["addDirection", "Thumb", "HorizontalRight", 0.5789473684210527],
        ["addDirection", "Index", "DiagonalUpRight", 0.6666666666666666],
        ["addDirection", "Middle", "DiagonalUpRight", 0.3888888888888889],
        ["addDirection", "Middle", "DiagonalUpLeft", 0.2777777777777778],
        ["addDirection", "Ring", "DiagonalUpRight", 0.09090909090909091],
        ["addDirection", "Ring", "DiagonalUpLeft", 0.2727272727272727],
        ["addDirection", "Pinky", "DiagonalUpLeft", 1],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Ring", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "kembali",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "NoCurl", 0.15384615384615385],
        ["addCurl", "Thumb", "HalfCurl", 1],
        ["addDirection", "Thumb", "HorizontalRight", 1],
        ["addCurl", "Index", "NoCurl", 1],
        ["addDirection", "Index", "HorizontalRight", 1],
        ["addCurl", "Middle", "FullCurl", 1],
        ["addDirection", "Middle", "HorizontalRight", 1],
        ["addCurl", "Ring", "FullCurl", 1],
        ["addDirection", "Ring", "HorizontalRight", 1],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "DiagonalDownRight", 0.034482758620689655],
        ["addDirection", "Pinky", "HorizontalRight", 1],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Ring", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "three",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "HalfCurl", 1],
        ["addDirection", "Thumb", "DiagonalUpRight", 1],
        ["addDirection", "Thumb", "VerticalUp", 0.2],
        ["addCurl", "Index", "NoCurl", 1],
        ["addDirection", "Index", "DiagonalUpLeft", 1],
        ["addDirection", "Index", "VerticalUp", 0.6666666666666666],
        ["addCurl", "Middle", "NoCurl", 1],
        ["addDirection", "Middle", "VerticalUp", 1],
        ["addDirection", "Middle", "DiagonalUpLeft", 0.2],
        ["addCurl", "Ring", "NoCurl", 1],
        ["addDirection", "Ring", "VerticalUp", 1],
        ["addDirection", "Ring", "DiagonalUpRight", 0.3181818181818182],
        ["addDirection", "Ring", "DiagonalUpLeft", 0.045454545454545456],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "VerticalUp", 1],
        ["addDirection", "Pinky", "DiagonalUpRight", 0.36363636363636365],
        ["addDirection", "Thumb", "DiagonalUpLeft", 1],
        ["addDirection", "Index", "DiagonalUpRight", 1],
        ["addDirection", "Middle", "DiagonalUpRight", 0.2],
        ["addDirection", "Ring", "DiagonalUpLeft", 0.3181818181818182],
        ["addDirection", "Ring", "DiagonalUpRight", 0.045454545454545456],
        ["addDirection", "Pinky", "DiagonalUpLeft", 0.36363636363636365],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Ring", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "four",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "HalfCurl", 1],
        ["addDirection", "Thumb", "VerticalUp", 1],
        ["addDirection", "Thumb", "DiagonalUpRight", 1],
        ["addCurl", "Index", "NoCurl", 1],
        ["addDirection", "Index", "DiagonalUpLeft", 1],
        ["addDirection", "Index", "VerticalUp", 1],
        ["addCurl", "Middle", "NoCurl", 1],
        ["addDirection", "Middle", "VerticalUp", 1],
        ["addDirection", "Middle", "DiagonalUpLeft", 0.42857142857142855],
        ["addCurl", "Ring", "NoCurl", 1],
        ["addDirection", "Ring", "VerticalUp", 1],
        ["addDirection", "Ring", "DiagonalUpRight", 0.2777777777777778],
        ["addDirection", "Ring", "DiagonalUpLeft", 0.3888888888888889],
        ["addCurl", "Pinky", "NoCurl", 1],
        ["addDirection", "Pinky", "VerticalUp", 1],
        ["addDirection", "Pinky", "DiagonalUpRight", 0.6666666666666666],
        ["addDirection", "Thumb", "DiagonalUpLeft", 1],
        ["addDirection", "Index", "DiagonalUpRight", 1],
        ["addDirection", "Middle", "DiagonalUpRight", 0.42857142857142855],
        ["addDirection", "Ring", "DiagonalUpLeft", 0.2777777777777778],
        ["addDirection", "Ring", "DiagonalUpRight", 0.3888888888888889],
        ["addDirection", "Pinky", "DiagonalUpLeft", 0.6666666666666666],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Ring", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "maju",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "HalfCurl", 1],
        ["addDirection", "Thumb", "HorizontalLeft", 1],
        ["addCurl", "Index", "NoCurl", 1],
        ["addDirection", "Index", "HorizontalLeft", 1],
        ["addCurl", "Middle", "FullCurl", 1],
        ["addDirection", "Middle", "HorizontalLeft", 1],
        ["addCurl", "Ring", "FullCurl", 1],
        ["addDirection", "Ring", "HorizontalLeft", 1],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "HorizontalLeft", 1],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Ring", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "reveal",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "NoCurl", 1],
        ["addCurl", "Thumb", "HalfCurl", 0.034482758620689655],
        ["addDirection", "Thumb", "HorizontalLeft", 1],
        ["addDirection", "Thumb", "DiagonalDownLeft", 0.25],
        ["addCurl", "Index", "NoCurl", 1],
        ["addDirection", "Index", "HorizontalLeft", 1],
        ["addDirection", "Index", "DiagonalUpLeft", 0.15384615384615385],
        ["addCurl", "Middle", "NoCurl", 1],
        ["addDirection", "Middle", "HorizontalLeft", 1],
        ["addCurl", "Ring", "NoCurl", 1],
        ["addDirection", "Ring", "HorizontalLeft", 1],
        ["addCurl", "Pinky", "NoCurl", 1],
        ["addCurl", "Pinky", "HalfCurl", 0.034482758620689655],
        ["addDirection", "Pinky", "HorizontalLeft", 1],
        ["addDirection", "Pinky", "DiagonalDownLeft", 0.15384615384615385],
        ["addDirection", "Thumb", "HorizontalRight", 1],
        ["addDirection", "Thumb", "DiagonalDownRight", 0.25],
        ["addDirection", "Index", "HorizontalRight", 1],
        ["addDirection", "Index", "DiagonalUpRight", 0.15384615384615385],
        ["addDirection", "Middle", "HorizontalRight", 1],
        ["addDirection", "Ring", "HorizontalRight", 1],
        ["addDirection", "Pinky", "HorizontalRight", 1],
        ["addDirection", "Pinky", "DiagonalDownRight", 0.15384615384615385],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Index", 2],
        ["setWeight", "Middle", 2],
        ["setWeight", "Ring", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "two",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "HalfCurl", 1],
        ["addCurl", "Thumb", "NoCurl", 0.15384615384615385],
        ["addDirection", "Thumb", "DiagonalUpRight", 1],
        ["addDirection", "Thumb", "HorizontalRight", 0.18181818181818182],
        ["addDirection", "Thumb", "VerticalUp", 0.18181818181818182],
        ["addCurl", "Index", "NoCurl", 1],
        ["addDirection", "Index", "DiagonalUpLeft", 0.7647058823529411],
        ["addDirection", "Index", "VerticalUp", 1],
        ["addCurl", "Middle", "NoCurl", 1],
        ["addDirection", "Middle", "VerticalUp", 1],
        ["addDirection", "Middle", "DiagonalUpRight", 0.19047619047619047],
        ["addDirection", "Middle", "DiagonalUpLeft", 0.23809523809523808],
        ["addCurl", "Ring", "FullCurl", 1],
        ["addDirection", "Ring", "VerticalUp", 1],
        ["addDirection", "Ring", "DiagonalUpRight", 0.18181818181818182],
        ["addDirection", "Ring", "DiagonalUpLeft", 0.18181818181818182],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "DiagonalUpRight", 1],
        ["addDirection", "Pinky", "VerticalUp", 0.7058823529411765],
        ["addDirection", "Pinky", "DiagonalUpLeft", 0.058823529411764705],
        ["addDirection", "Thumb", "DiagonalUpLeft", 1],
        ["addDirection", "Thumb", "HorizontalLeft", 0.18181818181818182],
        ["addDirection", "Index", "DiagonalUpRight", 0.7647058823529411],
        ["addDirection", "Middle", "DiagonalUpLeft", 0.19047619047619047],
        ["addDirection", "Middle", "DiagonalUpRight", 0.23809523809523808],
        ["addDirection", "Ring", "DiagonalUpLeft", 0.18181818181818182],
        ["addDirection", "Ring", "DiagonalUpRight", 0.18181818181818182],
        ["addDirection", "Pinky", "DiagonalUpLeft", 1],
        ["addDirection", "Pinky", "DiagonalUpRight", 0.058823529411764705],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Index", 2],
        ["setWeight", "Middle", 2],
        ["setWeight", "Ring", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "one",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "HalfCurl", 1],
        ["addCurl", "Thumb", "FullCurl", 0.2],
        ["addDirection", "Thumb", "DiagonalUpRight", 1],
        ["addDirection", "Thumb", "VerticalUp", 0.5],
        ["addCurl", "Index", "NoCurl", 1],
        ["addDirection", "Index", "VerticalUp", 1],
        ["addCurl", "Middle", "FullCurl", 1],
        ["addDirection", "Middle", "VerticalUp", 1],
        ["addDirection", "Middle", "DiagonalUpLeft", 0.6666666666666666],
        ["addCurl", "Ring", "FullCurl", 1],
        ["addDirection", "Ring", "VerticalUp", 1],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "VerticalUp", 1],
        ["addDirection", "Pinky", "DiagonalUpRight", 0.07407407407407407],
        ["addDirection", "Pinky", "DiagonalUpLeft", 0.037037037037037035],
        ["addDirection", "Thumb", "DiagonalUpLeft", 1],
        ["addDirection", "Middle", "DiagonalUpRight", 0.6666666666666666],
        ["addDirection", "Pinky", "DiagonalUpLeft", 0.07407407407407407],
        ["addDirection", "Pinky", "DiagonalUpRight", 0.037037037037037035],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Index", 2],
        ["setWeight", "Middle", 2],
        ["setWeight", "Ring", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "decrease",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "NoCurl", 1],
        ["addDirection", "Thumb", "DiagonalDownLeft", 1],
        ["addDirection", "Thumb", "VerticalDown", 0.3333333333333333],
        ["addDirection", "Thumb", "HorizontalLeft", 0.09523809523809523],
        ["addCurl", "Index", "FullCurl", 1],
        ["addDirection", "Index", "HorizontalLeft", 0.5789473684210527],
        ["addDirection", "Index", "DiagonalDownLeft", 1],
        ["addCurl", "Middle", "FullCurl", 1],
        ["addDirection", "Middle", "HorizontalLeft", 0.875],
        ["addDirection", "Middle", "DiagonalDownLeft", 1],
        ["addCurl", "Ring", "FullCurl", 1],
        ["addDirection", "Ring", "HorizontalLeft", 1],
        ["addDirection", "Ring", "DiagonalDownLeft", 0.15384615384615385],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "DiagonalUpLeft", 0.25],
        ["addDirection", "Pinky", "HorizontalLeft", 1],
        ["addDirection", "Thumb", "DiagonalDownRight", 1],
        ["addDirection", "Thumb", "HorizontalRight", 0.09523809523809523],
        ["addDirection", "Index", "HorizontalRight", 0.5789473684210527],
        ["addDirection", "Index", "DiagonalDownRight", 1],
        ["addDirection", "Middle", "HorizontalRight", 0.875],
        ["addDirection", "Middle", "DiagonalDownRight", 1],
        ["addDirection", "Ring", "HorizontalRight", 1],
        ["addDirection", "Ring", "DiagonalDownRight", 0.15384615384615385],
        ["addDirection", "Pinky", "DiagonalUpRight", 0.25],
        ["addDirection", "Pinky", "HorizontalRight", 1],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Index", 2],
        ["setWeight", "Middle", 2],
        ["setWeight", "Ring", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "thumb_kembali",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "NoCurl", 1],
        ["addDirection", "Thumb", "DiagonalUpRight", 1],
        ["addCurl", "Index", "NoCurl", 1],
        ["addDirection", "Index", "HorizontalRight", 1],
        ["addCurl", "Middle", "FullCurl", 1],
        ["addDirection", "Middle", "HorizontalRight", 1],
        ["addCurl", "Ring", "FullCurl", 1],
        ["addDirection", "Ring", "HorizontalRight", 1],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "HorizontalRight", 1],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Index", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "thumb_maju",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "NoCurl", 1],
        ["addDirection", "Thumb", "VerticalUp", 0.875],
        ["addDirection", "Thumb", "DiagonalUpLeft", 1],
        ["addCurl", "Index", "NoCurl", 1],
        ["addDirection", "Index", "HorizontalLeft", 1],
        ["addCurl", "Middle", "FullCurl", 1],
        ["addDirection", "Middle", "HorizontalLeft", 1],
        ["addCurl", "Ring", "FullCurl", 1],
        ["addDirection", "Ring", "HorizontalLeft", 1],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "HorizontalLeft", 1],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Index", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "kepal_kiri",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "HalfCurl", 1],
        ["addDirection", "Thumb", "HorizontalLeft", 1],
        ["addDirection", "Thumb", "DiagonalUpLeft", 0.034482758620689655],
        ["addCurl", "Index", "FullCurl", 1],
        ["addDirection", "Index", "DiagonalUpLeft", 0.5],
        ["addDirection", "Index", "HorizontalLeft", 1],
        ["addCurl", "Middle", "FullCurl", 1],
        ["addDirection", "Middle", "HorizontalLeft", 1],
        ["addCurl", "Ring", "FullCurl", 1],
        ["addDirection", "Ring", "HorizontalLeft", 1],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "HorizontalLeft", 1],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Index", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "kepal_kanan",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "HalfCurl", 1],
        ["addDirection", "Thumb", "HorizontalRight", 1],
        ["addCurl", "Index", "FullCurl", 1],
        ["addDirection", "Index", "HorizontalRight", 1],
        ["addDirection", "Index", "DiagonalUpRight", 0.5789473684210527],
        ["addCurl", "Middle", "FullCurl", 1],
        ["addDirection", "Middle", "HorizontalRight", 1],
        ["addCurl", "Ring", "FullCurl", 1],
        ["addDirection", "Ring", "HorizontalRight", 1],
        ["addCurl", "Pinky", "FullCurl", 1],
        ["addDirection", "Pinky", "HorizontalRight", 1],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Index", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
    this.handsfree.useGesture({
      name: "o",
      algorithm: "fingerpose",
      models: "hands",
      confidence: 7.5,
      description: [
        ["addCurl", "Thumb", "NoCurl", 1],
        ["addDirection", "Thumb", "DiagonalUpLeft", 1],
        ["addDirection", "Thumb", "HorizontalLeft", 0.2],
        ["addCurl", "Index", "HalfCurl", 1],
        ["addDirection", "Index", "DiagonalUpLeft", 1],
        ["addDirection", "Index", "HorizontalLeft", 0.07142857142857142],
        ["addCurl", "Middle", "NoCurl", 1],
        ["addDirection", "Middle", "VerticalUp", 1],
        ["addDirection", "Middle", "DiagonalUpLeft", 0.6666666666666666],
        ["addCurl", "Ring", "NoCurl", 1],
        ["addDirection", "Ring", "VerticalUp", 1],
        ["addDirection", "Ring", "DiagonalUpLeft", 0.4],
        ["addDirection", "Ring", "DiagonalUpRight", 0.6],
        ["addCurl", "Pinky", "NoCurl", 1],
        ["addDirection", "Pinky", "DiagonalUpRight", 1],
        ["addDirection", "Pinky", "VerticalUp", 0.8125],
        ["addDirection", "Pinky", "DiagonalUpLeft", 0.0625],
        ["addDirection", "Thumb", "DiagonalUpRight", 1],
        ["addDirection", "Thumb", "HorizontalRight", 0.2],
        ["addDirection", "Index", "DiagonalUpRight", 1],
        ["addDirection", "Index", "HorizontalRight", 0.07142857142857142],
        ["addDirection", "Middle", "DiagonalUpRight", 0.6666666666666666],
        ["addDirection", "Ring", "DiagonalUpRight", 0.4],
        ["addDirection", "Ring", "DiagonalUpLeft", 0.6],
        ["addDirection", "Pinky", "DiagonalUpLeft", 1],
        ["addDirection", "Pinky", "DiagonalUpRight", 0.0625],
        ["setWeight", "Thumb", 2],
        ["setWeight", "Index", 2],
        ["setWeight", "Pinky", 2],
      ],
      enabled: true,
    });
  },
  methods: {
    increaceTesting() {
      this.completedSteps++;
      // console.log(new Date(), "waktu ", this.testing);
      // if (this.completedSteps > 99) {
      //   this.testing2++;
      //   this.completedSteps = 1;
      // }
    },
    decreaseTesting() {
      this.completedSteps--;
      // if (this.completedSteps < 1) {
      //   this.testing2--;
      //   this.completedSteps = 99;
      // }
    },
    startHands() {
      console.log(
        "===============================================================",
        this.buttonCounter
      );
      if (this.colorIndex == 7) {
        this.colorIndex = 0;
      }
      this.colorIndex++;
      // this.handsfree.unpause();
    },
    increaceButtonCounter() {
      this.buttonCounter++;
    },
    test() {
      var users = [
        { user: "barney", age: 36, active: true },
        { user: "fred", age: 40, active: false },
      ];

      console.log(
        _.filter(users, function (o) {
          return !o.active;
        })
      );
    },
    increaseCompletedSteps() {
      this.completedSteps++;
    },
  },
  filters: {
    round(value) {
      return Math.round(value);
    },
  },
};
</script>

<style>
#handsfree-canvas-hands-1 {
  z-index: -2;
}
.button {
  height: 300px;
  width: 300px;

  cursor: pointer;
}
#wrapper {
  position: absolute;
  height: 500px;
  width: 500px;
}
</style>
