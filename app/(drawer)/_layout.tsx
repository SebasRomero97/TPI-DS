import "@/global.css";
import { usePermission } from "@/store/datos/usePermission";
import { DrawerContentComponentProps, DrawerContentScrollView, DrawerItemList } from "@react-navigation/drawer";
import { router } from "expo-router";
import { Drawer } from 'expo-router/drawer';
import { useEffect } from "react";
import { Text, View } from "react-native";
import 'react-native-reanimated';


export default function DrawerLayout() {
  const CustomDrawerContent = (props:DrawerContentComponentProps) => {
  
  const {loadUser, status} = usePermission();
  useEffect(() => {
    loadUser()
  }, [loadUser])
  
  useEffect(() => {
    if (!status) {
      router.push('/(auth)')
    }
  
  }, [status])
  









  return (
    <DrawerContentScrollView {...props}>
      <View className=" items-center justify-center mb-7 " style={{ padding: 16, borderBottomWidth: 1, borderColor: '#ccc' }}>
        <Text className="color-[#7672ff] text-2xl font-bold">
          Vitales SW
        </Text>
      </View>

      <DrawerItemList {...props} />
    </DrawerContentScrollView>
  );
}

  return (
      <Drawer
        drawerContent={(props) => <CustomDrawerContent {...props} />}
        screenOptions={{
          drawerType: 'permanent',
          headerShown: false,
          drawerActiveTintColor: '#7672ff',
          drawerStyle: {
            maxWidth: 240,
          },
          drawerLabelStyle: {
            fontFamily: 'SpaceMono',
            textAlign: 'center'
          }
        }}
      >
        {/* <Drawer.Screen name="dashBoard" options={{title: undefined}} /> */}
        <Drawer.Screen name="inventario" options={{title: 'Inventario'}} />
        <Drawer.Screen name="residente" options={{title: 'Residente'}} />
        <Drawer.Screen name="medicamentos" options={{title: 'Medicamentos'}} />
        <Drawer.Screen name="diagnosticos" options={{title: 'Diagnosticos'}} />
        <Drawer.Screen name="tratamientos" options={{title: 'Tratamientos'}} />
        <Drawer.Screen name="dosis" options={{title: 'Dosis'}} />
        <Drawer.Screen name="consulta" options={{title: 'Consulta'}} />
        </Drawer>

  );
}