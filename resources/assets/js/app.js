import Vue from 'vue';
import sample from './data';
// import "core-js/fn/object/assign";

var app = new Vue({
    el: '#app',
    data : Object.assign(sample, {
        // title       : 'My Appartement',
        // address     : 'Ruko Boulevard Tekno, Jl. Tekno Widya, Setu, Kec. Setu, Kota Tangerang Selatan, Banten 15314',
        // about       : 'This is a description of my apartement'
        title       : sample.title,
        address     : sample.address,
        about       : sample.about,
        headerImageStyle : {
            'background-image' : 'url(/images/header.jpg)'
        },
        amenities   : sample.amenities,
        prices      : sample.prices,
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


console.log('testing watch');