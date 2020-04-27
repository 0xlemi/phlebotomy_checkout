export default {
  methods: {
    submitData: function () {
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
    }
  }
}
