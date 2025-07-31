import { API_ENDPOINTS } from '../constants';

export interface LangFlowPayload {
  input_value: string;
  output_type: string;
  input_type: string;
  session_id: string;
}

export interface LangFlowResponse {
  outputs?: Array<{
    outputs?: Array<{
      results?: {
        message?: { text?: string };
        text?: string;
      };
      message?: { text?: string };
      text?: string;
    }>;
    message?: { text?: string };
    text?: string;
  }>;
  message?: string | { text?: string };
  text?: string;
}

class ApiService {
  private getAuthHeaders(): HeadersInit {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${import.meta.env.VITE_LANGFLOW_TOKEN}`,
      Accept: "application/json",
    };
  }

  private async makeRequest(endpoint: string, payload: LangFlowPayload): Promise<LangFlowResponse> {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: this.getAuthHeaders(),
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `API request failed (${response.status}): ${
          errorText || response.statusText
        }`
      );
    }

    return response.json();
  }

  private extractGeneratedContent(data: LangFlowResponse): string {
    let generatedContent = "";

    if (data.outputs && data.outputs.length > 0) {
      const output = data.outputs[0];
      generatedContent =
        output.outputs?.[0]?.results?.message?.text ||
        output.outputs?.[0]?.results?.text ||
        output.outputs?.[0]?.message?.text ||
        output.outputs?.[0]?.text ||
        output.message?.text ||
        output.text ||
        "";
    } else if (data.message) {
      generatedContent =
        typeof data.message === "string"
          ? data.message
          : data.message.text || "";
    } else if (data.text) {
      generatedContent = data.text;
    }

    if (!generatedContent) {
      console.error("Unexpected response structure:", data);
      throw new Error(
        "No content generated. Please check the LangFlow response format."
      );
    }

    return generatedContent;
  }

  async generatePost(url: string): Promise<string> {
    const payload: LangFlowPayload = {
      input_value: url,
      output_type: "chat",
      input_type: "chat",
      session_id: "user_1",
    };

    const data = await this.makeRequest(API_ENDPOINTS.LANGFLOW, payload);
    return this.extractGeneratedContent(data);
  }

  async generateVariation(content: string): Promise<string> {
    const payload: LangFlowPayload = {
      input_value: `Please generate a different variation of this LinkedIn post: ${content}`,
      output_type: "chat",
      input_type: "chat",
      session_id: "user_1",
    };

    const data = await this.makeRequest(API_ENDPOINTS.LANGFLOW, payload);
    return this.extractGeneratedContent(data);
  }
}

export const apiService = new ApiService(); 