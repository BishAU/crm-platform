const zones = {
  sky: document.querySelector('.sky'),
  horizon: document.querySelector('.horizon'),
  underwater: document.querySelector('.underwater'),
};

// Utility functions
const randomBetween = (min, max) => Math.random() * (max - min) + min;
const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

function createCloud() {
    const cloud = document.createElement('img');
    cloud.src = '/images/cloud.svg';
    const size = randomBetween(50, 100);
    const zLayer = Math.floor(randomBetween(1, 4));
    const startLeft = randomBetween(-20, 100);
    cloud.style.cssText = `
      position: absolute;
      top: ${randomBetween(0, 90)}%;
      left: ${startLeft}%;
      width: ${size}px;
      opacity: ${1 - (zLayer - 1) * 0.2};
      z-index: ${zLayer};
      transform: translateX(-100%);
      animation: cloudMove ${randomBetween(30, 60)}s linear infinite;
    `;
    zones.sky.appendChild(cloud);
  }

function createClouds() {
    for (let i = 0; i < 10; i++) {
        createCloud();
    }
}

function createSurfer() {
  const surfer = document.createElement('img');
  surfer.src = '/images/surfer.png';
  surfer.style.cssText = `
    position: absolute;
    bottom: 10%;
    left: 10%;
    width: 150px;
    animation: surferMove 10s linear infinite;
  `;
  zones.horizon.appendChild(surfer);

  const wavecurl = document.createElement('img');
  wavecurl.src = '/images/wavecurl.png';
    wavecurl.style.cssText = `
    position: absolute;
    bottom: 0%;
    left: 0%;
    width: 400px;
    animation: wavecurlMove 10s linear infinite;
  `;
  zones.horizon.appendChild(wavecurl);
}

function createFish() {
  const fishCount = 5;
  for (let i = 0; i < fishCount; i++) {
    const fish = document.createElement('img');
    fish.src = `/images/fish${i + 1}.png`;
    fish.style.cssText = `
      position: absolute;
      bottom: ${randomBetween(10, 40)}%;
      left: ${randomBetween(0, 100)}%;
      width: ${randomBetween(50, 100)}px;
      animation: fishMove ${randomBetween(10, 20)}s linear infinite;
    `;
    zones.underwater.appendChild(fish);
  }
}

function createParaglider() {
    const paraglider = document.createElement('img');
    paraglider.src = '/images/paraglider.png';
    paraglider.style.cssText = `
      position: absolute;
      top: 10%;
      left: 10%;
      width: 25%;
      animation: paragliderMove 20s linear infinite;
    `;
    zones.sky.appendChild(paraglider);
  }

function createBubble() {
    const bubble = document.createElement('div');
    const size = randomBetween(5, 15);
    bubble.className = 'bubble';
    bubble.style.cssText = `
      width: ${size}px;
      height: ${size}px;
      position: absolute;
      left: ${randomBetween(0, 100)}%;
      bottom: -${size}px;
      opacity: 0.8;
      animation: bubbleUp ${randomBetween(15, 20)}s linear;
    `;
    zones.underwater.appendChild(bubble);
    setTimeout(() => {
        bubble.remove();
    }, randomBetween(15,20) * 1000)
  }

function createBubbles() {
    for (let i = 0; i < 20; i++) {
        createBubble();
    }
    setInterval(createBubble, 500);
}

// Create style element for animations
const style = document.createElement('style');
style.textContent = `
  @keyframes surferMove {
    0% { transform: translateX(0); }
    50% { transform: translateX(100px); }
    100% { transform: translateX(0); }
  }

  @keyframes wavecurlMove {
    0% { transform: translateX(0); }
    50% { transform: translateX(100px); }
    100% { transform: translateX(0); }
  }

  @keyframes fishMove {
    0% { transform: translateX(0); }
    50% { transform: translateX(50px); }
    100% { transform: translateX(0); }
  }

  @keyframes paragliderMove {
    0% { transform: translateX(0); }
    50% { transform: translateX(200px); }
    100% { transform: translateX(0); }
  }

  @keyframes cloudMove {
    from { transform: translateX(100%); }
    to { transform: translateX(-100%); }
  }

  @keyframes bubbleUp {
    0% { transform: translateY(0); opacity: 0.8; }
    100% { transform: translateY(-45vh); opacity: 0; }
  }
`;
document.head.appendChild(style);

// Initialize animations
function init() {
  createSurfer();
  createFish();
  createParaglider();
  createClouds();
  createBubbles();
}

// Handle window resize
const handleResize = debounce(() => {
  // Clear existing animations
  zones.sky.innerHTML = '';
  zones.underwater.innerHTML = '';
  zones.horizon.innerHTML = '';
  // Reinitialize
  init();
}, 250);

window.addEventListener('resize', handleResize);
window.addEventListener('load', init);