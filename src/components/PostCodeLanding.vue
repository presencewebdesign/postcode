<template>
  <v-container class="lighten-5">
    <v-row>
      <v-col sm="6">
        <v-card class="pa-2" outlined tile>
          <v-card-title>
            <v-icon large color="blue darken-2">
              mdi-info
            </v-icon>

            Postcode Details</v-card-title
          >
          <v-list-item
            two-line
            v-for="(item, index) in postcodeDetails"
            :key="index"
          >
            <v-list-item-content>
              <v-list-item-title v-if="item.postcode"
                >Postcode: {{ item.postcode }}</v-list-item-title
              >
              <v-list-item-subtitle v-if="item.country">
                Country: {{ item.country }}
              </v-list-item-subtitle>

              <v-list-item-subtitle v-if="item.region">
                Region: {{ item.region }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
      <v-col sm="6">
        <v-card class="pa-2" outlined tile>
          <v-card-title>
            <v-icon large color="blue darken-2">
              mdi-map-marker
            </v-icon>
            Nearest Postcodes</v-card-title
          >

          <v-list-item
            three-line
            v-for="(item, index) in postcodeNearestDetails"
            :key="index"
          >
            <v-list-item-content style="cursor: pointer">
              <v-list-item-title v-if="item.postcode"
                >Postcode: {{ item.postcode }}</v-list-item-title
              >
              <v-list-item-subtitle v-if="item.country">
                Country: {{ item.country }}
              </v-list-item-subtitle>

              <v-list-item-subtitle v-if="item.region">
                Region: {{ item.region }}
              </v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PostCodeLanding",

  data: () => ({
    postcode: null,
    postcodeDetails: [],
    postcodeNearestDetails: [],
  }),

  created() {
    this.postcode = this.$route.params.postcode;
    this.getPostcodeDetails();
    this.getPostcodeNearestDetails();
  },

  methods: {
    getPostcodeDetails: function() {
      fetch(`https://api.postcodes.io/postcodes/${this.postcode}`)
        .then((res) => res.json())
        .then((res) => {
          this.postcodeDetails.push(res.result);
        })
        .catch((err) => {
          console.log(err);
        });
    },
    getPostcodeNearestDetails: function() {
      fetch(`https://api.postcodes.io/postcodes/${this.postcode}/nearest`)
        .then((res) => res.json())
        .then((res) => {
          this.postcodeNearestDetails = res.result;
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
};
</script>
