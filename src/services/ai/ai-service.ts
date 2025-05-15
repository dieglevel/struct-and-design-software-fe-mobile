import axios from "axios";
import { Message, TourSuggestion, TOUR_KNOWLEDGE_BASE, SYSTEM_PROMPT } from "@/services/ai/types";
import { AI_CONFIG } from "./config";

// Base interface for all AI services
export interface AIService {
	generateResponse(prompt: string, conversationHistory: Message[]): Promise<string>;
	generateTourSuggestions(query: string): TourSuggestion[];
}

// Configuration types for different AI providers
interface AIServiceConfig {
	apiKey: string;
	modelName?: string;
	maxTokens?: number;
	temperature?: number;
}

// Google Gemini AI Service
export class GeminiAIService implements AIService {
	private config: AIServiceConfig;

	constructor(config: AIServiceConfig) {
		// Apply default configuration from AI_CONFIG
		const defaultConfig = AI_CONFIG.SERVICE_CONFIG.gemini;

		this.config = {
			...defaultConfig,
			...config,
		};
	}

	async generateResponse(prompt: string, conversationHistory: Message[]): Promise<string> {
		try {
			// Format the conversation history for Gemini
			const history = conversationHistory.map((msg) => ({
				role: msg.type === "user" ? "user" : "model",
				parts: [{ text: msg.text }],
			}));

			// Add system prompt as the first message if not already present
			const systemMessage = {
				role: "model",
				parts: [{ text: SYSTEM_PROMPT }],
			};

			// Add the current prompt
			const messages = [systemMessage, ...history, { role: "user", parts: [{ text: prompt }] }];

			// Make API request to Gemini
			const response = await axios.post(
				`https://generativelanguage.googleapis.com/v1beta/models/${this.config.modelName}:generateContent`,
				{
					contents: messages,
					generationConfig: {
						maxOutputTokens: this.config.maxTokens,
						temperature: this.config.temperature,
					},
				},
				{
					headers: {
						"Content-Type": "application/json",
						"x-goog-api-key": this.config.apiKey,
					},
				},
			);

			// Extract the generated text from the response
			const generatedText = response.data.candidates[0].content.parts[0].text;
			return generatedText;
		} catch (error) {
			console.error("Error calling Gemini API:", error);
			throw new Error("Failed to generate response from AI");
		}
	}

	generateTourSuggestions(query: string): TourSuggestion[] {
		return this.extractToursFromKnowledgeBase(query);
	}

	private extractToursFromKnowledgeBase(query: string): TourSuggestion[] {
		const lowercaseQuery = query.toLowerCase();

		let suggestions: TourSuggestion[] = [];

		if (lowercaseQuery.includes("beach") || lowercaseQuery.includes("biển")) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.beach];
		}

		if (lowercaseQuery.includes("mountain") || lowercaseQuery.includes("núi")) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.mountain];
		}

		if (
			lowercaseQuery.includes("culture") ||
			lowercaseQuery.includes("văn hóa") ||
			lowercaseQuery.includes("di sản") ||
			lowercaseQuery.includes("lịch sử")
		) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.cultural];
		}

		// If no specific category matches, return a mix of tours
		if (suggestions.length === 0) {
			suggestions = [
				...TOUR_KNOWLEDGE_BASE.beach.slice(0, 1),
				...TOUR_KNOWLEDGE_BASE.mountain.slice(0, 1),
				...TOUR_KNOWLEDGE_BASE.cultural.slice(0, 1),
			];
		}

		return suggestions;
	}
}

// Anthropic Claude AI Service
export class ClaudeAIService implements AIService {
	private config: AIServiceConfig;

	constructor(config: AIServiceConfig) {
		// Apply default configuration from AI_CONFIG
		const defaultConfig = AI_CONFIG.SERVICE_CONFIG.claude;

		this.config = {
			...defaultConfig,
			...config,
		};
	}

	async generateResponse(prompt: string, conversationHistory: Message[]): Promise<string> {
		try {
			// Format conversation history for Claude
			const messages = conversationHistory.map((msg) => ({
				role: msg.type === "user" ? "user" : "assistant",
				content: msg.text,
			}));

			// Add system prompt as the first message
			const systemMessage = {
				role: "system",
				content: SYSTEM_PROMPT,
			};

			// Add the current prompt
			const claudeMessages = [systemMessage, ...messages, { role: "user", content: prompt }];

			// Make API request to Claude
			const response = await axios.post(
				"https://api.anthropic.com/v1/messages",
				{
					model: this.config.modelName,
					messages: claudeMessages,
					max_tokens: this.config.maxTokens,
					temperature: this.config.temperature,
				},
				{
					headers: {
						"Content-Type": "application/json",
						"x-api-key": this.config.apiKey,
						"anthropic-version": "2023-06-01",
					},
				},
			);

			// Extract the generated text from the response
			return response.data.content[0].text;
		} catch (error) {
			console.error("Error calling Claude API:", error);
			throw new Error("Failed to generate response from AI");
		}
	}

