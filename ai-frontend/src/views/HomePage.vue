<template>
<div class="home-page">
    <div class="main-content">
        <div class="card-group">
            <div class="card green" @click="goToPage('/create-form')">
                <div class="card-title">Создать форму</div>
                <img src="../assets/images/Create form tile.png" alt="Создать форму из PDF" class="card-icon">
            </div>
            <div class="card yellow">
                <div class="card-title">Экспорт<br>в PDF</div>
                <img src="../assets/images/Export to PDF tile.png" alt="Экспорт в PDF" class="card-icon">
            </div>
            <div class="card purple" @click="goToPage('/my-forms')">
                <div class="card-title">Мои формы</div>
                <img src="../assets/images/My forms tile.png" alt="Мои формы" class="card-icon">
            </div>
            <div class="card blue">
                <div class="card-title">Мои PDF</div>
                <img src="../assets/images/My PDF tile.png" alt="Мои PDF" class="card-icon">
            </div>
        </div>
        <div class="desc-card">
            <p class="description">
                Создайте свою онлайн форму из загруженного файла или сформируйте готовый документ<br>из формы и<br>заполненных<br>данных
            </p>
            <img src="../assets/images/Person.png" alt="Персонаж" class="person">
        </div>
    </div>
    <ul class="features">
        <li class="str-1">
            <h2>Познакомьтесь с ключевыми<br>особенностями продукта</h2>
            <img src="../assets/images/AI.png" alt="AI" class="ai-image">
        </li>
        <li class="str-2">
            <img src="../assets/images/Upload.png" alt="Загрузка" class="upload-image">
            <p>Загрузка и обработка изображений<br>форм и PDF-документов</p>
        </li>
        <li class="str-3">
            <p>Извлечение вопросов из форм<br>и представление их в формате JSON</p>
            <img src="../assets/images/Find.png" alt="Извлечение" class="find-image">
        </li>
        <li class="str-4">
            <img src="../assets/images/Dashboard.png" alt="Типы ответов" class="dashboard-image">
            <p>Поддержка различных типов ответов,<br>включая текст, галочку и radiobutton</p>
        </li>
        <li class="str-5">
            <p>Просмотр и управление загруженными<br>формами через веб-интерфейс</p>
            <img src="../assets/images/Monitor.png" alt="Веб интерфейс" class="monitor-image">
        </li>
    </ul>
    <div class="contacts">
        <h2>Обратная связь</h2>
        <p>Если у Вас есть вопросы или предложения, Вы можете<br>связаться со мной, а также посмотреть исходный код</p>
        <div class="links">
            <div class="link-element">
                <a href="https://t.me/iron66"><img src="../assets/images/Telegram.png" alt="Telegram" class="social-icon"></a>
                <p><a href="https://t.me/iron66" class="social-link">@iron66</a></p>
            </div>
            <div class="link-element">
                <a href="https://github.com/iron-66/AiForms"><img src="../assets/images/Github.png" alt="Github" class="social-icon"></a>
                <p><a href="https://github.com/iron-66/AiForms" class="social-link">iron-66</a></p>
            </div>
        </div>
        <p>Проект основан на идее и разработках Тима Пола<br>Исходный код и другие материалы можно найти на его <a href="https://github.com" class="git-link">GitHub</a></p>
    </div>
</div>
</template>

<script>
export default {
    name: 'HomePage',
    methods: {
        goToPage(route) {
            this.$router.push(route);
        },
        addCardHoverEffect() {
            const cards = document.querySelectorAll('.card');

            cards.forEach(card => {
                card.addEventListener('mousemove', (e) => {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;

                    const centerX = rect.width / 2;
                    const centerY = rect.height / 2;

                    const rotateX = -(y - centerY) / 10;
                    const rotateY = (x - centerX) / 10;

                    card.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
                });

                card.addEventListener('mouseleave', () => {
                    card.style.transform = 'rotateX(0) rotateY(0)';
                });
            });
        },
    },
    mounted() {
        document.title = 'AiForms | AI генератор форм';
        this.addCardHoverEffect();
    }
}
</script>

<style scoped>
.home-page {
    margin-left: 16.15vw;
    padding-left: 7.29vw;
    padding-top: 12.07vh;
}

