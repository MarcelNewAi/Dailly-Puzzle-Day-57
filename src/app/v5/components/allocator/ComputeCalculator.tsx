"use client";

import { ChangeEvent, type CSSProperties, useMemo, useState } from "react";

interface CalculatorState {
  modelParams: number;
  traffic: number;
  desiredLatency: number;
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function formatNumber(value: number) {
  return value.toLocaleString("en-US");
}

function ParamIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M14 3c4 0 7 3 7 7 0 4-2 8-8 11-3-6-3-9-3-10 0-4 3-8 4-8z" />
      <path d="M9 13 3 19" />
      <path d="M5 21h4" />
      <circle cx="15.5" cy="8.5" r="1.4" />
    </svg>
  );
}

function TrafficIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M13 2 5 13h6l-1 9 9-13h-6z" />
    </svg>
  );
}

function LatencyIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="8" />
      <path d="M12 8v5l3 2" />
    </svg>
  );
}

export default function ComputeCalculator() {
  const [state, setState] = useState<CalculatorState>({
    modelParams: 51.1,
    traffic: 4710,
    desiredLatency: 410,
  });

  const qCreditsPerSecond = useMemo(() => {
    return Math.round((state.modelParams * 0.8) * (state.traffic / 1000) * (1000 / state.desiredLatency) * 1.25);
  }, [state.desiredLatency, state.modelParams, state.traffic]);

  const hourly = qCreditsPerSecond * 3600;
  const daily = hourly * 24;
  const monthly = daily * 30;

  const onRangeChange = (key: keyof CalculatorState) => (event: ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value);
    setState((prev) => ({ ...prev, [key]: value }));
  };

  const onInputChange =
    (key: keyof CalculatorState, min: number, max: number) => (event: ChangeEvent<HTMLInputElement>) => {
      const value = Number(event.target.value);
      if (Number.isNaN(value)) {
        setState((prev) => ({ ...prev, [key]: min }));
        return;
      }
      setState((prev) => ({ ...prev, [key]: clamp(value, min, max) }));
    };

  const sliderProgress = (value: number, min: number, max: number): CSSProperties => ({
    "--nq-slider-progress": `${((value - min) / (max - min)) * 100}%`,
  }) as CSSProperties;

  return (
    <section className="nq-calc-grid" aria-label="Compute cost calculator">
      <div className="nq-calc-inputs">
        <article className="nq-card nq-calc-card nq-anim-left nq-anim-delay-2">
          <div className="nq-calc-head">
            <p className="nq-card-title nq-title-with-icon">
              <ParamIcon />
              <span>Model Parameters</span>
            </p>
            <span className="nq-calc-value">{state.modelParams.toFixed(1)}B</span>
          </div>
          <input
            type="range"
            min={0.1}
            max={100}
            step={0.1}
            value={state.modelParams}
            onChange={onRangeChange("modelParams")}
            className="nq-slider"
            style={sliderProgress(state.modelParams, 0.1, 100)}
            aria-label="Model parameters in billions"
          />
          <div className="nq-range-labels">
            <span>0.1B</span>
            <span>100B</span>
          </div>
          <input
            type="number"
            min={0.1}
            max={100}
            step={0.1}
            value={state.modelParams}
            onChange={onInputChange("modelParams", 0.1, 100)}
            className="nq-value-input nq-mono"
            aria-label="Type model parameters"
          />
        </article>

        <article className="nq-card nq-calc-card nq-anim-left nq-anim-delay-3">
          <div className="nq-calc-head">
            <p className="nq-card-title nq-title-with-icon">
              <TrafficIcon />
              <span>Expected Traffic</span>
            </p>
            <span className="nq-calc-value">{state.traffic} req/s</span>
          </div>
          <input
            type="range"
            min={1}
            max={10000}
            step={1}
            value={state.traffic}
            onChange={onRangeChange("traffic")}
            className="nq-slider"
            style={sliderProgress(state.traffic, 1, 10000)}
            aria-label="Expected traffic requests per second"
          />
          <div className="nq-range-labels">
            <span>1 req/s</span>
            <span>10K req/s</span>
          </div>
          <input
            type="number"
            min={1}
            max={10000}
            step={1}
            value={state.traffic}
            onChange={onInputChange("traffic", 1, 10000)}
            className="nq-value-input nq-mono"
            aria-label="Type expected traffic"
          />
        </article>

        <article className="nq-card nq-calc-card nq-anim-left nq-anim-delay-4">
          <div className="nq-calc-head">
            <p className="nq-card-title nq-title-with-icon">
              <LatencyIcon />
              <span>Desired Latency</span>
            </p>
            <span className="nq-calc-value">{state.desiredLatency}ms</span>
          </div>
          <input
            type="range"
            min={10}
            max={1000}
            step={1}
            value={state.desiredLatency}
            onChange={onRangeChange("desiredLatency")}
            className="nq-slider"
            style={sliderProgress(state.desiredLatency, 10, 1000)}
            aria-label="Desired latency in milliseconds"
          />
          <div className="nq-range-labels">
            <span>10ms</span>
            <span>1000ms</span>
          </div>
          <input
            type="number"
            min={10}
            max={1000}
            step={1}
            value={state.desiredLatency}
            onChange={onInputChange("desiredLatency", 10, 1000)}
            className="nq-value-input nq-mono"
            aria-label="Type desired latency"
          />
        </article>
      </div>

      <div className="nq-calc-results">
        <div className="nq-result-gradient nq-anim-right nq-anim-delay-3">
          <article className="nq-result-main">
            <p className="nq-card-title">Q-Credits Required</p>
            <p className="nq-main-value nq-mono">{formatNumber(qCreditsPerSecond)}</p>
            <p className="nq-main-caption">credits per second</p>
          </article>
        </div>

        {[
          { title: "Hourly", subtitle: "Per hour usage", value: hourly },
          { title: "Daily", subtitle: "24-hour projection", value: daily },
          { title: "Monthly", subtitle: "30-day estimate", value: monthly },
        ].map((item, index) => (
          <article key={item.title} className="nq-card nq-breakdown nq-anim-right" style={{ animationDelay: `${500 + index * 100}ms` }}>
            <div>
              <p className="nq-card-title">{item.title}</p>
              <p className="nq-breakdown-subtitle">{item.subtitle}</p>
            </div>
            <p className="nq-breakdown-value nq-mono">{formatNumber(item.value)} Q-Credits</p>
          </article>
        ))}
      </div>
    </section>
  );
}
