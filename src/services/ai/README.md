# AI Assistant Integration for Tour Booking App

This module provides integration with various AI services (Gemini, Claude, DeepSeek) to power the chat assistant in the
tour booking application.

## Overview

The AI assistant helps users with:

-    Finding tours based on keywords (beach, mountain, culture, etc.)
-    Getting recommendations based on preferences (budget, duration, rating)
-    Answering FAQs about payments, refunds, and cancellation policies

## Files Structure

-    `types.ts` - Types and interfaces used by the AI service
-    `config.ts` - Configuration for API keys and AI service settings
-    `ai-service.ts` - Implementation of various AI service providers
-    `index.ts` - Export all AI service modules

## Configuration

To use a real AI service, add your API key to the `config.ts` file:

```typescript
export const AI_CONFIG = {
	// Google Gemini API
	GEMINI_API_KEY: "your-gemini-api-key",

	// Anthropic Claude API
	CLAUDE_API_KEY: "your-claude-api-key",

	// DeepSeek API
	DEEPSEEK_API_KEY: "your-deepseek-api-key",

	// Default service to use when multiple API keys are available
	// Options: 'gemini', 'claude', 'deepseek', 'mock'
	DEFAULT_SERVICE: "gemini",

	// ... service configurations
};
```

## How to Use

### Basic Usage

```typescript
import { createDefaultAIService } from "@/services/ai";

// Create an AI service instance
const aiService = createDefaultAIService();

// Generate a response
const response = await aiService.generateResponse("I'm looking for beach tours in Vietnam", previousMessages);

// Get tour suggestions based on a query
const suggestions = aiService.generateTourSuggestions("beach tours");
```

### Using a Specific AI Service

```typescript
import { AIServiceFactory } from "@/services/ai";

// Create a specific AI service instance
const geminiService = AIServiceFactory.createGeminiService("your-api-key", {
	temperature: 0.5,
	maxTokens: 500,
});

// Use the service
const response = await geminiService.generateResponse("Tell me about mountain tours", []);
```

## Fallback Behavior

If no API keys are provided or there's an error with the chosen service, the system will:

1. Try to use the specified DEFAULT_SERVICE if its API key is available
2. Try each available service in order: Gemini, Claude, DeepSeek
3. Fall back to the mock service if no API keys are available

The mock service provides canned responses based on keywords and doesn't require an internet connection.

## Adding New AI Services

To add a new AI service provider:

1. Create a new class that implements the `AIService` interface
2. Add the new service configuration to the `AI_CONFIG` object
3. Add a factory method in `AIServiceFactory`
4. Update the `createDefaultAIService` function to include the new service

## Security Note

API keys should not be committed to version control. In a production environment, use environment variables or a secure
storage mechanism to manage API keys.
