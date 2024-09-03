<template>
<div class="my-forms">
    <div class="central-panel">
        <h1 class="my-forms-header">Мои формы</h1>
        <img src="../assets/images/My forms logo.png" alt="Создать форму" class="my-forms-logo">
    </div>
    <div class="archive-panel">
    </div>
</div>
</template>
  
<script>
export default {
    name: 'CreateForm'
}
</script>

<style scoped>
.my-forms {
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

.my-forms-header {
    font-size: 40px;
    font-weight: bold;
    color: #303030;
}

.my-forms-logo {
    margin-top: 80px;
    width: 286px;
    height: 267px;
}

.archive-panel {
    margin-top: 115px;
    margin-left: 130px;
    width: 790px;
    height: 685px;
    position: relative;
    background: #F5F6FF;
    border-radius: 46px;
}

.archive-card {
    width: 230px;
    height: 300px;
}

.archive-card::before {
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

.upload-description {
    width: 650px;
    font-size: 30px;
    font-weight: bold;
    color: #303030;
    text-align: center;
    margin: auto;
    margin-top: 270px;
}

.supported-formats {
    width: 355px;
    font-size: 20px;
    color: #777;
    font-weight: bold;
    text-align: center;
    margin: auto;
    margin-top: 20px;
}

.file-input {
    display: none;
}
</style>
