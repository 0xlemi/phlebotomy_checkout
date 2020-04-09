<template>
<div class="flex">
  <!-- Left side of checkout -->
  <div class="w-full lg:w-3/5 border-r-2 bg-red-100 border-red-200">

    <!-- Error -->
    <div v-if="error.status" class="p-4">
      <div class="flex bg-red-200 border-2 border-red-500 text-red-800 px-4 py-3 rounded relative" role="alert">
        <div>
          <strong class="font-bold mr-2">Error with {{ error.type }}!</strong>
          <span class="block">{{ error.message }}</span>
        </div>
        <div>
          <span @click="clearError" class="absolute top-0 bottom-0 right-0 px-4 py-3">
            <svg class="fill-current h-6 w-6 text-red-500" role="button" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><title>Close</title><path d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"/></svg>
          </span>
        </div>
      </div>
    </div>
    <!-- End Error -->

    <progress-bar :step="currentForm" :number-steps="4" class="mx-8 my-6"></progress-bar>


    <div class="mx-8 mt-8">

      <form-english v-if="currentForm == 1" :values="values.form1" v-on:next="next"></form-english>

      <div class="hidden lg:block h-56" v-if="currentForm == 1">
      </div>

      <english-message class="lg:hidden p-8" color="red" v-if="!values.form1.english_test && currentForm == 1"></english-message>

      <form-basic v-if="currentForm == 2" :values="values.form2" v-on:next="next" v-on:back="back" ></form-basic>

      <form-address v-if="currentForm == 3":values="values.form3" v-on:next="next" v-on:back="back" ></form-address>

      <form-payment v-if="currentForm == 4" :values="values.form4" :loading="loading" v-on:next="submit" v-on:back="back" ></form-payment>

      <success-message v-if="currentForm == 5" :values="responseData" ></success-message>

    </div>

  </div>
  <!-- End left side of checkout -->

  <!-- Right side of checkout -->
  <div class="hidden lg:block w-2/5">

    <english-message class="p-8" v-if="!values.form1.english_test && currentForm == 1"></english-message>

    <price-table class="py-8" v-if="currentForm > 1 && currentForm < 5" :payFull="values.form4.payFull" :values="coursePrice"></price-table>

    <!-- Review Information Card -->
    <div v-if="currentForm > 2" :class="[ (currentForm == 5) ? ' pt-6' : 'py-4 pb-10']" class="px-5">
      <div  class=" w-full p-4 bg-gray-200 text-gray-600 border-gray-400 border rounded-lg ">
        <p class=" text-gray-700 text-lg leading-tight truncate">
          Review your Information
        </p>
        <hr class="mt-2 border-gray-400">
        <p class="mt-4 text-gray-700 text-md leading-tight truncate">
          {{ this.values.form2.name + " " + this.values.form2.last_name }}
        </p>
        <p class=" mt-2 text-md leading-tight truncate">
          {{ this.values.form2.email }}
        </p>
        <p class=" mt-2 text-md leading-tight truncate">
          <span class="mr-5">{{ this.number | numberFilter }}</span>
          <span class="mr-5">{{ this.dob | dobFilter }}</span>
          <span class="">{{ this.values.form2.ssn }}</span>
        </p>
        <!-- address info -->
        <div v-if="currentForm > 3">
          <p class=" mt-6 text-gray-700 text-md leading-tight truncate">
            {{ this.values.form3.address }}
          </p>
          <p class=" mt-2 text-md leading-tight truncate">
            <span class="mr-5">{{ this.values.form3.city }}</span>
            <span class="mr-5">{{ this.values.form3.state}}</span>
            <span class="">{{ this.values.form3.zip }}</span>
          </p>
        </div>
        <!-- payment info -->
        <div v-if="currentForm > 4">
          <p class="mt-5 -mb-2 text-sm">If this information is wrong call <span class="font-bold">888-531-8378</span></p>
        </div>
      </div>
    </div>
    <!-- End Review Information Card -->

    <success-message-side-bar :values="responseData"v-if="currentForm == 5" class="p-8"></success-message-side-bar>


  </div>
  <!-- End right side of checkout -->
</div>

</template>


<script>

import ProgressBar from './Elements/ProgressBar.vue'
import FormEnglish from './Forms/FormEnglish.vue'
import FormBasic from './Forms/FormBasic.vue'
import FormAddress from './Forms/FormAddress.vue'
import FormPayment from './Forms/FormPayment.vue'
import SuccessMessage from './Forms/SuccessMessage.vue'
import SuccessMessageSideBar from './SideBar/SuccessMessageSideBar.vue'

import EnglishMessage from './SideBar/EnglishMessage.vue'
import PriceTable from './SideBar/PriceTable.vue'

