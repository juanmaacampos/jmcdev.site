// src/components/Lottie2.jsx
import React, { Component } from 'react';
import lottie from 'lottie-web';

class Lottie2 extends Component {
  componentDidMount() {
    this.loadAnimation();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.animationData !== this.props.animationData) {
      this.deRegisterEvents();
      this.destroy();
      this.loadAnimation();
    }
  }

  componentWillUnmount() {
    this.deRegisterEvents();
    this.destroy();
  }

  loadAnimation() {
    const { animationData, loop, autoplay } = this.props;
    this.animation = lottie.loadAnimation({
      container: this.el,
      animationData,
      loop: loop !== undefined ? loop : true,
      autoplay: autoplay !== undefined ? autoplay : true,
    });
  }

  destroy() {
    if (this.animation) {
      this.animation.destroy();
    }
  }

  deRegisterEvents() {
    if (this.animation && this.animation.renderer) {
      this.animation.renderer.off();
    }
  }

  render() {
    return <div ref={el => this.el = el} />;
  }
}

export default Lottie2;