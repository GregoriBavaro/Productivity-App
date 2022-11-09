// DOM Elements

let getStartedButton = document.querySelectorAll(".activate");
let logInButtonFromHome = document.querySelector(".sign-up");
let mainPage = document.querySelectorAll(".main-page");
let html = document.querySelector("html");
let isUserLoggedIn = false;

// Vars

// Func for creating HTML DOM Elements

let createElements = (initObj) => {
  var element = document.createElement(initObj.Tag);
  for (var prop in initObj) {
    if (prop === "childNodes") {
      initObj.childNodes.forEach(function (node) {
        node.appendChild(element);
      });
    } else if (prop === "attributes") {
      initObj.attributes.forEach(function (attr) {
        element.setAttribute(attr.key, attr.value);
      });
    } else element[prop] = initObj[prop];
  }
  return element;
};

let swiperSlides = [];
let headerDiv = [];
let messageDiv = [];
let imageDiv = [];

// let addNote = async () => {
//     let url = "http://localhost:" + port + "/api/notes";
//     var response = await fetch(url, {
//         method: 'POST',
//         headers: {
//             'Content-Type': 'text/plain'
//         },
//         body: addNoteInput.value
//     });
//     var data = await response.text();
//     console.log(data);
// }

getStartedButton.forEach((item) => {
  item.addEventListener("click", function () {
    if (logInButtonFromHome.innerText == "Log out") {
      logInButtonFromHome.innerText = "Log in";
      isUserLoggedIn = false;
      sessionStorage.removeItem("productivityToken");

    }
    for(i = 0; i < mainPage.length; i++) {
      mainPage[i].classList.toggle("hidden");
    }
    
    html.classList.toggle("htmlSet");
    document.querySelector(".canvas-hero").classList.remove("addPolygon");

    //left div

    let appLogIn = createElements({
      Tag: "div",
      classList: "appLogIn",
      childNodes: [html],
    });
    let leftDiv = createElements({
      Tag: "div",
      classList: "sliderShow",
      childNodes: [appLogIn],
    });
    let swiperForLogIn = createElements({
      Tag: "div",
      classList: "swiper-log-in",
      childNodes: [leftDiv],
    });
    let swiperWrapper = createElements({
      Tag: "div",
      classList: "swiper-wrapper log-in-wrapper",
      childNodes: [swiperForLogIn],
    });
    const swiperPagination = createElements({
      Tag: "div",
      classList: "swiper-pagination",
      childNodes: [leftDiv],
    });

    for (let i = 0; i < 4; i++) {
      swiperSlides.push(
        createElements({
          Tag: "div",
          classList: "swiper-slide slides-log-in",
          childNodes: [swiperWrapper],
        })
      );
    }

    for (let i = 0; i < swiperSlides.length; i++) {
      headerDiv.push(
        createElements({
          Tag: "div",
          classList: "logIn-header-div gap",
          childNodes: [swiperSlides[i]],
        })
      );
      messageDiv.push(
        createElements({
          Tag: "div",
          classList: "logIn-message-div gap",
          childNodes: [swiperSlides[i]],
        })
      );
      imageDiv.push(
        createElements({
          Tag: "div",
          classList: "logIn-image-div gap",
          childNodes: [swiperSlides[i]],
        })
      );
    }

    // main log in & sign up tab right div
    let rightDiv = createElements({
      Tag: "div",
      classList: "log-in-div",
      childNodes: [appLogIn],
    });

    let swiperRight = createElements({
      Tag: "div",
      classList: "right-swiper",
      childNodes: [rightDiv],
    });
    let swiperWrapperRight = createElements({
      Tag: "div",
      classList: "swiper-wrapper wrapper-right",
      childNodes: [swiperRight],
    });

    let swiperSlidesRightAtZero = createElements({
      Tag: "div",
      classList: "swiper-slide slides-other",
      childNodes: [swiperWrapperRight],
    });
    let swiperSlidesRightAtOne = createElements({
      Tag: "div",
      classList: "swiper-slide slides-other",
      childNodes: [swiperWrapperRight],
    });
    let swiperSlidesRightAtTwo = createElements({
      Tag: "div",
      classList: "swiper-slide slides-other",
      childNodes: [swiperWrapperRight],
    });
    

    let logInTab = createElements({
      Tag: "div",
      classList: "log-in-tab",
      childNodes: [swiperSlidesRightAtZero],
    });
    let logInMainTab = createElements({
      Tag: "div",
      classList: "log-in-main-tab",
      childNodes: [logInTab],
    });
    let logInMainTabHeader = createElements({
      Tag: "div",
      classList: "log-in-main-tab-header",
      childNodes: [logInMainTab],
    });
    let logInMainTabForm = createElements({
      Tag: "div",
      classList: "log-in-main-tab-form",
      childNodes: [logInMainTab],
    });

    logInMainTabHeader.innerHTML = `<h2>Sign in <a class="resetPass" href="#" data-slide="3"></a><h2/>`;
    logInMainTabForm.innerHTML = `
            <form id="login-form" class="login-form">
                <p>
                <input type="text" id="username" name="username" placeholder="Email" required><i class="validation"><span></span><span></span></i>
                </p>
                <p>
                <input type="password" id="password" name="password" placeholder="Password" required><i class="validation"><span></span><span></span></i>
                </p>
                <p><a class="forgotPass" href="#" data-slide="2">Forgot password?</a><p>
                <p>
                <button type="button" id="login" class="loginButton">Login</button>
                </p>
            </form>
            <div id="create-account-wrap">
                <p>Not a member? <a href="#" data-slide="1">Create Account</a><p>
            </div>`;

    // sign up tab

    let rightDivSingUp = createElements({
      Tag: "div",
      classList: "sign-up-div",
      childNodes: [swiperSlidesRightAtOne],
    });
    let singUpTab = createElements({
      Tag: "div",
      classList: "sign-up-tab",
      childNodes: [rightDivSingUp],
    });
    let signUpMainTab = createElements({
      Tag: "div",
      classList: "sign-up-main-tab",
      childNodes: [singUpTab],
    });
    let backToLogIn = createElements({
      Tag: "div",
      classList: "back-to-log",
      childNodes: [signUpMainTab],
    });
    let signUpMainTabHeader = createElements({
      Tag: "div",
      classList: "sign-up-main-tab-header",
      childNodes: [signUpMainTab],
    });
    let signUpMainTabForm = createElements({
      Tag: "div",
      classList: "sign-up-main-tab-form",
      childNodes: [signUpMainTab],
    });
    backToLogIn.innerHTML = `<a href="#" data-slide="0"><img src="./media/logIn-media/icons8-left-50.png"></a>`;
    signUpMainTabHeader.innerHTML = `<h2>Sign up<h2/>`;
    signUpMainTabForm.innerHTML = `
        <form id="signUp-form" class="signUp-form">
            <p>
            <input type="text" id="fullName" name="fullName" placeholder="Full name" required><i class="validation"><span></span><span></span></i>
            </p>
            <p>
            <input type="text" id="signup-username" name="signup-username" placeholder="Username" required><i class="validation"><span></span><span></span></i>
            </p>
            <p>
            <input type="email" id="signup-email" name="signup-email" placeholder="Email address" required><i class="validation"><span></span><span></span></i>
            <p/>
            <p>
            <input type="password" id="signup-password" name="signup-password" placeholder="Password" required><i class="validation"><span></span><span></span></i>
            </p>
            <p>
            <input type="password" id="confirm-password" name="confirm-password" placeholder="Confirm password" required><i class="validation"><span></span><span></span></i>
            </p>
             <p>
            <button type="button" class="registerButton" id="signup-login">Sign up</button>
            </p>
        </form>`;

    let signUpUsername = document.querySelector("#signup-username");
    let signUpPassword = document.querySelector("#signup-password");
    let singUpConfirmPassword = document.querySelector("#confirm-password");
    let fullName = document.querySelector("#fullName");
    let confirmPassword = document.querySelector("#confirm-password");
    let signUpEmail = document.querySelector("#signup-email");
    let signUpButton = document.querySelector("#signup-login");

    // forgot password tab

    let forgotPasswordTab = createElements({
      Tag: "div",
      classList: "forgot-password-tab",
      childNodes: [swiperSlidesRightAtTwo],
    });
    let forgotPasswordMainTab = createElements({
      Tag: "div",
      classList: "forgot-password-main-tab",
      childNodes: [forgotPasswordTab],
    });
    let forgotPasswordMainTabHeader = createElements({
      Tag: "div",
      classList: "forgot-password-main-tab-header",
      childNodes: [forgotPasswordMainTab],
    });
    let forgotPasswordMainTabForm = createElements({
      Tag: "div",
      classList: "forgot-password-main-tab-form",
      childNodes: [forgotPasswordMainTab],
    });
    let backToLogInFromForgotPassword = createElements({
      Tag: "div",
      classList: "back-to-log-from-forgot-password",
      childNodes: [forgotPasswordMainTab],
    });
    backToLogInFromForgotPassword.innerHTML = `<a href="#" data-slide="0"><img src="./media/logIn-media/icons8-left-50.png"></a>`;

    forgotPasswordMainTabHeader.innerHTML = `<h2>Forgot password<h2/>`;
    forgotPasswordMainTabForm.innerHTML = `
        <form id="forgot-password-form" class="forgot-password-form">
        <p>
        <input type="text" id="forgot-password-email" name="forgot-password-email" placeholder="Email Address" required><i class="validation"><span></span><span></span></i>
        <p/>
        <p>
        <button type="button" class="forgotPasswordButton" id="forgot-password-button">Send password</button>
        </p>
        <p>
        <h2>OR</h2>
        </p>
        <p><a href="#" data-slide="1">Create New Account</a><p>
        </form>`;

  
    // swiper-slide [0]

    headerDiv[0].innerHTML = `<h1>Manage your day</h1>`;
    messageDiv[0].innerHTML = `<p>From groceries to picking up the kids, we help you remember it all, anytime, anywhere.</p>`;
    imageDiv[0].innerHTML = `<img src="./media/logIn-media/4703428.jpg">`;

    // swiper-slide [1]

    headerDiv[1].innerHTML = `<h1>Get anything done</h1>`;
    messageDiv[1].innerHTML = `<p>Create your perfect daily routine that works for you.</p>`;
    imageDiv[1].innerHTML = `<img src="./media/logIn-media/4905798.jpg">`;

    // swiper-slide [2]

    headerDiv[2].innerHTML = `<h1>Never forget a thing</h1>`;
    messageDiv[2].innerHTML = `<p>Easily add reminders for daily, weekly or monthly commitments.</p>`;
    imageDiv[2].innerHTML = `<img src="./media/logIn-media/6334182.jpg">`;

    // swiper-slide [2]

    headerDiv[3].innerHTML = `<h1>Live Strategically</h1>`;
    messageDiv[3].innerHTML = `<p>Focus on the things that matter to you, unlock your true potential</p>`;
    imageDiv[3].innerHTML = `<img src="./media/logIn-media/5243332.jpg">`;

    const logInSwiper = new Swiper(".swiper-log-in", {
      // Optional parameters
      direction: "horizontal",
      loop: true,
      slidesPerView: 1,
      keyboardControl: true,
      grabCursor: false,
      centeredSlides: true,
      initialSlide: 0,
      spaceBetween: 0,
      allowTouchMove: true,
      speed: 300,
      loopedSlides: 300,
      pagination: {
        el: ".swiper-pagination",
        clickable: true,
      },
      autoplay: {
        delay: 7000,
      },
      effect: "coverflow",
      coverflowEffect: {
        rotate: 0,
        stretch: 800,
        depth: 1500,
        modifier: 1,
        slideShadows: false,
      },
    });

    const SignUpSwiper = new Swiper(".right-swiper", {
      // Optional parameters
      direction: "horizontal",
      loop: false,
      keyboardControl: false,
      grabCursor: false,
      centeredSlides: true,
      slidesPerView: "auto",
      initialSlide: 0,
      allowTouchMove: false,
      speed: 1000,
      effect: "flip",
    });

    // if(item.classList.contains("sign-up-button")) {
    //     SignUpSwiper.slideTo(1);

    // }
    document.onkeydown = function (evt) {
      evt = evt || window.event;
      if (evt.key == "Escape") {
        for(i = 0; i < mainPage.length; i++) {
          mainPage[i].classList.remove("hidden");
        }
        html.classList.remove("htmlSet");
        document.querySelector(".canvas-hero").classList.toggle("addPolygon");
        appLogIn.remove();
        swiperSlides = [];
        headerDiv = [];
        messageDiv = [];
        imageDiv = [];
      }
    };
    (function ($) {
      "use strict";
      // navigation
      $("a[data-slide]").click(function (e) {
        e.preventDefault();
        SignUpSwiper.slideTo($(this).data("slide"));
      });
    })(jQuery);

    // Signing up functionality, connection with backend established, gg!
    async function signUpFunction(e) {
      if (fullName.value == "") {
        fullName.value = "";
        fullName.placeholder = "Please enter your full name";
        return;
      }

      if (!isNaN(fullName.value)) {
        fullName.value = "";
        fullName.placeholder = "Only characters are allowed";
        return;
      }

      if (signUpUsername.value == "") {
        signUpUsername.value = "";
        signUpUsername.placeholder = "Please enter your username";
        return;
      }

      if (signUpPassword.value == "") {
        signUpPassword.value = "";
        signUpPassword.placeholder = "Fill the password please!";
        return;
      }

      if (singUpConfirmPassword.value == "") {
        singUpConfirmPassword.value = "";
        singUpConfirmPassword.placeholder = "Enter the password please!";
        return;
      }

      if (signUpPassword.value.length < 8) {
        signUpPassword.value = "";
        signUpPassword.placeholder = "Password must be atleast 8 characters";
        return;
      }

      if (signUpPassword.value.length > 15) {
        signUpPassword.value = "";
        signUpPassword.placeholder = "Password must not exceed 15 characters";
        return;
      }

      if (signUpPassword.value != singUpConfirmPassword.value) {
        signUpPassword.value = "";
        signUpPassword.placeholder = "Passwords do not match";
        singUpConfirmPassword.value = "";
        singUpConfirmPassword.placeholder = "Passwords do not match";
        return;
      } else {
        e.preventDefault();
        try {
          let port = 5019;
          let url = "http://localhost:" + port + "/api/users/register";
          var response = await fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              FullName: fullName.value,
              Username: signUpUsername.value,
              Password: signUpPassword.value,
              Email: signUpEmail.value,
              ConfirmPassword: confirmPassword.value,
            }),
          });
          console.log(response);
          const res = await response.json();

          console.log(res);
          if (response.status == 200) {
            signUpUsername.value = "";
            signUpPassword.value = "";
            signUpEmail.value = "";
            confirmPassword.value = "";
            fullName.value = "";
            swal({
              title: "Get ready to become more productive!",
              text: "You have successfully registered!",
              icon: "success",
              timer: 5000,
              button: null
            });
            SignUpSwiper.slideTo(0, 0 );


          } else {
            setErrorMessage(res.error);
          }
        } catch (er) {
          console.log(er);
        }
      }
    }

    signUpButton.addEventListener("click", signUpFunction);

    async function logInFunction(e) {
      e.preventDefault();
      try {
        let port = 5019;
        let url = "http://localhost:" + port + "/api/users/login";
        var response = await fetch(url, {
          method: "POST",
          headers: {
            Authorization:
              "Bearer" + sessionStorage.getItem("productivityToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: logInUsername.value,
            password: logInPassword.value,
          }),
        });
        console.log(response);
        const res = await response.json();

        sessionStorage.setItem("productivityToken", res.data);

        if (response.status == 400) {
          swal({
            title: "Incorrect credentials",
            text: "Wrong email or password",
            icon: "warning",
            timer: 5000,
            button: null
          });
        }

        if (response.status == 200) {
          logInUsername.value = "";
          logInPassword.value = "";

          for(i = 0; i < mainPage.length; i++) {
            mainPage[i].classList.remove("hidden");
          }
          html.classList.remove("htmlSet");
          appLogIn.remove();
          swiperSlides = [];
          headerDiv = [];
          messageDiv = [];
          imageDiv = [];
          logInButtonFromHome.innerText = "Log out";
          document.querySelector(".canvas-hero").classList.toggle("addPolygon");
          console.log(isUserLoggedIn);
          isUserLoggedIn = true;
          console.log(isUserLoggedIn);
        } else {
          setErrorMessage(res.error);
        }
      } catch (er) {
        console.log(er);
      }
    }
    let forgotPassBtn = document.querySelector("#forgot-password-button");
    let forgotPassInput = document.querySelector("#forgot-password-email");
    forgotPassBtn.addEventListener("click", () => {
      forgotPass();
      setTimeout(() => {
        getPasswordResetToken();
      }, 5000);
    });

    async function forgotPass() {
      let input = forgotPassInput.value;
      let port = 5019;
      let url =
        "http://localhost:" + port + `/api/users/forgotPassword?email=${input}`;
      var response = await fetch(url, { method: "POST" });
      //var res = await response.text();
      //console.log(res);
    }

    async function getPasswordResetToken() {
      try {
        let port = 5019;
        let input = forgotPassInput.value;
        let url = "http://localhost:" + port + `/api/users/getPasswordResetToken?email=${input}`;
        var response = await fetch(url, {
          method: "GET",
        });
        //console.log(response);
        const res = await response.json();
        //console.log(res);



        if (response.status == 200) {
          fireAlert();
          //console.log("from getPasswordResetToken if");
          sessionStorage.setItem("PasswordResetToken", res.data);
          localStorage.setItem("PasswordResetToken", res.data);
        } else {
          setErrorMessage(res.error);
        }
      } catch (er) {
        console.log(er);
      }
    }

   
    function fireAlert() {
      swal({
        title: "Success",
        text: "Email has been sent. Check your inbox or spam folder",
        icon: "success",
        timer: 5000,
        button: null
      });
    }
    //Country 1
    //   fetch(`https://restcountries.com/v3.1/name/${country}`)
    //     .then(response => {
    //       console.log(response);
    //       if (!response.ok) {
    //         throw new Error(`Country not found.${response.status}`);
    //       }
    //       return response.json();
    //     })
    // function getDocuments() {
    //   return new Promise((resolve, reject) => {
    //     $.ajax({
    //       url: "https://raw.githubusercontent.com/sedc-codecademy/skwd9-04-ajs/main/Samples/documents.json",
    //       success: (response) => {
    //         resolve(JSON.parse(response));
    //       },
    //       error: (err) => {
    //         reject(err);
    //       },
    //     });
    //   });
    // }
    //
    // function getPasswordResetToken() {
    //   console.log("before fetch");
    //   let input = forgotPassInput.value;
    //   $.ajax({
    //     dataType: "json",
    //     timeout: 1000,
    //     url: `http://localhost:5019/api/users/getPasswordResetToken?email=${input}`,
    //     data: $(this).serialize(),

    //     success: (data) => {
    //       console.log(data);
    //       sessionStorage.setItem("passwordResetToken", data.data);
    //     },
    //     error: (err) => {
    //       reject(err);
    //     },
    //   });
    // }

    let logInUsername = document.querySelector("#username");
    let logInPassword = document.querySelector("#password");
    let logInButton = document.querySelector("#login");

    logInButton.addEventListener("click", logInFunction);
    // logInButton.addEventListener("click", logInFunction)

    logInButton.addEventListener("click", function () {
      setTimeout(() => {
        getAllRemindersFromDb();
      }, 2000);
    });
  });
});
