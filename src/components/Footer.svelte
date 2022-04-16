<script>
    import FooterNav from "./footer/FooterNav.svelte";
    import FooterContainer from "./footer/FooterContainer.svelte";
    
    export let layoutComponentClasses
    export let currentTab

    let FooterNavBtns = ["Join out team", "Report a problem", "Suggest an improvement"];
    let FooterDisplayContent
</script>
<footer class="{layoutComponentClasses} sm:justify-center md:py-12 mb-0 mt-auto">
    <FooterNav 
        bind:FooterDisplayContent
        {FooterNavBtns}
    />
    <div class="lg:w-5/12 max-w-xl w-11/12 lg:mt-0 mt-20 lg:mx-0 mx-auto">
        <FooterContainer 
            {FooterDisplayContent}
            {FooterNavBtns}
            {currentTab}
        />
    </div>
</footer>