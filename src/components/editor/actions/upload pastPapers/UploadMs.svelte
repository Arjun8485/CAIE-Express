<script>
    import { initializeApp } from "firebase/app";
    import { getStorage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from "firebase/storage";
    import { firebaseConfig } from "../../../../stores/firebase.js";

    const app = initializeApp(firebaseConfig);
    const storage = getStorage();
    
    export let markScheme
    export let pastPaper
    export let monthKey
    
    function uploadQFiles() {
        markScheme.file = markScheme.input.files[0]
        markScheme.fileName = markScheme.file.name.split('.').slice(0, -1).join('.');

        let fileName = markScheme.fileName

        if (
            pastPaper.year != `20${fileName.substring(6, 8)}` ||
            pastPaper.month != monthKey[fileName.substring(5, 6)] ||
            pastPaper.component != fileName.substring(12, 13) || 
            pastPaper.series != fileName.substring(13, 14)
            ) 
        {
            window.alert("qp ms mismatch")
        } else {
            markScheme.fileLocation = `pastPapers/${pastPaper.subject}/${pastPaper.year}/${pastPaper.month}/${pastPaper.component}${pastPaper.series}/${markScheme.fileName}`;
            const storageRef = ref(storage, markScheme.fileLocation);
            const uploadTask = uploadBytesResumable(storageRef, markScheme.file);
        
            uploadTask.on('state_changed', 
                (snapshot) => {
                    markScheme.upload.progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            
                    switch (snapshot.state) {
                    case 'paused':
                        markScheme.upload.state = snapshot.state
                        break;
                    case 'running':
                        markScheme.upload.state = snapshot.state
                        break;
                    }
                }, 
                (error) => {
                    markScheme.upload.error = error
                    console.log(error)
                }, 
                () => {
                    markScheme.upload.state = "Complete"
                    console.log("Uploaded")
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    console.log('File available at', downloadURL);
                    markScheme.link = downloadURL
                    });
                }
            );
        }
    }
    function deleteQFile() {
        const storageRef = ref(storage, markScheme.fileLocation);
    
        deleteObject(storageRef).then(() => {
        window.alert("File deleted!")
        }).catch((error) => {
            window.alert(error)
        });
    }
    </script>
    
    <label for="">Question file (PNG or PDF)</label>
    <input type="file" class="bg-blue-300 text-white font-semibold" accept="image/*, .pdf" on:change={uploadQFiles} bind:this={markScheme.input}>
    <br><br>
    {#if markScheme.upload.progress}
        <p>
            state: {markScheme.upload.state}
            <br>
            progress: {markScheme.upload.progress}%
        </p>
    {/if}
    {#if markScheme.upload.error}
        <p>{markScheme.upload.error}</p>
    {/if}
    {#if markScheme.link}
        <a href="{markScheme.link}" class="text-blue-400 underline" target="_blank">Link to answer</a>
        <br><br>
        <button class="bg-yellow-400 py-1 px-3 rounded-sm text-white font-bold border-none animate-zoom hover:opacity-50" on:click|preventDefault={deleteQFile}>Delete file</button>
    {/if}
