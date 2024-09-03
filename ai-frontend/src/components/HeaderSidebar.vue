<template>
<div class="header-sidebar">
    <img src="../assets/images/Logo beta.png" alt="AiForms beta" class="logo" @click="goToPage('/')">
    <ul class="navigation">
        <li @click="goToPage('/create-form')">
            <img src="../assets/images/Create form icon.png" alt="Создать форму из PDF" class="icon">
            Создать форму из PDF
        </li>
        <li>
            <img src="../assets/images/Export to PDF icon.png" alt="Экспорт в PDF" class="icon">
            Экспорт в PDF
        </li>
        <li @click="goToPage('/my-forms')">
            <img src="../assets/images/My forms icon.png" alt="Мои формы" class="icon">
            Мои формы
        </li>
        <li>
            <img src="../assets/images/My PDF icon.png" alt="Мои PDF" class="icon">
            Мои PDF
        </li>
        <li @click="goToContacts">
            <img src="../assets/images/Contacts icon.png" alt="Контакты" class="icon">
            Контакты
        </li>
        <li>
            <img src="../assets/images/For devs icon.png" alt="Для разработчиков" class="icon">
            Для разработчиков
        </li>
    </ul>
    <div class="sidebar-divider"></div>
</div>
</template>

<script>
export default {
    methods: {
        goToPage(route) {
            this.$router.push(route);
        },
        goToContacts() {
            this.$router.push('/').then(() => {
                this.scrollToBottom();
            });
        },
        scrollToBottom() {
            window.scrollTo({
                top: document.body.scrollHeight,
                behavior: 'smooth'
            });
        }
    }
}
</script>
  
<style scoped>
.header-sidebar {
    position: fixed;
    top: 0;
    left: 0;
    width: 310px;
    height: 100%;
    background-color: #F5F6FF;
}

.logo {
    width: 216px;
    height: 71px;
    margin: 55px auto 60px 46px;
    cursor: pointer;
}

.navigation {
    list-style: none;
    margin: 0;
    padding: 0;
    width: 100%;
}

.navigation li {
    display: flex;
    align-items: center;
    margin-bottom: 35px;
    margin-left: 10px;
    color: #5F5F5F;
    padding-left: 10px;
    cursor: pointer;
    height: 54px;
    width: 270px;
    position: relative;
    border-radius: 14px;
    background: #F5F6FF;
    transition: color 0.3s;
}

.navigation li::before {
    content: "";
    position: absolute;
    left: -2px;
    top: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(to right, #50CE86, #6DB7F1);
    border-radius: 16px;
    z-index: -1;
    opacity: 0;
    transition: opacity 0.3s, transform 0.2s;
    transform: scaleX(1.05) scaleY(1.2);
}

.navigation li:hover::before {
    opacity: 1;
    transform: scale(1);
}

.navigation li:hover {
    color: #000000;
}

.icon {
    width: 30px;
    height: 30px;
    margin-right: 20px;
}

.sidebar-divider {
    position: absolute;
    top: 55px;
    right: 0;
    width: 2px;
    height: 810px;
    background-color: #5f5f5f88;
    border-radius: 1px 1px 1px 1px;
}
</style>
