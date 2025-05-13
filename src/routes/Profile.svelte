<script lang="ts">
  import {
    Figure,
    Image,
    ListGroup,
    ListGroupItem,
    Modal,
  } from "@sveltestrap/sveltestrap";

  let open = false;
  const toggle = () => (open = !open);
</script>

<section>
  <Modal body header="modal title" isOpen={open} {toggle} centered>
    Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod
    tempor incididunt ut labore et dolore magna aliqua.
  </Modal>
  <Figure caption="I believe this is a cow needing a haircut">
    <Image
      thumbnail
      alt="This is a thumbnail Image"
      src="https://picsum.photos/100/100?random=1"
    />
  </Figure>

  <ListGroup>
    <ListGroupItem active tag="button" action on:click={toggle}
      >Active</ListGroupItem
    >
    <ListGroupItem tag="button" action on:click={toggle}>Bravo</ListGroupItem>
    <ListGroupItem tag="button" action on:click={toggle}>Charlie</ListGroupItem>
    <ListGroupItem tag="button" action on:click={toggle}>Delta</ListGroupItem>
    <ListGroupItem disabled tag="button" action>Disabled</ListGroupItem>
  </ListGroup>
</section>
