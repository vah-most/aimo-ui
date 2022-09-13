/*
 * Created on Tue Sep 06 2022
 *
 * Copyright (c) 2022 Mostafa Vahabzadeh
 *
 * License: MIT "https://opensource.org/licenses/MIT"
 */

import React, { Component } from "react";
import PropTypes from "prop-types";

import { getTimeParts } from "./utils/Utils";
import { createLinearGradient, drawCircle, drawPolygon } from "./utils/Canvas";
import AimoIcon from "./AimoIcon";

import "./AimoCountdown.scss";

class AimoCountdown extends Component {
  state = {
    interval: 50,
    isCounting: false,
    isFinished: false,
    pieHandPoints: {
      topRight: 50,
      right: 0,
      bottom: 100,
      left: 100,
      topLeft: 0,
    },
    remaining: 30,
  };

  counterInterval = null;
  lastTimestamp = 0;
  pieCountdownCanvas = React.createRef();
  pieInnerCircleDiff =
    2 + Math.min(this.props.pieAnnulusSize, this.props.size / 2 - 2);
  pieOuterCircleDiff = 2;

  countdown = () => {
    const { isCounting, remaining } = this.state;
    const { displayMode, onChange, onFinish } = this.props;

    if (!isCounting) return;

    if (this.lastTimestamp > 0) {
      const current = Math.floor(Date.now() / 1000);
      const currRemaining = Math.max(
        remaining - (current - this.lastTimestamp),
        0
      );

      if (currRemaining !== remaining) {
        this.setState({ remaining: currRemaining });
        onChange && onChange(currRemaining);
      }
    }
    this.lastTimestamp = Math.floor(Date.now() / 1000);

    if (displayMode === "pie") {
      this.drawPieCountdownHand();
    } else {
      if (remaining === 0) {
        this.setState({ isCounting: false, isFinished: true });
        onFinish && onFinish();
      }
    }
  };

  drawPieCountdownHand = () => {
    const {
      backgroundColor,
      onFinish,
      pieAnnulusLineColor,
      pieInnerCircleColor,
      size,
    } = this.props;
    let pieHandPoints = { ...this.state.pieHandPoints };

    let points = new Array();
    points.push({ x: size / 2, y: size / 2 });
    points.push({ x: size / 2, y: 0 });
    if (pieHandPoints.topRight < size) {
      pieHandPoints.topRight++;
      points.push({ x: pieHandPoints.topRight, y: 0 });
    } else {
      points.push({ x: pieHandPoints.topRight, y: 0 });
      if (pieHandPoints.right < size) {
        points.push({
          x: pieHandPoints.topRight,
          y: pieHandPoints.right,
        });
        pieHandPoints.right++;
      } else {
        points.push({
          x: pieHandPoints.topRight,
          y: pieHandPoints.right,
        });

        if (pieHandPoints.bottom > 0) {
          points.push({
            x: pieHandPoints.bottom,
            y: pieHandPoints.right,
          });
          pieHandPoints.bottom--;
        } else {
          points.push({
            x: pieHandPoints.bottom,
            y: pieHandPoints.right,
          });

          if (pieHandPoints.left > 0) {
            points.push({
              x: pieHandPoints.bottom,
              y: pieHandPoints.left,
            });
            pieHandPoints.left--;
          } else {
            points.push({
              x: pieHandPoints.bottom,
              y: pieHandPoints.left,
            });

            if (pieHandPoints.topLeft < size / 2) {
              points.push({
                x: pieHandPoints.topLeft,
                y: pieHandPoints.left,
              });
              pieHandPoints.topLeft++;
            } else {
              this.setState({ isCounting: false, isFinished: true });
              onFinish && onFinish();
            }
          }
        }
      }
    }
    drawPolygon(
      this.pieCountdownCanvas.current,
      points,
      backgroundColor,
      backgroundColor,
      "source-over"
    );

    drawCircle(
      this.pieCountdownCanvas.current,
      { x: size / 2, y: size / 2 },
      size / 2 - this.pieOuterCircleDiff,
      null,
      pieAnnulusLineColor,
      "source-over"
    );

    drawCircle(
      this.pieCountdownCanvas.current,
      { x: size / 2, y: size / 2 },
      size / 2 - this.pieInnerCircleDiff,
      pieInnerCircleColor,
      pieAnnulusLineColor,
      "source-over"
    );

    this.setState({ pieHandPoints });
  };

