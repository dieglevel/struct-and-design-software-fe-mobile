import { FlatList, ScrollView } from "react-native";
import RatingTour from "../ui/rating";
import Comment from "../ui/comment";
import { CommentProps, RatingDetail } from "@/types/implement";

export const ReviewScene = ({
	ratingDetails,
	commentData,
}: {
	ratingDetails: RatingDetail[];
	commentData: CommentProps[];
}) => (
	<ScrollView
		style={{ flex: 1 }}
		keyboardShouldPersistTaps="handled"
		nestedScrollEnabled
		showsVerticalScrollIndicator={false}
	>
		<RatingTour
			rating={4.9}
			ratingDetails={ratingDetails}
		/>
		<FlatList
			data={commentData}
			renderItem={({ item }) => <Comment {...item} />}
			keyExtractor={(item, index) => index.toString()}
			nestedScrollEnabled
		/>
	</ScrollView>
);
