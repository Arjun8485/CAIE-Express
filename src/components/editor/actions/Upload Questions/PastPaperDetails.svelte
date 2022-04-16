<script>
    import { AS_subjects, examBoards, components } from "../../../../stores/subjects.js";
    export let pastPaper
    let listOfyears = [
        "", "2008", "2009", "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017", "2018", "2019", "2020", "2021", "2022"
    ]
    $: pastPaper = pastPaper
</script>

<form action="" class="w-5/6 mx-auto border-red-400 border-2 p-5 rounded-md">
    <h2 class="font-semibold text-3xl text-blue text-center uppercase">Past paper details</h2>
    <!--Board-->
    <div class="mt-8">
        <h2>Exam bord:</h2>
        <div class="flex">
            <label for="1" class="mr-2">
                <input type="radio" class="mr-2" bind:group={pastPaper.examBoard} value={examBoards[0]}>{examBoards[0]}
            </label>
            <label for="2" class="mx-5">
                <input type="radio" class="mx-2" bind:group={pastPaper.examBoard} value={examBoards[1]}>{examBoards[1]}
            </label>
        </div>
    </div>

    <!--Subject-->
    <div class="flex mt-8">
        <label for="subject">Subject:</label>
        <select bind:value={pastPaper.subject} class="w-3/6 ml-5 bg-gray-100">
            <option></option>
            {#each AS_subjects as subject}
                <option value={subject}>{subject}</option>
            {/each}
        </select>
    </div>

    <!--Year and month-->
    <div class="mt-8 flex justify-evenly">
        <div class="flex">
            <label for="year">year:</label>
            <select bind:value={pastPaper.year} class="w-60 ml-5 bg-gray-100">
                {#each listOfyears as year}
                    <option value={year}>{year}</option>
                {/each}
            </select>
        </div>
        <br>

        <div class="flex">
            <label for="month">Month:</label>
            <select bind:value={pastPaper.month} class="w-60 ml-5 bg-gray-100">
                <option value=""></option>
                <option value="MJ">May-June</option>
                <option value="FM">Feb-March</option>
                <option value="ON">Oct-Nov</option>
            </select>
        </div>
    </div>

    {#if pastPaper.subject}
        <div class="mt-8 flex justify-between">
            <!--Series-->
                <div>
                    <h2>Series:</h2>
                    <div class="flex">
                        <label for="1" class="mr-2">
                            <input type="radio" class="mr-2" bind:group={pastPaper.series} value="1">one
                        </label>
                        <label for="2" class="mx-5">
                            <input type="radio" class="mx-2" bind:group={pastPaper.series} value="2">two
                        </label>
                        <label for="3" class="mx-5">
                            <input type="radio" class="mx-2" bind:group={pastPaper.series} value="3">three
                        </label>
                    </div>
                </div>
            <!--Components-->
            {#if components[pastPaper.subject]}
                <div>
                    <h2>Component</h2>
                    <div class="flex">
                        {#each components[pastPaper.subject] as component}
                            <label for={component.name}>
                                <input type="radio" class="mx-4" bind:group={pastPaper.component} value="{component.code}">{component.name}
                            </label>
                        {/each}
                    </div>
                </div>
            {/if}
        </div>
    {/if}
</form>