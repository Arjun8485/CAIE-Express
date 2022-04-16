<script>
    export let completedProgressBarWidth
    export let questionsId

</script>

<div class="flex text-sm text-white text-center text-bold bg-black {questionsId.length == 0 ? 'hidden' : 'block'}">
    <div class="bg-red-500 h-1.5 my-auto" style="width: {completedProgressBarWidth};"></div>
</div>