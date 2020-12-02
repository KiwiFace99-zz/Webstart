const initialAdHeight = 134;

/**
 * Set an interval to get the fluid ad height to trigger transition animation.
 * @param {Object} topAd The ad object.
 */
const handleFluidHeight = (topAd) => {
	const maxInterval = 50;
	let intervalCount = 0;

	const interval = setInterval(() => {
		intervalCount++;

		if (topAd.clientHeight && topAd.clientHeight !== initialAdHeight) {
			topAd.parentElement.style.minHeight = `${topAd.clientHeight}px`;
			clearInterval(interval);
		} else if (intervalCount > maxInterval) {
			topAd.parentElement.style.height = 'auto';
			topAd.style.height = 'auto';
			clearInterval(interval);
		}
	}, 100);
};

/**
 * Handles topAd animation for articles in the stream
 * @param {HTML Element} topAd topAd of the article
 */
const handleTopAdAnimation = (topAd) => {
	const topAnimationClass = 'top-ad-animation';
	const height = topAd.clientHeight;

	topAd.parentElement.classList.add(topAnimationClass);
	if (topAd.classList.contains('fluid')) {
		handleFluidHeight(topAd);
	} else {
		topAd.parentElement.style.minHeight = `${height}px`;
	}
};

/**
 * Handles top ad logic when it's sticky vs. not
 * @param {Number} streamIndex Current stream index for the article in question.
 * @param {Object} adService The adService object.
 */
const handleTopAd = (streamIndex = 0, adService = null) => {
	const topAd = document.querySelector(`#article-container-${streamIndex} fbs-ad[position="top"]`);

	if (topAd) {
		handleTopAdAnimation(topAd);
	
		if (!topAd.getAttribute("data-cycle-complete")) {
		  const { isAdLight = false } = window.forbes["simple-site"];
		  topAd.parentElement.classList.add("sticky-top-ad");
		  topAd.setAttribute("data-cycle-complete", true);
		  const stickDuration =
			window.innerWidth > 1440 && topAd.classList.contains("fluid")
			  ? 5000
			  : 3000;
	
		  let counter = stickDuration / 1000;
		  topAd.firstChild.dataset.content = "ADVERTISEMENT UNSTICK IN " + counter+"...";
		  let width=100/counter
	
		  let countDown = setInterval(() => {
			counter--;
			// topAd.firstChild.classList.add('w'+(width*counter))
			topAd.firstChild.dataset.content =
			  "ADVERTISEMENT UNSTICK IN " + counter+"...";
			if (counter < 1) {
			  clearInterval(countDown);
			  topAd.parentElement.classList.remove("sticky-top-ad");
			  topAd.firstChild.dataset.content = "ADVERTISEMENT";
			  if (isAdLight) {
				adService.displayBatch([`article-${streamIndex}-rec`]);
			  }
			}
		  }, 1000);
		}
	  }
};

export default handleTopAd;

