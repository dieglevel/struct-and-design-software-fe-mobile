import React, { useState, useRef, useEffect } from "react";
import {
	View,
	Text,
	StyleSheet,
	TextInput,
	TouchableOpacity,
	FlatList,
	KeyboardAvoidingView,
	Platform,
	ActivityIndicator,
	Image,
} from "react-native";
import { SafeAreaView } from "../components";
import { Colors, Texts } from "@/constants";
import { Ionicons } from "@expo/vector-icons";
import { createDefaultAIService, Message as AIMessage, TourSuggestion } from "@/services/ai";

const aiService = createDefaultAIService();

const ChatMessage = ({ message }: { message: AIMessage }) => {
	const isUser = message.type === "user";

	return (
		<View style={[styles.messageContainer, isUser ? styles.userMessage : styles.aiMessage]}>
			{!isUser && (
				<View style={styles.avatarContainer}>
					<Ionicons
						name="person-circle"
						size={36}
						color={Colors.colorBrand.midnightBlue[500]}
					/>
				</View>
			)}
			<View style={[styles.messageBubble, isUser ? styles.userBubble : styles.aiBubble]}>
				<Text style={[styles.messageText, isUser ? styles.userText : styles.aiText]}>{message.text}</Text>
				<Text style={styles.timestamp}>
					{message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
				</Text>
			</View>
		</View>
	);
};

const TourSuggestionCard = ({ tour }: { tour: TourSuggestion }) => {
	return (
		<TouchableOpacity style={styles.tourCard}>
			<Image
				source={{ uri: tour.image }}
				style={styles.tourImage}
			/>
			<View style={styles.tourInfo}>
				<Text
					style={styles.tourName}
					numberOfLines={1}
				>
					{tour.name}
				</Text>
				<View style={styles.tourDetails}>
					<View style={styles.tourDetail}>
						<Ionicons
							name="time-outline"
							size={14}
							color={Colors.gray[600]}
						/>
						<Text style={styles.tourDetailText}>{tour.duration}</Text>
					</View>
					<View style={styles.tourDetail}>
						<Ionicons
							name="star"
							size={14}
							color="#FFD700"
						/>
						<Text style={styles.tourDetailText}>{tour.rating.toFixed(1)}</Text>
					</View>
				</View>
				<Text style={styles.tourPrice}>{tour.price.toLocaleString("vi-VN")}đ</Text>
			</View>
		</TouchableOpacity>
	);
};

export const MessageScreen = () => {
	const [messages, setMessages] = useState<AIMessage[]>([
		{
			id: "1",
			text: "Xin chào! Tôi là trợ lý AI du lịch của TravelSummonRift. Tôi có thể giúp bạn tìm tour, đề xuất điểm đến, hoặc trả lời bất kỳ câu hỏi nào về dịch vụ của chúng tôi. Bạn đang tìm kiếm điều gì?",
			type: "ai",
			timestamp: new Date(),
		},
	]);
	const [inputText, setInputText] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [suggestedTours, setSuggestedTours] = useState<TourSuggestion[]>([]);

	const flatListRef = useRef<FlatList>(null);

	// Scroll to bottom whenever messages update
	useEffect(() => {
		if (flatListRef.current && messages.length > 0) {
			setTimeout(() => {
				flatListRef.current?.scrollToEnd({ animated: true });
			}, 200);
		}
	}, [messages]);

	// Handle sending a message
	const handleSendMessage = async () => {
		if (inputText.trim() === "") return;

		const userMessage: AIMessage = {
			id: Date.now().toString(),
			text: inputText,
			type: "user",
			timestamp: new Date(),
		};

		setMessages((prevMessages) => [...prevMessages, userMessage]);
		setInputText("");
		setIsLoading(true);

		try {
			// Get tour suggestions based on the query
			const tourSuggestions = aiService.generateTourSuggestions(inputText);
			setSuggestedTours(tourSuggestions);

			// Get AI response using the real AI service
			const aiResponseText = await aiService.generateResponse(inputText, messages);

			// Create AI message
			const aiResponse: AIMessage = {
				id: Date.now().toString(),
				text: aiResponseText,
				type: "ai",
				timestamp: new Date(),
			};

			setMessages((prevMessages) => [...prevMessages, aiResponse]);
		} catch (error) {
			console.error("Error getting AI response:", error);
			const errorMessage: AIMessage = {
				id: Date.now().toString(),
				text: "Xin lỗi, đã có lỗi xảy ra. Vui lòng thử lại sau.",
				type: "system",
				timestamp: new Date(),
			};
			setMessages((prevMessages) => [...prevMessages, errorMessage]);
		} finally {
			setIsLoading(false);
		}
	};

	// Loading indicator component
	const renderLoading = () => {
		if (!isLoading) return null;

		return (
			<View style={styles.loadingContainer}>
				<View style={styles.loadingBubble}>
					<ActivityIndicator
						size="small"
						color={Colors.colorBrand.burntSienna[500]}
					/>
					<Text style={styles.loadingText}>AI đang trả lời...</Text>
				</View>
			</View>
		);
	};

	// Render tour suggestions
	const renderTourSuggestions = () => {
		if (suggestedTours.length === 0) return null;

		return (
			<View style={styles.suggestionsContainer}>
				<Text style={styles.suggestionsTitle}>Gợi ý tour du lịch:</Text>
				<FlatList
					data={suggestedTours}
					keyExtractor={(item) => item.id}
					horizontal
					showsHorizontalScrollIndicator={false}
					renderItem={({ item }) => <TourSuggestionCard tour={item} />}
					contentContainerStyle={styles.suggestionsList}
				/>
			</View>
		);
	};

	return (
		<SafeAreaView style={styles.container}>
			<View style={styles.header}>
				<Ionicons
					name="chatbubble-ellipses"
					size={24}
					color={Colors.colorBrand.burntSienna[500]}
				/>
				<Text style={styles.headerTitle}>Trợ lý Du lịch AI</Text>
			</View>

			<KeyboardAvoidingView
				style={styles.chatContainer}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
				keyboardVerticalOffset={Platform.OS === "ios" ? 90 : 0}
			>
				<FlatList
					ref={flatListRef}
					data={messages}
					keyExtractor={(item) => item.id}
					renderItem={({ item }) => <ChatMessage message={item} />}
					contentContainerStyle={styles.messagesContainer}
					showsVerticalScrollIndicator={false}
					ListFooterComponent={
						<>
							{renderLoading()}
							{/* {renderTourSuggestions()} */}
						</>
					}
				/>

				<View style={styles.inputContainer}>
					<TextInput
						style={styles.input}
						placeholder="Nhập câu hỏi của bạn..."
						placeholderTextColor={Colors.gray[400]}
						value={inputText}
						onChangeText={setInputText}
						multiline
						maxLength={500}
					/>
					<TouchableOpacity
						style={[styles.sendButton, !inputText.trim() && styles.sendButtonDisabled]}
						onPress={handleSendMessage}
						disabled={!inputText.trim() || isLoading}
					>
						<Ionicons
							name="send"
							size={22}
							color={Colors.gray[0]}
						/>
					</TouchableOpacity>
				</View>
			</KeyboardAvoidingView>
		</SafeAreaView>
	);
};

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.gray[50],
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		padding: 16,
		backgroundColor: Colors.gray[0],
		borderBottomWidth: 1,
		borderBottomColor: Colors.gray[200],
		width: "100%",
	},
	headerTitle: {
		...Texts.bold18,
		color: Colors.gray[900],
		marginLeft: 10,
	},
	chatContainer: {
		flex: 1,
	},
	messagesContainer: {
		paddingHorizontal: 16,
		paddingBottom: 16,
	},
	messageContainer: {
		marginTop: 16,
		flexDirection: "row",
		alignItems: "flex-end",
	},
	userMessage: {
		justifyContent: "flex-end",
	},
	aiMessage: {
		justifyContent: "flex-start",
	},
	avatarContainer: {
		width: 36,
		height: 36,
		borderRadius: 18,
		marginRight: 8,
		backgroundColor: Colors.colorBrand.midnightBlue[50],
		justifyContent: "center",
		alignItems: "center",
		overflow: "hidden",
	},
	avatar: {
		width: 36,
		height: 36,
	},
	messageBubble: {
		maxWidth: "80%",
		borderRadius: 16,
		padding: 12,
		paddingBottom: 8,
		...Texts.shadowSmall,
	},
	userBubble: {
		backgroundColor: Colors.colorBrand.burntSienna[500],
		borderBottomRightRadius: 2,
	},
	aiBubble: {
		backgroundColor: Colors.gray[0],
		borderBottomLeftRadius: 2,
	},
	messageText: {
		...Texts.regular14,
		marginBottom: 4,
	},
	userText: {
		color: Colors.gray[0],
	},
	aiText: {
		color: Colors.gray[800],
	},
	timestamp: {
		...Texts.regular12,
		color: Colors.gray[400],
		alignSelf: "flex-end",
	},
	loadingContainer: {
		marginTop: 16,
		alignItems: "flex-start",
	},
	loadingBubble: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: Colors.gray[0],
		borderRadius: 16,
		padding: 12,
		...Texts.shadowSmall,
	},
	loadingText: {
		...Texts.regular14,
		marginLeft: 8,
		color: Colors.gray[600],
	},
	inputContainer: {
		flexDirection: "row",
		alignItems: "flex-end",
		paddingHorizontal: 16,
		paddingVertical: 12,
		backgroundColor: Colors.gray[0],
		borderTopWidth: 1,
		borderTopColor: Colors.gray[200],
		width: "100%",
	},
	input: {
		flex: 1,
		maxHeight: 100,
		minHeight: 40,
		backgroundColor: Colors.gray[50],
		borderRadius: 20,
		paddingHorizontal: 16,
		paddingTop: 10,
		paddingBottom: 10,
		...Texts.regular14,
		color: Colors.gray[900],
	},
	sendButton: {
		marginLeft: 8,
		width: 40,
		height: 40,
		borderRadius: 20,
		backgroundColor: Colors.colorBrand.burntSienna[500],
		justifyContent: "center",
		alignItems: "center",
	},
	sendButtonDisabled: {
		backgroundColor: Colors.colorBrand.burntSienna[300],
	},
	suggestionsContainer: {
		marginTop: 16,
		backgroundColor: Colors.gray[50],
		borderRadius: 16,
		padding: 12,
	},
	suggestionsTitle: {
		...Texts.bold16,
		color: Colors.gray[800],
		marginBottom: 8,
	},
	suggestionsList: {
		paddingBottom: 8,
	},
	tourCard: {
		width: 200,
		backgroundColor: Colors.gray[0],
		borderRadius: 12,
		overflow: "hidden",
		marginRight: 12,
		...Texts.shadowSmall,
	},
	tourImage: {
		width: "100%",
		height: 120,
	},
	tourInfo: {
		padding: 10,
	},
	tourName: {
		...Texts.bold16,
		color: Colors.gray[900],
		marginBottom: 4,
	},
	tourDetails: {
		flexDirection: "row",
		marginBottom: 6,
	},
	tourDetail: {
		flexDirection: "row",
		alignItems: "center",
		marginRight: 12,
	},
	tourDetailText: {
		...Texts.regular12,
		color: Colors.gray[600],
		marginLeft: 4,
	},
	tourPrice: {
		...Texts.bold16,
		color: Colors.colorBrand.burntSienna[500],
	},
});
/*
 * AI TRAVEL ASSISTANT CHAT
 *
 * This component implements a chat interface with an AI assistant that helps users:
 * - Find tours based on keywords (beach, mountain, etc.)
 * - Get recommendations based on preferences (budget, duration, etc.)
 * - Answer FAQs about bookings, payments, cancellations, etc.
 *
 * CURRENT IMPLEMENTATION:
 * - Uses real AI services (Gemini, Claude, DeepSeek) with fallback to mock responses
 * - Displays tour suggestions related to user queries
 * - Maintains chat history during the session
 *
 * FUTURE ENHANCEMENTS:
 * - Integration with OpenAI or other AI service API
 * - Redux integration for persistent chat history
 * - Linking suggested tours to actual tour detail pages
 * - Enhanced keyword detection and natural language processing
 */
