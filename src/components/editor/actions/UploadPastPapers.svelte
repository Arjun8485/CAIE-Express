<script>
    import { initializeApp } from "firebase/app";
    import { getFirestore, collection, addDoc, query, where, getDocs } from "firebase/firestore"; 
    import { getStorage } from "firebase/storage";

    import { firebaseConfig } from "../../../stores/firebase.js";

    import PastPaperDetails from "./Upload Questions/PastPaperDetails.svelte";
    import UploadQp from "./upload pastPapers/UploadQp.svelte";
    import UploadMs from "./upload pastPapers/UploadMs.svelte";
    import Loader from "../../global/Loader.svelte"

    const app = initializeApp(firebaseConfig);
    const db = getFirestore();
    const storage = getStorage();

    const monthKey = {
        s: "MJ",
        m: "FM",
        w: "ON"
    }
    const subjectKey = {
        "9701" : "Chemistry",
        "9702" : "Physics",
        "9626" : "IT"
    }

    let pastPaper = {
        subject: undefined,
        year: undefined, 
        month: undefined,
        series: undefined,
        component: undefined,
        origin: undefined
    }
    let origin
    $: origin =  `${pastPaper.year}/${pastPaper.month}/${pastPaper.component}${pastPaper.series}`;
    let questionPaper = {
        input: undefined,
        fileName: undefined,
        file: undefined,
        fileLocation: undefined,
        link: undefined,
        upload: {
            state: undefined,
            progress: undefined,
            error: undefined
        }
    }
    let markScheme = {
        input: undefined,
        fileName: undefined,
        file: undefined,
        fileLocation: undefined,
        link: undefined,
        upload: {
            state: undefined,
            progress: undefined,
            error: undefined
        }
    }
    let documentError
    let submitStatus = "Submit";
    let pastPaperExists
    let existingPastPapers 

    async function checkIfQuestionExists() {
        existingPastPapers = []
        submitStatus = "Submitting"

        const q = query(collection(db, `${pastPaper.subject}PastPapers`), where("origin", "==", origin));
        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            existingPastPapers.push(doc.data())        
        });


        console.log(existingPastPapers)
        if (existingPastPapers.length) {
            window.alert("This question already exists! Try uploading a different file")
            submitStatus = "Submit"
            resetInputs()
        } else {
            submitQuestion()
        }
    }

    async function submitQuestion() {
        try {
            const docRef = await addDoc(collection(db, `${pastPaper.subject}PastPapers`), {
                subject: pastPaper.subject,
                year: pastPaper.year,
                month: pastPaper.month,
                series: pastPaper.series,
                component: pastPaper.component,
                questionPaper: questionPaper.link,
                markScheme: markScheme.link,
                origin: origin
            });
            console.log("Document written with ID: ", docRef.id);
            submitStatus = "Submit"
            window.alert(`document id: ${docRef.id}`)
            resetInputs()
        } catch (e) {
            documentError = e
            console.error("Error uploading document: ", e);
        }
    }

    function resetInputs() {
        questionPaper.upload.error = undefined
        questionPaper.upload.progress = undefined
        questionPaper.upload.state = undefined
        markScheme.upload.error = undefined
        markScheme.upload.progress = undefined
        markScheme.upload.state = undefined
        questionPaper.link = undefined
        markScheme.link = undefined
    }
/*
    let qpInput
    let msInput
    const monthKey = {
        s: "MJ",
        m: "FM",
        w: "ON"
    }
    const subjectKey = {
        "9701" : Chemistry
    }
    function func() {
        console.log(qpInput.files)
        for (let i = 0; i < qpInput.files.length; i++) {
            let currentFile = qpInput.files[i];
            let qp = {
                filename: currentFile.name.split('.').slice(0, -1).join('.'),
                file: currentFile,
                component: filename.substring(12, 13),
                year: `20${filename.substring(6, 8)}`,
                series: filename.substring(13, 14),
                subject: 
            }
            
        }
    }
*/
</script>
<div class="mx-auto w-8/12 mb-10 m-4">
    <PastPaperDetails bind:pastPaper/>
    <form action="" class="w-5/6 mx-auto border-red-400 border-2 p-5 rounded-md">
        <h2 class="font-semibold text-3xl text-blue text-center mt-8">Question and answer details</h2>
        <div class="mt-8">
            <div class="flex justify-around">
                <div>
                    <UploadQp bind:questionPaper bind:pastPaper {monthKey} {subjectKey}/>
                </div>
                <div>
                    <UploadMs bind:markScheme {pastPaper} {monthKey}/>
                </div>
            </div>
        </div>
    </form>
    <br><br><br>
    {#if questionPaper.link && markScheme.link && questionPaper.upload.state && markScheme.upload.state}
        <div class="flex w-5/6 mx-auto">
            <button  class="bg-yellow-400 py-4 mx-auto rounded-sm w-full text-white font-bold border-none animate-zoom flex justify-center" on:click|preventDefault={checkIfQuestionExists}>
                {#if submitStatus === "Submit"}
                    <span>Submit</span>
                {:else}
                    <div class="flex justify-center">
                        <Loader />
                        <span class="ml-4">Submitting</span>
                    </div>
                {/if}
            </button>
        </div>
        <br>
        <br>
    {/if}
</div>
<!--
    <div class="flex justify-between p-12">
        <input type="file" name="" id="" bind:this={qpInput} multiple on:change={func}>
        <input type="file" name="" id="" bind:this={msInput}>
    </div>
-->