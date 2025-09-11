import Vue from 'vue'
import Vuetify from 'vuetify/lib'
import 'vuetify/src/stylus/app.styl'
import VeeValidate from 'vee-validate' 

const VueValidationEs = require('vee-validate/dist/locale/es'); 
Vue.use(VeeValidate, {
    locale: 'es',
    dictionary: {
      es: VueValidationEs
    }
});  

Vue.use(Vuetify, {
  theme: {
    primary: '#691C32',
    secondary: '#9F2241',
    accent: '#D9D9D6',
    error: '#EF3340',
    info: '#00ACC1',
    success: '#78BE20',
    warning: '#FFC107'
  },
  customProperties: true,
  iconfont: 'md',
})

