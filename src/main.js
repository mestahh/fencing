import Vue from "vue";
import App from "./App.vue";
import Vuex from "vuex";

Vue.use(Vuex);

const names = [
  "Nyomo Réka",
  "Para Zita",
  "Patta Nóra",
  "Pár Zoltán",
  "Pop Simon",
  "Remek Elek",
  "Beviz Elek",
  "Szalmon Ella",
  "Techno Kolos",
  "Trab Antal",
  "Ultra Viola",
  "Am Erika",
  "Bac Ilus",
  "Citad Ella",
  "Dil Emma",
  "Eszte Lenke",
  "Feles Elek",
  "Füty Imre",
  "Git Áron",
  "Har Mónika",
  "Heu Réka",
  "Hü Jenő",
  "Kukor Ica",
  "Kala Pál",
  "Zsíros B. Ödön",
  "Külö Nóra",
  "Körm Ödön",
  "Kér Ede",
  "Major Anna",
  "Meg Győző",
  "Vak Cina",
  "Veg Eta",
  "Virra Dóra",
  "Vég Béla",
  "Wincs Eszter",
  "Kasza Blanka",
  "Kandisz Nóra",
  "Kispál Inka",
  "Pofá Zoltán",
  "Budipa Piroska",
  "Tank Aranka",
  "Bekre Pál",
  "Cicz Imre",
  "Mortad Ella",
  "Trap Pista",
  "Fejet Lenke",
  "Csecs Emőke",
  "Fá Zoltán",
  "Minden Áron",
  "Csin Csilla",
  "Mor Zsolt",
  "Rabsz Olga",
  "Koaxk Ábel",
  "Patkóm Ágnes",
  "Locsolók Anna",
  "Riz Ottó",
  "Nemer Eszti",
  "Ne Pál",
  "Ka Pál",
  "Elektrom Ágnes",
  "Hú Zóra",
  "Raj Zóra",
  "Dia Dóra",
  "Tüdő R. Ákos",
  "Tök Ödön",
  "Ria Dóra",
  "Lev Elek",
  "Hot Elek",
  "Teásk Anna",
  "Bármi Áron",
  "Hugyo Zoltán",
  "Metall Ica",
  "Va Gina",
  "Csik Lóránt",
  "Masztur Balint",
  "Bor Virág",
  "Ví Zóra",
  "Gá Zóra",
  "Nyúl Kálmán",
  "Ipsz Ilonka",
  "Mikorka Kálmán",
  "Petting Elek",
  "Szikla Szilárd",
  "Ebéd Elek",
];

function randomName() {
  var randomNumber = Math.floor(Math.random() * (names.length - 1) + 1);
  return names[randomNumber];
}

const store = new Vuex.Store({
  state: {
    reportMatrix: [["Imre Géza", "n/a"]],
  },
  mutations: {
    addNew(state) {
      var numberOfFencers = state.reportMatrix.length;
      state.reportMatrix.forEach((f) => {
        f.push("");
      });
      var newFencer = [];
      newFencer.push(randomName());
      state.reportMatrix.forEach(() => {
        newFencer.push("");
      });
      newFencer.push("n/a");
      state.reportMatrix.push(newFencer);
    },
    delete(state, index) {
      if (state.reportMatrix.length == 1) {
        return;
      }
      state.reportMatrix.splice(index, 1);
      state.reportMatrix.forEach((f) => {
        f.splice(index + 1, 1);
      });
    },
  },
  actions: {
    addNew(context) {
      context.commit("addNew");
    },
    delete(context, payload) {
      context.commit("delete", payload);
    },
  },
});

Vue.config.productionTip = false;
Vue.directive("uppercase", {
  update: function(el) {
    el.value = el.value.toUpperCase();
  },
});

new Vue({
  store: store,
  render: (h) => h(App),
}).$mount("#app");
