<template>
	<div v-loading.fullscreen.lock="loading" :element-loading-text="loadingText" class="editor-wrap">
		<textarea :id="selector" v-model="value" class="editor-textarea"></textarea>
	</div>
</template>
<script src="./main.js"></script>
<style src="./style.css"></style>
