<script>
import PastPaperDetails from "../components/editor/Actions/Upload Questions/PastPaperDetails.svelte";
import ExamBoards from "../components/questions/filters/ExamBoards.svelte"
import Subjects from "../components/questions/filters/Subjects.svelte";
import Filters from "../components/tracker/Filters.svelte";

import { collection, query, orderBy, getDocs, getFirestore, where } from "firebase/firestore";
import { AS_subjects } from "../stores/subjects.js"
const db = getFirestore();

let selectedFilters = {
    year: '2021',
    month: '', 
    component: '',
    series: ''
}
$: if (selectedSubject) {
    selectedFilters = {
        year: '2021',
        month: '', 
        component: '',
        series: ''
    }
}
let selectedBoard
let selectedSubject
let pastPapers = {}
for (let index = 0; index < AS_subjects.length; index++) {
    pastPapers[AS_subjects[index]] = []
}
$: pastPapers = pastPapers;
let filters = {
    year: ['2021', '2020', '2019', '2018', '2017', '2016'],
    month: [''],
    component: [''],
    series: ['']
}
$: if (selectedSubject) {
    selectedSubject || selectedFilters.year, getPastpapers()
} 
async function getPastpapers() {
    const q = query(collection(db, `${selectedSubject}PastPapers`), orderBy("origin", "desc"), where("year", "==", selectedFilters.year));

    const querySnapshot = await getDocs(q);
    pastPapers[selectedSubject] = []
    querySnapshot.forEach((doc) => {
        pastPapers[selectedSubject].push(doc.data())
    });
    updateObject()
}

function updateObject() {
    filters = {
        year: ['2021', '2020', '2019', '2018', '2017', '2016'],
        month: [''],
        component: [''],
        series: ['']
    }
    if (selectedSubject) {
        for (let index = 0; index < pastPapers[selectedSubject].length; index++) {
            let pastPapersRef = pastPapers[selectedSubject][index];
            for (let i = 0; i < Object.getOwnPropertyNames(filters).length; i++) {
                let filtersArray = Object.getOwnPropertyNames(filters)
                if (!filters[filtersArray[i]].includes(pastPapersRef[filtersArray[i]])) {
                    filters[filtersArray[i]].push(pastPapersRef[filtersArray[i]])
                }
            }
            /*
                if (!filters.years.includes(pastPapersRef.year)) {
                    filters.years.push(pastPapersRef.year)
                }
                if (!filters.months.includes(pastPapersRef.month)) {
                    filters.months.push(pastPapersRef.month)
                }
                if (!filters.series.includes(pastPapersRef.series)) {
                    filters.series.push(pastPapersRef.series)
                }
            */
        }
    }
}
</script>

<ExamBoards bind:selectedBoard/>
<!--Select subject-->
<Subjects bind:selectedBoard bind:selectedSubject />

{#if selectedSubject}
    <p class="uppercase text-gray-500 font-semibold text-xs mt-6">Enter details below to filter pastpapers: (optional)</p>
    <div class="mt-2 flex flex-col md:flex-row md:space-x-5 space-x-0 md:space-y-0 space-y-2 md:text-base text-sm text-blue-600">
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

    <div class="flex flex-col mx-auto mt-20 bg-gray-50">
        <div class="flex justify-around font-semibold text-gray-400 text-2xl my-10">
            <h3 class="uppercase">Question paper</h3>
            <h3 class="uppercase">Mark scheme</h3>
        </div>
        {#each pastPapers[selectedSubject] as pastPaper}
            {#if (pastPaper.year === selectedFilters.year || selectedFilters.year === "") && (pastPaper.month == selectedFilters.month || selectedFilters.month === "") && (pastPaper.series === selectedFilters.series || selectedFilters.series === "") && (pastPaper.component === selectedFilters.component || selectedFilters.component === "")}
                <div class="flex justify-around my-5 text-blue-500 underline">
                    <a href="{pastPaper.questionPaper}" target="_blank">{pastPaper.origin}/QP</a>
                    <a href="{pastPaper.markScheme}" target="_blank">{pastPaper.origin}/MS</a>
                </div>
            {/if}
        {/each}
    </div>
{/if}