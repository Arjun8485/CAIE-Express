<script>
    import IncrementIndex from "./ControllerPanel/IncrementIndex.svelte";
    import DecrementIndex from "./ControllerPanel/DecrementIndex.svelte";
    import Details from "./ControllerPanel/Details.svelte"
    
    export let questionsIndex
    export let main_container_content
    export let questionsObject = []
    export let completedProgressBarWidth
    export let isPreview = false
    export let selectedSubject
    export let questionsId
    
    $:questionsId, progressBar(questionsIndex +1)
    
    function progressBar(currentq) {
        completedProgressBarWidth = `${(currentq/questionsId.length)*100}%`;
    }
    const IndexModifierBtnClasses = "md:w-2/12 w-full bg-black text-md font-semibold py-4 text-center cursor-pointer";
    </script>
    
    
    {#if questionsObject.length > 0}
        <div class="bg-blue flex md:flex-row flex-col text-white md:font-semibold font-medium w-full text-center md:text-lg text-md my-5 top-0 animate-opacity">
            <DecrementIndex
                bind:questionsIndex={questionsIndex} 
                bind:main_container_content={main_container_content} 
                {IndexModifierBtnClasses}
            />
            <Details 
                {questionsObject}
                {questionsIndex}
                {isPreview}
                {selectedSubject}
                {questionsId}
            />
            <IncrementIndex 
                bind:questionsIndex={questionsIndex} 
                bind:main_container_content={main_container_content} 
                {IndexModifierBtnClasses} 
                {questionsId}
            />
        </div>
    {/if}