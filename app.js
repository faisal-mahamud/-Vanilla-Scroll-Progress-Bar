class ScrollProgressBar {
  constructor(selector, root, target, callback) {
    // Get elements from selectors
    this.element = document.querySelector(selector);
    this.root = document.querySelector(root) || document.documentElement;
    this.target = document.querySelector(target);
    this.callback = callback;
    // Set events
    window.addEventListener("scroll", this.computeScroll.bind(this));
    window.addEventListener("resize", this.computeScroll.bind(this));
    // Compute to initialize
    this.computeScroll();
  }

  computeScroll() {
    // Compute percentage of scroll
    const scrollPercent = ~~(
      ((this.root.scrollTop -
        this.target.offsetTop -
        this.target.parentElement.offsetTop) /
        (this.target.clientHeight - this.root.clientHeight)) *
      100
    );
    // Call the callback function with scrollPercent as an argument
    if (this.callback && typeof this.callback === "function")
      this.callback(scrollPercent);
  }
}

// Create ScrollProgressBar objects:

// For progress bar 1
let progressBar1 = new ScrollProgressBar(
  "#scroll-progress-1",
  null,
  "#scroll-target-1",
  function (scrollPercent) {
    // Fade progress bar when below completion height
    if (scrollPercent > 100)
      this.element.style.opacity = 1 - (scrollPercent - 110) / 40;
    else this.element.style.opacity = 1;

    // Affect percentage value to the width and the label of the progress bar
    this.element.style.width = this.element.querySelector("span").innerText =
      Math.max(0, Math.min(100, scrollPercent)) + "%";
  }
);

// For progress bar 2
let progressBar2 = new ScrollProgressBar(
  "#scroll-progress-2",
  null,
  "#scroll-target-2",
  function (scrollPercent) {
    // Affect percentage value to the width of the progress bar
    this.element.style.width = Math.max(0, Math.min(100, scrollPercent)) + "%";
  }
);

// For progress bar 3
let progressBar3 = new ScrollProgressBar(
  "#scroll-progress-3",
  null,
  "main",
  function (scrollPercent) {
    // Affect percentage value to the width and the label of the progress bar
    this.element.style.height = this.element.querySelector("span").innerText =
      Math.max(0, Math.min(100, scrollPercent)) + "%";
  }
);
