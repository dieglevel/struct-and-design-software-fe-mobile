import React from "react";
import Svg, { Path, Rect, Mask, Defs } from "react-native-svg";

interface HomeIconProps {
	size?: number;
	color?: string;
	backgroundColor?: string;
	borderRadius?: number;
}

const HomeIcon: React.FC<HomeIconProps> = ({
	size = 36,
	color = "black",
	backgroundColor = "transparent",
	borderRadius = 8, // Thêm prop borderRadius
}) => {
	return (
		<Svg
			width={size}
			height={size}
			viewBox="0 0 36 36"
			fill={backgroundColor || "transparent"}
		>
			<Defs>
				<Mask
					id="mask1"
					x="0"
					y="0"
					width="36"
					height="36"
				>
					<Rect
						x="0"
						y="0"
						width="36"
						height="36"
						fill="white"
						rx={borderRadius} // Bo góc
						ry={borderRadius} // Bo góc
					/>
				</Mask>
			</Defs>
			{/* Áp dụng mask để tạo hiệu ứng bo góc */}
			<Rect
				width={size}
				height={size}
				fill={backgroundColor}
				mask="url(#mask1)"
			/>
			<Path
				d="M8 18.2039C8 15.9155 8 14.7713 8.5192 13.8227C9.0384 12.8742 9.98695 12.2855 11.884 11.1081L13.884 9.86687C15.8894 8.62229 16.8921 8 18 8C19.1079 8 20.1106 8.62229 22.116 9.86687L24.116 11.1081C26.0131 12.2855 26.9616 12.8742 27.4808 13.8227C28 14.7713 28 15.9155 28 18.2039V19.725C28 23.6258 28 25.5763 26.8284 26.7881C25.6569 28 23.7712 28 20 28H16C12.2288 28 10.3432 28 9.17157 26.7881C8 25.5763 8 23.6258 8 19.725V18.2039Z"
				stroke={color}
				strokeWidth={3}
			/>
		</Svg>
	);
};

export default HomeIcon;
