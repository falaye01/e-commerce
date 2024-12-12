const menuToggle = document.getElementById("menu-toggle")
const menuList = document.querySelector(".menu")
let isActive = false
function toggle(){
    if(menuList.style.visibility === "visible"){
        menuList.style.visibility = "hidden"
      
    } else{
        menuList.style.visibility = "visible"
    }
}
menuToggle.addEventListener("click", function(){
    if (isActive) {
        menuToggle.removeEventListener('click', toggle); 
        menuList.style.visibility = "hidden"; 
        isActive = false; 
    } else {
        menuToggle.addEventListener('click', toggle);
        menuList.style.visibility = "visible"; 
        isActive = true; 
    }
})

const yearDate = document.getElementById("yeardate")
    const currentDate = new Date().getFullYear()
   yearDate.textContent = currentDate

  