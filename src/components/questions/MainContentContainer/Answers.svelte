<script>
    export let questionsObject
    export let questionsIndex
</script>
{#if questionsObject[questionsIndex].answer.fileType == "PNG" || questionsObject[questionsIndex].answer.fileType == "image/png"}
    {#each questionsObject as object, index}
        <img alt="" src="{object.answer.link}" class="w-full {questionsIndex == index ? 'block' : 'hidden'}">
    {/each}
{:else if questionsObject[questionsIndex].answer.fileType == "pdf" || questionsObject[questionsIndex].answer.fileType == "application/pdf"}
    {#each questionsObject as object, index}
        <iframe src="{object.answer.link}#toolbar=0" class="w-full h-full {questionsIndex == index ? 'block' : 'hidden'}" title="" referrerpolicy="no-referrer" style="height: 600px;"></iframe>
    {/each}
{/if}
