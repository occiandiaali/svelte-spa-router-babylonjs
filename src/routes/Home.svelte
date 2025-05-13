<script lang="ts">
  //import { onMount } from "svelte";
  import {
    Button,
    Modal,
    ModalBody,
    ModalFooter,
    ModalHeader,
    Icon,
    Image,
    TabContent,
    TabPane,
    FormGroup,
    Input,
  } from "@sveltestrap/sveltestrap";
  // import { push } from "svelte-spa-router";

  // import type { AuthSession } from "@supabase/supabase-js";
  // import { supabase } from "../supabaseClient";

  import { myBookingStore } from "../stores/datesList";
  import { generateRandomString } from "../helpers/randomGenerators";
  import { snippetSounds } from "../mockData/audio";
  // import { onMount } from "svelte";

  // let session: AuthSession;
  // let userExists = false;

  let openScrollable = false;
  let selectedNum: number;
  let selectedImage: string;
  const toggleScrollable = () => (openScrollable = !openScrollable);
  const thumbnails = [
    "https://picsum.photos/100/100?random=1",
    "https://picsum.photos/100/100?random=2",
    "https://picsum.photos/100/100?random=3",
    "https://picsum.photos/100/100?random=4",
    "https://picsum.photos/100/100?random=5",
    "https://picsum.photos/100/100?random=6",
    "https://picsum.photos/100/100?random=7",
    "https://picsum.photos/100/100?random=8",
    "https://picsum.photos/100/100?random=9",
    "https://picsum.photos/100/100?random=10",
    "https://picsum.photos/100/100?random=11",
    "https://picsum.photos/100/100?random=12",
    "https://picsum.photos/100/100?random=13",
    "https://picsum.photos/100/100?random=14",
    "https://picsum.photos/100/100?random=15",
    "https://picsum.photos/100/100?random=16",
  ];

  const handleSelection = (theNum: number, theImg: string) => {
    toggleScrollable();
    selectedNum = theNum;
    selectedImage = theImg;
  };

  let environSelection = "";
  let bookedDate = "";
  let room = "";
  let timer = 10;

  const handleDateAndEnvironSelection = () => {
    if (environSelection !== "" && bookedDate !== "") {
      room = generateRandomString();
      myBookingStore.update((currentValues) => [
        ...currentValues,
        {
          roomId: room,
          url: environSelection,
          date: bookedDate,
          duration: timer,
        },
      ]);
      toggleScrollable();
      alert(`
      Your date has been scheduled for ${bookedDate} in Room ${room}!
      Check the Experiences page for details & the Join link.
      `);
      environSelection = "";
      bookedDate = "";
      room = "";
    }
  };

  // const handleEnvironSelection = () => {
  //   myBookingStore.update((currentItems) => [
  //     ...currentItems,
  //     { url: environSelection, date: bookingDate },
  //   ]);
  //   environSelection = "";
  // };
</script>

