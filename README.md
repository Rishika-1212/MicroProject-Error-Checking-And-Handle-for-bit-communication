# **Interactive Error Detection & Correction Simulation**

## **Overview**
This project is an interactive **Error Detection & Correction Simulation** that visually demonstrates various techniques used in network communication to identify and correct transmission errors. The simulation is designed using **2D animations and whiteboard-style explanations** to ensure clarity and engagement. Users can input messages, observe how errors occur during transmission, and witness step-by-step detection and correction mechanisms in action.

## **Features**
✅ **Fully Animated Visualizations** – Engaging step-by-step 2D/whiteboard animations for better understanding.  
✅ **User Input & Interactive Simulation** – Users enter messages and experience real-time transmission errors.  
✅ **Multiple Error Detection Techniques** – Parity Bit, Checksum, Hamming Code, CRC, and Repetition Code.  
✅ **Error Correction Methods** – Hamming Code Correction, Automatic Repeat Request (ARQ), and Forward Error Correction (FEC).  
✅ **Logical Step-by-Step Breakdown** – Ensuring each method is clearly demonstrated and explained.

## **Technologies Used**
- **Programming Languages:** Reactjs

## **How It Works**
1. **Error Detection:**
   - The user enters a binary message.
   - The system encodes and transmits the message with potential intentional corruption.
   - The receiver detects errors using various detection methods and displays the analysis.

2. **Error Correction:**
   - If an error is found, the system switches to correction mode.
   - The incorrect bits are identified and corrected step by step.
   - The corrected message is displayed with visual confirmation.

## **Error Detection Techniques Implemented**
1. **Parity Bit** – Ensures even/odd parity; mismatch indicates an error.
2. **Checksum** – Message sums are compared at sender and receiver.
3. **Hamming Code** – Identifies single-bit errors using parity bits.
4. **Cyclic Redundancy Check (CRC)** – Uses polynomial division to generate checksums.
5. **Repetition Code** – Simple majority vote-based error detection.

## **Error Correction Techniques Implemented**
1. **Hamming Code Correction** – Locates and flips incorrect bits.
2. **Automatic Repeat Request (ARQ)** – Requests retransmission upon error detection.
3. **Forward Error Correction (FEC)** – Uses redundant bits for self-correction.

## **Installation & Usage**
### **Installation**
1. Clone the repository:
   ```bash
   git clone https://github.com/Rishika-1212/MicroProject-Error-Checking-And-Handle-for-bit-communication.git
   ```
2. Navigate to the project directory:
   ```bash
   cd error-detection-simulation
   ```
3. Open `index.html` in a browser to start the simulation.

### **Usage**
- Input a binary message in the provided field.
- Choose an error detection method to see how errors are identified.
- If errors are detected, select a correction method to visualize the step-by-step recovery process.
- View results and detailed explanations through animations and diagrams.

**Author**
Developed by Rishika lawankar – Passionate about networking, AI, and technology-driven solutions.

**License**
This project is open-source under the **MIT License**. Feel free to modify and enhance it as needed.


🚀 **Enhance your understanding of network error handling with this interactive simulation!**
