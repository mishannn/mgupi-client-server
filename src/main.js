import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './theme/index.css';
import App from './App.vue';
import './registerServiceWorker';
import store from './store';
import { Icon } from 'leaflet';
import 'leaflet/dist/leaflet.css';
import './style.css';

// this part resolve an issue where the markers would not appear
delete Icon.Default.prototype._getIconUrl;

Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  store,
  render: h => h(App),
}).$mount('#app');
