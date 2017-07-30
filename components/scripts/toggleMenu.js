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
             (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active");
         });
     }

});