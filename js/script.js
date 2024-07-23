
function tabs(t) {
  const e = document.querySelectorAll(t + " [data-tab]");
  const a = document.querySelectorAll(t + " [data-tab-content]");

  e.forEach(function (t) {
    t.addEventListener("click", function (c) {
      if (!t.classList.contains("active")) { 
        e.forEach(function (t) {
          t.classList.remove("active");
        });
        t.classList.add("active");

        a.forEach(function (t) {
          t.classList.remove("active");
        });
        document
          .querySelector("#" + c.target.dataset.tab)
          .classList.add("active");
      }
    });
  });
}

tabs(".tab1");

const swiper = new Swiper(".swiper", {
  effect: "flip",
  grabCursor: true,
  loop: true,
  navigation: {
    el: ".swiper-navigation",
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});