	generateTourSuggestions(query: string): TourSuggestion[] {
		return this.extractToursFromKnowledgeBase(query);
	}

	private extractToursFromKnowledgeBase(query: string): TourSuggestion[] {
		const lowercaseQuery = query.toLowerCase();

		let suggestions: TourSuggestion[] = [];

		if (lowercaseQuery.includes("beach") || lowercaseQuery.includes("biển")) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.beach];
		}

		if (lowercaseQuery.includes("mountain") || lowercaseQuery.includes("núi")) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.mountain];
		}

		if (
			lowercaseQuery.includes("culture") ||
			lowercaseQuery.includes("văn hóa") ||
			lowercaseQuery.includes("di sản") ||
			lowercaseQuery.includes("lịch sử")
		) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.cultural];
		}

		// If no specific category matches, return a mix of tours
		if (suggestions.length === 0) {
			suggestions = [
				...TOUR_KNOWLEDGE_BASE.beach.slice(0, 1),
				...TOUR_KNOWLEDGE_BASE.mountain.slice(0, 1),
				...TOUR_KNOWLEDGE_BASE.cultural.slice(0, 1),
			];
		}

		return suggestions;
	}
}

// DeepSeek AI Service
export class DeepSeekAIService implements AIService {
	private config: AIServiceConfig;

	constructor(config: AIServiceConfig) {
		// Apply default configuration from AI_CONFIG
		const defaultConfig = AI_CONFIG.SERVICE_CONFIG.deepseek;

		this.config = {
			...defaultConfig,
			...config,
		};
	}

	async generateResponse(prompt: string, conversationHistory: Message[]): Promise<string> {
		try {
			// Format conversation history for DeepSeek
			const messages = conversationHistory.map((msg) => ({
				role: msg.type === "user" ? "user" : "assistant",
				content: msg.text,
			}));

			// Add system message
			const systemMessage = {
				role: "system",
				content: SYSTEM_PROMPT,
			};

			// Add the current prompt
			const deepseekMessages = [systemMessage, ...messages, { role: "user", content: prompt }];

			// Make API request to DeepSeek
			const response = await axios.post(
				"https://api.deepseek.com/v1/chat/completions",
				{
					model: this.config.modelName,
					messages: deepseekMessages,
					max_tokens: this.config.maxTokens,
					temperature: this.config.temperature,
				},
				{
					headers: {
						"Content-Type": "application/json",
						Authorization: `Bearer ${this.config.apiKey}`,
					},
				},
			);

			// Extract the generated text from the response
			return response.data.choices[0].message.content;
		} catch (error) {
			console.error("Error calling DeepSeek API:", error);
			throw new Error("Failed to generate response from AI");
		}
	}

	generateTourSuggestions(query: string): TourSuggestion[] {
		return this.extractToursFromKnowledgeBase(query);
	}

	private extractToursFromKnowledgeBase(query: string): TourSuggestion[] {
		const lowercaseQuery = query.toLowerCase();

		let suggestions: TourSuggestion[] = [];

		if (lowercaseQuery.includes("beach") || lowercaseQuery.includes("biển")) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.beach];
		}

		if (lowercaseQuery.includes("mountain") || lowercaseQuery.includes("núi")) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.mountain];
		}

		if (
			lowercaseQuery.includes("culture") ||
			lowercaseQuery.includes("văn hóa") ||
			lowercaseQuery.includes("di sản") ||
			lowercaseQuery.includes("lịch sử")
		) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.cultural];
		}

		// If no specific category matches, return a mix of tours
		if (suggestions.length === 0) {
			suggestions = [
				...TOUR_KNOWLEDGE_BASE.beach.slice(0, 1),
				...TOUR_KNOWLEDGE_BASE.mountain.slice(0, 1),
				...TOUR_KNOWLEDGE_BASE.cultural.slice(0, 1),
			];
		}

		return suggestions;
	}
}

// Factory for creating AI services
export class AIServiceFactory {
	static createGeminiService(apiKey: string, customConfig?: Partial<AIServiceConfig>): AIService {
		return new GeminiAIService({
			apiKey,
			...customConfig,
		});
	}

	static createClaudeService(apiKey: string, customConfig?: Partial<AIServiceConfig>): AIService {
		return new ClaudeAIService({
			apiKey,
			...customConfig,
		});
	}

