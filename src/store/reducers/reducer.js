
const initialState = {
  authToken: null,
  authCameraID: null,
  authDirectionName: "",
  authIPAddress: null,
  authLicencePlateID: null,
  authBeforeDateTime: null,
  authSubsStartDateTime: null,
  authSubsEndDateTime: null,
  authUserId: null,
}

export default (state = initialState, action) => {
  switch(action.type) {
    case 'LOGIN':
      return {
        ...state, //copy all previous states
        authToken: action.payload,
        authUserId: action.authUserId,
      }
    case 'LOGOUT':
      return {
        authToken: null,
      }
    case 'CAMERA_ID':
      return {
        ...state, //copy all previous states
        authCameraID: action.payload,
      }
    case 'DIRECTION_NAME':
      return {
        ...state,
        authDirectionName: action.payload
      }
    case 'IP_ADDRESS':
      return {
        ...state,
        authIPAddress: action.payload,
      }
    case 'LICENCE_PLATE_ID':
      return {
        ...state,
        authLicencePlateID: action.payload
      }
    case 'BEFORE_DATE_TIME':
      return {
        ...state,
        authBeforeDateTime: action.payload
      }
    case 'SUBS_START_DATE_TIME':
      return {
        ...state,
        authSubsStartDateTime: action.payload
      }
    case 'SUBS_START_DATE_TIME':
      return {
        ...state,
        authSubsStartDateTime: action.payload
      }
    case 'SUBS_END_DATE_TIME':
      return {
        ...state,
        authSubsEndDateTime: action.payload
      }
    default: 
      return state;
  }
}

// const initialState = {
//   authToken: "",
//   isLogged: false,
//   hasError: false,
//   isLoading: false,
//   tokenLoading: false,
//   name: "",
//   email: "",
//   password: "",
  
// };

// export default function setStore(state = initialState, action) {
//   switch (action.type) {
//     case "IS_LOGGED":
//       // return action.isLogged;
//       // console.log('islogged', action);
//       return {
//         ...state,
//         isLogged: action.isLogged,
//       };
//     case "LOGIN_HAS_ERROR":
//       // return action.loginHasError;
//       console.log("haserror", action);

//       return {
//         hasError: action.hasError,
//       };
//     case "LOGIN_IS_LOADING":
//       // return action.loginIsLoading;
//       // console.log('isloading', action);
//       return {
//         ...state,
//         isLoading: action.isLoading,
//       };
//     case "TOKEN_IS_LOADED":
//       return {
//         ...state,
//         authToken: action.payload,
//       }
//     case "TOKEN_IS_LOADING":
//       return{
//         ...state,
//         tokenLoading: action.tokenLoading
//       };
//     case "LOGIN":
//       return {
//         ...state, //copy all previous states
//         isLogged: false,
//         email: payload.email,
//         password: payload.password,
//       };
//     case "LOGOUT":
//       return {
//         ...state,
//         authToken: "",
//         isLogged: false,
//         name: "",
//         username: "",
//         password: "",
//       };
//     default:
//       return state;
//   }
// }
