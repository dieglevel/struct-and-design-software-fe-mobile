import { Loading, Press, SafeAreaView } from "@/apps/components";
import { Button, InputForm } from "@/apps/components/ui";
import { Close, Eye, EyeOff } from "@/assets/svgs";
import { Colors, Texts } from "@/constants";
import { useEffect, useState } from "react";
import { Dimensions, ScrollView, Text, View } from "react-native";
import Toast from "react-native-toast-message";
import { loginApi } from "@/services/auth-service";
import { BaseResponse } from "@/types";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { AsyncStorageKey } from "@/libs/async-storage";
import { navigate, reset } from "@/libs/navigation/navigationService";
import { useAppDispatch } from "@/libs/redux/redux.config";
import { fetchUserProfile } from "@/libs/redux/thunks/user.thunk";
import { fetchFavoriteTours } from "@/libs/redux/thunks/tour.thunk";
import { fetchHistoryTours } from "@/libs/redux/thunks/tour.thunk";
import { getProfile } from "@/services/user-service";

export const LoginScreen = () => {
	const [username, setUsername] = useState<string>("client");
	const [password, setPassword] = useState<string>("123456");
	const dispatch = useAppDispatch();
	const [isShowPassword, setIsShowPassword] = useState<boolean>(false);

	const { height } = Dimensions.get("window");

	const [isLoading, setIsLoading] = useState<boolean>(true);

	const handleLogin = async () => {
		try {
			const result = await loginApi(username, password);
			console.log("result", result);
			if (result.statusCode === 200) {
				Toast.show({
					type: "success",
					text1: "Đăng nhập thành công",
					visibilityTime: 2000,
					autoHide: true,
				});

				const resultFetchProfile = await dispatch(fetchUserProfile());

				if (fetchUserProfile.fulfilled.match(resultFetchProfile)) {
					dispatch(fetchHistoryTours());
					dispatch(fetchFavoriteTours());
					reset("WelcomeScreen");
				} else {
					Toast.show({
						type: "error",
						text1: "Lỗi khi lấy thông tin người dùng",
					});
				}
			}
			
		} catch (error) {

			const err = error as BaseResponse<any>;
			if (err.statusCode === 401) {
				Toast.show({
					type: "error",
					text1: "Đăng nhập thất bại",
					text2: "Tên đăng nhập hoặc mật khẩu không đúng",
					visibilityTime: 2000,
					autoHide: true,
				});
			} else if (err.statusCode === 500) {
				Toast.show({
					type: "error",
					text1: "Đăng nhập thất bại",
					text2: "Lỗi hệ thống, vui lòng thử lại sau",
					visibilityTime: 2000,
					autoHide: true,
				});
			}
		}
	};

	useEffect(() => {
		const checkLogin = async () => {
			const token = await AsyncStorage.getItem(AsyncStorageKey.TOKEN);
			if (token) {
				navigate("BottomTabScreenApp");
			}

			try {
				const response = await getProfile();
				if (response?.statusCode === 200) {
					navigate("BottomTabScreenApp");
				}
			} catch (error) {
			} finally {
				setIsLoading(false);
			}
		};
		checkLogin();
	}, []);

	return (
		<SafeAreaView>
			{isLoading ? (
				<Loading />
			) : (
				<>
					{/* <Press style={{ position: "absolute", backgroundColor: "transpert", padding: 4, top: 40, right: 20 }}>
				<Close size={25} />
			</Press> */}
					<ScrollView style={{ flex: 1, width: "100%", paddingHorizontal: 10, gap: 10 }}>
						<View style={{ flex: 1, justifyContent: "center", height: height }}>
							<View style={{ marginVertical: 20 }}>
								<Text
									style={[
										Texts.bold24,
										{ color: Colors.colorBrand.midnightBlue[950], textAlign: "center" },
									]}
								>
									Đăng nhập
								</Text>
								<Text
									style={[Texts.regular16, { color: Colors.gray[500], textAlign: "center" }]}
								>
									Cùng V-Travel đồng hành với bạn trong các chuyến đi.
								</Text>
							</View>
							<InputForm
								label="Tên đăng nhập"
								value={username}
								onChangeText={setUsername}
								placeholder="Nhập tên đăng nhập"
								required
							/>
							<InputForm
								label="Mật khẩu"
								placeholder="Nhập mật khẩu"
								value={password}
								onChangeText={setPassword}
								secureTextEntry={!isShowPassword}
								right={isShowPassword ? <Eye /> : <EyeOff />}
								onRightPress={() => {
									setIsShowPassword(!isShowPassword);
								}}
								style={{ marginTop: 10 }}
								required
							/>
							<View style={{ flexDirection: "row", justifyContent: "flex-end" }}>
								<Press onPress={() => navigate("ForgotPasswordScreen")}>
									<Text
										style={[
											Texts.regular16,
											{
												color: Colors.colorBrand.burntSienna[500],
												textAlign: "right",
												marginTop: 8,
											},
										]}
									>
										Quên mật khẩu?
									</Text>
								</Press>
							</View>

							<Button
								style={{ marginTop: 8 }}
								onPress={() => {
									console.log("username", username);
									handleLogin();
								}}
							>
								Đăng nhập
							</Button>

							<View
								style={{
									flexDirection: "row",
									justifyContent: "center",
									gap: 4,
									marginTop: 16,
								}}
							>
								<Text style={[Texts.regular16, { color: Colors.gray[500] }]}>
									Bạn chưa có tài khoản?
								</Text>
								<Press onPress={() => navigate("RegisterScreen")}>
									<Text
										style={[
											Texts.regular16,
											{ color: Colors.colorBrand.burntSienna[500] },
										]}
									>
										Đăng ký
									</Text>
								</Press>
							</View>
						</View>
					</ScrollView>
				</>
			)}
		</SafeAreaView>
	);
};
