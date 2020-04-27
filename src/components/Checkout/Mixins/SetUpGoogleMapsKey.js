export default {
  methods: {
    setUpGoogleMapsKey: function() {
      // Add the google api key for the maps
      // check that the script is not already up
      // if (document.getElementById("google-maps-key-script")) {
        // Add Script to head
        const script = document.createElement('script');
        script.setAttribute("id", "google-maps-key-script");
        script.async = true;
        script.defer = true;
        script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key='+ process.env.VUE_APP_GOOGLE_MAPS_API_KEY +'&libraries=places');
        document.querySelector('head').appendChild(script);
      // }
      // End Add the google api key for the maps
    }
  }
}
