// Get the modals
var signinModal = document.getElementById("signin-modal");
var signupModal = document.getElementById("signup-modal");

// Get the buttons that open the modals
var signinBtn = document.getElementById("signin-btn");
var signupBtn = document.getElementById("signup-btn");

// Get the <span> elements that close the modals
var signinSpan = signinModal.getElementsByClassName("close")[0];
var signupSpan = signupModal.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
signinBtn.onclick = function() {
    signinModal.style.display = "block";
}
signupBtn.onclick = function() {
    signupModal.style.display = "block";
}

// When the user clicks on <span> (x), close the modal
signinSpan.onclick = function() {
    signinModal.style.display = "none";
}
signupSpan.onclick = function() {
    signupModal.style.display = "none";
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
    if (event.target == signinModal) {
        signinModal.style.display = "none";
    } else if (event.target == signupModal) {
        signupModal.style.display = "none";
    }
}

// Handle form submissions
document.getElementById("signin-form").onsubmit = function(event) {
    event.preventDefault();
    // Clear previous errors
    document.getElementById("signin-email-error").innerText = "";
    document.getElementById("signin-password-error").innerText = "";
    document.getElementById("signin-general-error").innerText = "";

    // Handle sign in
    const email = document.getElementById("signin-email").value;
    const password = document.getElementById("signin-password").value;

    // Validate input
    if (!validateEmail(email)) {
        document.getElementById("signin-email-error").innerText = "Please enter a valid email address.";
        return;
    }
    if (password.length < 6) {
        document.getElementById("signin-password-error").innerText = "Password must be at least 6 characters long.";
        return;
    }

    // Send login request to server
    fetch('/signin', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert("Sign in successful!");
              signinModal.style.display = "none";
          } else {
              document.getElementById("signin-general-error").innerText = "Sign in failed. Please check your credentials.";
          }
      });
};

document.getElementById("signup-form").onsubmit = function(event) {
    event.preventDefault();
    // Clear previous errors
    document.getElementById("signup-email-error").innerText = "";
    document.getElementById("signup-password-error").innerText = "";
    document.getElementById("signup-general-error").innerText = "";

    // Handle sign up
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    // Validate input
    if (!validateEmail(email)) {
        document.getElementById("signup-email-error").innerText = "Please enter a valid email address.";
        return;
    }
    if (password.length < 6) {
        document.getElementById("signup-password-error").innerText = "Password must be at least 6 characters long.";
        return;
    }

    // Send signup request to server
    fetch('/signup', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    }).then(response => response.json())
      .then(data => {
          if (data.success) {
              alert("Sign up successful!");
              signupModal.style.display = "none";
          } else {
              document.getElementById("signup-general-error").innerText = "Sign up failed. Please try again.";
          }
      });
};

// Email validation function
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}
