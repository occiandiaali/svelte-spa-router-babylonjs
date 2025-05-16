<script>
  import { onMount } from "svelte";
  import {
    Button,
    FormGroup,
    Input,
    Spinner,
    Toast,
    ToastBody,
    ToastHeader,
  } from "@sveltestrap/sveltestrap";
  import { myBookingStore } from "../stores/datesList";

  let iframeSrc = "";
  let thisRoom = "";
  let iframeOn = false;
  let mockLoading = false;
  let isOpen = false;

  // Get today's date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const now = new Date();
  const currentTime = now.toLocaleTimeString();

  /**
   * @type {string | number}
   */
  let todayTime;

  /**
   * @type {string | number}
   */
  let todayDate;

  /**
   * @type {string}
   */
  let render;

  /**
   * @type {any[]}
   */
  let bookings = [];
  //let userResponse = false;

  const handleSelectionChange = (
    /** @type {{ target: { value: string; }; }} */ event
  ) => {
    mockLoading = true;
    let optionId = event.target.value;
    const option = bookings.find((o) => o.roomId === optionId);
    console.log(
      `OptionID:${option.roomId} - OptionDate:${option.date} - OptionUrl:${option.url}`
    );
    // if (option.time > currentTime) {
    //   userResponse = confirm(`
    //   Your experience was scheduled for ${option.time}.
    //   Do you want to start it now, instead?
    //   `);
    // }

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

  function mobileAlert() {
    const width = window.innerWidth;
    if (width < 768) {
      isOpen = true;
    }
  }
  /**
   * @type {string}
   */
  let formatDate;

  onMount(() => {
    // Initial check
    if (navigator.onLine) {
      mobileAlert();
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
    <Input
      type="select"
      on:change={handleSelectionChange}
      placeholder="Select an experience"
    >
      <option value="" disabled>Select an experience</option>
      {#each bookings as booking}
        <option value={booking.roomId} disabled={today !== booking.date}
          >{booking.date} -- Room {booking.roomId} -- Duration:
          {booking.duration} -- Starts: {booking.bookedHour}</option
        >
      {/each}
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
      <p>room {thisRoom}</p>
    </div>
  {:else}
    <div style="margin-top: 10%;">
      <p>Your experience will play here..</p>
      <Toast {isOpen} autohide delay={10000} on:close={() => (isOpen = false)}>
        <ToastHeader>Mobile user notice</ToastHeader>
        <ToastBody>
          You will enjoy your experience better on a desktop/laptop. Or, simply
          switch your screen to landscape mode once the experience begins.
        </ToastBody>
      </Toast>
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
