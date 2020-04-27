export default {
  methods: {
    requestExamDates: function (endDate) {
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
    }
  }
}
