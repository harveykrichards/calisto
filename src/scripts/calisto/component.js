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

    console.log(this.slides);

    this.wrap();

    this.goToSlide(0);

  }

  wrap() {
    this.container.classList.add('calisto');

    this._rail = document.createElement('div');
    this._rail.classList.add('calisto--rail');

    for( let slide of this.slides ) {
      slide.classList.add('calisto--slide');
      this._rail.appendChild( slide );
    }

    this.container.appendChild(this._rail);
  }

  goToSlide( index, transition = true, vertical = false ) {
    if( transition === true ) {
      this._transition = 'transform ' + this.speed + ' linear';
    } else {
      this._transition = 'none';
    }

    let tx = ( vertical == false ) ? -Math.abs( 100 * ( index ) ) + '%' : '0px'; 
    let ty = ( vertical == true ) ? 100 * ( index / this.length ) : '0px';
    let tz = '0px';

    console.log(tx);

    this._transform = 'translate3d(' + tx +',' + ty +','+ tz +')';

    this._rail.style.transform = this._transform;
    this._rail.style.webkitTransform = this._transform;

    this._rail.style.transition = this._transition;
    this._rail.style.webkitTransition = this._transition;


  }



}

export { Calisto };
