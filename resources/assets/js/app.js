import Vue from 'vue';
import { populateAmenitiesAndPrices } from './helpers';
let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);

var app = new Vue({
    el: '#app',
    data : Object.assign(model, {
        // title       : 'My Appartement',
        // address     : 'Ruko Boulevard Tekno, Jl. Tekno Widya, Setu, Kec. Setu, Kota Tangerang Selatan, Banten 15314',
        // about       : 'This is a description of my apartement'
        title       : model.title,
        address     : model.address,
        about       : model.about,
        headerImageStyle : {
            'background-image' : `url(${model.images[0]})`
        },
        amenities   : model.amenities,
        prices      : model.prices,
        contracted  : true,
        modalOpen   : false,
    }), 
    watch: {
        modalOpen : function(){
            const className = 'modal-open';
            if(this.modalOpen){
                document.body.classList.add(className)
            }else{
                document.body.classList.remove(className)
            }

        }
    },

    methods: {
        escapeKeyListener(e) {
        if (e.keyCode === 27 && this.modalOpen) {
                this.modalOpen = false;
            }
        }
    },
    // defined escapeKeyListener
    created: function() {
        document.addEventListener('keyup', this.escapeKeyListener);
    },
    destroyed: function(){
        document.removeEventListener('keyup', this.escapeKeyListener);
    }
    
});
