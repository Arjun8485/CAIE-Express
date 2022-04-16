<script>
//firebase
import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../../stores/firebase.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "firebase/firestore"; 

const app = initializeApp(firebaseConfig);
const db = getFirestore();

//Components
import FooterInputSelect from "../FooterFormComponents/FooterInputSelect.svelte"
import FooterTextArea from "../FooterFormComponents/FooterTextArea.svelte"
import FooterSubmitBtn from "../FooterFormComponents/FooterSubmitBtn.svelte"

export let uid
export let FooterDisplayContent

let contributeRoles = ["How you can contribute:", "Website content creation", "Website development", "Social media promotion", "Other"];
let selectedRole = contributeRoles[0];
let OtherDetails
let showLoader

async function submitContributeForm() {
    showLoader = true
    const docRef = await addDoc(collection(db, "contributor_applications"), {
        selectedRole: selectedRole,
        OtherDetails: OtherDetails,
        uid: uid,
        timestamp: serverTimestamp()
    }).then(() => {
        setTimeout(() => {
            FooterDisplayContent = "Form submitted"
        }, 2000);
    })
}
</script>


<h5 class="text-left font-bold" on>Be part of our community and collaborate with us!</h5>

<div class="mt-6 text-red-400">
    <FooterInputSelect 
        footerSelectOptions={contributeRoles}
        bind:footerSelectValue={selectedRole}
    />
    <div class="mt-10">
        <h5 class="font-bold text-red-400">Any other details:</h5>
        <FooterTextArea
            bind:value={OtherDetails}
        />
    </div>
</div>

<div class="mt-5">
    <FooterSubmitBtn on:click|once={submitContributeForm} {showLoader}/>
</div>

