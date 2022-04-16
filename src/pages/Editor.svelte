<script>
    import { user } from "../stores/user.js"
    import LeftMenu from "../components/editor/LeftMenu.svelte";
    import UploadQuestions from "../components/editor/Actions/UploadQuestions.svelte";
    import UploadPastPapers from "../components/editor/actions/UploadPastPapers.svelte"

    let selectedAction = "Upload questions"
    let actions = ["Upload questions", "upload past papers"]
</script>
{#if $user.roles.admin}
    <div class="flex -m-12">
        <LeftMenu  bind:selectedAction {actions}/>
        {#if selectedAction === actions[0]}
            <UploadQuestions />
        {:else if selectedAction === actions[1]}
            <UploadPastPapers />
        {/if}
    </div>
{:else}
    <h4 class="text-2xl font-semibold text-center my-12 text-gray-600">You do not have access to this page :/</h4>
{/if}