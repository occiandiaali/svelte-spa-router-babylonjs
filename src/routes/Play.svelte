<script>
  import { onMount } from "svelte";
  import { Button, FormGroup, Input, Spinner } from "@sveltestrap/sveltestrap";
  import { myBookingStore } from "../stores/datesList";

  let iframeSrc = "";
  let thisRoom = "";
  let iframeOn = false;
  let mockLoading = false;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];
  console.log("Date", today);

  /**
   * @type {any[]}
   */
  let bookings = [];

  const handleSelectionChange = (
    /** @type {{ target: { value: string; }; }} */ event
  ) => {
    mockLoading = true;
    const optionId = event.target.value;
    const option = bookings.find((o) => o.roomId === optionId);
    console.log(
      `OptionID:${option.roomId} - OptionDate:${option.date} - OptionUrl:${option.url}`
    );

    setTimeout(() => {
      iframeSrc = option.url;
      thisRoom = option.roomId;
      iframeOn = true;
      mockLoading = false;
    }, 4000);
  };

  const handleRoomLeave = () => {
    console.log(`Leaving: ${thisRoom}`);
    myBookingStore.update((currentItems) =>
      currentItems.filter((item) => item.roomId !== thisRoom)
    );
    iframeSrc = "";
    thisRoom = "";
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
      // Subscribe to store to get current bookings
      myBookingStore.subscribe((value) => {
        bookings = value;
      });
    } else {
      alert("It looks like you're offline!");
    }
  });
</script>

<section>
  <FormGroup floating label="To start your date">
    <!-- <Input
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
    </Input> -->
    <Input
      type="select"
      on:change={handleSelectionChange}
      placeholder="Select an experience"
    >
      <option value="" disabled>Select an experience</option>
      {#each bookings as booking}
        <option value={booking.roomId} disabled={today !== booking.date}
          >Room {booking.roomId} on {booking.date}</option
        >
      {/each}
    </Input>
    <!-- <Input
      type="select"
      bind:value={iframeSrc}
      on:change={handleSelectionChange}
      placeholder="Select an experience"
    >
      <option></option>
      {#each bookings.slice().reverse() as booking}
        <option value={booking.url}
          >Room {(thisRoom = booking.roomId)} on {booking.date}</option
        >
      {/each}
    </Input> -->
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
      <p>room {thisRoom}</p>
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
    top: 8%;
    left: 2%;
  }
  #room {
    position: absolute;
    top: 8%;
    right: 8%;
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
