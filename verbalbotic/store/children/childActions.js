import axios from "axios";
import { childrenActions } from "./childSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { API_URL } from "@env";

export const fetchChildren = () => async (dispatch) => {
  try {
    dispatch(childrenActions.getChildrenRequest());

    const token = await AsyncStorage.getItem("token");
    const response = await axios.get(`${API_URL}/api/children/`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    dispatch(childrenActions.getChildrenSuccess(response.data));
  } catch (error) {
    dispatch(
      childrenActions.getChildrenFailure(
        error.response?.data?.message || error.message
      )
    );
  }
};
export const addChild =()=>async (dispatch)=>{
  try {
    
  } catch (error) {
    
  }
}
