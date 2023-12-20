import AsyncStorage from "@react-native-async-storage/async-storage";

export const deviceStorage = {

    async saveItem(key: string, value: any) {
        try {
           return await AsyncStorage.setItem(key, value);
        } catch (error) {
        }
    },
    async getItem(key: string) {
        try {
           return await AsyncStorage.getItem(key);
        } catch (error) {
        }
    },
    async removeItem(key: string) {
        try {
            return await AsyncStorage.removeItem(key);
        } catch (error) {
        }
    }

};


