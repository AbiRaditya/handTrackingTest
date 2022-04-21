// Our input frames will come from here.
var videoElement = document.getElementsByClassName("input_video")[0];

if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
  console.log("derp");
  var constraints = {
    video: {
      facingMode: "environment", //,
      //frameRate: { ideal: 10, min: 5, max: 25 } if this starts crashing on mobile uncomment
    },
  };
  navigator.mediaDevices
    .getUserMedia()
    .then(function (stream) {
      // apply the stream to the video element used in the texture

      videoElement.srcObject = stream;
      videoElement.play();
    })
    .catch(function (error) {
      console.error("Unable to access the camera/webcam.", error);
    });
} else {
  console.error("MediaDevices interface not available.");
}
const canvasElement = document.getElementsByClassName("output_canvas")[0];
const controlsElement = document.getElementsByClassName("control-panel")[0];
const canvasCtx = canvasElement.getContext("2d");

// We'll add this to our control panel later, but we'll save it here so we can
// call tick() each time the graph runs.
const fpsControl = new FPS();

// Optimization: Turn off animated spinner after its hiding animation is done.
const spinner = document.querySelector(".loading");
spinner.ontransitionend = () => {
  spinner.style.display = "none";
};

function onResults(results) {
  // Hide the spinner.
  document.body.classList.add("loaded");

  // Update the frame rate.
  fpsControl.tick();

  // Draw the overlays.
  canvasCtx.save();
  canvasCtx.clearRect(0, 0, canvasElement.width, canvasElement.height);
  canvasCtx.drawImage(
    results.image,
    0,
    0,
    canvasElement.width,
    canvasElement.height
  );
  if (results.multiHandLandmarks && results.multiHandedness) {
    console.log("true");
    for (let index = 0; index < results.multiHandLandmarks.length; index++) {
      //console.log(results.multiHandLandmarks);
      const classification = results.multiHandedness[index];
      const isRightHand = classification.label === "Right";
      const landmarks = results.multiHandLandmarks[index];
      /*drawConnectors(
          canvasCtx, landmarks, HAND_CONNECTIONS,
          {color: isRightHand ? '#00FF00' : '#FF0000'});
      */ drawLandmarks(canvasCtx, landmarks, {
        color: isRightHand ? "#00FF00" : "#FF0000",
        fillColor: isRightHand ? "#FF0000" : "#00FF00",
      });
    }
  }
}

const hands = new Hands({
  locateFile: (file) => {
    return `https://cdn.jsdelivr.net/npm/@mediapipe/hands@0.1/${file}`;
  },
});
hands.onResults(onResults);

/**
 * Instantiate a camera. We'll feed each frame we receive into the solution.
 */
const camera = new Camera(videoElement, {
  onFrame: async () => {
    await hands.send({ image: videoElement });
  },
  width: 1280,
  height: 720,
});
camera.start();

// Present a control panel through which the user can manipulate the solution
// options.
new ControlPanel(controlsElement, {
  selfieMode: true,
  maxNumHands: 2,
  minDetectionConfidence: 0.7,
  minTrackingConfidence: 0.7,
})
  .add([fpsControl])
  .on((options) => {
    videoElement.classList.toggle("selfie", options.selfieMode);
    hands.setOptions(options);
  });

function webcam2spaceX(x) {
  console.log(camera.width);
  return x * canvasElement.width;
}

function webcam2spaceY(y) {
  return y * canvasElement.height;
}
