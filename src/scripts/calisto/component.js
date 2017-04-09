class Calisto {
  constructor( settings ) {

    this.container = settings.container || false;

    if( this.container === false ) {
      console.error('You must choose a container to initialize Calisto.');
      return false;
    }

    // public variables
    this.infinite = settings.infinite || true;
    this.slides = [].slice.call( this.container.children ) || false; // converst htmlobject to array
    this.length = this.slides.length;
    this.speed = settings.speed || '300ms';
    this.slideStart = settings.slideStart || 0;
    this.controls = settings.controls || true;
    this.currentSlide = this.slideStart;

    this._max = ( this.length - 1 );
    this._min = 0;

    console.log(this.slides);

    this.wrap();

    this.goToSlide(this.slideStart, false);

    if( this.controls == true ) {
      this.appendControls();
    }

  }

  wrap() {
    this.container.style.position = 'relative';

    this._rail = document.createElement('div');
    this._rail.classList.add('calisto--rail');

    const before = this.slides[ this.length - 1 ].cloneNode(true);
          before.classList.add('calisto--slide');
          before.classList.add('calisto--clone');
          before.setAttribute('data-index', -1 );

    this._rail.appendChild(before);

    for( let [index, slide] of this.slides.entries() ) {
      slide.classList.add('calisto--slide');
      slide.setAttribute('data-index', index )
      this._rail.appendChild( slide );
    }

    const after = this.slides[0].cloneNode(true);
          after.classList.add('calisto--slide');
          after.classList.add('calisto--clone');
          after.setAttribute('data-index', this.length );

    this._rail.appendChild(after);

    const wrap = document.createElement('div');
          wrap.classList.add('calisto');

    wrap.appendChild(this._rail);

    this.container.appendChild(wrap);
  }

  goToSlide( index, transition = true, vertical = false ) {
    this.currentSlide = index;
    console.log(this.currentSlide);
    index = ( this.infinite == true ) ? index + 1 : index;

    const active = document.querySelector('.calisto--slide.calisto--active');
    if( active ) {
      active.classList.remove('calisto--active');
    }

    if( document.querySelector('[data-index="'+this.currentSlide+'"]') ) {
      document.querySelector('[data-index="'+this.currentSlide+'"]').classList.add('calisto--active');
    }

    let tx = ( vertical == false ) ? -Math.abs( index * 100 ) + '%' : '0px';
    let ty = ( vertical == true ) ? -Math.abs( index * 100 ) + '%' : '0px';
    let tz = '0px';

    this._transform = 'translate3d(' + tx +',' + ty +','+ tz +')';

    this._rail.style.transform = this._transform;
    this._rail.style.webkitTransform = this._transform;

    if( transition == true ) {
      this._rail.style.transition = 'transform ' + this.speed + ' linear';;
      this._rail.style.webkitTransition = 'transform ' + this.speed + ' linear';;
    }

    this._rail.addEventListener('transitionend', () => {
      this._rail.style.transition = 'transform 0s linear';
      this._rail.style.webkitTransition = 'transform 0s linear';
    }, false);

  }

  appendControls() {

    const controls = document.createElement('div');
          controls.classList.add('calisto--controls');

    const controlNext = document.createElement('div');
          controlNext.classList.add('control');
          controlNext.classList.add('control--next');
          controlNext.addEventListener('click', () => {
            this.goToNextSlide();
          });

    controls.appendChild(controlNext);


    const controlPrev = document.createElement('div');
          controlPrev.classList.add('control');
          controlPrev.classList.add('control--prev');
          controlPrev.addEventListener('click', () => {
            this.goToPrevSlide();
          });

    controls.appendChild(controlPrev);

    this.container.appendChild(controls);

  }

  goToNextSlide() {

    const _infinite = () => {
      this.goToSlide(this._min, false);
      this._rail.removeEventListener('transitionend', _infinite, false);
    }

    if( this.currentSlide >= this._max  ) {

      if( this.infinite != true ) {
        return false;
      }

      this.goToSlide( this._max );
      this._rail.addEventListener('transitionend', _infinite, false);
    }

    this.goToSlide( ++this.currentSlide );
    console.log(this.currentSlide);
  }

  goToPrevSlide() {

    const _infinite = () => {
      this.goToSlide(this._max, false);
      this._rail.removeEventListener('transitionend', _infinite, false);
    }

    if( this.currentSlide <= this._min  ) {

      if( this.infinite != true ) {
        return false;
      }

      this.goToSlide( this._min );
      this._rail.addEventListener('transitionend', _infinite, false);
    }

    this.goToSlide( --this.currentSlide );
  }

}

export { Calisto };
