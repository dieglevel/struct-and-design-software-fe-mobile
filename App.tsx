import { Loading } from "@/apps/components";
import { RootScreenApp } from "@/apps/navigations";
import { fonts } from "@/assets/fonts";
import { NavigationContainer } from "@react-navigation/native";
import { useFonts } from "expo-font";
import { PaperProvider } from "react-native-paper";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function App() {
	const [fontsLoaded] = useFonts(fonts);

	if (!fontsLoaded) {
		return <Loading size={300} />;
	}

	return (
		<PaperProvider>
			<NavigationContainer>
				<RootScreenApp />
			</NavigationContainer>
		</PaperProvider>
	);
}
