import { Colors } from "@/constants";
import Svg, { Path } from "react-native-svg";
interface Props {
	color?: string;
	size?: number;
	outline?: string;
}

export const Calendar = ({ color = Colors.colorBrand.burntSienna[500], size = 25, outline = "#7C87FF" }: Props) => (
	<Svg
		width={size}
		height={size}
		color={color}
		viewBox="0 0 18 19"
		fill="none"
	>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M3.75 3.91797C3.33579 3.91797 3 4.25376 3 4.66797V15.168C3 15.5822 3.33579 15.918 3.75 15.918H14.25C14.6642 15.918 15 15.5822 15 15.168V4.66797C15 4.25376 14.6642 3.91797 14.25 3.91797H3.75ZM1.5 4.66797C1.5 3.42533 2.50736 2.41797 3.75 2.41797H14.25C15.4926 2.41797 16.5 3.42533 16.5 4.66797V15.168C16.5 16.4106 15.4926 17.418 14.25 17.418H3.75C2.50736 17.418 1.5 16.4106 1.5 15.168V4.66797Z"
			fill="currentColor"
		/>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M12 0.917969C12.4142 0.917969 12.75 1.25376 12.75 1.66797V4.66797C12.75 5.08218 12.4142 5.41797 12 5.41797C11.5858 5.41797 11.25 5.08218 11.25 4.66797V1.66797C11.25 1.25376 11.5858 0.917969 12 0.917969Z"
			fill="currentColor"
		/>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M6 0.917969C6.41421 0.917969 6.75 1.25376 6.75 1.66797V4.66797C6.75 5.08218 6.41421 5.41797 6 5.41797C5.58579 5.41797 5.25 5.08218 5.25 4.66797V1.66797C5.25 1.25376 5.58579 0.917969 6 0.917969Z"
			fill="currentColor"
		/>
		<Path
			fillRule="evenodd"
			clipRule="evenodd"
			d="M1.5 7.66797C1.5 7.25376 1.83579 6.91797 2.25 6.91797H15.75C16.1642 6.91797 16.5 7.25376 16.5 7.66797C16.5 8.08218 16.1642 8.41797 15.75 8.41797H2.25C1.83579 8.41797 1.5 8.08218 1.5 7.66797Z"
			fill="currentColor"
		/>
	</Svg>
);