export default {
  components: {
    'progress-bar' : ProgressBar,
    'form-english' : FormEnglish,
    'form-basic' : FormBasic,
    'form-address' : FormAddress,
    'form-payment' : FormPayment,
    'success-message' : SuccessMessage,
    'success-message-side-bar' : SuccessMessageSideBar,
    'english-message' : EnglishMessage,
    'price-table' : PriceTable
  },
  methods: {
    next: function(event) {
      if(this.currentForm <= 4){
        this.currentForm++;
        this.$emit('changeForm', this.currentForm);
      }
    },
    back: function(event) {
      if(this.currentForm > 1){
        this.currentForm--;
        this.$emit('changeForm', this.currentForm);
      }
    },
    submit: function(event) {
      this.loading = true;
      axios.post('https://admin.phlebs.com/api/registration/process', {
        payment: {
          amount: this.values.form4.payFull ? this.totalPrice : 250,
          payment_type: "card",
          exam_payment: false, // Supose this comes form the server
          course_id: "4451", // Supose this comes from the server
          type: this.values.form4.payFull ? "full" : "deposit",
          website: "tmp.localhost"
        },
        student: {
          email: this.values.form2.email,
          name: this.values.form2.name,
          last_name: this.values.form2.last_name,
          phone1: this.number ? this.number[1] : '',
          phone2: this.number ? this.number[2] : '',
          phone3: this.number ? this.number[3] : '',
          address: this.values.form3.address,
          city: this.values.form3.city,
          state: this.values.form3.state,
          zip: this.values.form3.zip,
          ssn: this.values.form2.ssn,
          birthMonth: this.dob ? this.dob[1] : '',
          birthDay: this.dob ? this.dob[2] : '',
          birthYear: this.dob ? this.dob[3] : '',
          tos: true
        },
        credit_card: {
          name: this.values.form4.name,
          number: this.values.form4.number,
          expiration_month: this.exp ? this.exp[1] : '',
          expiration_year: this.exp ? this.exp[2] : '',
          code: this.values.form4.code,
          type: this.values.form4.type,
          same_billing: this.values.form4.same_billing,
          billing_address: this.values.form4.billing_address
        }
      })
      .then(response => {
        if(response.data.success == true){
          // Set information for the successMessage page
          let data = response.data.enrollment.course;
          this.responseData = {
            link: "http://students.phlebotomyusa.com/account/student/" + data.city.token,
            dateStart:data.modules.distribution[0],
            dateEnd: data.modules.distribution[data.modules.distribution.length - 1],
            timeStart: data.hours_start,
            timeEnd: data.hours_end,
            city: data.city.map_city
          };
          this.currentForm++;
        }
        else{
          // Showing error coming from the server
          this.error = {
            status: true,
            type: response.data.type,
            message: response.data.error
          };
          window.scroll(0,0);
        }
        this.loading = false;
      })
      .catch(error => {
        // Generice error telling to call and try again later
        this.error = {
          status: true,
          type: 'Server',
          message: 'You are not subscribed, please call 888-531-8378 or try again later.'
        };
        // go to the top of the screen so the user can see the error
        window.scroll(0,0);
        console.log(error);

        this.loading = false;
      });
    },
    clearError: function () {
      this.error = {
        status: false,
        type: '',
        message: ''
      };
    }
  },
  computed: {
    number: function(){
      if(this.values.form2.number.length == 10){
        return this.values.form2.number.match(/(\d{3})(\d{3})(\d{4})/);
      }
      return false;
    },
    dob: function(){
      if(this.values.form2.dob.length == 8){
        return this.values.form2.dob.match(/(\d{2})(\d{2})(\d{4})/);
      }
      return false;
    },
    exp: function() {
      if(this.values.form4.exp.length == 4){
        return this.values.form2.dob.match(/(\d{2})(\d{2})/);
      }
      return false;
    },
    totalPrice: function() {
      return Object.values(this.coursePrice).reduce((a, b) => a + b);
    }
  },
  filters: {
    numberFilter: function(value) {
      return value ? `(${value[1]}) ${value[2]}-${value[3]}` : '';
    },
    dobFilter: function(value) {
      return value ? `${value[1]}/${value[2]}/${value[3]}` : '';
    }
  },
  data: function() {
    return {
      currentForm: 4,
      loading: false,
      error: {
        status: false,
        type: '',
        message: ''
      },
      coursePrice:{ // This infoshould come from api request
        course: 1995,
        exam_fee: 120,
        insurance: 25
      },
      values: {
        form1:{
          english_test: true
        },
        form2:{
          name: 'Pepe',
          last_name: 'Gonzalez',
          email: 'pepe@example.com',
          number: '8792348709',
          dob: '03221993',
          ssn: '1234'
        },
        form3:{
          address: '12340 Santa Monica Boulevard',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90025'
        },
        form4:{
          payFull: false,
          name: 'Name Card',
          number: '2345234523452345',
          exp: '0622',
          code: '240',
          type: '',
          same_billing: "true", // Is easier to use a string for radio buttons
          billing_address: {
            address1: '',
            address2: '',
            city: '',
            state: '',
            zip: '',
          }
        },
      },
      responseData: {
        link: '',
        dateStart: '',
        dateEnd: '',
        timeStart: '',
        timeEnd: '',
        city: ''
      }
    }
  },
  mounted: function() {
    // add the google api key for the maps
    const script = document.createElement('script');
    script.async = true;
    script.defer = true;
    script.setAttribute('src', 'https://maps.googleapis.com/maps/api/js?key='+ process.env.VUE_APP_GOOGLE_MAPS_API_KEY +'&libraries=places');
    document.querySelector('head').appendChild(script);
  }

}
</script>

<style scoped>
</style>
