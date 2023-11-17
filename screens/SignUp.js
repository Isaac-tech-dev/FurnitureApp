import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import BackBtn from "../component/BackBtn";
import Button from "../component/Button";
import { useNavigation } from "@react-navigation/native";
import { COLORS, SIZES } from "../constants";
import { TextInput } from "react-native-gesture-handler";
import { Formik } from "formik";
import * as Yup from "yup";
import {
  AntDesign,
  MaterialCommunityIcons,
  SimpleLineIcons,
  Ionicons,
} from "@expo/vector-icons";
import axios from "axios";

const validationSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Required"),
  email: Yup.string()
    .email("Provide a valid email address")
    .required("Required"),
  location: Yup.string()
    .min(3, "Provide a valid location")
    .required("Required"),
  username: Yup.string()
    .min(3, "Provide a valid username")
    .required("Required"),
});

//ALERT
const invalidForm = () => {
  Alert.alert("Invalid Form", "Provide all required Field", [
    { text: "Cancel", onPress: () => {} },
    { text: "Continue", onPress: () => {} },
    { defaultIndex: 1 },
  ]);
};

const SignUp = ({ navigation }) => {
  const [loader, setLoader] = useState(false);
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [obsecureText, setObsecureText] = useState(false);

  //REGISTER USER
  const registerUser = async (values) => {
    setLoader(true);
    try {
      const endpoint = "http://localhost:3000/api/register";
      const data = values;

      const response = await axios.post(endpoint, data);
      if (response.status === 201) {
        navigation.replace("Login");
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <ScrollView>
      <SafeAreaView style={{ marginHorizontal: 20 }}>
        <View>
          <BackBtn onPress={() => navigation.goBack()} />
          <Image
            source={require("../assets/images/bk.png")}
            style={styles.loginCover}
          />

          <Text style={styles.title}>Unlimited Luxurious Furniture</Text>
          <Formik
            initialValues={{
              username: "",
              email: "",
              password: "",
              location: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values) => registerUser(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
              setFieldTouched,
              touched,
            }) => (
              <View>
                {/* Username View */}
                <View style={styles.wrapper}>
                  {/* Email Input*/}
                  <Text style={styles.label}>UserName</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.username ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="face-man-profile"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter Username"
                      onFocus={() => {
                        setFieldTouched("username");
                      }}
                      onBlur={() => setFieldTouched("username", "")}
                      value={values.username}
                      onChangeText={handleChange("username")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.username && errors.username && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                {/* Email View */}
                <View style={styles.wrapper}>
                  {/* Email Input*/}
                  <Text style={styles.label}>E-Mail</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.email ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="email-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter E-mail"
                      onFocus={() => {
                        setFieldTouched("email");
                      }}
                      onBlur={() => setFieldTouched("email", "")}
                      value={values.email}
                      onChangeText={handleChange("email")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.email && errors.email && (
                    <Text style={styles.errorMessage}>{errors.email}</Text>
                  )}
                </View>

                {/* Location View */}
                <View style={styles.wrapper}>
                  {/* Email Input*/}
                  <Text style={styles.label}>Location</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.location ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <Ionicons
                      name="location-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Enter Location"
                      onFocus={() => {
                        setFieldTouched("location");
                      }}
                      onBlur={() => setFieldTouched("location", "")}
                      value={values.location}
                      onChangeText={handleChange("location")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                    />
                  </View>
                  {touched.location && errors.location && (
                    <Text style={styles.errorMessage}>{errors.location}</Text>
                  )}
                </View>

                {/* Password View */}
                <View style={styles.wrapper}>
                  {/* Password Input*/}
                  <Text style={styles.label}>Password</Text>
                  <View
                    style={styles.inputWrapper(
                      touched.password ? COLORS.primary : COLORS.offwhite
                    )}
                  >
                    <MaterialCommunityIcons
                      name="lock-outline"
                      size={20}
                      color={COLORS.gray}
                      style={styles.iconStyle}
                    />
                    <TextInput
                      placeholder="Password"
                      onFocus={() => {
                        setFieldTouched("password");
                      }}
                      onBlur={() => setFieldTouched("password", "")}
                      value={values.password}
                      onChangeText={handleChange("password")}
                      autoCapitalize="none"
                      autoCorrect={false}
                      style={{ flex: 1 }}
                      secureTextEntry={obsecureText}
                    />
                    <TouchableOpacity
                      onPress={() => {
                        setObsecureText(!obsecureText);
                      }}
                    >
                      <MaterialCommunityIcons
                        name={obsecureText ? "eye-outline" : "eye-off-outline"}
                        size={18}
                        color={COLORS.gray}
                      />
                    </TouchableOpacity>
                  </View>
                  {touched.password && errors.password && (
                    <Text style={styles.errorMessage}>{errors.password}</Text>
                  )}
                </View>
                <Button
                  title={"S I G N  U P"}
                  onPress={isValid ? handleSubmit : invalidForm}
                  isValid={isValid}
                  loader={loader}
                />

                <Text style={styles.register}>
                  Already have an account?{" "}
                  <Text style={styles.register} onPress={() => {}}>
                    Login
                  </Text>
                </Text>
              </View>
            )}
          </Formik>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

export default SignUp;

const styles = StyleSheet.create({
  loginCover: {
    height: SIZES.height / 5,
    width: SIZES.width - 60,
    resizeMode: "contain",
    marginBottom: SIZES.xxLarge,
  },
  title: {
    fontFamily: "bold",
    fontSize: SIZES.xLarge,
    color: COLORS.primary,
    alignItems: "center",
    // justifyContent: "center",
    marginBottom: SIZES.xxLarge,
  },
  wrapper: {
    marginBottom: 20,
    //marginHorizontal: 20,
  },
  label: {
    fontFamily: "regular",
    fontSize: SIZES.xSmall,
    marginBottom: 5,
    marginEnd: 5,
    textAlign: "right",
  },
  inputWrapper: (borderColor) => ({
    borderColor: borderColor,
    backgroundColor: COLORS.lightWhite,
    borderWidth: 1,
    height: 50,
    borderRadius: 12,
    flexDirection: "row",
    paddingHorizontal: 15,
    alignItems: "center",
  }),
  iconStyle: {
    marginRight: 10,
  },
  errorMessage: {
    color: COLORS.red,
    fontFamily: "regular",
    marginTop: 5,
    fontSize: SIZES.xSmall,
    marginLeft: 5,
  },
  register: {
    marginTop: 20,
    alignItems: "center",
  },
});
