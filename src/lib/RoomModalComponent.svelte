<script lang="ts">
  import { onMount } from "svelte";
  import {
    Button,
    ButtonGroup,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Spinner,
    Toast,
    ToastBody,
    ToastHeader,
  } from "@sveltestrap/sveltestrap";
  // import {
  //   myBookingStore,
  //   bookedRoomStore,
  //   bookedDurationStore,
  // } from "../stores/datesList";
  import {
    bookedDateDuration,
    bookedRoomUrl,
    bookedRoomID,
  } from "../stores/roomInfoStore";

  let mockLoading = false;
  let iframeOn = true;
  let isOpen = false;
  export let onClose;
  export let open = false;
  export let fullscreen: any;
  export let roomModalId: string;
  export const toggle = () => {
    fullscreen = true;
    open = !open;
  };
  //   const toggleAlways = () => {
  //     fullscreen = true;
  //     open = !open;
  //   };

  function mobileAlert() {
    const width = window.innerWidth;
    if (width < 768) {
      isOpen = true;
    }
  }

  onMount(() => {
    if (navigator.onLine) {
      console.log("You're online..");
      mobileAlert();
      mockLoading = true;
      // bookedRoomStore.subscribe((v) => (iframeSrc = v));
      // console.log(`Booked: ${JSON.stringify(bookedRoomStore)}`);
      // bookedDurationStore.subscribe((d) => (forHowLong = d));
      console.log(
        `Booked for: ${$bookedDateDuration} in room ${$bookedRoomID}`
      );
    } else {
      alert("It looks like you're offline...");
    }
  });
</script>

<!-- <Button color="primary" on:click={toggleAlways}>
  Open Always Modal
</Button> -->

<Modal isOpen={open} on:close={onClose} {fullscreen}>
  <ModalHeader {toggle}>Room {roomModalId}</ModalHeader>
  <ModalBody>
    <section class="iframe-container">
      {#if mockLoading}
        <div style="margin-top: 10%;margin-left: 45%">
          <p><b>Loading..</b></p>
          <Spinner type="grow" color="success" />
        </div>
      {/if}
      {#if iframeOn}
        <iframe
          title=""
          on:load={() => (mockLoading = false)}
          src={$bookedRoomUrl}
          width="100%"
          height="540px"
          allow="microphone; xr-spatial-tracking; fullscreen;autoplay"
        ></iframe>
        <div id="btn">
          <Button color="outline-warning" on:click={onClose}>Leave</Button>
        </div>
        <div id="room">
          <p>{+$bookedDateDuration} mins</p>
        </div>
      {:else}
        <div id="play-here-placeholder">
          <p><b>Your experience will play here..</b></p>
          <Toast
            {isOpen}
            autohide
            delay={10000}
            on:close={() => (isOpen = false)}
          >
            <ToastHeader>Mobile user notice</ToastHeader>
            <ToastBody>
              You will enjoy your experience better on a desktop/laptop. Or,
              simply switch your screen to landscape mode once the experience
              begins.
            </ToastBody>
          </Toast>
        </div>
      {/if}
    </section>
  </ModalBody>
  <!-- <ModalFooter>
    <Button color="outline-success" on:click={toggle}>Do Something</Button>
    <Button color="danger" on:click={toggle}>Cancel</Button>
  </ModalFooter> -->
</Modal>

<style scoped>
  #btn {
    position: absolute;
    top: 8%;
    left: 2%;
  }
  .iframe-container {
    position: relative;
    width: 100%;
    overflow: hidden;
    /* background-color: brown; */
  }
  #play-here-placeholder {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%); /* Adjusts for the element's size */
  }
  #room {
    position: absolute;
    top: 10%;
    right: 5%;
  }
  #room > p {
    color: white;
  }
</style>
