<template>
  <div>
    <header-image :image-url="images[0]" @header-clicked="openModal">
    </header-image>

    <div class="container">
      <div class="heading">
        <h1> {{ title }} </h1>
        <p> {{ address }}</p>
      </div>
      
      <hr>
      <div class="about">
        <h3>About this listing</h3>
        <expandable-text>
          {{about}}
        </expandable-text>
      </div>

      <div class="lists">
        
        <feature-list title="Amenities" :items="amenities">
          <template slot-scope="amenity">
            <i class="fa fa-lg  " v-bind:class="amenity.icon"></i> 
            <span>{{amenity.title}}</span>
          </template>
        </feature-list>
        <feature-list title="price" :items="prices">
          <template slot-scope="price">
            {{price.title}}: <strong>{{price.value}}</strong>
          </template>
        </feature-list>

      </div>
    </div>

    <modal-window ref="imagemodal">
      <image-carousel :images="images"></image-carousel>
    </modal-window>

  </div>
</template>

<script>
  import { populateAmenitiesAndPrices } from '../js/helpers';
  import routeMixin from '../js/route-mixin';
  
  let serverData = JSON.parse(window.vuebnb_server_data);
  let model       = populateAmenitiesAndPrices(serverData.listing);
  import ImageCarousel from './listings/ImageCarousel.vue';
  import ModalWindow from './listings/ModalWindow.vue';
  import HeaderImage from './listings/HeaderImage.vue';
  import FeatureList from './listings/FeatureList.vue';
  import ExpandableText from './listings/ExpandableText.vue';

  export default {

    mixins: [ routeMixin ],
    data(){
      return {
        // title       : model.title,
        // address     : model.address,
        // about       : model.about,
        // amenities   : model.amenities,
        // prices      : model.prices,
        // contracted  : true,
        // modalOpen   : false

        title       : null,
        address     : null,
        about       : null,
        amenities   : [],
        prices      : [],
        images      : [],
        contracted  : true,
        modalOpen   : false
      };
    },
    components: {
      ImageCarousel,
      ModalWindow,
      HeaderImage,
      FeatureList,
      ExpandableText
    },
    methods:{
        assignData({ listing }) {
            Object.assign(this.$data, populateAmenitiesAndPrices(listing));
        },
        openModal(){
            this.$refs.imagemodal.modalOpen = true;
        }
    }
  }
</script>

<style>
  .about{
    margin-top: 2em;
  }

  .about h3{
    font-size: 22px;
  }
</style>