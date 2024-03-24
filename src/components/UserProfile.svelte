<script>
    export let signout = () => {};
	
    export let closeModal = () => {};
    import {get} from 'svelte/store';
    import {userdetails} from '../stores.js';

    let name;
    let email;

    email = get(userdetails).email;
    name = email.split('@')[0];

  
  
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
  
  <style>
    .modal {
      background-color: rgba(57, 57, 57, 0.8);
      width: 100vw;
      height: 100vh;
      position: fixed;
      top: 0;
      left: 0;
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
      z-index:30;
    }
    .close{
        position: absolute;
        right: 10px;
        top: 10px;
        background-color: #1a1a1a;
        border: none;
        color: #ccc;
        padding: 10px;
        border-radius: 5px;
    }
    .modal-content {
        position: relative;
      background-color: #222222;
      width: 60%;
      height: 60%;
      padding: 20px;
      border-radius: 5px;
      box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
      display: grid;
      grid-template-rows: 1fr auto;
    }
    .info {
      display: flex;
      justify-content: center;
      align-items: center;
      flex-direction: column;
    }
    .button-wrapper {
      display: flex;
      justify-content: end;
    }
    .button-wrapper button {
      padding: 10px;
      margin: 10px;
      border-radius: 5px;
      border: 1px solid #ccc;
      background-color: #1a1a1a;
      color: #ccc;
    }
    .add-tag-wrapper {
      display: flex;
      justify-content: left;
      /* align-content: stretch; */
    }
    .add-tag-wrapper input {
      width:60%;
      padding: 12px;
      /* margin: 10px; */
      border-radius: 5px;
      border: 1px solid #ccc;
    }
  
    .add-tag-wrapper button{
      background-color:#1a1a1a;
      padding:12px;
      border-radius: 5px;
    }
  
    .add-tag-wrapper input:focus{
      color:#ccc;
    }
  
  
    .button-wrapper .done {
      background-color: #3f6d41;
      color: #ccc;
    }
    .info2 textarea {
      width: 100%;
    }
    .shit-wrapper {
      display: flex;
    }
    .shit-wrapper p {
      background-color: #1a1a1a;
      border-radius: 4px;
      margin-right: 4px;
      padding: 8px;
    }
    .shit-wrapper p button {
      margin: 0;
      padding: 0;
      border: none;
    }
    .shit-wrapper p button:hover {
      color: #9a3a31;
      border: none;
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
    .modal-content{
      width:45%;
    }
  }
   
  </style>
  
