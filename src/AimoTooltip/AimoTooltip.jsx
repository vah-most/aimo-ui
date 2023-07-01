/*
 * Created on Sun Jul 17 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import "./AimoTooltip.css";

class AimoTooltip extends Component {
  state = {
    arrowStyle: {},
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

    let newParent = document.getElementById(target.id + "-parent");
    if (!newParent) {
      const targetParent = target.parentElement;
      newParent = document.createElement("div");
      newParent.id = target.id + "-parent";
      newParent.style.position = "relative";
      newParent.appendChild(target);
      newParent.appendChild(this.tooltipRef.current);
      targetParent.appendChild(newParent);
      try {
        targetParent.removeChild(target);
      } catch (err) {}
    }

    const targetSpecs = {
      offsetLeft: target.offsetLeft,
      offsetTop: target.offsetTop,
      clientRect: target.getBoundingClientRect(),
    };

    return targetSpecs;
  };

  findBestPlace = (targetX, targetY) => {
    let place = { bottom: true, left: false };
    if (!window || !window.screen) return place;

    /**TODO: Best-Place calculations are buggy for containers with scrolls.
            So, I'm temporarily commenting this till later */
    /*
    const [maxTooltipWidth, maxTooltipHeight] = [200, 200];

    if (targetX + maxTooltipWidth > window.screen.availWidth) place.left = true;
    if (targetY + maxTooltipHeight > window.screen.availHeight)
      place.bottom = false;
    */

    this.setState({ place });
    return place;
  };

  setPosition = () => {
    try {
      const targetSpecs = this.findTargetPosition();
      if (!targetSpecs) return false;

      const place = this.findBestPlace(
        targetSpecs.clientRect.x,
        targetSpecs.clientRect.y
      );

      const { width: tooltipWidth, height: tooltipHeight } =
        this.tooltipRef.current.getBoundingClientRect();

      let positionStyle = {};
      /**TODO: Should set tooltip position based on `place` */
      positionStyle.top = `${targetSpecs.clientRect.height}px`;
      positionStyle.left = `${
        targetSpecs.clientRect.width / 2 -
        tooltipWidth / 2 +
        targetSpecs.offsetLeft
      }px`;

      let arrowStyle = {};
      switch (this.props.arrowPosition) {
        case "left":
          arrowStyle = { alignItems: "flex-start" };
          break;
        case "right":
          arrowStyle = { alignItems: "flex-end" };
          break;
        case "center":
        default:
          arrowStyle = {};
          break;
      }

      this.setState({
        arrowStyle,
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
    let { arrowStyle, place, positionStyle } = this.state;

    let tooltipBodyExtraClassName = "";
    if (this.props.arrowPosition !== "center") {
      tooltipBodyExtraClassName += place.left
        ? " tooltipBodyRight"
        : " tooltipBodyLeft";

      tooltipBodyExtraClassName += place.bottom
        ? " tooltipBodyBottom"
        : " tooltipBodyTop";
    }
    return (
      <div
        ref={this.tooltipRef}
        className={`tooltipContainer ${
          place.left ? "tooltipContainerRight" : "tooltipContainerLeft"
        } ${place.bottom ? "tooltipContainerBottom" : "tooltipContainerTop"} ${
          this.props.containerClassName
        }`}
        style={{ ...positionStyle, ...arrowStyle }}
      >
        <div className={`tooltipArrow ${this.props.arrowClassName}`}>
          &nbsp;
        </div>
        <div
          className={`tooltipBody ${tooltipBodyExtraClassName} ${this.props.bodyClassName}`}
        >
          {this.props.children}
        </div>
      </div>
    );
  }
}

AimoTooltip.defaultProps = {
  arrowClassName: "",
  arrowPosition: "center",
  bodyClassName: "",
  children: null,
  containerClassName: "",
  target: null,
};

AimoTooltip.propTypes = {
  arrowClassName: PropTypes.string,
  arrowPosition: PropTypes.oneOf(["left", "center", "right"]),
  bodyClassName: PropTypes.string,
  children: PropTypes.node.isRequired,
  containerClassName: PropTypes.string,
  target: PropTypes.string.isRequired,
};

export default AimoTooltip;
