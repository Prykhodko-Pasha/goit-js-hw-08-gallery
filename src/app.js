const galleryItems = [
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/16/43/himilayan-blue-poppy-4202825_1280.jpg",
    description: "Hokkaido Flower",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/14/22/05/container-4203677_1280.jpg",
    description: "Container Haulage Freight",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/09/47/beach-4206785_1280.jpg",
    description: "Aerial Beach View",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2016/11/18/16/19/flowers-1835619_1280.jpg",
    description: "Flower Blooms",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2018/09/13/10/36/mountains-3674334_1280.jpg",
    description: "Alpine Mountains",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/23/04/landscape-4208571_1280.jpg",
    description: "Mountain Lake Sailing",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/09/27/the-alps-4209272_1280.jpg",
    description: "Alpine Spring Meadows",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/16/21/10/landscape-4208255_1280.jpg",
    description: "Nature Landscape",
  },
  {
    preview:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843__340.jpg",
    original:
      "https://cdn.pixabay.com/photo/2019/05/17/04/35/lighthouse-4208843_1280.jpg",
    description: "Lighthouse Coast Sea",
  },
];

const refs = {
  gallery: document.querySelector(".gallery"),
  lightbox: document.querySelector(".lightbox"),
  lightbox__image: document.querySelector(".lightbox__image"),
  overlay: document.querySelector(".lightbox__overlay"),
  closeBtn: document.querySelector('[data-action="close-lightbox"]'),
};

let IMG_IDX = 0; // ?????????????? ???????????? ???????????????????????????? ??????????????????????

// ========== ???????????????? ?? ???????????? ???????????????? ==========
const galleryMarkup = galleryItems
  .map(
    (item) =>
      `<li class="gallery__item"><a class="gallery__link" href="${item.original}"><img class="gallery__image" src="${item.preview}" data-source="${item.original}" alt="${item.description}"/></a></li>`
  )
  .join("");
// console.log(galleryMarkup);

refs.gallery.innerHTML = galleryMarkup;
// ================================================

// =========== ???????????????? ???????????????????? ???????? ===========
const imgArr = [...document.querySelectorAll(".gallery__image")];

refs.gallery.addEventListener("click", onOpenModal);

function onOpenModal(e) {
  e.preventDefault();
  if (!e.target.classList.contains("gallery__image")) {
    return;
  }
  // console.log(e.target);
  refs.lightbox.classList.add("is-open");
  refs.lightbox__image.src = e.target.dataset.source;
  refs.lightbox__image.alt = e.target.alt;

  IMG_IDX = imgArr.indexOf(e.target);
  // console.log(IMG_IDX);
  window.addEventListener("keydown", onKeyPressModal);
}
// ================================================

// =========== ???????????????? ???????????????????? ???????? ===========
refs.closeBtn.addEventListener("click", onCloseModal);
refs.overlay.addEventListener("click", onCloseModal);

function onCloseModal() {
  refs.lightbox.classList.remove("is-open");
  refs.lightbox__image.src = "";
  refs.lightbox__image.alt = "";

  window.removeEventListener("keydown", onKeyPressModal);
  IMG_IDX = 0;
}

function onKeyPressModal(e) {
  // console.log(e.code);
  switch (e.code) {
    case "Escape":
      onCloseModal();
      break;
    case "ArrowRight":
      IMG_IDX += 1;
      if (IMG_IDX === galleryItems.length) {
        // ???????? ?????????? ???? ?????????? ????????????????
        IMG_IDX = 0; // ?????????????????? ???? ????????????
      }
      refs.lightbox__image.src = galleryItems[IMG_IDX].original;
      refs.lightbox__image.alt = galleryItems[IMG_IDX].description;
      break;
    case "ArrowLeft":
      IMG_IDX -= 1;
      if (IMG_IDX < 0) {
        // ???????? ?????????? ???? ???????????? ????????????????
        IMG_IDX = galleryItems.length - 1; // ?????????????????? ?? ??????????
      }
      refs.lightbox__image.src = galleryItems[IMG_IDX].original;
      refs.lightbox__image.alt = galleryItems[IMG_IDX].description;
      break;
  }
}
// ================================================
