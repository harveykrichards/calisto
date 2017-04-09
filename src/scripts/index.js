import { Calisto } from './calisto';

window.Calisto = Calisto; // make Calisto public

window.slider = new Calisto({
  infinite : true,
  container: document.getElementById('slider-1')
});
