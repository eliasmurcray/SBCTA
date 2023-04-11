import React, { Component } from 'react';
import '../scss/svg-waves.scss';

type SVGWavesProps = {
  fillColor: string;
};

export default class SVGWaves extends Component<SVGWavesProps> {
  render() {
    const pathHash = 'wave' + this.props.fillColor.replace('#','');
    const pathLink = '#' + pathHash;
    return <svg className='waves' xmlns='http://www.w3.org/2000/svg' viewBox='0 24 150 28' preserveAspectRatio='none'>
      <defs>
        <path id={pathHash} d='M-160 44c30 0 58-18 88-18s 58 18 88 18 58-18 88-18 58 18 88 18 v44h-352z' fill={this.props.fillColor} />
      </defs>
      <g className='parallax'>
        <use xlinkHref={pathLink} x='48' y='1' />
        <use xlinkHref={pathLink} x='48' y='3' />
        <use xlinkHref={pathLink} x='48' y='5' />
        <use xlinkHref={pathLink} x='48' y='7' />
      </g>
    </svg>;
  }
}