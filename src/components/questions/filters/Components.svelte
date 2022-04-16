<script>
    import { components } from "../../../stores/subjects.js";

    export let selectedSubject
    export let selectedComponent
</script>
<div class="mt-6">
    <p class="uppercase text-gray-500 font-semibold text-xs">select topics within those subjects: (Maximum 10 topics)</p>
    <div class="mt-1 space-x-4">
        {#each components[selectedSubject] as component}
            <label for="component">
                <input type="radio" name="component" bind:group="{selectedComponent}" class="checkbox-round"  value={component.code}>
                {component.name}
            </label>
        {/each}
    </div>
</div>