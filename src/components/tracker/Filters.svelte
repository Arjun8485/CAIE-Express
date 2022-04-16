<script>
export let pastPaper
export let selectedSubject
export let selectedFilters
let filters = {
    years: [''],
    months: [''],
    series: [''],
    component: ['']
}
$: selectedSubject, updateObject()
function updateObject() {
    filters = {
        years: [''],
        months: [''],
        series: [''],
        component: ['']
    }
    for (let index = 0; index < pastPaper[selectedSubject].length; index++) {
        let pastPaperRef = pastPaper[selectedSubject][index]
        if (!filters.years.includes(pastPaperRef.year)) {
            filters.years.push(pastPaperRef.year)
        }
        if (!filters.months.includes(pastPaperRef.month)) {
            filters.months.push(pastPaperRef.month)
        }
        if (!filters.series.includes(pastPaperRef.series)) {
            filters.series.push(pastPaperRef.series)
        }
        if (!filters.component.includes(pastPaperRef.component)) {
            filters.component.push(pastPaperRef.component)
        }
    }
}
</script>
<p class="uppercase text-gray-500 font-semibold text-xs mt-6">Enter details below to filter pastpapers: (optional)</p>
<div class="mt-2 flex flex-col md:flex-row md:space-x-5 space-x-0 md:space-y-0 space-y-2 text-blue-600">
    {#each Object.keys(filters) as filter}
        <div>
            <label for="{filter}" class="mr-2">{filter}</label>
            <select bind:value={selectedFilters[filter]} name="{filter}" class="border-2 border-gray-200 p-1 px-3 rounded-xl">
                {#each filters[filter] as option}
                    <option value="{option}">{option}</option>
                {/each}
            </select>
        </div>
    {/each}
</div>
