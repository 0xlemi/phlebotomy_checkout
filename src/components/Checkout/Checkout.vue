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



    <!-- <div v-if="courseInfo.valid == 'loading'">
      <h2 class="p-10 mb-40 text-2xl text-red-900">
      We are Loading Your Checkout
      </h2>
    </div>
    <div v-else-if="courseInfo.valid == 'finished'"> -->
    <div v-if="courseInfo.valid">

      <progress-bar :step="currentForm" :number-steps="4" class="mx-8 my-6"></progress-bar>


      <div class="mx-8 mt-8">

        <form-english v-if="currentForm == 1 && courseInfo.state == 'CA'" :values="values.form1" v-on:next="next"></form-english>

        <form-transcripts v-if="currentForm == 1 && courseInfo.state == 'TN'" :values="values.form1" v-on:next="next"></form-transcripts>

        <div class="hidden lg:block h-56" v-if="currentForm == 1">
        </div>

        <form-basic v-if="currentForm == 2" :values="values.form2" :has-intro-question="this.hasIntroQuestion" v-on:next="next" v-on:back="back" ></form-basic>

        <form-address v-if="currentForm == 3":values="values.form3" v-on:next="next" v-on:back="back" ></form-address>

        <div v-if="courseInfo.state == 'TN'">
          <form-registration v-if="currentForm == 4" :values="values.form4" :loading="loading" v-on:next="submit" :courseList="examDates" :termsOfServiceLink="courseInfo.termsOfServiceLink" :state="courseInfo.state" v-on:back="back" ></form-registration>
        </div>
        <div v-else>
          <form-payment v-if="currentForm == 4" :values="values.form4" :loading="loading" v-on:next="submit" :termsOfServiceLink="courseInfo.termsOfServiceLink" :state="courseInfo.state" v-on:back="back" ></form-payment>
        </div>


        <success-message v-if="currentForm == 5" :values="responseData" ></success-message>

      </div>

    </div>
    <div v-else class="p-10 mb-32 text-2xl text-red-900">
      <h2 class="mb-6">
        We couldn't find that course.
      </h2>
      <h3 class="text-xl">
        Please try another one <a href="https://www.phlebotomyusa.com/phlebotomy-school-locations/" class="hover:text-blue-700 text-blue-500 underline font-bold">HERE</a>. Or call 888-531-8378</h3>
    </div>

  </div>
  <!-- End left side of checkout -->

  <!-- Right side of checkout -->
  <div class="hidden lg:block w-2/5">

    <english-message class="p-8" v-if="!values.form1.firstTest && (currentForm == 1 && courseInfo.state == 'CA')"></english-message>

    <transcript-message class="p-8" v-if="!values.form1.firstTest && (currentForm == 1 && courseInfo.state == 'TN')"></transcript-message>

    <div v-if="courseInfo.state == 'TN'" >
      <price-table-tn class="py-8" v-if="currentForm > 1 && currentForm < 5" :payFull="values.form4.payFull" :course-cost="courseInfo.courseCost" :exam-fee="courseInfo.examFeeCost" :insurance="courseInfo.insuranceCost" :deposit="courseInfo.depositAmount" :course-name="courseInfo.name"></price-table-tn>
    </div>

    <div v-else >
      <price-table class="py-8" v-if="currentForm > 1 && currentForm < 5" :payFull="values.form4.payFull" :course-cost="courseInfo.courseCost" :exam-fee="courseInfo.examFeeCost" :insurance="courseInfo.insuranceCost" :deposit="courseInfo.depositAmount" :course-name="courseInfo.name"></price-table>
    </div>

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
import FormTranscripts from './Forms/FormTranscripts.vue'
import FormBasic from './Forms/FormBasic.vue'
import FormAddress from './Forms/FormAddress.vue'
import FormPayment from './Forms/FormPayment.vue'
import FormRegistration from './Forms/FormRegistration.vue'
import SuccessMessage from './Forms/SuccessMessage.vue'
import SuccessMessageSideBar from './SideBar/SuccessMessageSideBar.vue'

import EnglishMessage from './SideBar/EnglishMessage.vue'
import TranscriptMessage from './SideBar/TranscriptMessage.vue'
import PriceTable from './SideBar/PriceTable.vue'
import PriceTableTN from './SideBar/PriceTableTN.vue'

