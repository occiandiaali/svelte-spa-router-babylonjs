<script>
  import { Button } from "@sveltestrap/sveltestrap";

  // let iframeSrc = "https://playground.babylonjs.com/full.html#R95W5R#2";
  let iframeSrc = "http://localhost:5173";
</script>

<section class="iframe-container">
  <iframe title="" src={iframeSrc} width="100%" height="500px"></iframe>
  <!-- <div id="btn">
    <Button color="outline-warning">Leave</Button>
  </div>
  <div id="room">
    <p>room 2</p>
  </div> -->
</section>

<style scoped>
  /* #btn {
    position: absolute;
    top: 12%;
    left: 3%;
  }
  #room {
    position: absolute;
    top: 12%;
    right: 5%;
  }
  #room > p {
    color: white;
  } */

  .iframe-container {
    position: relative;
    width: 100%;
    height: 78vh;
    overflow: hidden;
    background-color: brown;
  }
  .iframe-container iframe {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border: none;
  }
</style>
