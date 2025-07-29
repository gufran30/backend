import { useEffect, useRef } from "react";
import * as faceapi from "face-api.js";
import "./facialExpression.css";
import axios from "axios";

const FacialExpression = ({ setSongs }) => {
  const videoRef = useRef();

  const loadModels = async () => {
    const MODEL_URL = "/models";
    await faceapi.nets.tinyFaceDetector.loadFromUri(MODEL_URL);
    await faceapi.nets.faceExpressionNet.loadFromUri(MODEL_URL);
  };

  const startVideo = () => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
      .then((stream) => {
        videoRef.current.srcObject = stream;
      })
      .catch((err) => console.log("Error accessing webcam: ", err));
  };

  async function detectMood() {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceExpressions();

    let mostProableExpression = 0;
    let _expression = "";

    if (!detections || detections.length === 0) {
      console.log("No face detected");
      return;
    }

    for (const expression in detections[0].expressions) {
      if (detections[0].expressions[expression] > mostProableExpression) {
        mostProableExpression = detections[0].expressions[expression];
        _expression = expression;
      }
    }
    // console.log(_expression);

    /* get http://localhost:3000/songs?mood=happy */
    axios
      .get(`http://localhost:3000/songs?mood=${_expression}`)
      .then((response) => {
        console.log(response.data);
        setSongs(response.data.songs)
      });
  }

  useEffect(() => {
    loadModels().then(startVideo);
  }, []);

  return (
    <div className="mood-element">
      <video className="user-video-feed" ref={videoRef} autoPlay muted />
      <button onClick={detectMood}>Detect Mood</button>
    </div>
  );
};

export default FacialExpression;
