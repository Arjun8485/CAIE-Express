<style>
.loader {
border-top-color: white;
-webkit-animation: spinner 1s linear infinite;
animation: spinner 1s linear infinite;
}

@-webkit-keyframes spinner {
0% { -webkit-transform: rotate(0deg); }
100% { -webkit-transform: rotate(360deg); }
}

@keyframes spinner {
0% { transform: rotate(0deg); }
100% { transform: rotate(360deg); }
}
</style>
  
    <div class="loader ease-linear rounded-full border-2 border-t-2 border-red-400 h-6 w-6"></div>