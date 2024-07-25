<template>
<div class="content">
    <div class="card-group">
        <div class="card green">
            <div class="card-title">Создать форму</div>
            <img src="../assets/images/Create form tile.png" alt="Создать форму из PDF" class="card-icon">
        </div>
        <div class="card yellow">
            <div class="card-title">Экспорт в PDF</div>
            <img src="../assets/images/Export to PDF tile.png" alt="Экспорт в PDF" class="card-icon">
        </div>
        <div class="card purple">
            <div class="card-title">Мои формы</div>
            <img src="../assets/images/My forms tile.png" alt="Мои формы" class="card-icon">
        </div>
        <div class="card blue">
            <div class="card-title">Мои PDF</div>
            <img src="../assets/images/My PDF tile.png" alt="Мои PDF" class="card-icon">
        </div>
    </div>
    <div class="desc-card">
        <img src="../assets/images/Person.png" alt="Персонаж" class="person">
        <p class="description">
            Создайте свою онлайн форму из загруженного файла или сформируйте готовый документ из формы и заполненных данных
        </p>
    </div>
    <div class="features">
        <ul>
            <li>
                <h2>Познакомьтесь с ключевыми особенностями продукта</h2>
                <img src="../assets/images/AI.png" alt="AI" class="ai-image">
            </li>
            <li>
                <img src="../assets/images/Upload.png" alt="Загрузка" class="upload-image">
                Загрузка и обработка изображений форм и PDF-документов
            </li>
            <li>
                Извлечение вопросов из форм и представление их в формате JSON
                <img src="../assets/images/Find.png" alt="Извлечение" class="find-image">
            </li>
            <li>
                <img src="../assets/images/Dashboard.png" alt="Типы ответов" class="dashboard-image">
                Поддержка различных типов ответов, включая текст, галочку и radiobutton
            </li>
            <li>
                Просмотр и управление загруженными формами через веб-интерфейс
                <img src="../assets/images/Monitor.png" alt="Веб интерфейс" class="monitor-image">
            </li>
        </ul>
    </div>
    <div class="contacts">
        <h2>Обратная связь</h2>
        <p>Если у Вас есть вопросы или предложения, Вы можете связаться со мной, а также посмотреть исходный код</p>
        <div class="links">
            <img src="../assets/images/Telegram.png" alt="Telegram" class="social">
            <p>@iron66</p>
            <img src="../assets/images/Github.png" alt="Github" class="social">
            <p>iron-66</p>
        </div>
        <p>Проект основан на идее и разработках Тима Пола Исходный код и другие материалы можно найти на его GitHub</p>
    </div>
</div>
</template>

<script>
export default {
    name: 'HomePage'
}
</script>

<style scoped>
.content {
    margin-left: 310px;
    display: flex;
    flex-wrap: wrap;
}

.card {
    background-color: #fff;
    border: 1px solid #ddd;
    border-radius: 50px;
    padding: 20px;
    margin: 10px;
    width: 294px;
    height: 294px;
    text-align: center;
}

.green {
    background-color: #50CE86;
}

.yellow {
    background-color: #FDD265;
}

.purple {
    background-color: #B680C9;
}

.blue {
    background-color: #6DB7F1;
}

.card-icon {
    width: 240px;
}

.card-title {
    margin-top: 25px;
    font-weight: bold;
}

.description {
    margin: 20px 0;
    text-align: center;
}

.features {
    width: 100%;
}

.features h2 {
    text-align: center;
    margin-bottom: 20px;
}

.features ul {
    list-style: none;
    padding: 0;
}

.features li {
    margin-bottom: 10px;
    display: flex;
    align-items: center;
}
</style>

  