import './morgan-slide.scss'

function applyStyles(target, styles) {
    Object.assign(target.style, styles)
    // for( let style in styles ) {
    //     target.style[style] = styles[style]
    // }
}

function transformSlider(target, width) {

    const node = target.cloneNode(true);
          node.classList.add('ms-slider')

    // create the rail
    const rail = document.createElement('div');
          rail.classList.add('ms-rail')
    const railChildren = [...node.children];

    let i = 1
    
    Object.assign(node.style, {
        overflow: 'hidden',
        position: 'relative'
    })

    for ( let child of railChildren ) {
        child.classList.add('ms-slide')
        child.id = `ms-slide-${i++}`
        applyStyles(child, {
            width: '100%',
            boxSizing: 'border-box',
            backfaceVisibility: 'hidden'
        });
    }
    for( let child of railChildren ) {
        rail.appendChild(child)
    }
    Object.assign(rail.style, {
        display: 'flex',
        width: `${railChildren.length * 100}%`
      })
    console.log(node);
    node.appendChild(rail)

    return node;

}

function setToolsContainer(appendTo) {
    if( ! appendTo.querySelector('.ms-toolbar') ) {
        const tools = document.createElement('div');
              tools.classList.add('ms-tools');
        appendTo.appendChild(tools)
    }
}

function setControls(appendTo, nextFN, prevFN) {
    const prev = document.createElement('div');
          prev.addEventListener('click', prevFN)
          prev.innerHTML = "&larr;"
          prev.classList.add('ms-prev');

    const next = document.createElement('div');
          next.addEventListener('click', nextFN)
          next.classList.add('ms-next');
          next.innerHTML = '&rarr;'

    const controls = document.createElement('div');
          Object.assign(controls.style, {
              display: 'flex',
              marginTop: '15px',
              marginBottom: '15px',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer'
          });
    controls.appendChild(prev);
    controls.appendChild(next);
    appendTo.appendChild(controls)
}
export default class MorganSlide {
    constructor(target, props) {
        this.props = Object.assign({ autoplay: false, startIndex: 0, controls: false }, props)
        this.target = target
        this.length = [...target.children].length
        this.moveBy = target.getBoundingClientRect().width
        this.slider = transformSlider(target, this.moveBy);
        this.currentIndex = this.props.startIndex;
        this.slides = [...this.target.children];
        this.hasAutoPlay = typeof this.props.autoplay === 'object'
        this.autoplay = null;
        this.autoplayTime = this.props.autoplay.time || 1000
        this.autoplaySpeed = this.props.autoplay.speed || 300
        this.controls = this.props.controls

        document.addEventListener('DOMContentLoaded', (event) => {
            this.init();
        })
    
    }

    init() {

        this.target.parentNode.insertBefore(this.slider, this.target)
        this.targetNode = this.target
        this.target.parentNode.removeChild(this.target);
        this.rail = this.slider.querySelector('.ms-rail');
        console.log(this.rail)
        console.log(this.slider)

        if( this.controls ) {
            setToolsContainer(this.slider)
            setControls(this.slider.querySelector('.ms-tools'), () => this.goToNextSlide(), () => this.goToPreviousSlide())
        }

        if( this.hasAutoPlay ) {
            setToolsContainer(this.slider)
            this.play();
        }

    }

    goToSlide(slideIndex) {
        Object.assign(this.rail.style, {
            transform: `translateX(${-Math.abs(slideIndex/this.slides.length * 100)}%)`,
            transition: `transform ${this.autoplaySpeed}ms ease`
        })
        
        this.currentIndex = slideIndex
    }

    goToNextSlide() {
        if( this.currentIndex >= this.length - 1) {
            return false
        }
        this.goToSlide(this.currentIndex + 1)
    }

    goToPreviousSlide() {
        if( this.currentIndex <= 0 ) {
            return false;
        }
        this.goToSlide(this.currentIndex - 1)
    }

    pause() {

    }

    play() {
        this.autoplay = setInterval(() => {
            if( this.currentIndex >= this.slides.length - 1 ) {
                return clearInterval(this.autoplay)
            } else {
                return this.goToSlide(this.currentIndex + 1)
            }
        }, this.autoplayTime)

    }

    add() {

    }

    remove() {

    }

    filter() {

    }

    unfilter() {

    }

    destroy() {
        this.slider.parentNode.insertBefore(this.targetNode, this.slider);
        this.slider.parentNode.removeChild(this.slider)

    }
}