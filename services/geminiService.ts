import { GoogleGenAI } from "@google/genai";

const getClient = () => {
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
        throw new Error("API Key not found in environment variables");
    }
    return new GoogleGenAI({ apiKey });
};

export const generateRuleDescription = async (
    intent: string,
    imageData?: string,
    mimeType?: string
): Promise<string> => {
    try {
        const ai = getClient();
        const model = "gemini-2.5-flash";

        let prompt = `You are an expert in AIoT (Artificial Intelligence of Things) and security monitoring. 
        The user wants to define a new regulation rule for an automated monitoring system.
        
        User Intent: "${intent}"
        
        Please analyze the intent (and the provided image reference if any) and convert it into a Standardized Formal Language Expression in JSON format.
        
        The JSON must strictly follow this schema:
        {
          "rule_metadata": {
            "name": "Short descriptive name (e.g., 'Safety Helmet Detection')",
            "category": "safety" | "security" | "process_quality",
            "severity": "info" | "warning" | "critical"
          },
          "visual_detection": {
            "target_objects": ["List of primary objects to detect, e.g., 'person', 'helmet'"],
            "required_attributes": ["Specific visual attributes, e.g., 'wearing yellow helmet'"],
            "negative_constraints": ["Objects that should NOT be present, or 'none'"]
          },
          "trigger_logic": {
            "condition_description": "Formal logic description (e.g., 'IF Person detected AND NOT wearing Helmet THEN trigger')",
            "temporal_threshold_seconds": 0
          },
          "response_action": {
            "alert_message": "Human readable alert message",
            "suggested_actions": ["Notify Supervisor", "Broadcast Warning"]
          }
        }

        Output ONLY the raw JSON string. Do not include markdown formatting (like \`\`\`json).`;

        let contents: any = [{ text: prompt }];

        if (imageData && mimeType) {
            contents = [
                {
                    inlineData: {
                        mimeType: mimeType,
                        data: imageData
                    }
                },
                {
                    text: `Analyze this image as a positive example for the rule. Extract visual features from it to populate the 'visual_detection' fields. ${prompt}`
                }
            ];
        }

        const response = await ai.models.generateContent({
            model,
            contents: { parts: contents }
        });

        let text = response.text || "{}";
        // Clean up markdown if present
        text = text.replace(/```json/g, '').replace(/```/g, '').trim();
        return text;

    } catch (error) {
        console.error("Gemini API Error:", error);
        return JSON.stringify({ error: "Failed to generate rule. Please check API key or network." }, null, 2);
    }
};

export const analyzeStreamFrame = async (base64Image: string): Promise<string> => {
     try {
        const ai = getClient();
        const response = await ai.models.generateContent({
            model: "gemini-2.5-flash",
            contents: {
                parts: [
                    { inlineData: { mimeType: "image/jpeg", data: base64Image } },
                    { text: "Identify any safety hazards or anomalies in this surveillance frame. Keep it brief (under 20 words)." }
                ]
            }
        });
        return response.text || "No anomalies detected.";
     } catch (e) {
         return "Analysis failed.";
     }
}