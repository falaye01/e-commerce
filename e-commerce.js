let currentIndex = 0
const slides = document.querySelectorAll(".slide")
const dots = document.querySelectorAll(".dot")
const totalSlides = slides.length

function showSlide(index){
 if(index < 0){
currentIndex = totalSlides - 1
 } else if(index >= totalSlides){
 currentIndex = 0
 } else{
    currentIndex = index
 }

 slides.forEach((slide, i)=>{
 const iscurrent = i === currentIndex
 const scaleFactor = iscurrent? 1 : 0.8
 const transformValue = iscurrent? "scale(1)": "scale(0.8)"
 const widthValue = iscurrent? "100%" : "80%"

 slide.style.transform = transformValue
 slide.style.width = widthValue
 dots[i].classList.toggle("active-dot", iscurrent)
 })
 const transformValue = -currentIndex * 100 + "%"
 document.querySelector(".slider").style.transform = "translateX(" + transformValue + ")"
}
function nextSlide(){
    showSlide(currentIndex + 1)
}
function prevSlide(){
    showSlide(currentIndex - 1)
}
function currentSlide(index){
    showSlide(index)

}
setInterval(nextSlide, 5000);



const menuToggle = document.getElementById("menu-toggle");
const menuList = document.getElementById("menu");

let isActive = false;


function toggleMenu() {
    if (menuList.style.display === "block") {
        menuList.style.display = "none";
    } else {
        menuList.style.display = "block";
    }
}


menuToggle.addEventListener('click', function() {
    if (isActive) {
        menuToggle.removeEventListener('click', toggleMenu); 
        menuList.style.display = "none"; 
        isActive = false; 
    } else {
        menuToggle.addEventListener('click', toggleMenu);
        menuList.style.display = "block"; 
        isActive = true; 
    }
});


//api to get all state and city
const state = document.getElementById("state")
const city = document.getElementById("city")
async function getStateAndCity() {
    const url = 'https://nigeria-states-and-lga.p.rapidapi.com/lgalists';
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': 'a0fa4f302bmsha7128bf2498d6c0p1702cdjsndb6d27cbf3d6',
            'x-rapidapi-host': 'nigeria-states-and-lga.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(url, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const result = await response.json();  
        console.log(result); 
        
    } catch (error) {
        console.error('Error fetching data:', error.message);
    }
}

getStateAndCity();  


const fullName = document.getElementById("fullname").value.trim();
const birthDay = document.getElementById("birthday").value.trim();
const password = document.getElementById("password").value.trim();
const confirmPassword = document.getElementById("comfirm-password").value.trim();
console.log(confirmPassword)
const userName = document.getElementById("username").value.trim();
const userEmail = document.getElementById("email").value.trim();
const signUpForm = document.getElementById("sign-up");  

const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-z]{2,}$/;
const passwordPattern = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

signUpForm.addEventListener("submit", async (e) => {
  e.preventDefault(); 

  // Validation logic
  if (userName.length < 5 || userName.length > 15) {
    alert("Username must be between 5 and 15 characters.");
    return; // Stop further execution
  }

  if (password !== confirmPassword) {
    alert("Passwords do not match!");
    return;
  }

  if (!emailPattern.test(userEmail)) {
    alert("Invalid email address.");
    return;
  }

  if (!passwordPattern.test(password)) {
    alert(
      "Password must be at least 8 characters long, with uppercase, lowercase, and a number."
    );
    return;
  }

  if (
    !fullName ||
    !birthDay ||
    !userName ||
    !userEmail ||
    !password ||
    !confirmPassword
  ) {
    alert("Please fill in all the fields.");
    return;
  }

  try {
    const url = "https://your-backend-api.com/register"; 
    const response = await fetch(url, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        fullName,
        birthDay,
        password,
        userName,
        userEmail,
      }),
    });

    const data = await response.json();
    if (response.ok) {
      alert("Registration successful!");
      // Redirect to another page or clear form
      signUpForm.reset();
    } else {
      alert("Registration failed! Please try again.");
    }
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong! Please try again later.");
  }
});




