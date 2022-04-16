<script>
    export let IncludeCompletedQuestions = true

    import { fade } from 'svelte/transition';
</script>

  <div class="flex mt-2 items-baseline" transition:fade>
    <p class="uppercase text-gray-500 font-semibold text-xs">Include previously completed questions?</p>
    <input type="checkbox" bind:checked={IncludeCompletedQuestions} class="mt-2 ml-3">
  </div>
