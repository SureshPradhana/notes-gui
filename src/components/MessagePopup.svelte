<!-- MessagePopup.svelte -->
<script>
  export let message;
</script>

<div class="message-popup {message.type}">
  <p>{message.message}</p>
</div>

<style>
  .message-popup {
    position: fixed;
    z-index: 1001;
    top: 5%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* background-color:#71BC68; */
    color: #2a2a2a;
    padding: 1px 5px;
    border: 1px solid #ccc;
    border-radius: 5px;
    line-height: 0;
  }
  .info {
    background-color: #007bff; /* Blue */
  }

  .success {
    background-color: #28a745; /* Green */
  }

  .warning {
    background-color: #ffc107; /* Yellow */
  }

  .error {
    background-color: #dc3545; /* Red */
  }
</style>
