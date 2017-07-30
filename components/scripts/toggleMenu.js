var $ = require('jquery');

$(document).ready(function () {

     "use strict";

     var toggleMenus = document.querySelectorAll("button.c-hamburger");
     for (var i = toggleMenus.length - 1; i >= 0; i--) {
         toggleHandler(toggleMenus[i]);
     }

     function toggleHandler(toggleMenu) {
         toggleMenu.addEventListener("click", function(e) {
             e.preventDefault();
             if(this.classList.contains("is-active") === true) {
                this.classList.remove("is-active")
                if(this.id === "hamBurgerMenu") {
                     toggleNavigationMenu(false);
                }
             } else {
                 this.classList.add("is-active")
                 if(this.id === "hamBurgerMenu") {
                     toggleNavigationMenu(true);
                 }
             }
         });
     }        

     function toggleNavigationMenu(activate) {
         var navigationMenuMobile = document.getElementById("navigationMenuMobile");
         if(navigationMenuMobile) {
             (activate) ? navigationMenuMobile.classList.add("navigationMenuMobileActivate") : navigationMenuMobile.classList.remove("navigationMenuMobileActivate");
         }
     }
});