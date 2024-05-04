const loginText = document.querySelector(".title-text .login");
const loginForm = document.querySelector("form.login");
const loginBtn = document.querySelector("label.login");
const signupBtn = document.querySelector("label.signup");
const signupLink = document.querySelector("form .signup-link a");
const wrapper = document.querySelector(".wrapper");


let screenWidth2 = window.innerWidth;
console.log(screenWidth2)


const animateHeight = async (start, end, duration) => {
  setTimeout(() => {
    const increment = (end - start) / duration;
    let currentHeight = start;

    const intervalId = setInterval(() => {
      if ((increment > 0 && currentHeight >= end) || (increment < 0 && currentHeight <= end)) {
        clearInterval(intervalId);
      } else {
        currentHeight += increment;
        wrapper.style.height = `${currentHeight}%`;
      }
    }, 10);
  }, 150);
};


// TELEFONLAR İÇİN
if (screenWidth2 >= 0 && screenWidth2 <= 767) {
  signupBtn.onclick = () => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
    animateHeight(60, 64, 40);
  };

  loginBtn.onclick = () => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
    animateHeight(64, 60, 40);
  }
}


// BİLGİSAYARLAR İÇİN
else {
  signupBtn.onclick = () => {
    loginForm.style.marginLeft = "-50%";
    loginText.style.marginLeft = "-50%";
    animateHeight(56, 60, 20);
  };

  loginBtn.onclick = () => {
    loginForm.style.marginLeft = "0%";
    loginText.style.marginLeft = "0%";
    animateHeight(60, 56, 20);
  }
}

// 62 84





const alternativeLoginBtn = () => {
  loginForm.style.marginLeft = "0%";
  loginText.style.marginLeft = "0%";
  animateHeight(76, 58, 20);
}

signupLink.onclick = (() => {
  signupBtn.click();
  return false;
});





// OPSİYONEL

document.getElementById('signupForm').addEventListener('submit', function (event) {
  var password = document.getElementById('password').value;
  var confirmPassword = document.getElementById('confirmPassword').value;
  var passwordMismatch = document.getElementById('passwordMismatch');

  if (password !== confirmPassword) {
    passwordMismatch.style.display = 'block';
    event.preventDefault(); // Formun submit işlemini engelle
  } else {
    passwordMismatch.style.display = 'none';
  }
});

//OPSİYONEL