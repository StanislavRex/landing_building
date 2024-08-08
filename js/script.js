const swiper = new Swiper(".heroSlider", {
	loop: true,
	navigation: {
		nextEl: ".heroSliderPrev",
		prevEl: ".heroSliderNext",
	},
});

const swiper2 = new Swiper(".swiper-2",{
    direction: "horizontal",
    loop: !0,
    pagination: {
        el: ".swiper-pagination2",
        clickable: !0,
        renderBullet: function(n, e) {
            return '<span class="' + e + '"></span>'
        }
    },
    noSwiping: !0,
    noSwipingClass: "noswip",
    navigation: {
        nextEl: ".swiper-nav__rightbtn",
        prevEl: ".swiper-nav__leftbtn"
    }
})

const tabsNavAll = document.querySelectorAll("[data-tab]");
const tabContentAll = document.querySelectorAll("[data-tab-content]");

tabsNavAll.forEach(function(item){
    item.addEventListener('click', function(event){
        if(item.classList.contains("active")) return;
        
        tabsNavAll.forEach(function(i){
            i.classList.remove('active');
        });

        item.classList.add('active');

        tabContentAll.forEach(function(i){
            i.classList.remove('active');
        });

        document.querySelector('#' + event.target.dataset.tab).classList.add('active');
    })
})

const menuButton = document.querySelector(".menu__btn");
const menu = document.querySelector(".menu");

menuButton.addEventListener("click", () => {
  menuButton.classList.toggle("open");
  menu.classList.toggle("active");
});

function videoPlay() {
	document.querySelector(".aboutVideoCover").style.display = "none";
	document.querySelector(".aboutVideoIframe").src += "&autoplay=1";	
}

document.querySelector(".aboutVideoCover").addEventListener("click", videoPlay);