/*
 * Created on Fri Nov 25 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import "./AimoSteps.css";

class AimoSteps extends Component {
  state = {
    steps: [],
    relations: [],
  };

  PLACE = { TOP: 0, RIGHT: 1, BOTTOM: 2, LEFT: 3 };

  horizontalSpaceBetween = 50;
  verticalStart = 50;
  requiredDimensionSize = { width: 0, height: 0 };

  reinitialize = () => {
    const { disableAnimation } = this.props;
    const steps = this.setStepDetails();
    const relations = this.setStepRelations(steps);

    if (disableAnimation) {
      this.setState({ steps, relations });
    } else {
      let slowSteps = [];
      let slowRelations = [];

      for (
        let stepIndex = 0, delay = 0;
        stepIndex < steps.length;
        ++stepIndex
      ) {
        setTimeout(() => {
          slowSteps.push(steps[stepIndex]);
          this.setState({ steps: slowSteps });
        }, delay);
        if (stepIndex > 0) {
          delay += this.props.animationDelay;
          setTimeout(() => {
            slowRelations.push(relations[stepIndex - 1]);
            this.setState({ relations: slowRelations });
          }, delay);
        }
        delay += this.props.animationDelay;
      }
    }
  };

  componentDidMount = () => {
    this.reinitialize();
  };

  componentDidUpdate = (prevProps, prevState) => {
    if (prevProps.steps !== this.props.steps) {
      this.reinitialize();
    }
  };

  setStepDetails = () => {
    const { stepWidth, stepHeight } = this.props;

    this.requiredDimensionSize = { width: 0, height: 0 };
    let steps = [...this.props.steps];
    steps.forEach((step, index) => {
      if (typeof step.cell === "undefined") step.cell = {};
      if (typeof step.cell.row === "undefined") step.cell.row = 0;
      if (typeof step.cell.col === "undefined") step.cell.col = index;

      step.position = {
        left: step.cell.col * (stepWidth + this.horizontalSpaceBetween),
        top: this.verticalStart + (stepHeight + 20) * step.cell.row,
      };
      step.dimensions = {
        width: stepWidth,
        height: stepHeight,
      };
      this.requiredDimensionSize.width +=
        stepWidth + this.horizontalSpaceBetween;
    });

    return steps;
  };

  setStepRelations = (steps) => {
    let relations = [];

    let stepIds = {};
    steps.forEach((step) => {
      if (step.id) stepIds[`i${step.id}`] = step;
    });

    let { arrows } = this.props;
    if (typeof arrows === "undefined") {
      arrows = [];
      for (let i = 1; i < steps.length; ++i) {
        arrows.push({ from: steps[i - 1].id, to: steps[i].id });
      }
    }

    const getPlace = (src, dst) => {
      if (
        src.cell.row < dst.cell.row - 1 ||
        (src.cell.row < dst.cell.row && src.cell.col === dst.cell.col)
      )
        return this.PLACE.BOTTOM;
      if (
        src.cell.row > dst.cell.row + 1 ||
        (src.cell.row > dst.cell.row && src.cell.col === dst.cell.col)
      )
        return this.PLACE.TOP;
      if (src.cell.col < dst.cell.col) return this.PLACE.RIGHT;
      return this.PLACE.LEFT;
    };
    const getPosition = (place, step) => {
      switch (place) {
        case this.PLACE.TOP:
          return {
            x: step.position.left + step.dimensions.width / 2,
            y: step.position.top,
          };
        case this.PLACE.BOTTOM:
          return {
            x: step.position.left + step.dimensions.width / 2,
            y: step.position.top + step.dimensions.height,
          };
        case this.PLACE.LEFT:
          return {
            x: step.position.left,
            y: step.position.top + step.dimensions.height / 2,
          };
        case this.PLACE.RIGHT:
        default:
          return {
            x: step.position.left + step.dimensions.width,
            y: step.position.top + step.dimensions.height / 2,
          };
      }
    };

    arrows.forEach((arrow) => {
      if (!arrow.from) return;
      if (!arrow.to) arrow.to = arrow.from + 1;

      const startPlace = getPlace(
        stepIds[`i${arrow.from}`],
        stepIds[`i${arrow.to}`]
      );
      const endPlace = getPlace(
        stepIds[`i${arrow.to}`],
        stepIds[`i${arrow.from}`]
      );

      const start = getPosition(startPlace, stepIds[`i${arrow.from}`]);
      const end = getPosition(endPlace, stepIds[`i${arrow.to}`]);

      relations.push({ start, startPlace, end, endPlace });
    });

    return relations;
  };

  renderStep = (step, index) => {
    let colorStyle = {};
    if (step.color) colorStyle.backgroundColor = step.color;
    if (step.textColor) colorStyle.color = step.textColor;

    return (
      <div
        key={`${step.title}-${index}`}
        className={`stepContainer ${this.props.stepClassName}`}
        style={{
          left: `${step.position.left}px`,
          top: `${step.position.top}px`,
          width: `${step.dimensions.width}px`,
          height: `${step.dimensions.height}px`,
          ...colorStyle,
        }}
      >
        <span className="stepText">{step.title}</span>
      </div>
    );
  };

  renderStepRelation = (relation, index) => {
    const { disableAnimation } = this.props;

    const p2str = (points) => {
      const pointsStr = points.map((point) => `${point.x} ${point.y}`);
      return pointsStr.join(" ");
    };

    const getArrowTip = (endPos, endPlace) => {
      switch (endPlace) {
        case this.PLACE.TOP:
          return [
            { x: endPos.x, y: endPos.y - 10 },
            endPos,
            { x: endPos.x - 5, y: endPos.y - 5 },
            { x: endPos.x + 5, y: endPos.y - 5 },
            endPos,
          ];
        case this.PLACE.BOTTOM:
          return [
            { x: endPos.x, y: endPos.y + 10 },
            endPos,
            { x: endPos.x - 5, y: endPos.y + 5 },
            { x: endPos.x + 5, y: endPos.y + 5 },
            endPos,
          ];
        case this.PLACE.LEFT:
          return [
            { x: endPos.x - 10, y: endPos.y },
            endPos,
            { x: endPos.x - 5, y: endPos.y - 5 },
            { x: endPos.x - 5, y: endPos.y + 5 },
            endPos,
          ];
        case this.PLACE.RIGHT:
        default:
          return [
            { x: endPos.x + 10, y: endPos.y },
            endPos,
            { x: endPos.x + 5, y: endPos.y - 5 },
            { x: endPos.x + 5, y: endPos.y + 5 },
            endPos,
          ];
      }
    };

    const startPos = { x: relation.start.x, y: relation.start.y };
    const endPos = { x: relation.end.x, y: relation.end.y };
    const arrowTip = getArrowTip(endPos, relation.endPlace);

    const arrow = [...arrowTip];

    const d = `M ${p2str([startPos])} ${p2str(arrow)}`;

    return (
      <path
        key={index}
        className="stepRelationLine"
        d={d}
        stroke="#555555"
        strokeDasharray={disableAnimation ? 0 : 1000}
        strokeDashoffset={disableAnimation ? 0 : 1000}
        strokeWidth="1"
        fill="none"
      />
    );
  };

  render() {
    const { relations, steps } = this.state;

    return (
      <div className={`stepsContainer ${this.props.className}`}>
        {steps.map((step, index) => {
          return this.renderStep(step, index);
        })}
        <svg
          className="stepsSVG"
          style={{ width: `${this.requiredDimensionSize.width}px` }}
        >
          {relations.map((rel, index) => {
            return this.renderStepRelation(rel, index);
          })}
        </svg>
      </div>
    );
  }
}

AimoSteps.defaultProps = {
  animationDelay: 1000,
  className: null,
  disableAnimation: false,
  stepClassName: null,
  stepHeight: 50,
  steps: [],
  stepWidth: 100,
};

AimoSteps.propTypes = {
  animationDelay: PropTypes.number,
  className: PropTypes.string,
  disableAnimation: PropTypes.bool,
  stepClassName: PropTypes.string,
  stepHeight: PropTypes.number,
  steps: PropTypes.array.isRequired,
  stepWidth: PropTypes.number,
};

export default AimoSteps;
