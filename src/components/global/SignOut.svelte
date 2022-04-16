<script>
import { signOut, getAuth } from "firebase/auth";
const auth = getAuth();

function signout() {
    signOut(auth).then(() => {
        location.reload();
    }).catch((error) => {
        window.alert(error)
    });
}
</script>

<button on:click={signout} class="h-10 px-8 sm:px-4 sm:text-sm  hover:bg-red-400 hover:text-white border-2 border-red-400 rounded-lg text-red-500 bg-white">Sign out</button>