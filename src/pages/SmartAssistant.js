// SmartAssistant.js

import React, { useState, useRef, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Header from '../components/Header';
import './SmartAssistant.css';

function SmartAssistant() {
  const location = useLocation();
  const uploadedFile = location.state?.uploadedFile;
  const [question, setQuestion] = useState("");
  const [response, setResponse] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [audioBlob, setAudioBlob] = useState(null);
  const mediaRecorderRef = useRef(null);
  const audioURL = audioBlob ? URL.createObjectURL(audioBlob) : null;
  const [summary, setSummary] = useState("");

  useEffect(() => {
    if (uploadedFile === "MLP.pdf") {
      setSummary(`MLP-Mixer: An All-MLP Architecture for Vision<br><br>
<strong>Authors:</strong> Ilya Tolstikhin, Neil Houlsby, Alexander Kolesnikov, Lucas Beyer, Xiaohua Zhai, et al.<br>
<strong>Source:</strong> Google Research, Brain Team<br><br>
---
<h3>Background</h3>
Traditional computer vision models rely on either Convolutional Neural Networks (CNNs), which apply convolution operations to extract spatial features, or Vision Transformers (ViTs), which use self-attention to capture global dependencies. However, the authors challenge this paradigm by proposing that neither convolutions nor attention mechanisms are strictly necessary to achieve high performance in image classification.<br><br>
---
<h3>Introduction to MLP-Mixer</h3>
The MLP-Mixer is a new approach that relies solely on Multi-Layer Perceptrons (MLPs) without any convolution or self-attention layers. The architecture consists of two primary layers: token-mixing MLPs and channel-mixing MLPs. Token-mixing MLPs combine information across different spatial locations, while channel-mixing MLPs mix features across channels at each spatial location. Together, these layers allow the model to learn both spatial and channel relationships in the data.<br><br>
---
<h3>Architecture Design</h3>
The MLP-Mixer architecture processes images in non-overlapping patches, similarly to Vision Transformers. The patches are first projected linearly to create a matrix with dimensions corresponding to the number of patches and channels. Each MLP-Mixer layer contains:
<ul>
  <li><strong>Token-mixing MLP:</strong> Processes spatial data across patches, facilitating the integration of spatial information.</li>
  <li><strong>Channel-mixing MLP:</strong> Mixes channel data independently for each patch, capturing feature interactions across channels.</li>
</ul>
These layers are interleaved to enable a complete spatial and channel interaction across the image.<br><br>
---
<h3>Experiments and Results</h3>
MLP-Mixer was pre-trained on large datasets (e.g., ImageNet, JFT-300M) and evaluated on various image classification benchmarks. When compared to CNNs and Transformers, MLP-Mixer achieved competitive results, especially on large datasets, with minimal complexity. It achieved up to 87.94% top-1 accuracy on ImageNet, demonstrating that even without convolutions or attention, it could perform on par with state-of-the-art models.<br><br>
---
<h3>Conclusion</h3>
The MLP-Mixer presents a simple yet effective alternative for vision tasks, challenging the need for complex convolution or attention layers in achieving high accuracy. Its design opens up new possibilities for vision architectures by demonstrating that MLP-based structures can capture the necessary dependencies in image data. The authors hope this work inspires further research into MLP-based architectures across various domains.
`);
    } else if (uploadedFile === "rt1.pdf") {
      setSummary(`RT-1: Robotics Transformer for Real-World Control at Scale<br><br>
<strong>Authors:</strong> Anthony Brohan, Noah Brown, Justice Carbajal, Yevgen Chebotar, et al.<br>
<strong>Source:</strong> Robotics at Google, Everyday Robots, Google Research, Brain Team<br><br>
---
<h3>Background</h3>
Robotic learning traditionally relies on task-specific datasets, often requiring labor-intensive data collection methods like imitation and reinforcement learning. However, models like those used in computer vision and NLP have moved toward task-agnostic, large-scale data to achieve zero-shot generalization and high adaptability. This study introduces a large-scale, task-agnostic robotics model named RT-1, designed to learn generalizable robotic skills from a diverse dataset collected through real-world demonstrations. The research team aimed to address the unique challenges in robotics by combining diverse data and scalable architectures.<br><br>
---
<h3>Introduction to RT-1</h3>
RT-1, the "Robotics Transformer 1," is a Transformer-based architecture built to understand visual and language instructions, map them to robot actions, and achieve generalizable skills. RT-1 is trained on a dataset of real-world robot demonstrations that includes over 130,000 episodes across 700 tasks. By using a sequence of images and natural language commands as inputs, RT-1 outputs tokenized actions that control a robot’s movements in real-time. It leverages EfficientNet for initial image processing, FiLM layers for conditioning on language instructions, and TokenLearner for compacting the vision tokens, all feeding into a Transformer model to handle high-dimensional action outputs efficiently.<br><br>
---
<h3>Architecture Design</h3>
The RT-1 architecture includes:
<ul>
  <li><strong>EfficientNet-based Image Encoder:</strong> Pretrained on ImageNet to extract visual features from a history of images.</li>
  <li><strong>FiLM Layers:</strong> Conditions image processing on language instructions, enhancing task relevance.</li>
  <li><strong>TokenLearner Module:</strong> Reduces the number of tokens by selecting the most informative ones for computational efficiency.</li>
  <li><strong>Transformer Backbone:</strong> Processes the compressed token sequence and outputs a discretized action vector.</li>
</ul>
These components allow RT-1 to perform real-time control by generating actions at 3 Hz, meeting the constraints for real-world robotic applications.<br><br>
---
<h3>Experiments and Results</h3>
RT-1 was tested on diverse tasks across multiple environments. It demonstrated a 97% success rate on training tasks and exhibited strong generalization with a 76% success rate on unseen tasks. Compared to baselines like Gato and BC-Z, RT-1 showed superior robustness to distractors and background variations. Additionally, RT-1 handled realistic long-horizon tasks (50 steps) effectively, outperforming other models in complex, real-world scenarios with varied objects, tasks, and environments.<br><br>
---
<h3>Conclusion</h3>
RT-1 represents a significant advancement in scalable, general-purpose robotic learning. Its architecture allows for the absorption of large-scale data, enabling it to generalize across tasks, environments, and objects better than previous models. This research highlights the importance of combining diverse data sources and scalable model designs in building real-world robotics systems that can operate autonomously across complex scenarios.
`);
    } else if (uploadedFile === "https://arxiv.org/pdf/2406.09246") {
      setSummary(`OpenVLA: An Open-Source Vision-Language-Action Model<br><br>
<strong>Authors:</strong> Moo Jin Kim, Karl Pertsch, Siddharth Karamcheti, Ted Xiao, et al.<br>
<strong>Source:</strong> Stanford University, UC Berkeley, Toyota Research Institute, Google DeepMind<br><br>
---
<h3>Background</h3>
Vision-Language-Action (VLA) models have emerged as powerful tools for robotic control, utilizing large-scale vision and language data to guide complex actions. However, widespread use has been limited due to the closed nature of existing VLAs and their challenges in fine-tuning for specific robotic tasks. This study introduces OpenVLA, a fully open-source, large-scale model that builds on recent advancements in VLA models by offering both accessible architecture and efficient fine-tuning for diverse robotic tasks.<br><br>
---
<h3>Introduction to OpenVLA</h3>
OpenVLA is a 7B-parameter VLA model that integrates visual and language inputs to generate robotic actions. The model is pretrained on 970,000 robot demonstrations from the Open X-Embodiment dataset, covering multiple robots and tasks. OpenVLA combines a vision encoder with pretrained features from DINOv2 and SigLIP and uses a Llama 2 language model as its backbone. This approach allows OpenVLA to learn and generalize across various environments, outperforming prior closed models in terms of success rates with a fraction of the parameters.<br><br>
---
<h3>Architecture Design</h3>
OpenVLA's architecture includes:
<ul>
  <li><strong>Visual Encoder:</strong> Uses features from DINOv2 and SigLIP to capture spatial and semantic information.</li>
  <li><strong>Language Model (Llama 2):</strong> Translates visual data and language instructions into a sequence of tokens representing robot actions.</li>
  <li><strong>Fine-Tuning Mechanism:</strong> Adapts efficiently to new robot environments with low-rank adaptation techniques, making it compatible with consumer-grade GPUs.</li>
</ul>
This architecture allows for both complex multi-robot control and rapid adaptation to new settings, distinguishing it from other VLA models focused on specific tasks.<br><br>
---
<h3>Experiments and Results</h3>
OpenVLA was tested on multiple robots and tasks, achieving a 16.5% improvement over the 55B-parameter RT-2-X model in task success rates across 29 robotic tasks. It showed notable generalization to new environments and objects while using significantly fewer parameters. The model also demonstrated strong language grounding, allowing it to follow complex instructions involving specific objects and actions accurately.<br><br>
---
<h3>Conclusion</h3>
OpenVLA is a robust, open-source VLA model that supports generalization across various robotic tasks and environments. With its accessible design and adaptability to different setups, OpenVLA provides a valuable resource for advancing robotic control research. The authors anticipate that OpenVLA will foster innovation in VLA research, offering an adaptable and powerful base for future studies and applications.
`);
    } else if (uploadedFile === "https://arxiv.org/pdf/2312.04560") {
      setSummary(`NeRFiller: Completing Scenes via Generative 3D Inpainting<br><br>
<strong>Authors:</strong> Ethan Weber, Aleksander Hołyński, Varun Jampani, Saurabh Saxena, Noah Snavely, Abhishek Kar, Angjoo Kanazawa<br>
<strong>Source:</strong> Google Research, UC Berkeley<br><br>
---
<h3>Background</h3>
3D scene completion is a challenging area where parts of a scene or object may be missing due to limitations in capturing or reconstructing 3D data. Traditional 2D inpainting models are typically not well-suited for this task as they cannot ensure multi-view consistency needed for 3D applications. NeRFiller introduces a generative 3D inpainting approach that leverages 2D generative models to fill in missing regions of a 3D scene, providing a more complete and consistent reconstruction.<br><br>
---
<h3>Introduction to NeRFiller</h3>
NeRFiller is a framework designed to complete missing parts of a 3D scene by applying a 2D diffusion-based inpainting approach iteratively across multiple views, leading to a coherent and multi-view consistent 3D reconstruction. It builds on the NeRF (Neural Radiance Field) framework for rendering 3D scenes and uses a technique called the "Grid Prior," which organizes views in a 2x2 grid for inpainting. This prior ensures that the resulting inpainted regions are more consistent across different perspectives.<br><br>
---
<h3>Architecture Design</h3>
The NeRFiller framework has several key components:
<ul>
  <li><strong>2D Diffusion Model:</strong> Generates inpainted regions by predicting noise across images in a tiled 2x2 grid format.</li>
  <li><strong>Joint Multi-View Inpainting:</strong> Extends the Grid Prior to larger image sets by averaging noise across multiple images to achieve consistency.</li>
  <li><strong>Iterative Dataset Update:</strong> Integrates inpainted images into the dataset gradually, allowing the NeRF model to update with multi-view consistent details over time.</li>
</ul>
This combination of elements enables NeRFiller to create cohesive 3D scene completions, avoiding the inconsistencies typical of traditional 2D models applied to 3D tasks.<br><br>
---
<h3>Experiments and Results</h3>
NeRFiller was evaluated across various 3D scenes and demonstrated significant improvements over other inpainting methods in creating consistent and realistic completions. Using metrics like PSNR and SSIM, NeRFiller outperformed baselines in retaining visual quality and realism. Notably, it achieved strong performance on scenes with substantial missing data, showcasing its ability to fill in large, unobserved areas effectively.<br><br>
---
<h3>Conclusion</h3>
NeRFiller provides a novel solution for 3D scene completion by combining 2D generative inpainting with multi-view consistency techniques. By ensuring coherence across perspectives, it represents a step forward in making 3D reconstructions more complete and reliable for real-world applications. The authors suggest that this method can improve applications in fields such as virtual reality, digital restoration, and autonomous navigation, where complete 3D environments are essential.
 `);
    } else {
      setSummary("This is a brief summary of the paper's content. (Placeholder text until AWS runs this quickly)");
    }
  }, [uploadedFile]);

  const handleAudioSubmit = async () => {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      console.error("getUserMedia is not supported in this browser or context.");
      setResponse("Error: Unable to access microphone. Please check your browser settings or try another browser.");
      return;
    }
  
    try {
      const permission = await navigator.permissions.query({ name: "microphone" });
      if (permission.state === "denied") {
        setResponse("Microphone access is denied. Please enable it in your browser settings.");
        return;
      }
  
      if (isRecording) {
        mediaRecorderRef.current.stop();
        setIsRecording(false);
      } else {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorderRef.current = mediaRecorder;
        mediaRecorder.start();
        setIsRecording(true);
  
        const audioChunks = [];
        mediaRecorder.ondataavailable = (event) => {
          audioChunks.push(event.data);
        };
  
        mediaRecorder.onstop = () => {
          const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
          setAudioBlob(audioBlob);
          setIsRecording(false);
  
          // Set simulated transcription but don't set response yet
          const simulatedTranscription = "audio question transcription";
          setQuestion(simulatedTranscription);  // Store transcription for submission
        };
      }
    } catch (error) {
      console.error("Microphone access denied or error: ", error);
      setResponse("Error: Microphone access denied or an error occurred. Please check permissions and try again.");
    }
  };
  
  const handleSubmit = () => {
    if (!question && !audioBlob) return;  // Ensure question or audio is present
  
    const formattedResponse = `Question: ${question || "Audio question transcription"}\nAnswer: Thank you for your question! Normally, our system would dynamically search through a sophisticated Retrieval-Augmented Generation (RAG) model, designed to tap into vast knowledge sources, sift through the most relevant information, and deliver an expert answer. But since we only started trying to master AWS yesterday (and found out it’s not exactly a 'learn it overnight' kind of thing), our current setup is a bit... 'manual.' Rest assured, though, once our RAG model is fully operational, your answers will come with speed, precision, and zero cloud confusion!`;
    setResponse(formattedResponse);
  };

  const handleClearAudio = () => {
    setAudioBlob(null);
    setQuestion(""); 
  };

  return (
    <div className="smart-assistant-page">
      <Header />
      <h2>Smart Assistant Summary</h2>
      <div className="summary" dangerouslySetInnerHTML={{ __html: summary }}></div>

      <h3>Ask a Question</h3>
      <div className="question-box">
        {audioBlob ? (
          <div className="audio-playback">
            <audio controls src={audioURL} />
            <button onClick={handleClearAudio} className="close-audio-button">✖</button>
          </div>
        ) : !isRecording ? (
          <textarea
            placeholder="Type your question here or use the mic..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
          />
        ) : (
          <div className="recording-indicator">Recording... 🔴</div>
        )}
        <div className="question-box-buttons">
          <button onClick={handleAudioSubmit} className={`mic-button ${isRecording ? 'recording' : ''}`}>
            {isRecording ? "Stop Recording" : "🎤 Use Mic"}
          </button>
          <button 
            onClick={handleSubmit} 
            className="send-button" 
            disabled={!question.trim() && !audioBlob}
          >
            Send
          </button>
        </div>
      </div>

      <div className="response-box">
        <h4>Assistant Response</h4>
        <p className="response-text">{response}</p>
      </div>
    </div>
  );
}

export default SmartAssistant;
