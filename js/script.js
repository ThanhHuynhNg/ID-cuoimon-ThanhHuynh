const counters = document.querySelectorAll('.counter');

const count = (timestamp, counter) => {
  if (!counter.startTime) { 
    counter.startTime = timestamp + counter.delay;
  }
  
  const { element, start, end, down, startTime, duration, delay } = counter;
  const counterNumber = element.querySelector('.number');

  const progress = timestamp - startTime;
  let value;
  
  if (down ==="true"){
    value = start - ((start - end) * (progress / duration));
    value = (value < end) ? end : value;
  } else {
    value = start + (end - start) * (progress / duration);
    value = (value > end) ? end : value;
  }
  
  value = Math.round(value);

  if (timestamp > counter.startTime) {
      counterNumber.innerText = value;     
  }
  if (progress < duration) {
    requestAnimationFrame((timestamp) => {
      count(timestamp, counter)
    });         
  }
}

const observer = new IntersectionObserver(entries => {
  entries.forEach(({ target, intersectionRatio }) => {
    const counter = {
      element: target,
      start: parseInt(target.dataset.start, 10),
      end: parseInt(target.dataset.end, 10),
      delay: parseInt(target.dataset.delay, 10),
      down: target.dataset.down,
      duration: parseInt(target.dataset.duration, 10),
      startTime: 0
    }
  
    if (intersectionRatio) {
      requestAnimationFrame((timestamp) => {
        count(timestamp, counter)
      });      
      observer.unobserve(target);
    }    
  })
});

counters.forEach(element => {
  observer.observe(element);  
});