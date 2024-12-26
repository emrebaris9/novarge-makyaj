/*
Author: Emrebaris
*/

// Global popup fonksiyonları
function openPopup() {
  Swal.fire({
    title: "Yorumunuzu Yazın",
    html: `
      <input type="email" id="swal-email" class="swal2-input" placeholder="E-posta adresiniz">
      <input type="text" id="swal-title" class="swal2-input" placeholder="Başlık">
      <textarea id="swal-comment" class="swal2-textarea" placeholder="Yorumunuz..."></textarea>
    `,
    showCancelButton: true,
    confirmButtonText: "Gönder",
    cancelButtonText: "İptal",
    confirmButtonColor: "#6c63ff",
    showCloseButton: true,
    backdrop: `rgba(0,0,0,0.7)`,
    width: "600px",
    padding: "2em",
    heightAuto: false,
    position: "center",
    allowOutsideClick: true,
    grow: "row",
    preConfirm: () => {
      const email = document.getElementById("swal-email").value;
      const title = document.getElementById("swal-title").value;
      const comment = document.getElementById("swal-comment").value;

      if (!email) {
        Swal.showValidationMessage("Lütfen e-posta adresinizi girin");
        return false;
      }
      if (!title) {
        Swal.showValidationMessage("Lütfen bir başlık girin");
        return false;
      }
      if (!comment) {
        Swal.showValidationMessage("Lütfen yorumunuzu yazın");
        return false;
      }

      // mailto link oluştur
      const mailtoLink = `mailto:info@novarge.com?subject=${encodeURIComponent(
        title
      )}&body=${encodeURIComponent(`Gönderen: ${email}\n\nYorum: ${comment}`)}`;
      window.location.href = mailtoLink;

      return { email, title, comment };
    },
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        icon: "success",
        title: "Teşekkürler!",
        text: "Yorumunuz başarıyla gönderildi.",
        confirmButtonColor: "#6c63ff",
      });
    }
  });
}

