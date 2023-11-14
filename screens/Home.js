import { Text, View, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./styles/home";
import { Ionicons, Fontisto } from "@expo/vector-icons";
import { Welcome, Carousel, Headings, ProductRow } from "../component/index";

const Home = () => {
  return (
    <SafeAreaView>
      {/* Top Bar */}
      <View style={styles.appBarWrapper}>
        <View style={styles.appBar}>
          <Ionicons name="location-outline" size={24} />
          <Text style={styles.location}>Cobak House</Text>
          <View style={{ alignItems: "flex-end" }}>
            <View style={styles.cartCount}>
              <Text style={styles.cartNumber}>8</Text>
            </View>
            <TouchableOpacity>
              <Fontisto name="shopping-bag" size={24} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Content */}
      <ScrollView>
        <Welcome/>
        <Carousel/>
        <Headings/>
        <ProductRow/>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Home;
