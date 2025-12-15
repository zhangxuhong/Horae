export interface AIModel {
  id: string;
  name: string;
  version: string;
  framework: 'PyTorch' | 'ONNX' | 'TensorFlow' | 'OpenAI'; // Added OpenAI
  type: string;
  description: string;
  updatedAt: string;
  thumbnailUrl: string;
  status: 'active' | 'deploying' | 'offline';
  tags: string[];
  // For Cloud/OpenAI models
  apiConfig?: {
    endpoint: string;
    modelName: string;
  };
}

export interface Device {
  id: string;
  name: string;
  type: 'Camera' | 'Robot Dog' | 'Drone' | 'Sensor';
  status: 'online' | 'offline' | 'warning';
  location: string;
  streamUrl?: string; // Placeholder for RTSP/WebRTC url
}

export interface Rule {
  id: string;
  name: string;
  description: string;
  originalIntent?: string; // User's natural language input
  standardDefinition?: string; // JSON formal definition
  severity: 'low' | 'medium' | 'high' | 'critical';
  triggerType: 'text' | 'image' | 'video';
  examples: string[]; // URLs to example images
  createdAt: string;
}

export interface Task {
  id: string;
  name: string;
  deviceIds: string[];
  modelId: string;
  ruleIds: string[];
  notificationMethods: ('sms' | 'email' | 'webhook')[];
  status: 'running' | 'paused' | 'stopped';
}

export interface TaskResultEvent {
  id: string;
  timestamp: string;
  ruleName: string;
  confidence: number;
  imageUrl: string;
  videoUrl?: string;
  description: string;
}