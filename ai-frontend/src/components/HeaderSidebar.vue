<template>
<div class="header-sidebar">
    <img src="../assets/images/Logo beta.png" alt="AiForms beta" class="logo" @click="goHome">
    <ul class="navigation">
        <li>
            <img src="../assets/images/Create form icon.png" alt="Создать форму из PDF" class="icon">
            Создать форму из PDF
        </li>
        <li>
            <img src="../assets/images/Export to PDF icon.png" alt="Экспорт в PDF" class="icon">
            Экспорт в PDF
        </li>
        <li>
            <img src="../assets/images/My forms icon.png" alt="Мои формы" class="icon">
            Мои формы
        </li>
        <li>
            <img src="../assets/images/My PDF icon.png" alt="Мои PDF" class="icon">
            Мои PDF
        </li>
        <li>
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
import { useRouter } from 'vue-router';

export default {
  name: 'HeaderSidebar',
  setup() {
    const router = useRouter();

    const goHome = () => {
      router.push('/');
    };

    const navigateTo = (route) => {
      router.push(route);
    };

    return {
      goHome,
      navigateTo,
    };
  },
};
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
    transition: color 0.3s, font-weight 0.3s;
}

.navigation li:hover::before {
    content: "";
    position: absolute;
    left: -2px;
    top: -2px;
    right: -2px;
    bottom: -2px;
    background: linear-gradient(to right, #50CE86, #6DB7F1);
    border-radius: 16px;
    z-index: -1;
}

.navigation li:hover {
    font-weight: bold;
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
