<template>
<div class="result-page">
    <div class="central-panel">
        <h1 class="result-page-header">Результат</h1>
        <img :src="imageSrc" alt="Предпросмотр документа" class="document-preview">
    </div>
    <div class="result-window">
    </div>
</div>
</template>
      
<script>
export default {
    name: 'ResultPage',
    data() {
        return {
        imageSrc: '',
        };
    },
    created() {
        const pageId = this.$route.params.id;
        this.imageSrc = require(`../../../public/results/${pageId}/page.1.jpeg`);
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
