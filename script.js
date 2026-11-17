const APP_CONFIG = {
  formUrl: "https://docs.google.com/forms/d/e/1FAIpQLSdaF4G4A-Uh_BewEIPwdRiF6quOQtsIWHT3nlm4aUW-WL_xyA/viewform",
  ownerEmail: "Elimstaymactan1107@gmail.com",
  title: "Elim Stay Mactan",
  rate: 1990,
  maxGuests: 4,
};

function createPlaceholderImage(title, hue = "#c49a5a") {
  const svg = `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 900" role="img" aria-label="${title}">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#43291f" />
          <stop offset="50%" stop-color="#6f4a3b" />
          <stop offset="100%" stop-color="#d9bea1" />
        </linearGradient>
      </defs>
      <rect width="1200" height="900" fill="url(#g)"/>
      <circle cx="960" cy="220" r="180" fill="${hue}" opacity="0.28"/>
      <rect x="116" y="180" width="968" height="540" rx="36" fill="rgba(251,241,222,0.12)" stroke="rgba(251,241,222,0.28)"/>
      <text x="600" y="470" text-anchor="middle" fill="#fbf1de" font-family="Arial, sans-serif" font-size="72" font-weight="700">${title}</text>
      <text x="600" y="560" text-anchor="middle" fill="rgba(251,241,222,0.9)" font-family="Arial, sans-serif" font-size="30" letter-spacing="4">ELIM STAY MACTAN</text>
    </svg>
  `;

  return `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(svg)}`;
}

const GALLERY_IMAGES = [
  { src: "images/IMG_5031.webp", title: "Bedroom with pillows in focus", label: "Bedroom" },
  { src: "images/IMG_5034.webp", title: "Living room with a comfortable sofa", label: "Living room" },
  { src: "images/IMG_5038.webp", title: "A closer look inside the condo", label: "Condo details" },
  { src: "images/IMG_5044.webp", title: "Bathroom with vanity and washing machine", label: "Bathroom" },
  { src: "images/IMG_5085.webp", title: "Dining area", label: "Dining area" },
  { src: "images/IMG_5735.webp", title: "Kitchen area", label: "Kitchen" },
  { src: "images/IMG_5796.webp", title: "Pool and buildings at Primeworld District", label: "Pool" },
];

const AMENITIES = [
  ["M3 18v-6a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v6M3 18h18M5 10V7a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v3", "Queen-size bed"],
  ["M6 3h12v18H6zM12 3v18", "Clothes cabinet"],
  ["M3 5h18v5H3zM7 14l-1 4M12 14v4M17 14l1 4", "Air conditioning"],
  ["M4 12h16v3a4 4 0 0 1-4 4H8a4 4 0 0 1-4-4zM6 12V6a2 2 0 0 1 4 0", "Bathroom with toiletries"],
  ["M5 9h14M7 9v10M17 9v10M9 5h6", "Kitchen area"],
  ["M5 11h14v9H5zM8 11V8a4 4 0 0 1 8 0v3", "Secure entry"],
  ["M2 15c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M2 20c2 0 2-2 4-2s2 2 4 2 2-2 4-2 2 2 4 2 2-2 4-2M8 4v9M14 4v9M8 7h6", "Pool"],
  ["M6 8v8M18 8v8M3 10v4M21 10v4M6 12h12", "Gym"],
  ["M5 3h14v18H5zM12 9a4 4 0 1 0 0 8 4 4 0 0 0 0-8", "Washing machine"],
  ["M2 9a15 15 0 0 1 20 0M5 12.5a10 10 0 0 1 14 0M8.5 16a5 5 0 0 1 7 0M12 19.5h.01", "Wi-Fi"],
  ["M3 5h18v12H3zM8 21h8", "TV"],
  ["M12 3s6 6 6 11a6 6 0 0 1-12 0c0-5 6-11 6-11z", "Water and electricity"],
];

const $ = (id) => document.getElementById(id);

function formatPeso(value) {
  return `₱${Math.round(value).toLocaleString("en-PH")}`;
}

