// AI Service API Keys Configuration
// In a real application, these would be loaded from environment variables
// For development purposes, you can put your API keys here

export const AI_CONFIG = {
	// Google Gemini API
	GEMINI_API_KEY: "", // Get from https://makersuite.google.com/app/apikey

	// Anthropic Claude API
	CLAUDE_API_KEY: "", // Get from https://console.anthropic.com/

	// DeepSeek API
	DEEPSEEK_API_KEY: "", // Get from https://platform.deepseek.com/

	// Default service to use when multiple API keys are available
	// Options: 'gemini', 'claude', 'deepseek', 'mock'
	DEFAULT_SERVICE: "gemini" as "gemini" | "claude" | "deepseek" | "mock",

	// AI service configuration
	SERVICE_CONFIG: {
		// Gemini configuration
		gemini: {
			modelName: "gemini-1.5-flash",
			maxTokens: 1024,
			temperature: 0.7,
		},

		// Claude configuration
		claude: {
			modelName: "claude-3-5-sonnet-20240620",
			maxTokens: 1024,
			temperature: 0.7,
		},

		// DeepSeek configuration
		deepseek: {
			modelName: "deepseek-chat",
			maxTokens: 1024,
			temperature: 0.7,
		},
	},
};
