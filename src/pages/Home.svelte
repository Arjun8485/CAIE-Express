<script>
    export let currentTab
</script>

<div class="mx-auto xl:w-8/12 lg:w-11/12 mt-12">
    <img src="images\Group 51.png" alt="">
    <a href="#/Questions">
        <button class="max-w-screen-md md:w-7/12 md:h-14 sm-6/12 w-full sm:h-12 h-10 bg-blue-600 float-right mx-auto text-white rounded-md font-semibold sm:text-base text-sm" on:click={() => currentTab = "questions"}>Start Revising Now!</button>
    </a>
</div>

<div class="xl:w-9/12 lg:w-11/12 md:mt-56 sm:mt-40 mt-28 mx-auto">
<img src="images/Group 44.png" alt="" class="w-full">
<div>
    <h1 class="md:text-5xl sm:text-3xl text-2xl md:mt-48 sm:mt-32 mt-16 text-primary-blue italic">How to use this site,</h1>
    <br><br>
    <!-- svelte-ignore a11y-media-has-caption -->
    <video autoplay muted loop>
    <source src="videos/site-tutorial.mp4" type="video/mp4">
    </video>
</div>
</div>