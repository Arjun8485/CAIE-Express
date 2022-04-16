<script>
    export let FooterNavBtns
    export let FooterDisplayContent = FooterNavBtns[0]
</script>

<div>
    <div class="md:text-4xl text-3xl flex">
        <h3 class="font-bold text-center">CAIE</h3><span class="font-light italic">Express</span>
    </div>
    <div class="uppercase mt-16 space-y-2 lg:text-left text-center 2xl:text-xl xl:text-lg text-base">
        {#each FooterNavBtns as btn}
            <div class="cursor-pointer {FooterDisplayContent === btn ? "font-bold" : "font-normal"}" on:click={() => {FooterDisplayContent = btn}}>{btn}</div>
        {/each}
    </div>
</div>