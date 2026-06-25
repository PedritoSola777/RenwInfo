const desktopImages = document.querySelectorAll('.desktop-images .desktop-img');
const mobileImages = document.querySelectorAll('.mobile-images .mobile-img');
const buttons = document.querySelectorAll('.navigation-buttons button');

let currentIndex = 0;
let images = [];
let intervalID;

const transitionDuration = 1000;
const intervalDuration = 5000;

function clearActiveClasses() {
  desktopImages.forEach(img => img.classList.remove('active', 'prev'));
  mobileImages.forEach(img => img.classList.remove('active', 'prev'));
}

function updateButtons(index) {
  buttons.forEach((btn, i) => {
    btn.classList.toggle('active', i === index);
  });
}

function setActiveImage(index) {
  if (!images.length || !images[index]) return;

  clearActiveClasses();
  images[index].classList.add('active');
  updateButtons(index);
}

function nextImage() {
  if (!images.length) return;

  const previousIndex = currentIndex;
  currentIndex = (currentIndex + 1) % images.length;

  images[previousIndex].classList.remove('active');
  images[previousIndex].classList.add('prev');

  images[currentIndex].classList.add('active');

  setTimeout(() => {
    if (images[previousIndex]) {
      images[previousIndex].classList.remove('prev');
    }
  }, transitionDuration);

  updateButtons(currentIndex);
}

function setImagesGroup() {
  clearInterval(intervalID);

  images = window.innerWidth > 768 ? desktopImages : mobileImages;
  currentIndex = 0;

  setActiveImage(currentIndex);

  if (images.length > 1) {
    intervalID = setInterval(nextImage, intervalDuration);
  }
}

buttons.forEach((button, index) => {
  button.addEventListener('click', () => {
    if (!images[index]) return;

    clearInterval(intervalID);

    const previousIndex = currentIndex;
    currentIndex = index;

    images[previousIndex].classList.remove('active');
    images[previousIndex].classList.add('prev');

    images[currentIndex].classList.add('active');

    setTimeout(() => {
      if (images[previousIndex]) {
        images[previousIndex].classList.remove('prev');
      }
    }, transitionDuration);

    updateButtons(currentIndex);

    if (images.length > 1) {
      intervalID = setInterval(nextImage, intervalDuration);
    }
  });
});

window.addEventListener('resize', setImagesGroup);

setImagesGroup();