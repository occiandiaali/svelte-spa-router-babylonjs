<script lang="ts">
  import {
    Button,
    ButtonGroup,
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
  import { push } from "svelte-spa-router";

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
  const handleEnvironSelection = () => {};
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
      <p style="min-height: 500px;">
        This is some placeholder content to show the scrolling behavior for
        modals. Instead of repeating the text the modal, we use an inline style
        set a minimum height, thereby extending the length of the overall modal
        and demonstrating the overflow scrolling.
        <Image
          fluid
          src={selectedImage}
          width="350"
          height="350"
          style="margin-top:12px;border-radius:12px"
        />
      </p>

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
            <div class="pane-btn-div">
              <Button
                color="outline-success"
                on:click={() => push(`#/experience/${selectedNum}`)}
                >Go to {selectedNum}</Button
              >
            </div>
          </div>
        </TabPane>
      </TabContent>
      <p>Do you like{selectedNum}?</p>
      <section style="margin-top: 3.5%;">
        <p>Fix a date: <input type="date" min="2025-05-10" /></p>
        <FormGroup floating label="Choose your Room experience">
          <Input
            type="select"
            bind:value={environSelection}
            on:change={handleEnvironSelection}
            placeholder="Select an environment type"
          >
            <option></option>
            <option value="https://coherent-glitter-hornet.glitch.me/"
              >Flat land with Boxes</option
            >
            <option value="https://playcanv.as/p/c1o59wX5/"
              >FPS house interior</option
            >
            <option value="https://playground.babylonjs.com/full.html#R95W5R#2"
              >Babylon Plane</option
            >
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

  .pane-btn-div {
    position: absolute;
    bottom: 2%;
    right: 12%;
  }

  .pane-div {
    position: relative;
  }
</style>
