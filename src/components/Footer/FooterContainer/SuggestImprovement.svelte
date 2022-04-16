<script>
    //firebase
    import { initializeApp } from "firebase/app";
    import { firebaseConfig } from "../../../stores/firebase.js";
    import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; 

    const app = initializeApp(firebaseConfig);
    const db = getFirestore();

    //Components
    import FooterSubmitBtn from "../FooterFormComponents/FooterSubmitBtn.svelte";

    export let FooterDisplayContent;
    export let uid

    let feedback = "";
    let showLoader

    async function submitFeedbackForm() {
        showLoader = true
        const docRef = await addDoc(collection(db, "feedback"), {
            feedback: feedback,
            uid: uid,
            timestamp: serverTimestamp()
        }).then(() => {
            setTimeout(() => {
                FooterDisplayContent = "Form submitted"
            }, 2000);
        })
    }
</script>

<h5 class="text-left font-bold">Feel free to provide any feedback, suggestions or improvements:</h5>

<textarea class="bg-red-50 border-2 border-red-500 w-full focus:outline-none mt-2 resize-none p-3 rounded-md" rows="5" bind:value={feedback}></textarea>

<div class="mt-5">
    <FooterSubmitBtn on:click|once={submitFeedbackForm} {showLoader}/>
</div>