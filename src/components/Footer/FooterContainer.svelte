<script>
    import JoinUs from "../Footer/FooterContainer/JoinUs.svelte"
    import ReportProblem from "./FooterContainer/ReportProblem.svelte";
    import SuggestImprovement from "./FooterContainer/SuggestImprovement.svelte";
    import FormSubmitSuccess from "./FooterContainer/FormSubmitSuccess.svelte";

    import { user } from "../../stores/user.js"

    export let FooterNavBtns
    export let FooterDisplayContent
    export let currentTab
    let uid

    user.subscribe(value => {
        uid = value.uid
    })
    
    let formSubmittedSuccessfully = false
</script>

{#if !formSubmittedSuccessfully}
    {#if FooterDisplayContent === FooterNavBtns[0]}
    <JoinUs 
        {uid} 
        bind:FooterDisplayContent
    />
    {:else if FooterDisplayContent === FooterNavBtns[1]}
    <ReportProblem 
        {currentTab}
        {uid}
        bind:FooterDisplayContent
    />
    {:else if FooterDisplayContent === FooterNavBtns[2]}
    <SuggestImprovement 
        {uid}
        bind:FooterDisplayContent
    />
    {:else if FooterDisplayContent === "Form submitted"}
        <FormSubmitSuccess />
    {/if}
{/if}
