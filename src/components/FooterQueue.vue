<template>
  <div class="footer">
    <figure class="flex">
      <img
        class="w-12 h-autorounded-none flex-none"
        src="@/assets/logo.png"
        width="12"
      />
      <div class="text-left space-y-4 flex-none">
        <figcaption>
          <div class="text-gray-700 font-semibold text-2xl">
            <span class="text-red-400">care</span> dokter
          </div>
          <p>by Mandaya Hospital Group</p>
        </figcaption>
      </div>
      <div class="text-left space-y-1 pl-4 flex-none py-1">
        <img
          width="90"
          src="https://2.bp.blogspot.com/-gohG991y9pc/XHElkwwPfWI/AAAAAAAAD7U/9kEX3L64vvEXV2Xv_mz8f8VxCKTfIMNLgCLcBGAs/s320/12.PNG"
          alt=""
        />
        <img
          width="90"
          src="https://lh3.googleusercontent.com/proxy/IgvXdJoSb_raWRXJTSb6YIcDsZ7Y6-Z3OS8Oagp1B6UWeoWBdR6gjUbWM4h7jAXBgRLjSKLIRvrHuHXJGWicXQe9s56vQILStXGHtlwPFAO71Hs87b0WHWFYOW8Grd7RpOuJ"
          alt=""
        />
      </div>
      <div class="flex-grow">&nbsp;</div>
      <div class="flex-none">
        <div class="flex">
          <div class="time-border rounded-left bg-blue-800">&nbsp;</div>
          <div class="pl-8 pr-4 py-2 text-white text-right bg-blue-800">
            <p>09:55 AM</p>
            <p>Kamis, 30 Desember 2021</p>
          </div>
        </div>
      </div>
    </figure>
  </div>
</template>

<script>
export default {};
</script>

<style>
.footer {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: white;
  box-shadow: 0 0 1rem 0 rgb(0 0 0 / 16%);
}
.time-border {
  min-width: 50px;
}
.rounded-left {
  border-top-left-radius: 100%;
}
</style>