<div class="grid">
  {#each { length: 15 } as _, i}
    <div class="card">
      <Image data-bs-theme="dark" alt="" src={thumbnails[i + 1]} />
      {i + 1}
      <div id="eye">
        <Icon
          name="eye"
          onclick={() => handleSelection(i + 1, thumbnails[i + 1])}
        />
      </div>
    </div>
  {/each}

  <Modal isOpen={openScrollable} centered toggle={toggleScrollable} scrollable>
    <ModalHeader toggle={toggleScrollable}>Card no. {selectedNum}</ModalHeader>
    <ModalBody style="text-align:center">
      <Image
        fluid
        src={selectedImage}
        width="350"
        height="350"
        style="margin-top:12px;margin-bottom:10px;border-radius:12px"
      />
      <p style="padding:2px">
        This is some placeholder content to show the tidbits about {selectedNum}.
        Instead of repeating the same mistake of meeting without insight, we
        give you the chance to learn certain things about the person beforehand.
        Learn what her/his hobbies, voice, likes/dislikes, interests, etc are by
        scrolling here. Then request a date by selecting a date and environment
        below.
      </p>
      <section>
        <figure>
          <figcaption>Listen to {selectedNum} speak</figcaption>
          <!-- <audio :src="item?.voice" controls></audio> -->
          <audio controls>
            {#each snippetSounds as snip}
              <source src={snip.snippet} type="audio/wav" />
            {/each}
          </audio>
        </figure>
      </section>

      <p>Some of {selectedNum}'s interests</p>
      <TabContent>
        <TabPane tabId="alpha" tab="Alpha" active>
          <h2 class="text-content">Alpha</h2>
          <img
            alt="Alpha Flight"
            src="https://upload.wikimedia.org/wikipedia/en/4/49/Alpha_Flight_cast_picture_%28John_Byrne_era%29.gif"
          />
        </TabPane>
        <TabPane tabId="bravo" tab="Bravo">
          <h2 class="text-content">Bravo</h2>
          <img
            alt="Johnny Bravo"
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/b/be/Johnny_Bravo_series_logo.png/320px-Johnny_Bravo_series_logo.png"
          />
        </TabPane>
        <TabPane tabId="charlie" tab="Charlie">
          <h2 class="text-content">Charlie</h2>
          <div class="pane-div">
            <img
              alt="Charlie Brown"
              src="https://upload.wikimedia.org/wikipedia/en/2/22/Charlie_Brown.png"
            />
            <!-- <div class="pane-btn-div">
          
                <Button
                  color="outline-success"
                  on:click={() => push(`#/experience/${selectedNum}`)}
                  >Go to {selectedNum}</Button
                >
        
            </div> -->
          </div>
        </TabPane>
      </TabContent>
      <p>Do you like{selectedNum}?</p>
      <section style="margin-top: 3.5%;">
        <p>
          Fix a date: <input
            bind:value={bookedDate}
            type="date"
            min="2025-05-10"
            on:change={handleDateAndEnvironSelection}
          />
        </p>
        <FormGroup floating label="Choose a Room experience">
          <Input
            type="select"
            bind:value={environSelection}
            on:change={handleDateAndEnvironSelection}
            placeholder="Select an environment type"
          >
            <option></option>
            <option value="https://coherent-glitter-hornet.glitch.me/"
              >Flat land with Boxes</option
            >
            <option value="https://playcanv.as/p/c1o59wX5/"
              >FPS house interior</option
            >
            <option value="https://playground.babylonjs.com/full.html#R95W5R#3"
              >Babylon Plane</option
            >
          </Input>
        </FormGroup>
        <FormGroup floating label="Choose the duration">
          <Input
            type="select"
            bind:value={timer}
            placeholder="The duration of the date.."
            ><option></option>
            <option>15 minutes</option>
            <option>30 minutes</option>
            <option>60 minutes</option>
          </Input>
        </FormGroup>
      </section>
    </ModalBody>
    <ModalFooter>
      <!-- <Button
          color="outline-success"
          on:click={() => push(`#/experience/${selectedNum}`)}
          >Go to {selectedNum}</Button
        > -->

      <Button color="secondary" on:click={toggleScrollable}>Cancel</Button>
    </ModalFooter>
  </Modal>
</div>

<style>
  .grid {
    position: relative;
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 0.6rem;

    & > * {
      display: grid;
      place-content: center;
      padding: 3rem;
      font-size: 2rem;
      font-weight: 600;
      background-color: oklch(20% 0 0);
      border-radius: 12px;
    }
  }
  #eye {
    position: absolute;
    bottom: 2%;
    right: 45%;
    font-size: xx-large;
    color: white;
    cursor: pointer;
    z-index: 7;
  }

  /* .pane-btn-div {
    position: absolute;
    bottom: 2%;
    right: 12%;
  } */

  .pane-div {
    position: relative;
  }
</style>
