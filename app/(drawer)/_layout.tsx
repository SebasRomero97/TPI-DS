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
    router.replace('/(auth)')
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
        maxWidth: 230,
      },
      drawerLabelStyle: {
        fontFamily: 'SpaceMono',
        textAlign: 'center'
      }
    }}
    >

        {/* <Drawer.Screen name="dashBoard" options={{title: undefined}} /> */}
        <Drawer.Screen name="inventario" options={{title: 'Inventario'}} />
        <Drawer.Screen name="alarmas" options={{title: 'Alarmas'}} />
        <Drawer.Screen name="diagnosticos" options={{title: 'Diagnosticos'}} />
        <Drawer.Screen name="tratamientos" options={{title: 'Tratamientos'}} />
        <Drawer.Screen name="dosis" options={{title: 'Dosis Administradas'}} />
        <Drawer.Screen name="consulta" options={{title: 'Consulta'}} />

        </Drawer>

  );
}