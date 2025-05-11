<script>
  import { onMount } from "svelte";
  import { Button, FormGroup, Input, Spinner } from "@sveltestrap/sveltestrap";

  let iframeSrc = "";
  let iframeOn = false;
  let mockLoading = false;

  const handleSelectionChange = (
    /** @type {{ target: { value: string; }; }} */ event
  ) => {
    mockLoading = true;
    setTimeout(() => {
      iframeSrc = event.target.value;
      iframeOn = true;
      mockLoading = false;
    }, 4000);
  };
  const handleRoomLeave = () => {
    iframeSrc = "";
    iframeOn = false;
  };

  window.addEventListener("online", () => {
    console.log("You are online!");
  });

  window.addEventListener("offline", () => {
    alert("You are offline!");
  });

  onMount(() => {
    // Initial check
    if (navigator.onLine) {
      console.log("You are online!");
    } else {
      alert("It looks like you're offline!");
    }
  });
</script>

<section>
  <FormGroup floating label="Select your experience">
    <Input
      type="select"
      bind:value={iframeSrc}
      on:change={handleSelectionChange}
      placeholder="Select an experience"
    >
      <option></option>
      <option value="https://coherent-glitter-hornet.glitch.me/"
        >Glitch Alpha</option
      >
      <option value="https://playcanv.as/p/c1o59wX5/">Playcanvas Bravo</option>
      <!-- <option value="charlie">Charlie</option> -->
    </Input>
  </FormGroup>
</section>
<section class="iframe-container">
  {#if mockLoading}
    <div style="margin-top: 10%;">
      <p>Loading..</p>
      <Spinner type="grow" color="success" />
    </div>
  {/if}
  {#if iframeOn}
    <iframe
      title=""
      on:load={() => (mockLoading = false)}
      src={iframeSrc}
      width="100%"
      height="500px"
      allow="microphone; xr-spatial-tracking; fullscreen;autoplay"
    ></iframe>
    <div id="btn">
      <Button color="outline-warning" on:click={handleRoomLeave}>Leave</Button>
    </div>
    <div id="room">
      <p>room 2</p>
    </div>
  {:else}
    <div style="margin-top: 10%">
      <p>Your experience will load here..</p>
    </div>
  {/if}
</section>

<style>
  #btn {
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
  }

  .iframe-container {
    position: relative;
    width: 100%;
    height: 78vh;
    overflow: hidden;
    /* background-color: brown; */
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
