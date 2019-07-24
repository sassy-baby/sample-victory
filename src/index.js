import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import { VictoryPie, VictoryAnimation, VictoryLabel } from "victory";
import "./styles.css";

function App() {
  const [percent, setPercent] = useState(20);
  // const [data, setData] = useState([{ x: 1, y: 0 }, { x: 2, y: 100 - 0 }]);
  useEffect(() => {
    const interval = setInterval(() => {
      percent === 100 && clearInterval(interval);
      percent < 100 && setPercent(percent + 1);
    }, 300);
    return () => {
      clearInterval(interval);
    };
  }, [percent]);

  return (
    <div className="App">
      <svg viewBox="0 0 400 400" width="100%" height="100%">
        <VictoryPie
          standalone={false}
          animate={{ duration: 1000 }}
          width={400}
          height={400}
          data={[{ x: 1, y: percent }, { x: 2, y: 100 - percent }]}
          innerRadius={120}
          cornerRadius={25}
          labels={() => null}
          style={{
            data: {
              fill: d => {
                const color = d.y > 30 ? "green" : "red";
                return d.x === 1 ? color : "transparent";
              }
            }
          }}
        />
        <VictoryAnimation
          duration={1000}
          data={{
            percent,
            data: [{ x: 1, y: percent }, { x: 2, y: 100 - percent }]
          }}
        >
          {newProps => {
            return (
              <VictoryLabel
                textAnchor="middle"
                verticalAnchor="middle"
                x={200}
                y={200}
                text={`${Math.round(percent)}%`}
                style={{ fontSize: 45 }}
              />
            );
          }}
        </VictoryAnimation>
      </svg>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);