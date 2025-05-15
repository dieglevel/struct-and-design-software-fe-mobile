import { createNavigationContainerRef } from "@react-navigation/native";
import { RootStackParamList, StackScreenNavigationProp } from "./stack-navigator.config";

export const navigationRef = createNavigationContainerRef<RootStackParamList>();

export function navigate<RouteName extends keyof RootStackParamList>(
	name: RouteName,
	params?: RootStackParamList[RouteName] | undefined,
) {
	if (navigationRef.isReady()) {
		navigationRef.navigate(name, params);
	}
}

export function goBack() {
	if (navigationRef.isReady()) {
		navigationRef.goBack();
	}
}

export function reset<RouteName extends keyof RootStackParamList>(
	name: RouteName,
	params?: RootStackParamList[RouteName],
) {
	if (navigationRef.isReady()) {
		navigationRef.resetRoot({
			index: 0,
			routes: [{ name, params }],
		});
	}
}

export function push<RouteName extends keyof RootStackParamList>(
	name: RouteName,
	params?: RootStackParamList[RouteName] | undefined,
) {
	if (navigationRef.isReady()) {
		navigationRef.dispatch({
			...navigationRef.getRootState(),
			type: "Navigation/PUSH",
			payload: { name, params },
		});
	}
}
