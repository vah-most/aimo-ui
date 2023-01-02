/*
 * Created on Sun Jul 17 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import "./AimoTooltip.scss";

class AimoTooltip extends Component {
  state = {
    place: {
      bottom: true,
      left: false,
    },
    positionStyle: {},
    tooltipDimensions: {
      width: 0,
      height: 0,
    },
  };

  tooltipRef = React.createRef();

  setHoverClass = () => {
    const targetCSS = `#${this.props.target}:hover ~ .tooltipContainer{ visibility: visible }`;
    const targetStyle = document.createElement("style");

    if (targetStyle.styleSheet) {
      targetStyle.styleSheet.cssText = targetCSS;
    } else {
      targetStyle.appendChild(document.createTextNode(targetCSS));
    }

    document.getElementsByTagName("head")[0].appendChild(targetStyle);
  };

  findTargetPosition = () => {
    const target = document.getElementById(this.props.target);
    if (!target) return null;

    const targetSpecs = target.getBoundingClientRect();
    return targetSpecs;
  };

  findBestPlace = (targetX, targetY) => {
    let place = { bottom: true, left: false };
    if (!window || !window.screen) return place;

    const [maxTooltipWidth, maxTooltipHeight] = [200, 200];

    if (targetX + maxTooltipWidth > window.screen.availWidth) place.left = true;
    if (targetY + maxTooltipHeight > window.screen.availHeight)
      place.bottom = false;

    this.setState({ place });
    return place;
  };

  setPosition = () => {
    try {
      const targetSpecs = this.findTargetPosition();
      if (!targetSpecs) return false;

      const place = this.findBestPlace(targetSpecs.x, targetSpecs.y);

      const { width: tooltipWidth, height: tooltipHeight } =
        this.tooltipRef.current.getBoundingClientRect();

      let positionStyle = {};
      if (place.bottom)
        positionStyle.top = `${targetSpecs.y + targetSpecs.height + 1}px`;
      else positionStyle.top = `${targetSpecs.y - tooltipHeight + 1}px`;

      if (place.left)
        positionStyle.left = `${targetSpecs.x - tooltipWidth + 1}px`;
      else positionStyle.left = `${targetSpecs.x + 1}px`;

      this.setState({
        positionStyle,
        tooltipDimensions: { width: tooltipWidth, height: tooltipHeight },
      });
      return true;
    } catch (err) {
      return false;
    }
  };

  componentDidMount = () => {
    if (this.setPosition()) this.setHoverClass();
  };

  componentDidUpdate = (prevState, prevProps) => {
    const { tooltipDimensions } = this.state;
    const { width: tooltipWidth, height: tooltipHeight } =
      this.tooltipRef.current.getBoundingClientRect();

    if (
      tooltipDimensions.width !== tooltipWidth ||
      tooltipDimensions.height !== tooltipHeight
    )
      this.setPosition();
  };

  render() {
    let { place, positionStyle } = this.state;
    return (
      <div
        ref={this.tooltipRef}
        className={`tooltipContainer ${
          place.left ? "tooltipContainerRight" : "tooltipContainerLeft"
        } ${place.bottom ? "tooltipContainerBottom" : "tooltipContainerTop"} ${
          this.props.containerClassName
        }`}
        style={positionStyle}
      >
        <div
          className={`tooltipArrow ${
            place.left ? "tooltipArrowRight" : "tooltipArrowLeft"
          } ${place.bottom ? "tooltipArrowBottom" : "tooltipArrowTop"} ${
            this.props.arrowClassName
          }`}
        >
          &nbsp;
        </div>
        <div
          className={`tooltipBody ${
            place.left ? "tooltipBodyRight" : "tooltipBodyLeft"
          } ${place.bottom ? "tooltipBodyBottom" : "tooltipBodyTop"} ${
            this.props.bodyClassName
          }`}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

AimoTooltip.propTypes = {
  arrowClassName: PropTypes.string,
  bodyClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  containerClassName: PropTypes.string,
  target: PropTypes.string.isRequired,
};

export default AimoTooltip;
