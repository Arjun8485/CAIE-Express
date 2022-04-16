<script>
  import { user } from "../stores/user.js";
  import { AS_subjects } from "../stores/subjects.js"
    /*
      import { getAuth, updateProfile } from "firebase/auth";
      import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
      import Loader from "../components/Global/Loader.svelte"
      
      const auth = getAuth();
      const storage = getStorage();
      const storageRef = ref(storage, 'images/rivers.jpg');
      
      let userDetailClasses = " normal-case bg-red-400 text-white ml-2 p-1.5 rounded-md outline-none"
      
      let User
      user.subscribe(value => {
          User = value
      });
      
      function updatePhotoURLOnSite() {
          const reader = new FileReader();
          reader.addEventListener("load", () => {
            User.photoURL = reader.result;
              user.update(User.photoURL = photoURL)
          });
          reader.readAsDataURL(this.files[0]);
          uploadProfileIcon()
      }
      $: console.log(User.photoURL)

      let updateStatus = "update"
      function updateProfileDetails() {
          updateStatus = "updating"
          updateProfile(auth.currentUser, {
          displayName: User.displayName, photoURL: User.photoURL
          }).then(() => {
              updateStatus = "updated"
              console.log("updated")
          }).catch((error) => {
              window.alert(error)
              updateStatus = "update"
              console.log(error)
          });
      }
      
      function uploadProfileIcon() {
      // Upload file and metadata to the object 'images/mountains.jpg'
      const storageRef = ref(storage, 'images/' + file.name);
      const uploadTask = uploadBytesResumable(storageRef, file, metadata);
      
      // Listen for state changes, errors, and completion of the upload.
      uploadTask.on('state_changed',
        (snapshot) => {
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log('Upload is ' + progress + '% done');
          switch (snapshot.state) {
            case 'paused':
              console.log('Upload is paused');
              break;
            case 'running':
              console.log('Upload is running');
              break;
          }
        }, 
        (error) => {
          // A full list of error codes is available at
          // https://firebase.google.com/docs/storage/web/handle-errors
          switch (error.code) {
            case 'storage/unauthorized':
              // User doesn't have permission to access the object
              break;
            case 'storage/canceled':
              // User canceled the upload
              break;
      
            // ...
      
            case 'storage/unknown':
              // Unknown error occurred, inspect error.serverResponse
              break;
          }
        }, 
        () => {
          // Upload completed successfully, now we can get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            console.log('File available at', downloadURL);
          });
        }
      );
      }
      
      let photoURLinput
    */
export let usersCompletedQuestions
</script>

    {#if $user.uid}
      <!--
        <div>
            <h3 class="text-center text-3xl text-red-400 uppercase">Your profile details:</h3>
            <div class="flex justify-evenly mt-16">
                <div class="flex justify-center space-x-8">
                    <img src={$user.photoURL} alt="user profile icon" class="rounded-full h-20 w-20 cursor-pointer" on:click={() => {photoURLinput.click()}}>
                    <input type="file" accept="image/*" class="hidden" bind:this={photoURLinput} on:change={updatePhotoURLOnSite}>
                    <div class="text-red-400 uppercase font-bold">
                        <p>Email: <span class="{userDetailClasses}">{$user.email}</span></p>
                        <br>
                        <p>Display name: <span class="{userDetailClasses}" contenteditable="true">{$user.displayName}</span></p>
                        <br><br>
                            <button class="font-semibold flex py-2 px-6 rounded-sm bg-yellow-400 text-white uppercase justify-center" on:click={updateProfileDetails}>
                                {#if updateStatus === "updating"} 
                                    <span class="mr-3"><Loader /></span>
                                {/if}
                                {updateStatus}
                            </button>
                    </div>
                </div>
            </div>
        </div>
      -->
      <h3 class="text-2xl text-red-400 font-semibold">Progress</h3>
      <div class="flex justify-center w-3/6">
        {#each AS_subjects as subject}
          <h2 class="mx-4">{subject}</h2>
            <progress value="{usersCompletedQuestions[subject]}" max="" class="w-full"></progress>
        {/each}
      </div>
    {/if}