  clearPieCountdownHand = () => {
    const canvas = this.pieCountdownCanvas.current;
    const ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  initPieCountdown = () => {
    const {
      pieAnnulusForegroundGradientFrom,
      pieAnnulusForegroundGradientTo,
      pieAnnulusForegroundColor,
      pieAnnulusLineColor,
      pieInnerCircleColor,
      size,
    } = this.props;
    const pieHandPoints = {
      topRight: size / 2,
      right: 0,
      bottom: size,
      left: size,
      topLeft: 0,
    };

    this.setState({ pieHandPoints });

    //draw outer circle
    const gradient = pieAnnulusForegroundColor
      ? pieAnnulusForegroundColor
      : createLinearGradient(
          this.pieCountdownCanvas.current,
          pieAnnulusForegroundGradientFrom,
          pieAnnulusForegroundGradientTo
        );
    drawCircle(
      this.pieCountdownCanvas.current,
      { x: size / 2, y: size / 2 },
      size / 2 - this.pieOuterCircleDiff,
      gradient,
      pieAnnulusLineColor
    );

    //draw inner circle
    drawCircle(
      this.pieCountdownCanvas.current,
      { x: size / 2, y: size / 2 },
      size / 2 - this.pieInnerCircleDiff,
      pieInnerCircleColor,
      pieAnnulusLineColor
    );
  };

  componentDidMount = () => {
    const { displayMode, size, timeout } = this.props;

    this.setState({
      remaining: timeout,
    });

    if (displayMode === "pie") this.initPieCountdown();

    const interval = Math.floor(timeout * 1000) / (4 * size);
    if (!this.counterInterval)
      this.counterInterval = setInterval(this.countdown, interval);
    this.setState({ interval });
  };

  componentWillUnmount = () => {
    if (this.counterInterval) clearInterval(this.counterInterval);
    this.counterInterval = null;
  };

  renderDigitalCountdown = () => {
    const { isCounting, remaining } = this.state;
    const { disableBlink, displayDigitalSideNumbers, lastSecondsThreashold } =
      this.props;

    const time = getTimeParts(remaining);
    const rows = displayDigitalSideNumbers ? [-2, -1, 0, 1, 2] : [0];
    return (
      <div className="countdownDigitalContainer">
        {rows.map((row) => {
          const hour = time.hours + row;
          const minute = time.minutes + row;
          const second = time.seconds + row;
          return (
            <div
              key={row}
              className={`countdownDigitalRow ${
                !disableBlink && row === 0 && isCounting
                  ? "countdownNumberBlink"
                  : ""
              } ${
                remaining <= lastSecondsThreashold ? "lastSecondsNumber" : ""
              } ${remaining === 0 ? "timeoutShake" : ""}`}
            >
              <div>
                {(hour < 0
                  ? 24 + hour
                  : hour > 23
                  ? hour - 24
                  : hour
                ).toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </div>
              <div>
                {(minute < 0
                  ? 60 + minute
                  : minute > 59
                  ? minute - 60
                  : minute
                ).toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </div>
              <div>
                {(second < 0
                  ? 60 + second
                  : second > 59
                  ? second - 60
                  : second
                ).toLocaleString("en-US", {
                  minimumIntegerDigits: 2,
                  useGrouping: false,
                })}
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  renderPieCountdown = () => {
    const { isCounting, remaining } = this.state;
    const {
      backgroundColor,
      disableBlink,
      displayPieNumber,
      lastSecondsThreashold,
      renderPieNumber,
      size,
    } = this.props;
    return (
      <div
        className="countdownPieContainer"
        style={{ width: size, height: size }}
      >
        {displayPieNumber &&
          (renderPieNumber ? (
            renderPieNumber(remaining)
          ) : (
            <div
              className={`countdownPieSeconds ${
                !disableBlink && isCounting ? "countdownNumberBlink" : ""
              } ${
                remaining <= lastSecondsThreashold ? "lastSecondsNumber" : ""
              } ${remaining === 0 ? "timeoutShake" : ""}`}
              style={{ fontSize: size / 6 }}
            >
              {remaining}
            </div>
          ))}
        <canvas
          ref={this.pieCountdownCanvas}
          width={"100%"}
          height={"100%"}
          style={{ zIndex: 1, backgroundColor: backgroundColor }}
        ></canvas>
      </div>
    );
  };

  toggleCountdownPlay = () => {
    const isCounting = !this.state.isCounting;

    if (!isCounting) this.lastTimestamp = 0;
    this.setState({ isCounting });
  };

  handleCountdownStop = () => {
    const { displayMode, timeout } = this.props;

    if (displayMode === "pie") {
      this.clearPieCountdownHand();
      this.initPieCountdown();
    }

    this.setState({
      isCounting: false,
      isFinished: false,
      remaining: timeout,
    });
    this.lastTimestamp = 0;
  };

  render() {
    const { isCounting, isFinished } = this.state;
    const { buttonsPosition, displayMode, renderOperationButtons } = this.props;

    let flexDirection = "column";
    switch (buttonsPosition) {
      case "top":
        flexDirection = "column-reverse";
        break;
      case "right":
        flexDirection = "row";
        break;
      case "left":
        flexDirection = "row-reverse";
        break;
      default:
        flexDirection = "column";
        break;
    }
    return (
      <div
        className="countdownContainer"
        style={{ flexDirection: flexDirection }}
      >
        {displayMode === "digital"
          ? this.renderDigitalCountdown()
          : this.renderPieCountdown()}
        {renderOperationButtons ? (
          renderOperationButtons(
            this.toggleCountdownPlay,
            this.handleCountdownStop
          )
        ) : (
          <div className="countdownOperationContainer">
            <div
              onClick={isFinished ? null : this.toggleCountdownPlay}
              className={isFinished ? "disabledOperationButton" : null}
            >
              {isCounting ? (
                <AimoIcon name="pause" />
              ) : (
                <AimoIcon name="play" />
              )}
            </div>
            <div onClick={this.handleCountdownStop}>
              <AimoIcon name="stop" />
            </div>
          </div>
        )}
      </div>
    );
  }
}

AimoCountdown.defaultProps = {
  backgroundColor: "#FFFFFF",
  buttonsPosition: "bottom",
  disableBlink: false,
  displayDigitalSideNumbers: true,
  displayMode: "digital",
  displayPieNumber: true,
  lastSecondsClassName: null,
  lastSecondsThreashold: 5,
  onChange: null,
  onFinish: null,
  pieAnnulusForegroundColor: null,
  pieAnnulusForegroundGradientFrom: "#008000",
  pieAnnulusForegroundGradientTo: "#0000FF",
  pieAnnulusLineColor: "#000000",
  pieAnnulusSize: 10,
  pieInnerCircleColor: "#EEEEEE",
  renderOperationButtons: null,
  renderPieNumber: null,
  size: 100,
  timeout: 60,
};

AimoCountdown.propTypes = {
  backgroundColor: PropTypes.string,
  buttonsPosition: PropTypes.oneOf(["bottom", "top", "left", "right"]),
  disableBlink: PropTypes.bool,
  displayDigitalSideNumbers: PropTypes.bool,
  displayMode: PropTypes.oneOf(["pie", "digital"]),
  displayPieNumber: PropTypes.bool,
  lastSecondsClassName: PropTypes.string,
  lastSecondsThreashold: PropTypes.number,
  onChange: PropTypes.func,
  onFinish: PropTypes.func,
  pieAnnulusForegroundColor: PropTypes.string,
  pieAnnulusForegroundGradientFrom: PropTypes.string,
  pieAnnulusForegroundGradientTo: PropTypes.string,
  pieAnnulusLineColor: PropTypes.string,
  pieAnnulusSize: PropTypes.number,
  pieInnerCircleColor: PropTypes.string,
  renderOperationButtons: PropTypes.func,
  renderPieNumber: PropTypes.func,
  size: PropTypes.number,
  timeout: PropTypes.number.isRequired,
};

export default AimoCountdown;