	static createDeepSeekService(apiKey: string, customConfig?: Partial<AIServiceConfig>): AIService {
		return new DeepSeekAIService({
			apiKey,
			...customConfig,
		});
	}
}

// Mock AI service that implements the AIService interface
export class MockAIService implements AIService {
	async generateResponse(prompt: string, conversationHistory: Message[]): Promise<string> {
		// Simulate network delay
		await new Promise((resolve) => setTimeout(resolve, 1000));

		const lowercasePrompt = prompt.toLowerCase();

		if (lowercasePrompt.includes("beach") || lowercasePrompt.includes("biển")) {
			return "Tôi có một số tour biển tuyệt vời cho bạn! Bạn có thể thích 'Khám phá Biển Nha Trang 3N2Đ' hoặc 'Thiên Đường Phú Quốc 4N3Đ'. Bạn quan tâm đến địa điểm nào cụ thể không?";
		} else if (lowercasePrompt.includes("mountain") || lowercasePrompt.includes("núi")) {
			return "Chúng tôi có nhiều tour núi tuyệt vời! 'Chinh phục Fansipan' và 'Khám phá Đà Lạt' là hai lựa chọn phổ biến. Bạn muốn chuyến đi kéo dài bao lâu?";
		} else if (lowercasePrompt.includes("payment") || lowercasePrompt.includes("thanh toán")) {
			return "Chúng tôi chấp nhận nhiều phương thức thanh toán bao gồm thẻ tín dụng/ghi nợ, chuyển khoản ngân hàng, và ví điện tử như Momo, VNPay. Bạn có thể thanh toán đầy đủ hoặc đặt cọc 50% để đảm bảo đặt chỗ của mình.";
		} else {
			return "Cảm ơn bạn đã liên hệ! Tôi có thể giúp bạn tìm tour du lịch, đề xuất điểm đến dựa trên sở thích, hoặc trả lời câu hỏi về dịch vụ của chúng tôi. Bạn có thể hỏi về tour biển, núi, văn hóa, hoặc thắc mắc về giá cả, chính sách hủy, hoặc phương thức thanh toán.";
		}
	}

	generateTourSuggestions(query: string): TourSuggestion[] {
		const lowercaseQuery = query.toLowerCase();

		let suggestions: TourSuggestion[] = [];

		if (lowercaseQuery.includes("beach") || lowercaseQuery.includes("biển")) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.beach];
		}

		if (lowercaseQuery.includes("mountain") || lowercaseQuery.includes("núi")) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.mountain];
		}

		if (
			lowercaseQuery.includes("culture") ||
			lowercaseQuery.includes("văn hóa") ||
			lowercaseQuery.includes("di sản") ||
			lowercaseQuery.includes("lịch sử")
		) {
			suggestions = [...suggestions, ...TOUR_KNOWLEDGE_BASE.cultural];
		}

		// If no specific category matches, return a mix of tours
		if (suggestions.length === 0) {
			suggestions = [
				...TOUR_KNOWLEDGE_BASE.beach.slice(0, 1),
				...TOUR_KNOWLEDGE_BASE.mountain.slice(0, 1),
				...TOUR_KNOWLEDGE_BASE.cultural.slice(0, 1),
			];
		}

		return suggestions;
	}
}

// Create a default AI service instance
export const createDefaultAIService = (): AIService => {
	// Get API keys from config
	const geminiApiKey = AI_CONFIG.GEMINI_API_KEY;
	const claudeApiKey = AI_CONFIG.CLAUDE_API_KEY;
	const deepseekApiKey = AI_CONFIG.DEEPSEEK_API_KEY;

	// Check the preferred service from config
	const preferredService = AI_CONFIG.DEFAULT_SERVICE;

	if (preferredService === "gemini" && geminiApiKey) {
		return AIServiceFactory.createGeminiService(geminiApiKey);
	} else if (preferredService === "claude" && claudeApiKey) {
		return AIServiceFactory.createClaudeService(claudeApiKey);
	} else if (preferredService === "deepseek" && deepseekApiKey) {
		return AIServiceFactory.createDeepSeekService(deepseekApiKey);
	}

	// If preferred service is not available or set to mock, or if we have no API keys
	// Use the first available service based on API key availability
	if (geminiApiKey) {
		return AIServiceFactory.createGeminiService(geminiApiKey);
	} else if (claudeApiKey) {
		return AIServiceFactory.createClaudeService(claudeApiKey);
	} else if (deepseekApiKey) {
		return AIServiceFactory.createDeepSeekService(deepseekApiKey);
	}

	// Fallback to mock service when no API keys are available
	return new MockAIService();
};
