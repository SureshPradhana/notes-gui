<script>
  export let open = false;
	import { slide } from 'svelte/transition';
	import {icons} from 'feather-icons';
	const handleClick = () => open = !open
</script>

<div class="accordion" >
	<div class="header" class:open="{open}">
		<div class="text">
			<slot name="head"></slot>	
		</div>
		
		<button on:click={handleClick} >
		{#if open}
		{@html icons["chevron-down"].toSvg({
            class: "feather",
            width: "14px",
            height: "14px",
          })}
		{:else}
{@html icons["chevron-up"].toSvg({
            class: "feather",
            width: "14px",
            height: "14px",
          })}
		  {/if}


		</button>
	</div>
	
	{#if open}
	<div class="details" transition:slide>
		<slot name="details">
		</slot>
	</div>
	{/if}
</div>

<style lang="scss">
	div.accordion {
		margin: 1rem 0;
	}
	
	div.header {
		display:flex;
		width:100%;
		padding-bottom:0.5em;
		border-bottom: 2px solid transparent;
	}
	
	div.header .text {
		flex: 1;
		margin-right: 5px;
	}
	
	div.details {
		padding:0.5rem;
		text-align:left;
	}
	div.header.open {
    border-bottom: 2px dashed #393e41 ; /* Dashed border when open */
  }
  button,button:hover,button:focus{
  border:none;
  outline:none;
  }







</style>
