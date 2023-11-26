import React, { useRef, useEffect, useState } from "react";

const GameCanvas = () => {
  const canvasRef = useRef(null);
  const [turrets, setTurrets] = useState([]);
  const [loons, setLoons] = useState([]);
  const [score, setScore] = useState(0);
  const [isGameActive, setIsGameActive] = useState(false);
  const wsRef = useRef(null);

  useEffect(() => {
    if (isGameActive) {
      wsRef.current = new WebSocket(
        "wss://pronto-challenge.ngrok.app/akshithft@gmail.com/ws"
      );

      wsRef.current.onopen = () => {
        wsRef.current.send(JSON.stringify({ subscribe: "msg" }));
        wsRef.current.send(JSON.stringify({ subscribe: "loonState" }));
      };

      wsRef.current.onmessage = (event) => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data && data.loonState) {
          setLoons(
            Object.values(data.loonState).map((loon) => ({
              id: loon.id,
              x: loon.position_x,
              y: loon.position_y,
              color: "green",
            }))
          );
          console.log("Total Loons" + loons);
        }
      };

      wsRef.current.onclose = () => setIsGameActive(false);
      wsRef.current.onerror = (error) =>
        console.error("WebSocket Error:", error);
    }

    return () => {
      if (wsRef.current) {
        wsRef.current.close();
      }
    };
  }, [isGameActive]);

  // Function to send a message to the server to pop a 'Loon
  const popLoon = (loonId) => {
    console.log("This is loon id" + loonId);
    if (wsRef.current && wsRef.current.readyState === WebSocket.OPEN) {
      console.log("The loon removed - " + loonId);
      wsRef.current.send(
        JSON.stringify({
          publish: {
            popLoon: {
              loonId,
            },
          },
        })
      );
      // Remove the 'Loon from the local state
      setLoons((prevLoons) => prevLoons.filter((loon) => loon.id !== loonId));
    }
  };

  // Game loop with collision detection and popping logic
  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    canvas.width = 800;
    canvas.height = 600;

    const checkForPoppingLoons = () => {
      const turretRange = 40; // Example range of turret
      turrets.forEach((turret) => {
        loons.forEach((loon) => {
          const dx = loon.x - turret.x;
          const dy = loon.y - turret.y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < turretRange) {
            // Pop the 'Loon
            console.log("The loon id from distance calc" + loon.id);
            popLoon(loon.id);
            setScore((prevScore) => prevScore + 1);
          }
        });
      });
    };

    const draw = () => {
      context.clearRect(0, 0, canvas.width, canvas.height);
      turrets.forEach((turret) => {
        context.fillStyle = "blue";
        context.fillRect(turret.x - 25, turret.y - 25, 50, 50); // Draw the turret
      });

      loons.forEach((loon) => {
        context.fillStyle = loon.color;
        context.beginPath();
        context.arc(loon.x, loon.y, 10, 0, Math.PI * 2); // Draw the 'Loon
        context.fill();
      });

      checkForPoppingLoons();
      requestAnimationFrame(draw);
    };

    draw();
  }, [turrets, loons]); // Dependencies for re-running the game loop

  const onDrop = (e) => {
    e.preventDefault();
    if (turrets.length >= 1) return; // Limit to one turret

    const rect = canvasRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setTurrets([{ x, y, color: "blue" }]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
  };

  const startGame = () => {
    setIsGameActive(true);
    setScore(0);
    setTurrets([]);
    setLoons([]);
    // Additional setup as needed
  };

  return (
    <div>
      <button onClick={startGame} disabled={isGameActive}>
        Play Game
      </button>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <canvas
          ref={canvasRef}
          width="800"
          height="600"
          onDrop={onDrop}
          onDragOver={onDragOver}
          style={{ border: "1px solid black" }}
        />
      </div>
      <p>Score: {score}</p>
    </div>
  );
};

export default GameCanvas;
