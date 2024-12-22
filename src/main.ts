import App from './App.vue'
import router from './routers';
import { createApp } from 'vue';
import { store, key } from './store'
import { BASE_URL } from './configurations/httpConfiguration';

const app = createApp(App)

app.config.globalProperties.$filters = {
    formatNumber(num, decimals = 3) {
        if (num < 10e3) {
            const decimalPart = num % 1 ? num.toFixed(4).toString().split('.')[1] : '';
            const integerPart = Math.floor(num).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            return decimalPart ? `${integerPart}.${decimalPart}` : integerPart;
        }

        const suffixes = [
            { suffix: " T", threshold: 1e12 },
            { suffix: " B", threshold: 1e9 },
            { suffix: " M", threshold: 1e6 },
            { suffix: " K", threshold: 1e3 },
            { suffix: "", threshold: 1 }
        ];

        const format = suffixes.find(suffix => Math.abs(num) >= suffix.threshold);
        return format ? (num / format.threshold).toFixed(decimals) + format.suffix : num;
    },

    serverLink(path: string) {
        return BASE_URL + path
    }
}

app.use(router)
app.use(store, key);

app.mount('#app')