export default {
  components: {
    'progress-bar' : ProgressBar,
    'form-english' : FormEnglish,
    'form-transcripts' : FormTranscripts,
    'form-basic' : FormBasic,
    'form-address' : FormAddress,
    'form-payment' : FormPayment,
    'form-registration' : FormRegistration,
    'success-message' : SuccessMessage,
    'success-message-side-bar' : SuccessMessageSideBar,
    'english-message' : EnglishMessage,
    'transcript-message' : TranscriptMessage,
    'price-table' : PriceTable,
    'price-table-tn' : PriceTableTN
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
      axios.post(process.env.VUE_APP_API_URL+'api/registration/process', {
        payment: {
          amount: this.values.form4.payFull ? this.totalPrice : this.courseInfo.depositAmount,
          payment_type: "card",
          exam_payment: false, // Supose this comes form the server
          course_id: this.courseInfo.id, // Supose this comes from the server
          type: this.values.form4.payFull ? "full" : "deposit",
          national_exam_id: (!this.values.form4.payFull && this.examDates) ? this.examDates[this.values.form4.nationalExamId].course_id : null,
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
          address2: this.values.form3.address2,
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
          expiration_year: this.exp ? '20'+this.exp[2] : '',
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
            link: "https://students.phlebotomyusa.com/account/student/" + data.city.token,
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
    getExamDates: function(endDate) {

      axios.get(process.env.VUE_APP_API_URL+'api/city/nashville/national_exams?start_date='+ endDate)
          .then((response) => {
            this.examDates = response.data.national_exams[0].course_dates;
          })
          .catch((error) => {
            this.courseInfo.valid = false;
            // Generice error telling to call and try again later
              this.error = {
                status: true,
                type: 'Exam List Not Found',
                message: 'There was an error, please call 888-531-8378 or try again another course.'
              };
              // go to the top of the screen so the user can see the error
              window.scroll(0,0);
              console.log(error);
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
      return this.courseInfo.courseCost + this.courseInfo.examFeeCost + this.courseInfo.insuranceCost;
    },
    hasIntroQuestion: function() {
      return (this.courseInfo.state == 'CA' || this.courseInfo.state == 'TN');
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
      courseInfo: {
        valid: "loading",
        id: null,
        name: null,
        state: null,
        termsOfServiceLink: null,
        courseCost: null,
        examFeeCost: null,
        insuranceCost: null,
        depositAmount: null,
      },
      currentForm: 1,
      loading: false,
      error: {
        status: false,
        type: '',
        message: ''
      },
      examDates: null,
      values: {
        form1:{
          firstTest: true
        },
        form2:{
          name: 'pepe',
          last_name: 'gonzalez',
          email: 'pepe@gmail.com',
          number: '2349879043',
          dob: '03221993',
          ssn: '1234'
        },
        form3:{
          address: '12340 Santa Monica Boulevard',
          address2: 'test second address',
          city: 'Los Angeles',
          state: 'CA',
          zip: '90025'
        },
        form4:{
          payFull: false,
          name: 'jon sanchez',
          number: '4111111111111111',
          exp: '0322',
          code: '123',
          type: '',
          same_billing: "true", // Is easier to use a string for radio buttons
          nationalExamId: null,
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
    // get the course id from the url
    this.courseInfo.id = this.$route.query.c;

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


    // Make the request to get course information
    if (this.courseInfo.id) {
      axios.get(process.env.VUE_APP_API_URL+'api/course/'+this.courseInfo.id)
      .then((response) => {
        if(response.data.success == true){
          // Set all the information to
          var data = response.data.course;
          this.courseInfo.valid = "finished";
          this.courseInfo.name = data.formatted_name;
          this.courseInfo.state = data.city.state.abbreviation;
          this.courseInfo.termsOfServiceLink = data.enrollment_agreement;
          this.courseInfo.courseCost = data.cost;
          this.courseInfo.examFeeCost = data.exam_cost;
          this.courseInfo.insuranceCost = data.insurance_cost;
          this.courseInfo.depositAmount = data.deposit;

          if (this.courseInfo.state == 'TN') {
            this.getExamDates(data.end_date);
          }

          this.currentForm = (this.courseInfo.state == 'CA' || this.courseInfo.state == 'TN') ? 1 : 2;
        }
        else{
          // The course does not exist
          this.courseInfo.valid = false;
        }
      })
      .catch((error) => {
        this.courseInfo.valid = false;
        // Generice error telling to call and try again later
          this.error = {
            status: true,
            type: 'Not Found',
            message: 'There was an error, please call 888-531-8378 or try again another course.'
          };
          // go to the top of the screen so the user can see the error
          window.scroll(0,0);
          console.log(error);
      });
    }else {
      this.courseInfo.valid = false;
    }
  }
}
</script>

<style scoped>
</style>
