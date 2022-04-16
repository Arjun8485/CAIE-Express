<script>
    //firebase
    import { initializeApp } from "firebase/app";
    import { firebaseConfig } from "../../../stores/firebase.js";
    import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; 

    const app = initializeApp(firebaseConfig);
    const db = getFirestore();

    //Components
    import FooterInputSelect from "../FooterFormComponents/FooterInputSelect.svelte";
    import FooterTextArea from "../FooterFormComponents/FooterTextArea.svelte";
    import FooterSubmitBtn from "../FooterFormComponents/FooterSubmitBtn.svelte";

    export let currentTab
    export let FooterDisplayContent
    export let uid

    let errorCategories = ["Type of error:", "Technical error", "Spelling / gramatical error", "Inaccurate or misleading content", "Unreactive button"]
    let selectedErrorCategory
    let furtherElaboration

    let showLoader
    async function submitReportForm() {
        showLoader = true
        const docRef = await addDoc(collection(db, "reported_issues"), {
            errorCategory: selectedErrorCategory,
            furtherElaboration: furtherElaboration,
            uid: uid,
            page: currentTab,
            timestamp: serverTimestamp()
        }).then(() => {
            setTimeout(() => {
                FooterDisplayContent = "Form submitted"
            }, 2000);
        })
    }
</script>


<h5 class="text-left font-bold" on>Report an issue you've experienced on the current tab: ({currentTab})</h5>

<div class="mt-6">
    <FooterInputSelect 
        footerSelectOptions={errorCategories}
        bind:footerSelectValue={selectedErrorCategory}
    />
    <div class="mt-10">
        <h5 class="font-bold text-red-400">Elaborate further on the issue you've been experiencing:</h5>
        <FooterTextArea
            bind:value={furtherElaboration}
        />
    </div>
</div> 

<div class="mt-5">
    <FooterSubmitBtn on:click|once={submitReportForm} {showLoader}/>
</div>