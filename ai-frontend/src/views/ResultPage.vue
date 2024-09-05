<template>
<div class="result-page">
    <div class="central-panel">
        <h1 class="result-page-header">Результат</h1>
        <img v-if="imageExists" :src="imageSrc" alt="Предпросмотр документа" class="document-preview">
        <div v-else>Изображение обрабатывается, пожалуйста, подождите...</div>
    </div>
    <div class="result-window">
    </div>
</div>
</template>
      
<script>
import axios from 'axios';

export default {
    name: 'ResultPage',
    data() {
        return {
        imageSrc: '',
        imageExists: false,
        };
    },
    async created() {
        const pageId = this.$route.params.id;
        this.imageSrc = `http://localhost:3000/results/${pageId}/page.1.jpeg`;

        while (!this.imageExists) {
            try {
                await axios.get(this.imageSrc);
                this.imageExists = true;
            } catch {
                await new Promise(resolve => setTimeout(resolve, 1000));
            }
        }
    },
}
</script>

<style scoped>
.result-page {
    display: flex;
    margin-left: 310px;
}

.central-panel {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 345px;
    height: 533px;
    margin-top: 170px;
    margin-left: 130px;
}

.result-page-header {
    font-size: 40px;
    font-weight: bold;
    color: #303030;
}

.document-preview {
    max-width: 366px;
    max-height: 524px;
    border: 1px solid black;
}

.result-window {
    margin-top: 115px;
    margin-left: 130px;
    width: 810px;
    height: 685px;
    position: relative;
    background: #F5F6FF;
    border-radius: 46px;
    cursor: pointer;
}

.result-window::before {
    content: "";
    position: absolute;
    top: -4px;
    left: -4px;
    right: -4px;
    bottom: -4px;
    background: linear-gradient(to right, #50CE86, #6DB7F1);
    border-radius: 50px;
    z-index: -1;
}
</style>
