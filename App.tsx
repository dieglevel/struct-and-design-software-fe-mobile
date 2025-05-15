import { Loading } from "@/apps/components";
import { RootScreenApp } from "@/apps/navigations";
import { fonts } from "@/assets/fonts";
<<<<<<< HEAD
import { NavigationContainer } from "@react-navigation/native";
=======
import { store } from "@/libs/redux/redux.config";
>>>>>>> d2bff4eae1769452d1a16a42d6d5e1cde52f804b
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
		<PaperProvider>
<<<<<<< HEAD
			<NavigationContainer>
				<RootScreenApp />
			</NavigationContainer>
=======
			<Provider store={store}>
				<RootScreenApp />
			</Provider>
>>>>>>> d2bff4eae1769452d1a16a42d6d5e1cde52f804b
		</PaperProvider>
	);
}