function createGalleryImage(image, index) {
  const item = document.createElement("img");
  item.src = image.src;
  item.alt = image.title;
  item.loading = "lazy";
  item.decoding = "async";
  item.className = `m${index}`;
  item.onerror = () => {
    item.src = createPlaceholderImage(image.title);
  };
  return item;
}

function createAmenityItem(amenity) {
  const [svgPath, label] = amenity;
  const item = document.createElement("li");

  const iconWrap = document.createElement("span");
  iconWrap.className = "ic";

  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("aria-hidden", "true");

  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute("d", svgPath);
  icon.appendChild(path);
  iconWrap.appendChild(icon);

  item.appendChild(iconWrap);
  item.appendChild(document.createTextNode(label));

  return item;
}

function renderAmenities() {
  AMENITIES.forEach((amenity) => {
    $("am").appendChild(createAmenityItem(amenity));
  });
}

let currentGalleryIndex = 0;

function showGalleryImage(index) {
  const lightbox = $("lb");
  const wasOpen = lightbox.open;
  const previousIndex = currentGalleryIndex;
  currentGalleryIndex = (index + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
  const activeImage = GALLERY_IMAGES[currentGalleryIndex];

  $("lbBg").src = activeImage.src;
  $("lbImg").src = activeImage.src;
  $("lbImg").alt = activeImage.title;
  $("lbCap").textContent = activeImage.title;
  $("lbCount").textContent = `${currentGalleryIndex + 1} / ${GALLERY_IMAGES.length}`;
  const direction = wasOpen ? Math.sign(currentGalleryIndex - previousIndex) : 0;
  const figure = $("lbFigure");
  figure.style.setProperty("--dx", `${direction * 48}px`);
  figure.classList.remove("go");
  void figure.offsetWidth;
  if (wasOpen && direction !== 0) {
    figure.classList.add("go");
  }

  const activeThumbnail = $("lbThumbs").children[currentGalleryIndex];
  Array.from($("lbThumbs").children).forEach((thumbnail, thumbnailIndex) => {
    thumbnail.classList.toggle("on", thumbnailIndex === currentGalleryIndex);
    if (thumbnailIndex === currentGalleryIndex) {
      thumbnail.setAttribute("aria-current", "true");
    } else {
      thumbnail.removeAttribute("aria-current");
    }
  });

  if (!lightbox.open) {
    if (lightbox.showModal) {
      lightbox.showModal();
    } else {
      lightbox.setAttribute("open", "open");
    }
  } else {
    activeThumbnail.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }
}

function initGallery() {
  GALLERY_IMAGES.forEach((image, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = `m${index}`;
    button.setAttribute("data-label", image.label);
    button.setAttribute("aria-label", `Open photo: ${image.title}`);
    button.appendChild(createGalleryImage(image, index));
    button.addEventListener("click", () => showGalleryImage(index));
    $("mos").appendChild(button);

    const thumbnail = document.createElement("button");
    thumbnail.type = "button";
    thumbnail.className = "lb-thumb";
    thumbnail.setAttribute("aria-label", `Show photo: ${image.title}`);
    thumbnail.appendChild(createGalleryImage(image, index));
    thumbnail.addEventListener("click", () => showGalleryImage(index));
    $("lbThumbs").appendChild(thumbnail);
  });

  $("h1").appendChild(createGalleryImage(GALLERY_IMAGES[0], 0));
  $("h2").appendChild(createGalleryImage(GALLERY_IMAGES[1], 1));

  $("hero").style.backgroundImage = "linear-gradient(100deg,rgba(67,41,31,.76) 0%,rgba(67,41,31,.5) 48%,rgba(67,41,31,.16) 100%),url('images/hero-buildings.jpg')";

  $("h1").addEventListener("click", () => showGalleryImage(0));
  $("h2").addEventListener("click", () => showGalleryImage(1));

  $("prev").addEventListener("click", () => showGalleryImage(currentGalleryIndex - 1));
  $("next").addEventListener("click", () => showGalleryImage(currentGalleryIndex + 1));

  $("lbClose").addEventListener("click", () => $("lb").close());
  $("lbImg").addEventListener("error", () => {
    const activeImage = GALLERY_IMAGES[currentGalleryIndex];
    const placeholder = createPlaceholderImage(activeImage.title);
    $("lbImg").src = placeholder;
    $("lbBg").src = placeholder;
  });
  $("lbBg").addEventListener("error", () => {
    const activeImage = GALLERY_IMAGES[currentGalleryIndex];
    $("lbBg").src = createPlaceholderImage(activeImage.title);
  });
  $("lb").addEventListener("click", (event) => {
    if (event.target === $("lb")) {
      $("lb").close();
    }
  });

  $("lb").addEventListener("keydown", (event) => {
    if (event.key === "ArrowRight") {
      event.preventDefault();
      showGalleryImage(currentGalleryIndex + 1);
    }
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      showGalleryImage(currentGalleryIndex - 1);
    }
    if (event.key === "Escape") {
      $("lb").close();
    }
  });
}

