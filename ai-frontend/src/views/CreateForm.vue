<template>
<div class="create-form">

    <div class="form-content">
    <div class="form-header">
        <h1>Создать форму</h1>
        <img src="../assets/images/Create logo.png" alt="Создать форму">
    </div>
    <div class="form-body">
        <p>Для выбора документа нажмите сюда или перетащите файл</p>
        <p class="supported-formats">поддерживаемые форматы: doc, docx, jpg, jpeg, pdf, png</p>
        <input type="file" class="file-input" />
        <button class="process-button">обработать</button>
    </div>
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
}

.form-content {
    margin-left: 310px;
    padding: 40px;
    background-color: #F5F6FF;
    border-radius: 14px;
    width: 100%;
}

.form-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
}

.form-header h1 {
    font-size: 36px;
    font-weight: bold;
    color: #333;
    margin-right: 20px;
}

.form-header img {
    width: 60px;
    height: 60px;
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

.process-button {
    background-color: #50CE86;
    color: #fff;
    border: none;
    padding: 10px 20px;
    font-size: 18px;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;
}
  
.process-button:hover {
    background-color: #45b374;
}
</style>