(function () {
  //===== Prealoder

  window.onload = function () {
    window.setTimeout(fadeout, 500);
  };

  function fadeout() {
    document.querySelector(".preloader").style.opacity = "0";
    document.querySelector(".preloader").style.display = "none";
  }

  /*=====================================
    Sticky
    ======================================= */
  window.onscroll = function () {
    var header_navbar = document.querySelector(".navbar-area");
    var sticky = header_navbar.offsetTop;

    var logo = document.querySelector(".navbar-brand img");
    if (window.pageYOffset > sticky) {
      header_navbar.classList.add("sticky");
      logo.src = "assets/images/logo/logo.svg";
    } else {
      header_navbar.classList.remove("sticky");
      logo.src = "assets/images/logo/white-logo.svg";
    }

    // show or hide the back-top-top button
    var backToTo = document.querySelector(".scroll-top");
    if (
      document.body.scrollTop > 50 ||
      document.documentElement.scrollTop > 50
    ) {
      backToTo.style.display = "flex";
    } else {
      backToTo.style.display = "none";
    }
  };

  // section menu active
  function onScroll(event) {
    var sections = document.querySelectorAll(".page-scroll");
    var scrollPos =
      window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop;

    for (var i = 0; i < sections.length; i++) {
      var currLink = sections[i];
      var val = currLink.getAttribute("href");
      var refElement = document.querySelector(val);
      var scrollTopMinus = scrollPos + 73;
      if (
        refElement.offsetTop <= scrollTopMinus &&
        refElement.offsetTop + refElement.offsetHeight > scrollTopMinus
      ) {
        document.querySelector(".page-scroll").classList.remove("active");
        currLink.classList.add("active");
      } else {
        currLink.classList.remove("active");
      }
    }
  }

  window.document.addEventListener("scroll", onScroll);

  // for menu scroll
  var pageLink = document.querySelectorAll(".page-scroll");

  pageLink.forEach((elem) => {
    elem.addEventListener("click", (e) => {
      e.preventDefault();
      document.querySelector(elem.getAttribute("href")).scrollIntoView({
        behavior: "smooth",
        offsetTop: 1 - 60,
      });
    });
  });

  // WOW active
  new WOW().init();

  let filterButtons = document.querySelectorAll(
    ".portfolio-btn-wrapper button"
  );
  filterButtons.forEach((e) =>
    e.addEventListener("click", () => {
      let filterValue = event.target.getAttribute("data-filter");
      iso.arrange({
        filter: filterValue,
      });
    })
  );

  var elements = document.getElementsByClassName("portfolio-btn");
  for (var i = 0; i < elements.length; i++) {
    elements[i].onclick = function () {
      var el = elements[0];
      while (el) {
        if (el.tagName === "BUTTON") {
          el.classList.remove("active");
        }
        el = el.nextSibling;
      }
      this.classList.add("active");
    };
  }

  //===== mobile-menu-btn
  let navbarToggler = document.querySelector(".mobile-menu-btn");
  navbarToggler.addEventListener("click", function () {
    navbarToggler.classList.toggle("active");
  });

  // Scroll opacity effect for experience title
  function handleExperienceTitleOpacity() {
    const experienceTitle = document.querySelector("#experienceTitle");
    if (!experienceTitle) return;

    const rect = experienceTitle.getBoundingClientRect();
    const viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );

    // Elementin viewport'a göre pozisyonunu hesapla
    const elementFromTop = rect.top;
    const elementHeight = rect.height;

    // Opacity değerini hesapla
    let opacity = 0;

    if (elementFromTop < viewHeight) {
      // Element viewport'a girdiğinde opacity artmaya başlar
      opacity = 1 - elementFromTop / viewHeight;

      // Opacity değerini 0 ile 1 arasında tut
      opacity = Math.min(Math.max(opacity, 0), 1);

      // Daha yumuşak bir geçiş için easing fonksiyonu
      opacity = Math.pow(opacity, 0.5);
    }

    experienceTitle.style.opacity = opacity;
  }

  // Scroll event listener'ı ekle
  window.addEventListener("scroll", handleExperienceTitleOpacity);

  // Sayfa yüklendiğinde de çalıştır
  window.addEventListener("load", handleExperienceTitleOpacity);

  // Scroll opacity effect for experience title
  function handleDescriptionOpacity() {
    const description = document.querySelector("#meb-description");
    if (!description) return;

    const rect = description.getBoundingClientRect();
    const viewHeight = Math.max(
      document.documentElement.clientHeight,
      window.innerHeight
    );

    // Elementin viewport'a göre pozisyonunu hesapla
    const elementFromTop = rect.top;
    const elementHeight = rect.height;

    // Opacity değerini hesapla
    let opacity = 0.1;

    if (elementFromTop < viewHeight) {
      // Element viewport'a girdiğinde opacity artmaya başlar
      opacity = 1 - elementFromTop / viewHeight;

      // Opacity değerini 0 ile 1 arasında tut
      opacity = Math.min(Math.max(opacity, 0), 1);

      // Daha yumuşak bir geçiş için easing fonksiyonu
      opacity = Math.pow(opacity, 0.5);
    }

    description.style.opacity = opacity;
  }

  // Scroll event listener'ı ekle
  window.addEventListener("scroll", handleDescriptionOpacity);

  // Sayfa yüklendiğinde de çalıştır
  window.addEventListener("load", handleDescriptionOpacity);

  // Counter Up
  function startCounter() {
    const counters = document.querySelectorAll(".odometer");

    counters.forEach((counter) => {
      const target = parseInt(counter.getAttribute("data-count"));
      let current = 0;
      const increment = target / 50; // Artış hızı

      const updateCounter = () => {
        if (current < target) {
          current += increment;
          counter.textContent = Math.ceil(current);
          setTimeout(updateCounter, 40); // Güncelleme hızı
        } else {
          counter.textContent = target;
        }
      };

      // Counter'ı başlat
      updateCounter();
    });
  }

  // Counter'ları viewport'a girdiklerinde başlat
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startCounter();
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Achievement section'ı gözlemle
  const achievementSection = document.querySelector(".our-achievement");
  if (achievementSection) {
    observer.observe(achievementSection);
  }

  // Play button click handler
  document.querySelectorAll(".play-button").forEach((button) => {
    button.addEventListener("click", () => {
      // Video oynatma fonksiyonu buraya gelecek
      console.log("Video started");
    });
  });

  // Menü ikonu SVG template'i
  const menuIconSVG = `
    <svg width="18" height="18" viewBox="0 0 18 18" class="menu-icon">
        <polyline id="globalnav-menutrigger-bread-bottom" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="1.2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            points="2 12, 16 12" 
            class="globalnav-menutrigger-bread globalnav-menutrigger-bread-bottom">
            <animate id="globalnav-anim-menutrigger-bread-bottom-open" 
                attributeName="points" 
                keyTimes="0;0.5;1" 
                dur="0.24s" 
                begin="indefinite" 
                fill="freeze" 
                calcMode="spline" 
                keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" 
                values=" 2 12, 16 12; 2 9, 16 9; 3.5 15, 15 3.5">
            </animate>
            <animate id="globalnav-anim-menutrigger-bread-bottom-close" 
                attributeName="points" 
                keyTimes="0;0.5;1" 
                dur="0.24s" 
                begin="indefinite" 
                fill="freeze" 
                calcMode="spline" 
                keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" 
                values=" 3.5 15, 15 3.5; 2 9, 16 9; 2 12, 16 12">
            </animate>
        </polyline>
        <polyline id="globalnav-menutrigger-bread-top" 
            fill="none" 
            stroke="currentColor" 
            stroke-width="1.2" 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            points="2 5, 16 5" 
            class="globalnav-menutrigger-bread globalnav-menutrigger-bread-top">
            <animate id="globalnav-anim-menutrigger-bread-top-open" 
                attributeName="points" 
                keyTimes="0;0.5;1" 
                dur="0.24s" 
                begin="indefinite" 
                fill="freeze" 
                calcMode="spline" 
                keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" 
                values=" 2 5, 16 5; 2 9, 16 9; 3.5 3.5, 15 15">
            </animate>
            <animate id="globalnav-anim-menutrigger-bread-top-close" 
                attributeName="points" 
                keyTimes="0;0.5;1" 
                dur="0.24s" 
                begin="indefinite" 
                fill="freeze" 
                calcMode="spline" 
                keySplines="0.42, 0, 1, 1;0, 0, 0.58, 1" 
                values=" 3.5 3.5, 15 15; 2 9, 16 9; 2 5, 16 5">
            </animate>
        </polyline>
    </svg>`;

  // HTML'de menü butonunu seç ve SVG'yi ekle
  document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.querySelector(".mobile-menu-btn");
    menuButton.innerHTML = menuIconSVG;
  });

  // Menü animasyonu
  document.addEventListener("DOMContentLoaded", function () {
    const menuButton = document.getElementById("globalnav-menutrigger-button");

    menuButton.addEventListener("click", function () {
      const isExpanded = this.getAttribute("aria-expanded") === "true";

      const topOpenAnim = document.getElementById(
        "globalnav-anim-menutrigger-bread-top-open"
      );
      const topCloseAnim = document.getElementById(
        "globalnav-anim-menutrigger-bread-top-close"
      );
      const bottomOpenAnim = document.getElementById(
        "globalnav-anim-menutrigger-bread-bottom-open"
      );
      const bottomCloseAnim = document.getElementById(
        "globalnav-anim-menutrigger-bread-bottom-close"
      );

      if (!isExpanded) {
        topOpenAnim.beginElement();
        bottomOpenAnim.beginElement();
        this.setAttribute("aria-label", "Close");
      } else {
        topCloseAnim.beginElement();
        bottomCloseAnim.beginElement();
        this.setAttribute("aria-label", "Menu");
      }
    });
  });

  // Scroll opacity effect
  window.addEventListener("scroll", function () {
    const scrollElements = document.querySelectorAll(".scroll-fade");
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;

    scrollElements.forEach((element) => {
      const elementTop = element.getBoundingClientRect().top + scrollY;
      const elementVisible = elementTop - scrollY <= windowHeight * 0.75;

      if (elementVisible) {
        element.classList.add("active");
      } else {
        element.classList.remove("active");
      }
    });
  });

  // Sayfa yüklendiğinde de kontrol et
  window.addEventListener("load", function () {
    const event = new Event("scroll");
    window.dispatchEvent(event);
  });

  // Specialist Slider
  document.addEventListener("DOMContentLoaded", () => {
    const specialistSlider = new KeenSlider("#specialist-slider", {
      slides: {
        origin: "center",
        perView: 2.4,
        spacing: 20,
      },
      initial: 1,
      loop: false,
      centered: true,
      created: (instance) => {
        updateSlides(instance);
      },
      slideChanged: (instance) => {
        updateSlides(instance);
      },
      breakpoints: {
        "(max-width: 2400px)": {
          slides: {
            perView: 4.2,
            spacing: 20,
            origin: "center",
          },
        },
        "(max-width: 1400px)": {
          slides: {
            perView: 3.4,
            spacing: 20,
            origin: "center",
          },
        },
        "(max-width: 768px)": {
          slides: {
            perView: 1.2,
            spacing: 10,
            origin: "center",
          },
        },
      },
    });

    function updateSlides(instance) {
      const slides = instance.slides;
      const activeIndex = instance.track.details.rel;
      const isMobile = window.innerWidth <= 768;

      slides.forEach((slide, idx) => {
        const isCenter = idx === activeIndex;

        if (isMobile) {
          // Mobil görünüm
          if (isCenter) {
            slide.style.opacity = "1";
            slide.style.transform = "scale(1)";
          } else {
            slide.style.opacity = "0.5";
            slide.style.transform = "scale(0.85)";
          }
        } else {
          // Desktop görünüm
          if (isCenter) {
            slide.style.flex = "0 0 60%";
            slide.style.opacity = "1";
            slide.style.transform = "scale(1)";
          } else {
            slide.style.flex = "0 0 20%";
            slide.style.opacity = "0.5";
            slide.style.transform = "scale(0.85)";
          }
        }
      });
    }

    // Navigation butonlarını bağla
    document
      .querySelector(".specialist-prev")
      .addEventListener("click", () => specialistSlider.prev());
    document
      .querySelector(".specialist-next")
      .addEventListener("click", () => specialistSlider.next());
  });
  // Gallery Slider
  document.addEventListener("DOMContentLoaded", () => {
    const isMobile = window.innerWidth <= 768; // Mobil cihaz kontrolü

    const slider = new KeenSlider("#gallery-slider", {
      slides: {
        perView: 4.2,
        spacing: 24,
      },
      initial: 0,
      loop: false,
      move: (s) => {
        const slides = document.querySelectorAll(
          "#gallery-slider .keen-slider__slide"
        );
        slides.forEach((slide, idx) => {
          const translateY = isMobile ? 0 : idx % 2 === 0 ? -50 : 50;
          const currentTransform = slide.style.transform;
          const translateX =
            currentTransform.match(/translate3d\(([-\d.]+)px/)?.[1] || 0;

          slide.style.transform = `translate3d(${translateX}px, ${translateY}px, 0)`;
        });
      },
      created: (s) => {
        s.moveToIdx(0);
        document
          .querySelector(".nav-prev")
          ?.addEventListener("click", () => s.prev());
        document
          .querySelector(".nav-next")
          ?.addEventListener("click", () => s.next());
      },
      breakpoints: {
        "(max-width: 1400px)": {
          slides: {
            perView: 4,
            spacing: 20,
          },
        },
        "(max-width: 1200px)": {
          slides: {
            perView: 3,
            spacing: 20,
          },
        },
        "(max-width: 991px)": {
          slides: {
            perView: 2.5,
            spacing: 20,
          },
        },
        "(max-width: 768px)": {
          slides: {
            perView: 1.2,
            spacing: 20,
          },
        },
      },
    });
  });

  // Features Slider
  document.addEventListener("DOMContentLoaded", () => {
    const featuresSlider = new KeenSlider("#features-slider", {
      slides: {
        perView: 4.3,
        spacing: 24,
      },
      initial: 0,
      loop: false,
      breakpoints: {
        "(max-width: 1400px)": {
          slides: {
            perView: 3.5,
            spacing: 20,
          },
        },
        "(max-width: 1200px)": {
          slides: {
            perView: 2.5,
            spacing: 20,
          },
        },
        "(max-width: 768px)": {
          slides: {
            perView: 1.2,
            spacing: 20,
          },
        },
      },
      created: (s) => {
        // Gezinme düğmelerini bağla
        document
          .querySelector(".features-prev")
          ?.addEventListener("click", () => s.prev());
        document
          .querySelector(".features-next")
          ?.addEventListener("click", () => s.next());
      },
    });
  });
  document
    .querySelector(".features-nav .nav-prev")
    .addEventListener("click", () => {
      featuresSlider.prev();
    });

  document
    .querySelector(".features-nav .nav-next")
    .addEventListener("click", () => {
      featuresSlider.next();
    });
  document
    .querySelector(".globalnav-menutrigger-button")
    .addEventListener("click", function () {
      const isOpen = this.classList.toggle("active");

      if (isOpen) {
        document
          .querySelector("#globalnav-anim-menutrigger-bread-bottom-open")
          .beginElement();
        document
          .querySelector("#globalnav-anim-menutrigger-bread-top-open")
          .beginElement();
        this.setAttribute("aria-label", "Close");
      } else {
        document
          .querySelector("#globalnav-anim-menutrigger-bread-bottom-close")
          .beginElement();
        document
          .querySelector("#globalnav-anim-menutrigger-bread-top-close")
          .beginElement();
        this.setAttribute("aria-label", "Menu");
      }
    });

  // FAQ Accordion
  document.querySelectorAll(".faq-button").forEach((button) => {
    button.addEventListener("click", () => {
      const faqItem = button.parentElement;
      const content = faqItem.querySelector(".faq-content");
      const isActive = faqItem.classList.contains("active");

      // Tüm panelleri kapat
      document.querySelectorAll(".faq-item").forEach((item) => {
        item.classList.remove("active");
        item.querySelector(".faq-content").style.height = "0px";
      });

      // Tıklanan paneli aç
      if (!isActive) {
        faqItem.classList.add("active");
        content.style.height = content.scrollHeight + "px";
      }
    });
  });

  // Countdown Timer
  function startCountdown() {
    const days = document.getElementById("days");
    const hours = document.getElementById("hours");
    const minutes = document.getElementById("minutes");

    let d = 1; // Başlangıç değerleri
    let h = 59;
    let m = 12;
    let s = 0;

    function updateDisplay() {
      // Saniyeyi azalt
      s--;

      // Saniye sıfır olduğunda dakikayı azalt
      if (s < 0) {
        s = 59;
        m--;

        // Dakika sıfır olduğunda saati azalt
        if (m < 0) {
          m = 59;
          h--;

          // Saat sıfır olduğunda günü azalt
          if (h < 0) {
            h = 23;
            d--;

            // Gün sıfır olduğunda sayacı resetle
            if (d < 0) {
              d = 1;
              h = 59;
              m = 12;
              s = 0;
            }
          }
        }
      }

      // Görüntüyü güncelle
      days.textContent = d.toString();
      hours.textContent = h.toString().padStart(2, "0");
      minutes.textContent = m.toString().padStart(2, "0");
    }

    // Her saniye güncelle
    setInterval(updateDisplay, 1000);
  }

  // Sayfa yüklendiğinde başlat
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", startCountdown);
  } else {
    startCountdown();
  }

  (function () {
    const second = 1000,
      minute = second * 60,
      hour = minute * 60,
      day = hour * 24;

    //I'm adding this section so I don't have to keep updating this pen every year :-)
    //remove this if you don't need it
    let today = new Date(),
      dd = String(today.getDate()).padStart(2, "0"),
      mm = String(today.getMonth() + 1).padStart(2, "0"),
      yyyy = today.getFullYear(),
      nextYear = yyyy + 1,
      dayMonth = "09/30/",
      birthday = dayMonth + yyyy;

    today = mm + "/" + dd + "/" + yyyy;
    if (today > birthday) {
      birthday = dayMonth + nextYear;
    }
    //end

    const countDown = new Date(birthday).getTime(),
      x = setInterval(function () {
        const now = new Date().getTime(),
          distance = countDown - now;

        (document.getElementById("days").innerText = Math.floor(
          distance / day
        )),
          (document.getElementById("hours").innerText = Math.floor(
            (distance % day) / hour
          )),
          (document.getElementById("minutes").innerText = Math.floor(
            (distance % hour) / minute
          )),
          (document.getElementById("seconds").innerText = Math.floor(
            (distance % minute) / second
          ));

        //do something later when date is reached
        if (distance < 0) {
          document.getElementById("headline").innerText = "Promotion ends in";
          document.getElementById("countdown").style.display = "none";
          document.getElementById("content").style.display = "block";
          clearInterval(x);
        }
        //seconds
      }, 0);
  });
})();