.main-content {
    display: flex;
}

.card-group {
    display: flex;
    flex-wrap: wrap;
    gap: 1.56vw;
    max-width: 620px;
    justify-content: center;
    perspective: 1000px;
}

.card {
    background-color: #fff;
    border-radius: 2.6vw;
    width: 15.36vw;
    height: 15.36vw;
    text-align: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    box-shadow: inset 12px 12px 20px rgba(255, 255, 255, 0.25);
    position: relative;
    cursor: pointer;
    transition: transform 0.3s ease-out;
    transform-style: preserve-3d;
}

.card:hover {
    transform: rotateY(10deg) rotateX(10deg);
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

.card-title {
    margin-top: 2.74vh;
    font-weight: bold;
    font-size: min(1.56vw, 30px);
    color: #303030;
    width: 10.41vw;
}

.card-icon {
    width: 240px;
    height: auto;
    margin-top: 6.04vh;
    position: absolute;
}

.desc-card {
    width: 620px;
    margin-left: 50px;
    display: flex;
    flex-direction: column;
    background-color: #C4E2D0;
    border-radius: 50px;
    position: relative;
}

.description {
    margin-top: 35px;
    margin-left: 35px;
    font-weight: bold;
    font-size: 40px;
    color: #303030;
}

.person {
    width: 410px;
    height: auto;
    margin-top: 210px;
    margin-left: 230px;
    position: absolute;
}

.features {
    margin-top: 100px;
    position: relative;
    background: #F5F6FF;
    border-radius: 46px;
    padding: 1px;
    padding-bottom: 50px;
    max-width: 1300px;
}

.features::before {
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

.features li {
    display: flex;
    align-items: center;
    max-width: 1310px;
    max-height: 280px;
    margin-top: 50px;
    margin-bottom: 50px;
}

.features h2 {
    text-align: center;
    color: #303030;
    font-weight: bold;
    font-size: 40px;
    -webkit-text-stroke: 2px #303030;
}

.features p {
    font-size: 30px;
    color: #303030;
}

.str-1 {
    gap: 108px;
    margin-left: 120px;
}

.ai-image {
    width: 265px;
    height: auto;
}

.str-2 {
    gap: 108px;
    margin-left: 152px;
    text-align: right;
}

.str-3 {
    gap: 75px;
    margin-left: 90px;
}

.str-4 {
    gap: 70px;
    margin-left: 177px;
    text-align: right;
}

.str-5 {
    gap: 50px;
    margin-left: 90px;
}

.upload-image {
    width: 334px;
}

.contacts {
    margin-top: 100px;
    text-align: center;
    max-width: 1300px;
}

.contacts h2 {
    color: #303030;
    font-weight: bold;
    font-size: 40px;
    -webkit-text-stroke: 2px #303030;
}

.contacts p {
    color: #303030;
    font-weight: bold;
    font-size: 30px;
}

.links {
    margin-top: 50px;
    display: flex;
    justify-content: center;
    gap: 150px;
}

.link-element {
    display: flex; 
}

.social-icon {
    width: 50px;
    height: 50px;
}

.links p {
    font-weight: bold;
    font-size: 30px;
    margin: auto auto auto 20px;
}

.social-link {
    position: relative;
    outline: none;
    text-decoration: none;
    color: #303030;
    cursor: pointer;
}

.social-link:after {
    content: "";
    position: absolute;
	display: block;
	left: 0;
	width: 0;
	height: 2px;
    border-radius: 1px;
	background-color: #303030;
    bottom: -5px;
	transition: width 0.3s ease-out;
}

.git-link {
    position: relative;
    color: #3092DE;
    outline: none;
    text-decoration: none;
    cursor: pointer;
}

.git-link:after {
    content: "";
    position: absolute;
	display: block;
	left: 0;
	width: 0;
	height: 2px;
    border-radius: 1px;
	background-color: #3092DE;
	transition: width 0.3s ease-out;
}

.link-element:hover .social-link:after,
.social-link:hover:after,
.social-link:focus:after,
.git-link:hover:after,
.git-link:focus:after {
	width: 100%;
}
</style>