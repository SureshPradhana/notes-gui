<script>
  export let signout = () => {};

  export let closeModal = () => {};
  import { get } from "svelte/store";
  import { userdetails } from "../../stores";

  let name;
  let email;

  email = get(userdetails).email;
  name = email.split("@")[0];

  function confirmAction() {
    signout();

    closeModal();
  }
</script>

<div class="modal">
  <div class="modal-content">
    <button class="close" on:click={closeModal}>X</button>

    <div class="info">
      <p><span class="label">Name:</span> {name}</p>
      <p><span class="label">Email:</span> {email}</p>
    </div>

    <div class="button-wrapper">
      <button class="done" on:click={signout}>SignOut</button>
    </div>
  </div>
</div>

<style lang="scss">
  @import "../styles/model.scss";

  .close {
    position: absolute;
    right: 10px;
    top: 10px;
    background-color: #1a1a1a;
    border: none;
    color: var(--ccc);
    padding: 10px;
    border-radius: 5px;
  }
  .modal-content {
    position: relative;
    display: grid;
    grid-template-rows: 1fr auto;
  }
  .info {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .info {
    padding: 20px;
    border-radius: 5px;
    margin-bottom: 20px;
  }
  .info p {
    margin: 0 0 10px 0;
    font-size: 18px;
  }
  .info .label {
    font-weight: bold;
    margin-right: 10px;
  }

  @media (min-width: 768px) {
    .modal-content {
      width: 45%;
    }
  }
</style>
