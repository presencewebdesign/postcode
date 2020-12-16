<template>
  <v-container>
    <v-row class="text-center">
      <v-col>
        <h1 class="display-2 fotn-weight-bold mb-3">
          Welcome to the <br />
          Postcodes.io app
        </h1>
        <p class="subheading font-weight-regular">
          Enter your postcode to find your location
        </p>
        <v-card class="mx-auto" max-width="480" outlined>
          <v-combobox
            @change="updatePostcode"
            v-model="postcode"
            :items="postcodeItems"
            :search-input.sync="search"
            hide-selected
            small-chips
            clearable
            prepend-icon="mdi-map-marker"
          >
          </v-combobox>
          <div class="errormessage" v-if="isSubmitted && invalidPostcode == 1">
            Postcode must be valid
          </div>
        </v-card>

        <!-- <div class="mt-4 text-center" v-if="postcode">
          <v-btn @click="checkPostCode" rounded color="primary" dark>
            Check
          </v-btn>
        </div> -->
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  name: "PostCodeSearch",

  data: () => ({
    isSubmitted: false,
    invalidPostcode: 0,
    postcode: null,
    postcodeList: [],
    isLoading: false,
    search: null,
  }),

  computed: {
    postcodeItems() {
      return this.postcodeList
        ? this.postcodeList.map((data) => {
            return data;
          })
        : null;
    },
  },

  methods: {
    searchPostCode: function(val) {
      this.$router.push("/postcode/" + val);
    },

    updatePostcode: function() {
      this.checkPostCode(this.search);
    },

    checkPostCode: function() {
      this.isSubmitted = true;
      let postCodeTrimmed = this.postcode.replace(/ /g, "");

      fetch(`https://api.postcodes.io/postcodes/${postCodeTrimmed}/validate`)
        .then((res) => res.json())
        .then((res) => {
          this.invalidPostcode = res.result;
          if (this.invalidPostcode) {
            this.invalidPostcode = 0;
            this.searchPostCode(postCodeTrimmed);
          } else {
            this.invalidPostcode = 1;
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },

  watch: {
    search(val) {
      // Resets value to default
      this.postcodeList = [];

      if (val && val.length > 0) {
        this.isLoading = true;

        // Lazily load input items
        fetch(`https://api.postcodes.io/postcodes/${val}/autocomplete`)
          .then((res) => res.json())
          .then((res) => {
            this.postcodeList = res.result;
          })
          .catch((err) => {
            console.log(err);
          })
          .finally(() => (this.isLoading = false));
      }
    },
  },
};
</script>