function initPriceAnimation() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  $("sp").textContent = formatPeso(APP_CONFIG.rate);

  if (!prefersReducedMotion) {
    let startPixelTime = null;

    const animate = (timestamp) => {
      if (startPixelTime === null) {
        startPixelTime = timestamp;
      }

      const progress = Math.min((timestamp - startPixelTime) / 1100, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      $("pr").textContent = formatPeso(APP_CONFIG.rate * eased);

      if (progress < 1) {
        requestAnimationFrame(animate);
      }
    };

    requestAnimationFrame(animate);
  }
}

function initScrollEffects() {
  const prefersReducedMotion = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const hero = $("hero");
  const stickyBar = $("sbar");
  const progressBar = $("prog");
  let ticking = false;

  const onScroll = () => {
    const y = window.scrollY || 0;
    const heroHeight = hero.offsetHeight;

    stickyBar.classList.toggle("on", y > heroHeight - 60);

    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    const width = maxScroll > 0 ? (y / maxScroll) * 100 : 0;
    progressBar.style.width = `${width}%`;

    ticking = false;
  };

  const revealItems = Array.from(document.querySelectorAll(".head,.fact,.kc,.map,.mos button,.am li,.near div,.steps li,.rules li,.card,.book h2,.book p"));

  if ("IntersectionObserver" in window && !prefersReducedMotion) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const item = entry.target;
          item.classList.add("in");
          observer.unobserve(item);
          setTimeout(() => {
            item.style.transitionDelay = "0s";
            item.classList.add("done");
          }, 1000);
        }
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item, index) => {
      item.classList.add("rv");
      item.style.transitionDelay = `${Math.min(index, 8) * 0.06}s`;
      observer.observe(item);
    });
  }

  window.addEventListener("scroll", () => {
    if (!ticking) {
      ticking = true;
      requestAnimationFrame(onScroll);
    }
  }, { passive: true });

  onScroll();
}

function initDialog() {
  const dialog = $("kd");
  if (!dialog) {
    return;
  }

  Array.from(document.querySelectorAll(".more[data-d]")).forEach((button) => {
    button.addEventListener("click", () => {
      const template = document.getElementById(`t-${button.getAttribute("data-d")}`);
      $("kt").textContent = template.getAttribute("data-title");
      $("kb").innerHTML = template.innerHTML;

      if (dialog.showModal) {
        dialog.showModal();
      } else {
        dialog.setAttribute("open", "open");
      }
    });
  });

  $("kx").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) {
      dialog.close();
    }
  });
}

function initTouchGalleryNavigation() {
  let swipeStartX = null;

  $("lbImg").addEventListener("touchstart", (event) => {
    swipeStartX = event.touches[0].clientX;
  }, { passive: true });

  $("lbImg").addEventListener("touchend", (event) => {
    if (swipeStartX === null) {
      return;
    }

    const distance = event.changedTouches[0].clientX - swipeStartX;
    if (Math.abs(distance) > 50) {
      showGalleryImage(currentGalleryIndex + (distance < 0 ? 1 : -1));
    }

    swipeStartX = null;
  });
}

function initialize() {
  $("pr").textContent = formatPeso(APP_CONFIG.rate);
  renderAmenities();
  initGallery();
  initPriceAnimation();
  initScrollEffects();
  initDialog();
  initTouchGalleryNavigation();
}

document.addEventListener("DOMContentLoaded", initialize);
