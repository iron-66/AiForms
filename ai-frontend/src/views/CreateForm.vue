<template>
<div class="create-form">
    <div class="central-panel">
        <h1 class="create-form-header">Создать форму</h1>
        <img src="../assets/images/Create logo.png" alt="Создать форму" class="create-form-logo">
        <button class="process-button">обработать</button>
    </div>
    <div class="upload-window">
        <p class="upload-description">Для выбора документа нажмите сюда<br>или перетащите файл</p>
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

.upload-window {
    margin-top: 115px;
    margin-left: 130px;
    width: 810px;
    height: 685px;
    position: relative;
    background: #F5F6FF;
    border-radius: 46px;
}

.upload-window::before {
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
