import { Colors } from "@/constants"
import { View } from "react-native"
import { ActivityIndicator } from "react-native-paper"

export const LoadingSpin = () => {
   return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
         <ActivityIndicator size="large" color={Colors.colorBrand.burntSienna[500]} />
      </View>
   )
}