<script>
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
//event dispatch
import { createEventDispatcher } from 'svelte';

const db = getFirestore();
const auth = getAuth();
const provider = new GoogleAuthProvider();


async function signIn () {
    signInWithPopup(auth, provider)
    .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        console.log(result)
    })
}

/*
    async function addUsertoCollection(result) {
        let docRef = doc(db, "users", result.user.uid);
        let docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data())
        } else {
            setDoc(doc(db, "users", result.user.uid), {
                roles: {
                    premiumUser: false,
                    admin: false,
                    editor: []
                },
                email: result.user.email
            }).then(() => {
                for (let index = 0; index < AS_subjects.length; index++) {
                    setDoc(doc(db, `users/${result.user.uid}/subjects/${AS_subjects[index]}`), {
                        completedQuestions: []
                    })
                }
            })
        }
    }
*/
</script>
<button on:click={signIn} class="flex bg-white text-gray-800 h-10 w-28 text-sm p-2 items-center shadow-sm rounded-sm hover:bg-gray-100">
    <img src="images/googleIcon.png" alt="Google icon" class="h-6 w-6">
    <p class="text-md text-center mx-auto text-gray-700 font-semibold">Login</p>
</button>