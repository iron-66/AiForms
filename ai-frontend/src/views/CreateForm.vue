<template>
<div class="create-form">
    <div class="central-panel">
        <h1 class="create-form-header">Создать форму</h1>
        <img src="../assets/images/Create logo.png" alt="Создать форму" class="create-form-logo">
        <button class="process-button">обработать</button>
    </div>
    <div class="upload-window">
        <p>Для выбора документа нажмите сюда<br>или перетащите файл</p>
        <p class="supported-formats">поддерживаемые форматы:<br>doc, docx, jpg, jpeg, pdf, png</p>
        <input type="file" class="file-input" />
    </div>
</div>
</template>
  
<script>
export default {
    name: 'CreateForm'
}
</script>
  
<style scoped>
.create-form {
    display: flex;
    margin-left: 310px;
    background-color: #F5F6FF;
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

.create-form-header {
    font-size: 40px;
    font-weight: bold;
    color: #303030;
}

.create-form-logo {

    width: 286px;
    height: 267px;
}

.process-button {
    margin-top: 80px;
    background-color: #50CE86;
    width: 270px;
    height: 70px;
    border: none;
    border-radius: 20px;
    font-family: Comfortaa;
    font-size: 30px;
    color: #fff;
    box-shadow: inset 12px 12px 20px rgba(255, 255, 255, 0.25);
    cursor: pointer;
    transition: background-color 0.3s;
}

.process-button:hover {
    background-color: #6DB7F1;
}

.form-body {
    background-color: #fff;
    padding: 40px;
    border-radius: 14px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
}

.form-body p {
    font-size: 18px;
    color: #333;
    margin-bottom: 10px;
}

.supported-formats {
    font-size: 14px;
    color: #777;
    margin-bottom: 20px;
}

.file-input {
    display: none;
}
</style>
