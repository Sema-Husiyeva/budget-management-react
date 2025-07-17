const app = Vue.createApp({
    data() {
        return {
            courseGoalA: 'Finish the course and learn Vue!',
            courseGoalB: 'Master Vue and build an amazing apps!',
            vueLink: 'https://vuejs.org/',
            counter: 0,
            name: '',
            confirmedName: ''
        };
    },
    computed: {
        fullname() {
            if(this.name === '') {
                return '';
            }
            return this.name + ' ' + 'Husiyeva';
        }
    },
    methods: {
        outputGoal() {
            const randomNumber = Math.random();
            if (randomNumber < 0.5) {
                return this.courseGoalA;
            } else {
                return this.courseGoalB;
            }
        },
        add(num) {
            this.counter = this.counter + num;
        },
        reduce() {
            this.counter--;
        },
        setName(event) {
            this.name = event.target.value;
        },
        confirmInput() {
            this.confirmedName = this.name;
        },
        submitForm() {
            alert('Submitted');
        },
        resetInput() {
            this.name = '';
        }
    }
});

app.mount('#user-goal');