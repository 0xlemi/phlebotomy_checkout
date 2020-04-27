export default {
  methods: {
    requestCourseData: function () {
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
    }
  }
}
