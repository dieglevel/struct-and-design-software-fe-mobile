// Message types for chat
export type MessageType = "user" | "ai" | "system";

// Message interface for chat
export interface Message {
	id: string;
	text: string;
	type: MessageType;
	timestamp: Date;
}

// Tour suggestion interface for better type safety
export interface TourSuggestion {
	id: string;
	name: string;
	image: string;
	price: number;
	duration: string;
	rating: number;
}

// Response structure for AI service
export interface AIResponse {
	text: string;
	suggestedTours?: TourSuggestion[];
}

// System prompt to provide context to the AI models
export const SYSTEM_PROMPT = `
You are a travel assistant for a Vietnamese tour booking app. Help the user with:
1. Finding tours based on keywords (beach, mountain, culture, etc.)
2. Recommending tours based on preferences (budget, duration, rating)
3. Answering FAQs about payments, refunds, and cancellation policies

Keep your tone friendly, conversational, and helpful. 
Respond in Vietnamese unless asked to speak in another language.
Focus on providing specific tour suggestions and practical information.
When mentioning prices, use Vietnamese Dong (VND) formatted as: 1.500.000đ
`;

// Tour knowledge base to help AI provide realistic suggestions
export const TOUR_KNOWLEDGE_BASE = {
	beach: [
		{
			id: "1",
			name: "Thiên Đường Biển Phú Quốc",
			image: "https://i.pravatar.cc/150?img=1",
			price: 5500000,
			duration: "4 ngày 3 đêm",
			rating: 4.8,
			description: "Khám phá vẻ đẹp hoang sơ của đảo ngọc Phú Quốc, với các bãi biển cát trắng tuyệt đẹp.",
		},
		{
			id: "2",
			name: "Khám Phá Biển Nha Trang",
			image: "https://i.pravatar.cc/150?img=2",
			price: 3200000,
			duration: "3 ngày 2 đêm",
			rating: 4.5,
			description:
				"Trải nghiệm vịnh biển xinh đẹp của Nha Trang với các hoạt động lặn biển và thưởng thức hải sản tươi ngon.",
		},
	],
	mountain: [
		{
			id: "3",
			name: "Chinh Phục Fansipan",
			image: "https://i.pravatar.cc/150?img=3",
			price: 2800000,
			duration: "2 ngày 1 đêm",
			rating: 4.7,
			description: "Leo núi chinh phục đỉnh Fansipan - 'Nóc nhà Đông Dương' với cảnh quan tuyệt đẹp.",
		},
		{
			id: "4",
			name: "Đà Lạt Thành Phố Sương Mù",
			image: "https://i.pravatar.cc/150?img=4",
			price: 2500000,
			duration: "3 ngày 2 đêm",
			rating: 4.6,
			description: "Khám phá thành phố ngàn hoa với khí hậu mát mẻ, những đồi thông và hồ đẹp thơ mộng.",
		},
	],
	cultural: [
		{
			id: "5",
			name: "Di Sản Miền Trung",
			image: "https://i.pravatar.cc/150?img=5",
			price: 4800000,
			duration: "5 ngày 4 đêm",
			rating: 4.9,
			description: "Hành trình khám phá các di sản văn hóa UNESCO tại Huế, Hội An và Mỹ Sơn.",
		},
		{
			id: "6",
			name: "Về Nguồn Miền Bắc",
			image: "https://i.pravatar.cc/150?img=6",
			price: 3500000,
			duration: "4 ngày 3 đêm",
			rating: 4.7,
			description:
				"Tham quan các di tích lịch sử và làng nghề truyền thống tại Hà Nội, Ninh Bình và Hà Giang.",
		},
	],
};
