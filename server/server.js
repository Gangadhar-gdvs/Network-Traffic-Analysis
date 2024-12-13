const express = require('express');
const multer = require('multer');
const pcapParser = require('pcap-parser');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(cors());
app.use(express.json());

// Helper function to convert bytes to IP address
const bytesToIP = (bytes) => `${bytes[0]}.${bytes[1]}.${bytes[2]}.${bytes[3]}`;

const analyzeTraffic = (pcapStream) => {
  return new Promise((resolve, reject) => {
    const parser = pcapParser.parse(pcapStream);
    const packetSummary = [];

    parser.on('packet', (packet) => {
      // Ensure packet has enough data to extract IP addresses
      if (packet.data.length >= 54) { // Check for minimum length for IP data
        const src = bytesToIP(packet.data.slice(26, 30));
        const dst = bytesToIP(packet.data.slice(30, 34));
        const proto = packet.data[23]; // Protocol is at byte 23 in IP header
        const len = packet.data.length;

        packetSummary.push({ src, dst, proto, len });
      }
    });

    parser.on('end', () => {
      const summary = packetSummary.reduce((acc, packet) => {
        acc.totalPackets += 1;
        acc.totalLength += packet.len;
        acc.proto[packet.proto] = (acc.proto[packet.proto] || 0) + 1;
        acc.src[packet.src] = (acc.src[packet.src] || 0) + 1;
        acc.dst[packet.dst] = (acc.dst[packet.dst] || 0) + 1;
        return acc;
      }, { totalPackets: 0, totalLength: 0, proto: {}, src: {}, dst: {} });

      resolve(summary);
    });

    parser.on('error', (err) => {
      reject(err);
    });
  });
};

app.post('/upload', upload.single('pcap'), async (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  const pcapPath = req.file.path;

  try {
    const pcapStream = fs.createReadStream(pcapPath);
    const analysisResult = await analyzeTraffic(pcapStream);
    res.json(analysisResult);
    fs.unlinkSync(pcapPath); // Clean up uploaded file after processing
  } catch (error) {
    res.status(500).send(`Error analyzing traffic: ${error.message}`);
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
