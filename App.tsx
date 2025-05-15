import { Loading } from "@/apps/components";
import { RootScreenApp } from "@/apps/navigations";
import { fonts } from "@/assets/fonts";
import { store } from "@/libs/redux/redux.config";
import { useFonts } from "expo-font";
import { Text, View } from "react-native";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { Provider } from "react-redux";

export default function App() {
	const [fontsLoaded] = useFonts(fonts);

	if (!fontsLoaded) {
		return <Loading size={300} />;
	}

	return (
		<SafeAreaProvider>
			<PaperProvider>
				<Provider store={store}>
					<RootScreenApp />
				</Provider>
			</PaperProvider>
		</SafeAreaProvider>
	);
}
