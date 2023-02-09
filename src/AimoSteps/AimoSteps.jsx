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
      step.position = {
        left: index * (stepWidth + this.horizontalSpaceBetween),
        top: this.verticalStart,
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
    for (let i = 1; i < steps.length; ++i) {
      const start = {
        x: steps[i - 1].position.left + steps[i - 1].dimensions.width,
        y: steps[i - 1].position.top + steps[i - 1].dimensions.height / 2,
      };
      const end = {
        x: steps[i].position.left,
        y: steps[i].position.top + steps[i].dimensions.height / 2,
      };
      relations.push({ start, end });
    }

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

    let d = `M ${relation.start.x} ${relation.start.y}`;
    if (relation.start.x <= relation.end.x) {
      d += ` L ${relation.start.x} ${relation.end.y} ${relation.end.x} ${
        relation.end.y
      }  ${relation.end.x - 5} ${relation.end.y - 5} ${relation.end.x - 5} ${
        relation.end.y + 5
      } ${relation.end.x} ${relation.end.y}`;
    } else {
      d += ` L ${relation.start.x} ${
        relation.start.y + (relation.end.y - relation.start.y) / 2
      } ${relation.end.x - 10} ${
        relation.start.y + (relation.end.y - relation.start.y) / 2
      }  ${relation.end.x - 10} ${relation.end.y} ${relation.end.x} ${
        relation.end.y
      } ${relation.end.x - 5} ${relation.end.y - 5} ${relation.end.x - 5} ${
        relation.end.y + 5
      } ${relation.end.x} ${relation.end.y}`;
    }
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
