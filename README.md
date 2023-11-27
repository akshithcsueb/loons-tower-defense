# loons-tower-defense

# APP URL -
https://jocular-druid-fff45c.netlify.app/

# Instructions to deploy application locally
1) Ensure Node.js is installed.
2) Open Terminal or Command Prompt: Navigate to the project's directory using the terminal or command prompt.
3) change directory to client folder - cd client
4) Install Dependencies - npm install
5) Start the Local Server - npm start
6) Access the Application - http://localhost:3000

# Potential Bugs
In the current implementation of the 'Loons Tower Defense game, there are several potential areas for bugs or exploits, particularly concerning the game mechanics and the RPC (Remote Procedure Call) interface. One significant area of concern is the WebSocket communication channel. If not securely implemented, it could be susceptible to interception or manipulation, allowing an attacker to send false game states or control game elements maliciously. To mitigate this, ensuring secure WebSocket connections (WSS) and implementing authentication and validation checks for incoming messages is crucial.

Another potential exploit is related to the client-side handling of game logic, like 'Loon popping. Since the logic resides on the client side, it might be possible for a user to manipulate the game state locally, for instance, by popping 'Loons arbitrarily or modifying scores. Moving critical game logic to the server side, where it can be securely managed and validated, would be a more robust approach. This server-side validation ensures that all actions, like 'Loon popping, are legitimate and in accordance with the game rules.

The current architecture also relies heavily on the client-side for game mechanics, which might result in inconsistent gameplay experiences across different devices, especially if they have varying processing capabilities. Implementing more game logic on the server side could provide a more uniform and controlled game environment.

Additionally, the use of environment variables for configuration can be expanded to include more dynamic elements of the game, such as adjusting difficulty or introducing new game modes, without requiring code changes. This flexibility would allow for easier updates and modifications to the game mechanics.

Finally, regular code reviews and automated testing, including stress testing the WebSocket server, can help identify and address potential vulnerabilities or performance bottlenecks. By considering these improvements, the game can be made more secure, reliable, and enjoyable for its players.
