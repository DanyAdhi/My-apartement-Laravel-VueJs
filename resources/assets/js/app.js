import Vue from 'vue';
import { populateAmenitiesAndPrices } from './helpers';
let model = JSON.parse(window.vuebnb_listing_model);
model = populateAmenitiesAndPrices(model);

Vue.component ('image-carousel', {
    template : `<div class="image-carousel">
                    <img :src="image">
                    <div class="controls">
                        <carousel-control dir="left" @change-image="changeImage"></carousel-control>
                        <carousel-control dir="right" @change-image="changeImage"></carousel-control>
                    </div>
                </div> `,
    props: ['images'],
    data(){
        return {
            index:0
        }
    },
    computed:{
        image(){
            return  this.images[this.index]
        }
    },
    methods:{
        changeImage(val){
            let newVal = this.index + parseInt(val);
            if(newVal<0){
                this.index = this.images.length - 1;
            }else if(newVal === this.images.length){
                this.index = 0;
            }else{
                this.index = newVal;
            }
        }
    },
    components: {
        'carousel-control': {
            template: `<i :class="classes" @click="clicked"></i>`,
            props: ['dir'],
            computed:{
                classes(){
                    return 'carousel-control fa fa-2x fa-chevron-'+this.dir
                }
            },
            methods:{
                clicked(){
                    this.$emit('change-image', this.dir==='left' ? -1 : 1);
                }
            }
        }
    }
})


var app = new Vue({
    el: '#app',
    data : Object.assign(model, {
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
