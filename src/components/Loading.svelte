<!-- Loading.svelte -->
<div class="loading-overlay">
  <div class="loading-spinner"></div>
  <p>Loading...</p>
</div>

<style>
  .loading-overlay {
    position: fixed;
    z-index:1000;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .loading-spinner {
    border: 4px solid rgba(0, 0, 0, 0.1);
    border-left-color: #333;
    animation: spin 1s linear infinite;
    border-radius: 50%;
    width: 50px;
    height: 50px;
  }

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
</style>

