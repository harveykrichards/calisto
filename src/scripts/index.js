import { Calisto } from './calisto';
import Prism from 'prismjs';

window.Calisto = Calisto; // make Calisto public

const slider1 = new Calisto({
  container: document.getElementById('slider-1')
});


window.slider2 = new Calisto({
  container: document.getElementById('slider-2'),
  infinite: true
});

window.slider3 = new Calisto({
  container: document.getElementById('multiple'),
  slidesInView : 3,
  infinite: true
})
