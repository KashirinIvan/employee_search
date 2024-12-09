var userList = [];

Vue.component('wrapper', {
    data() {
        return {
            isSearch: true,
            isJson: false,
            isInfo: true,
            index: '',
            avatar: "../assets/Rectangle.png",
            image: "../assets/Rectangle1.png",
            about: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.",
            cardList: [
                { id: '', name: '', username: '', email: '', phone: '', isVisible: false },
                { id: '', name: '', username: '', email: '', phone: '', isVisible: false },
                { id: '', name: '', username: '', email: '', phone: '', isVisible: false },
                { id: '', name: '', username: '', email: '', phone: '', isVisible: false },
                { id: '', name: '', username: '', email: '', phone: '', isVisible: false },
                { id: '', name: '', username: '', email: '', phone: '', isVisible: false },
                { id: '', name: '', username: '', email: '', phone: '', isVisible: false },
                { id: '', name: '', username: '', email: '', phone: '', isVisible: false },
                { id: '', name: '', username: '', email: '', phone: '', isVisible: false },
                { id: '', name: '', username: '', email: '', phone: '', isVisible: false }
            ]
        };
    },
    template: `
    <div class="wrapper">
        <h1 class="header-wrapper">Жилфонд</h1>
        <div class="main-window">
            <div class="sidebar">
                <form @submit="submit" onsubmit="return false">
                    <div class="form-search">
                        <label for="search" class="font-search-lable">Поиск сотрудника</label>
                        <input class="search" id="search" type="text" placeholder="Введите Id или имя">
                    </div>
                </form>
                <p class="title-resault">Результаты</p>
                <p v-if="isSearch" class="title-resault-info">Начните поиск</p>
                <p v-else-if="isJson" class="title-resault-info">Ничего не найдено</p>
                <div v-else class="scroll" id="scroll"> 
                    <div v-if="card.isVisible" class="card" v-on:click="select($event)" v-for="(card,index) in cardList" :id="index">
                        <div class="card-avatar">
                            <img :src="avatar" alt="Аватарка сотрудника"/>
                        </div>
                        <div id="card-info" class="card-info">
                            <p class="card-info-name">{{card.username}}</p>
                            <p class="card-info-email">{{card.email}}</p>
                        </div>
                    </div>
                </div>
            </div>
            <div class="info">
                <p v-if="isInfo" class="title-info">Выберите сотрудника, чтобы посмотреть его профиль</p>
                <div v-else class="info-card">
                    <div class="info-card-image">
                        <img :src="image" alt="Фото сотрудника"/>
                    </div>
                    <div class="info-card-description">
                        <p class="info-card-description-name">{{cardList[index].name}}</p>
                        <p class="info-card-description-email">email:<span class="whitespace">&nbsp</span><span class="email">{{cardList[index].email}}</span></p>
                        <p class="info-card-description-phone">phone:<span class="whitespace">&nbsp</span><span class="phone">{{cardList[index].phone}}</span></p>
                        <p class="info-card-description-about-title">О себе</p>
                        <p class="info-card-description-about">{{about}}</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
    `,
    methods: {
        async submit() {
            let inputSearch = document.getElementById('search').value;
            console.log(inputSearch)
            if (inputSearch !== '') {
                this.isSearch = false;
                let inputSearchList = inputSearch.replaceAll(' ', '').split(",")
                console.log(inputSearchList)
                let resault = '';
                let parameter = '';
                if (/^\d+$/.test(inputSearchList[0])) {
                    parameter = 'id='
                }
                else {
                    parameter = 'username='
                }
                inputSearchList.forEach(function (element, index) {
                    resault += parameter + element;
                    if (index < inputSearchList.length - 1) {
                        resault += '&'
                    }
                });
                console.log(resault)
                const response = await fetch('https://jsonplaceholder.typicode.com/users?' + resault)
                const json = await response.json();
                if (json.length === 0) {
                    this.isJson = true;
                    this.isInfo = true;
                    cardList.forEach(element => {
                        element.name = '';
                        element.username = '';
                        element.email = '';
                        element.phone = '';
                        element.isVisible = false;
                    });
                }
                else {
                    this.isJson = false;
                    this.isInfo = true;
                    for (let i = 0; i < json.length; i++) {
                        this.cardList[i].id = json[i].id;
                        this.cardList[i].name = json[i].name;
                        this.cardList[i].username = json[i].username;
                        this.cardList[i].email = json[i].email;
                        this.cardList[i].phone = json[i].phone;
                        this.cardList[i].isVisible = true;
                    }
                    for (let i = json.length; i <= this.cardList.length - 1; i++) {
                        this.cardList[i].isVisible = false;
                    }
                }
            }
            else {
                this.isSearch = true;
                this.isInfo = true;
                this.index = '';
            }
        },
        select: function (event) {
            this.isInfo = false;
            let target = event.currentTarget;
            this.index = target.id;
            let parent = document.querySelector('.scroll');
            let cardItem = parent.querySelectorAll('.card');
            for (let i = 0; i < cardItem.length; i++) {
                // Убираем у других
                cardItem[i].classList.remove('active');
            }
            // Добавляем тому на который нажали
            target.classList.add('active');

        }
    }
})
var app = new Vue({
    el: '#app',
    data: {}

})