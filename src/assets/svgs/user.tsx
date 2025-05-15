import React from "react";
import Svg, { Path, Rect, Mask, Defs } from "react-native-svg";

interface UserIconProps {
	size?: number;
	color?: string;
	backgroundColor?: string;
	borderRadius?: number; // Thêm prop borderRadius
}

const UserIcon: React.FC<UserIconProps> = ({
	size = 36,
	color = "black",
	backgroundColor = "transparent",
	borderRadius = 8, // Thêm giá trị mặc định cho borderRadius
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
					{/* Tạo nền với bo góc */}
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
				fillRule="evenodd"
				clipRule="evenodd"
				d="M10.4645 21.4645C11.4021 20.5268 12.6739 20 14 20H22C23.3261 20 24.5979 20.5268 25.5355 21.4645C26.4732 22.4021 27 23.6739 27 25V27C27 27.5523 26.5523 28 26 28C25.4477 28 25 27.5523 25 27V25C25 24.2044 24.6839 23.4413 24.1213 22.8787C23.5587 22.3161 22.7956 22 22 22H14C13.2044 22 12.4413 22.3161 11.8787 22.8787C11.3161 23.4413 11 24.2044 11 25V27C11 27.5523 10.5523 28 10 28C9.44772 28 9 27.5523 9 27V25C9 23.6739 9.52678 22.4021 10.4645 21.4645Z"
				fill={color}
			/>
			<Path
				fillRule="evenodd"
				clipRule="evenodd"
				d="M18 10C16.3431 10 15 11.3431 15 13C15 14.6569 16.3431 16 18 16C19.6569 16 21 14.6569 21 13C21 11.3431 19.6569 10 18 10ZM13 13C13 10.2386 15.2386 8 18 8C20.7614 8 23 10.2386 23 13C23 15.7614 20.7614 18 18 18C15.2386 18 13 15.7614 13 13Z"
				fill={color}
			/>
		</Svg>
	);
};

export default UserIcon;
