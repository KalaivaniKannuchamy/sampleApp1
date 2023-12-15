/**
 * Created by Eswar Sairam on 28/09/20
 **/

import AsyncStorageDefault from "@react-native-async-storage/async-storage";
import axios from "axios";
import PropTypes from "prop-types";
import { Component } from "react";
import { NativeModules } from "react-native";
import strings from "../../../lib/AppStrings";
import Alert from "../Alert";
import AsyncStorage from "../AsyncStorage";
import authAxios from "./authAxios";
import NetworkUtils from "./NetworkUtils";
import { deviceUniqueId } from "../../../lib/globalFunctions";
import RNRestart from "react-native-restart";
import AsyncStorageKeys from "../../../lib/AsyncStorageKeys";
const enableCheckSum = false;
const enableToken = false;
const enableEncryption = false;
const encryptionKey = "";
const initializationVector = "";

var Aes = NativeModules.Aes;
const localurl = "";
const stagingUrl = "";
const productionUrl = "";

const axiosInstance = axios.create({
  baseURL: productionUrl,
  timeout: 50000,
});

axiosInstance.interceptors.request.use(
  async (config) => {
    // config.headers['Content-Type'] = "application/json"
    const accessToken = await AsyncStorage.getData(
      AsyncStorageKeys.userAccessToken
    );
    //console.log("get token inside Ws call=---",accessToken);

    if (accessToken) config.headers["AUTHTOKEN"] = accessToken;
    console.log("config=====>", JSON.stringify(config));
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

const updateProgressData = async (progressEvent, totalLength, progressData) => {
  // console.log(Math.round((progressEvent.loaded * 100) / totalLength), 'progress', totalLength, progressEvent.loaded, Math.round((progressEvent.loaded * 100)))
  progressData(Math.round((progressEvent.loaded * 100) / totalLength));
};

const callApiWithResponse = async (
  apiName,
  params,
  apiAxios,
  completion,
  objValues,
  objKeys,
  progressData
) => {
  console.log(
    "API INPUT---->",
    axiosInstance.defaults.baseURL,
    apiName,
    params,
    "post"
  );
  const response = await apiAxios(apiName, params, {
    onUploadProgress: (progressEvent) => {
      const totalLength = progressEvent.lengthComputable
        ? progressEvent.total
        : progressEvent.target.getResponseHeader("content-length") ||
          progressEvent.target.getResponseHeader(
            "x-decompressed-content-length"
          );
      if (totalLength !== null) {
        updateProgressData(progressEvent, totalLength, progressData);
      }
    },
  });
  if (enableEncryption) {
    Aes.decrypt(response.data, encryptionKey, initializationVector).then(
      async (cipher) => {
        const dataResponse = JSON.parse(cipher);
        if (enableToken) {
          //console.log("dataResponse.settings",response)
          if (
            dataResponse.settings.success === "-200" ||
            dataResponse.settings.success === "-300" ||
            dataResponse.settings.success === "-400" ||
            dataResponse.settings.success === "-500"
          ) {
            reGenerateTokenAndCallApi(
              dataResponse,
              apiName,
              params,
              apiAxios,
              completion,
              objValues,
              objKeys,
              progressData
            );
          } else {
            // console.log("API OUTPUT AFTER DECRYPTION",dataResponse)
            completion(dataResponse, null);
          }
        } else {
          completion(dataResponse, null);
        }
      }
    );
  } else {
    if (enableToken) {
      if (
        response.data.settings.success === "-200" ||
        response.data.settings.success === "-300" ||
        response.data.settings.success === "-400" ||
        response.data.settings.success === "-500"
      ) {
        reGenerateTokenAndCallApi(
          response.data,
          apiName,
          params,
          apiAxios,
          completion,
          objValues,
          objKeys,
          progressData
        );
      } else {
        completion(response.data, null);
      }
    } else {
      // console.log(response.data)
      completion(response.data, null);
    }
  }
};

const reGenerateTokenAndCallApi = async (
  response,
  apiName,
  formData,
  apiAxios,
  completion,
  objValues,
  objKeys,
  progressData
) => {
  var checkSumString = "";
  const tokenResponseData = await authAxios.get("create_token");
  if (enableEncryption) {
    Aes.decrypt(
      tokenResponseData.data,
      encryptionKey,
      initializationVector
    ).then(async (cipher) => {
      const tokenResponse = JSON.parse(cipher);
      if (tokenResponse.settings.success === "1") {
        await AsyncStorageDefault.setItem(
          "ws_token",
          tokenResponse.data.ws_token
        );
        var formDataNew = new FormData();
        for (let i in formData._parts) {
          if (formData._parts[i][0] === "ws_token") {
            formDataNew.append(
              formData._parts[i][0],
              (await AsyncStorageDefault.getItem("ws_token")) === null
                ? ""
                : await AsyncStorageDefault.getItem("ws_token")
            );
          } else if (formData._parts[i][0] === "ws_checksum") {
          } else {
            formDataNew.append(formData._parts[i][0], formData._parts[i][1]);
          }
        }
        if (enableCheckSum) {
          if (enableEncryption) {
            var formData2 = new FormData();
            for (let i in objValues) {
              formData2.append(objKeys[i], objValues[i]);
            }
            formData2.append(
              "ws_token",
              (await AsyncStorageDefault.getItem("ws_token")) === null
                ? ""
                : await AsyncStorageDefault.getItem("ws_token")
            );
            formData2._parts.sort();
            var objectAlreadyPresent = "";
            for (let i in formData2._parts) {
              if (!(typeof formData2._parts[i][1] === "object")) {
                checkSumString = checkSumString.concat(
                  formData2._parts[i][0] +
                    "=" +
                    formData2._parts[i][1].toString()
                );
              } else {
                if (objectAlreadyPresent == formData2._parts[i][0]) {
                } else {
                  checkSumString = checkSumString.concat(
                    formData2._parts[i][0].replace("[", "").replace("]", "") +
                      "=" +
                      ""
                  );
                  objectAlreadyPresent = formData2._parts[i][0];
                  // console.log('objectAlreadyPresent---->', objectAlreadyPresent)
                }
              }
            }
          } else {
            formDataNew._parts.sort();
            for (let i in formDataNew._parts) {
              var objectAlreadyPresent = "";
              if (!(typeof formDataNew._parts[i][1] === "object")) {
                checkSumString = checkSumString.concat(
                  formDataNew._parts[i][0] +
                    "=" +
                    formDataNew._parts[i][1].toString()
                );
              } else {
                if (objectAlreadyPresent == formDataNew._parts[i][0]) {
                } else {
                  checkSumString = checkSumString.concat(
                    formDataNew._parts[i][0].replace("[", "").replace("]", "") +
                      "=" +
                      ""
                  );
                  objectAlreadyPresent = formDataNew._parts[i][0];
                  // console.log('objectAlreadyPresent---->', objectAlreadyPresent)
                }
              }
            }
          }
          // console.log("FORM DATA AFTER REGENERATE TOKEN--->",formDataNew)
          reGenerateCheckSumAndCallApi(
            apiName,
            formDataNew,
            apiAxios,
            completion,
            objValues,
            objKeys,
            checkSumString,
            progressData
          );
        } else {
          callApiWithResponse(
            apiName,
            formDataNew,
            apiAxios,
            completion,
            objValues,
            objKeys,
            progressData
          );
        }
      } else {
        completion(response, null);
      }
    });
  } else {
    const tokenResponse = tokenResponseData;
    // console.log('tokenResponse', tokenResponse.data)
    if (tokenResponse.data.settings.success === "1") {
      await AsyncStorageDefault.setItem(
        "ws_token",
        tokenResponse.data.data.ws_token
      );
      var formDataNew = new FormData();
      for (let i in formData._parts) {
        if (formData._parts[i][0] === "ws_token") {
          formDataNew.append(
            formData._parts[i][0],
            (await AsyncStorageDefault.getItem("ws_token")) === null
              ? ""
              : await AsyncStorageDefault.getItem("ws_token")
          );
        } else if (formData._parts[i][0] === "ws_checksum") {
        } else {
          formDataNew.append(formData._parts[i][0], formData._parts[i][1]);
        }
      }
      if (enableCheckSum) {
        if (enableEncryption) {
          var formData2 = new FormData();
          for (let i in objValues) {
            formData2.append(objKeys[i], objValues[i]);
          }
          formData2.append(
            "ws_token",
            (await AsyncStorageDefault.getItem("ws_token")) === null
              ? ""
              : await AsyncStorageDefault.getItem("ws_token")
          );
          formData2._parts.sort();
          var objectAlreadyPresent = "";
          for (let i in formData2._parts) {
            if (!(typeof formData2._parts[i][1] === "object")) {
              checkSumString = checkSumString.concat(
                formData2._parts[i][0] + "=" + formData2._parts[i][1].toString()
              );
            } else {
              if (objectAlreadyPresent == formData2._parts[i][0]) {
              } else {
                checkSumString = checkSumString.concat(
                  formData2._parts[i][0].replace("[", "").replace("]", "") +
                    "=" +
                    ""
                );
                objectAlreadyPresent = formData2._parts[i][0];
                // console.log('objectAlreadyPresent---->', objectAlreadyPresent)
              }
            }
          }
        } else {
          formDataNew._parts.sort();
          var objectAlreadyPresent = "";
          for (let i in formDataNew._parts) {
            if (!(typeof formDataNew._parts[i][1] === "object")) {
              checkSumString = checkSumString.concat(
                formDataNew._parts[i][0] +
                  "=" +
                  formDataNew._parts[i][1].toString()
              );
            } else {
              if (objectAlreadyPresent == formDataNew._parts[i][0]) {
              } else {
                checkSumString = checkSumString.concat(
                  formDataNew._parts[i][0].replace("[", "").replace("]", "") +
                    "=" +
                    ""
                );
                objectAlreadyPresent = formDataNew._parts[i][0];
                // console.log('objectAlreadyPresent---->', objectAlreadyPresent)
              }
            }
          }
        }
        reGenerateCheckSumAndCallApi(
          apiName,
          formDataNew,
          apiAxios,
          completion,
          objValues,
          objKeys,
          checkSumString,
          progressData
        );
      } else {
        callApiWithResponse(
          apiName,
          formDataNew,
          apiAxios,
          completion,
          objValues,
          objKeys,
          progressData
        );
      }
    } else {
      completion(response, null);
    }
  }
};

const reGenerateCheckSumAndCallApi = async (
  apiName,
  formDataNew,
  apiAxios,
  completion,
  objValues,
  objKeys,
  checkSumString,
  progressData
) => {
  // console.log('checkSumStringNew', checkSumString)
  Aes.sha1(checkSumString).then(async (hash) => {
    if (enableEncryption) {
      let formData = new FormData();
      if (objValues.length > 0) {
        for (let i in objValues) {
          var encryptText = objValues[i];
          if (!(typeof encryptText === "object")) {
            if (encryptText != "") {
              Aes.encrypt(
                encryptText.toString(),
                encryptionKey,
                initializationVector
              ).then(async (cipher) => {
                formData.append(objKeys[i], cipher);
                if (i == objValues.length - 1) {
                  formData.append("ws_checksum", hash);
                  formData.append(
                    "ws_token",
                    (await AsyncStorageDefault.getItem("ws_token")) === null
                      ? ""
                      : await AsyncStorageDefault.getItem("ws_token")
                  );
                  // console.log("FORM DATA AFTER REGENERATE CHECKSUM--->",formData)
                  callApiWithResponse(
                    apiName,
                    formData,
                    apiAxios,
                    completion,
                    objValues,
                    objKeys,
                    progressData
                  );
                }
              });
            } else {
              formData.append(objKeys[i], encryptText);
              if (i == objValues.length - 1) {
                formData.append("ws_checksum", hash);
                formData.append(
                  "ws_token",
                  (await AsyncStorageDefault.getItem("ws_token")) === null
                    ? ""
                    : await AsyncStorageDefault.getItem("ws_token")
                );
                // console.log("FORM DATA AFTER REGENERATE CHECKSUM--->",formData)
                callApiWithResponse(
                  apiName,
                  formData,
                  apiAxios,
                  completion,
                  objValues,
                  objKeys,
                  progressData
                );
              }
            }
          } else {
            formData.append(objKeys[i], encryptText);
            if (i == objValues.length - 1) {
              formData.append("ws_checksum", hash);
              formData.append(
                "ws_token",
                (await AsyncStorageDefault.getItem("ws_token")) === null
                  ? ""
                  : await AsyncStorageDefault.getItem("ws_token")
              );
              // console.log("FORM DATA AFTER REGENERATE CHECKSUM--->",formData)
              callApiWithResponse(
                apiName,
                formData,
                apiAxios,
                completion,
                objValues,
                objKeys,
                progressData
              );
            }
          }
        }
      } else {
        formData.append("ws_checksum", hash);
        formData.append(
          "ws_token",
          (await AsyncStorageDefault.getItem("ws_token")) === null
            ? ""
            : await AsyncStorageDefault.getItem("ws_token")
        );
        callApiWithResponse(
          apiName,
          formData,
          apiAxios,
          completion,
          objValues,
          objKeys,
          progressData
        );
      }
    } else {
      formDataNew.append("ws_checksum", hash);
      callApiWithResponse(
        apiName,
        formDataNew,
        apiAxios,
        completion,
        objValues,
        objKeys,
        progressData
      );
    }
  });
};

const callApiWithEncryption = async (
  objValues,
  objKeys,
  apiName,
  apiAxios,
  completion,
  progressData
) => {
  let formData = new FormData();
  if (objValues.length > 0) {
    for (let i in objValues) {
      var encryptText = objValues[i];
      if (!(typeof encryptText === "object")) {
        if (encryptText != "") {
          Aes.encrypt(
            encryptText.toString(),
            encryptionKey,
            initializationVector
          ).then(async (cipher) => {
            formData.append(objKeys[i], cipher);
            if (i == objValues.length - 1) {
              callApiWithResponse(
                apiName,
                formData,
                apiAxios,
                completion,
                objValues,
                objKeys,
                progressData
              );
            }
          });
        } else {
          formData.append(objKeys[i], encryptText);
          if (i == objValues.length - 1) {
            callApiWithResponse(
              apiName,
              formData,
              apiAxios,
              completion,
              objValues,
              objKeys,
              progressData
            );
          }
        }
      } else {
        formData.append(objKeys[i], encryptText);
        if (i == objValues.length - 1) {
          callApiWithResponse(
            apiName,
            formData,
            apiAxios,
            completion,
            objValues,
            objKeys,
            progressData
          );
        }
      }
    }
  }
};

const callApiWithToken = async (
  objValues,
  objKeys,
  apiName,
  apiAxios,
  completion,
  progressData
) => {
  let formData = new FormData();
  for (let i in objValues) {
    formData.append(objKeys[i], objValues[i]);
  }
  formData.append(
    "ws_token",
    (await AsyncStorageDefault.getItem("ws_token")) === null
      ? ""
      : await AsyncStorageDefault.getItem("ws_token")
  );
  callApiWithResponse(
    apiName,
    formData,
    apiAxios,
    completion,
    objValues,
    objKeys,
    progressData
  );
};

const callApiWithCheckSum = async (
  objValues,
  objKeys,
  apiName,
  apiAxios,
  completion,
  progressData
) => {
  let formData = new FormData();
  for (let i in objValues) {
    formData.append(objKeys[i], objValues[i]);
  }
  formData._parts.sort();
  var checkSumString = "";
  var objectAlreadyPresent = "";
  for (let i in formData._parts) {
    if (!(typeof formData._parts[i][1] === "object")) {
      checkSumString = checkSumString.concat(
        formData._parts[i][0] + "=" + formData._parts[i][1].toString()
      );
    } else {
      if (objectAlreadyPresent == formData._parts[i][0]) {
      } else {
        checkSumString = checkSumString.concat(
          formData._parts[i][0].replace("[", "").replace("]", "") + "=" + ""
        );
        objectAlreadyPresent = formData._parts[i][0];
        // console.log('objectAlreadyPresent---->', objectAlreadyPresent)
      }
    }
  }
  // console.log('checkSumString', checkSumString)
  Aes.sha1(checkSumString).then(async (hash) => {
    formData.append("ws_checksum", hash);
    callApiWithResponse(
      apiName,
      formData,
      apiAxios,
      completion,
      objValues,
      objKeys,
      progressData
    );
  });
};

const callApiWithTokenAndEncryption = async (
  objValues,
  objKeys,
  apiName,
  apiAxios,
  completion,
  progressData
) => {
  let formData = new FormData();

  if (objValues.length > 0) {
    for (let i in objValues) {
      var encryptText = objValues[i];
      if (!(typeof encryptText === "object")) {
        if (encryptText != "") {
          Aes.encrypt(
            encryptText.toString(),
            encryptionKey,
            initializationVector
          ).then(async (cipher) => {
            formData.append(objKeys[i], cipher);
            if (i == objValues.length - 1) {
              formData.append(
                "ws_token",
                (await AsyncStorageDefault.getItem("ws_token")) === null
                  ? ""
                  : await AsyncStorageDefault.getItem("ws_token")
              );
              callApiWithResponse(
                apiName,
                formData,
                apiAxios,
                completion,
                objValues,
                objKeys,
                progressData
              );
            }
          });
        } else {
          formData.append(objKeys[i], encryptText);
          if (i == objValues.length - 1) {
            formData.append(
              "ws_token",
              (await AsyncStorageDefault.getItem("ws_token")) === null
                ? ""
                : await AsyncStorageDefault.getItem("ws_token")
            );
            callApiWithResponse(
              apiName,
              formData,
              apiAxios,
              completion,
              objValues,
              objKeys,
              progressData
            );
          }
        }
      } else {
        formData.append(objKeys[i], encryptText);
        if (i == objValues.length - 1) {
          formData.append(
            "ws_token",
            (await AsyncStorageDefault.getItem("ws_token")) === null
              ? ""
              : await AsyncStorageDefault.getItem("ws_token")
          );
          callApiWithResponse(
            apiName,
            formData,
            apiAxios,
            completion,
            objValues,
            objKeys,
            progressData
          );
        }
      }
    }
  } else {
    formData.append(
      "ws_token",
      (await AsyncStorageDefault.getItem("ws_token")) === null
        ? ""
        : await AsyncStorageDefault.getItem("ws_token")
    );
    callApiWithResponse(
      apiName,
      formData,
      apiAxios,
      completion,
      objValues,
      objKeys,
      progressData
    );
  }
};

const callApiWithCheckSumAndEncryption = async (
  objValues,
  objKeys,
  apiName,
  apiAxios,
  completion,
  progressData
) => {
  let formData = new FormData();
  for (let i in objValues) {
    formData.append(objKeys[i], objValues[i]);
  }
  formData._parts.sort();
  var checkSumString = "";
  var objectAlreadyPresent = "";
  for (let i in formData._parts) {
    if (!(typeof formData._parts[i][1] === "object")) {
      checkSumString = checkSumString.concat(
        formData._parts[i][0] + "=" + formData._parts[i][1].toString()
      );
    } else {
      if (objectAlreadyPresent == formData._parts[i][0]) {
      } else {
        checkSumString = checkSumString.concat(
          formData._parts[i][0].replace("[", "").replace("]", "") + "=" + ""
        );
        objectAlreadyPresent = formData._parts[i][0];
        // console.log('objectAlreadyPresent---->', objectAlreadyPresent)
      }
    }
  }
  // console.log('checkSumString', checkSumString)
  Aes.sha1(checkSumString).then(async (hash) => {
    let formDataNew = new FormData();

    if (objValues.length > 0) {
      for (let i in objValues) {
        var encryptText = objValues[i];
        if (!(typeof encryptText === "object")) {
          if (encryptText != "") {
            Aes.encrypt(
              encryptText.toString(),
              encryptionKey,
              initializationVector
            ).then(async (cipher) => {
              formDataNew.append(objKeys[i], cipher);
              if (i == objValues.length - 1) {
                formDataNew.append("ws_checksum", hash);
                callApiWithResponse(
                  apiName,
                  formDataNew,
                  apiAxios,
                  completion,
                  objValues,
                  objKeys,
                  progressData
                );
              }
            });
          } else {
            formDataNew.append(objKeys[i], encryptText);
            if (i == objValues.length - 1) {
              formDataNew.append("ws_checksum", hash);
              callApiWithResponse(
                apiName,
                formDataNew,
                apiAxios,
                completion,
                objValues,
                objKeys,
                progressData
              );
            }
          }
        } else {
          formDataNew.append(objKeys[i], encryptText);
          if (i == objValues.length - 1) {
            formDataNew.append("ws_checksum", hash);
            callApiWithResponse(
              apiName,
              formDataNew,
              apiAxios,
              completion,
              objValues,
              objKeys,
              progressData
            );
          }
        }
      }
    } else {
      formDataNew.append("ws_checksum", hash);
      callApiWithResponse(
        apiName,
        formDataNew,
        apiAxios,
        completion,
        objValues,
        objKeys,
        progressData
      );
    }
  });
};

const callApiWithCheckSumAndToken = async (
  objValues,
  objKeys,
  apiName,
  apiAxios,
  completion,
  progressData
) => {
  let formData = new FormData();
  for (let i in objValues) {
    formData.append(objKeys[i], objValues[i]);
  }
  formData.append(
    "ws_token",
    (await AsyncStorageDefault.getItem("ws_token")) === null
      ? ""
      : await AsyncStorageDefault.getItem("ws_token")
  );
  formData._parts.sort();
  var checkSumString = "";
  var objectAlreadyPresent = "";
  for (let i in formData._parts) {
    if (!(typeof formData._parts[i][1] === "object")) {
      checkSumString = checkSumString.concat(
        formData._parts[i][0] + "=" + formData._parts[i][1].toString()
      );
    } else {
      if (objectAlreadyPresent == formData._parts[i][0]) {
      } else {
        checkSumString = checkSumString.concat(
          formData._parts[i][0].replace("[", "").replace("]", "") + "=" + ""
        );
        objectAlreadyPresent = formData._parts[i][0];
        // console.log('objectAlreadyPresent---->', objectAlreadyPresent)
      }
    }
  }
  // console.log('checkSumString', checkSumString)
  Aes.sha1(checkSumString).then(async (hash) => {
    formData.append("ws_checksum", hash);
    callApiWithResponse(
      apiName,
      formData,
      apiAxios,
      completion,
      objValues,
      objKeys,
      progressData
    );
  });
};

const callApiWithCheckSumAndTokenAndEncryption = async (
  objValues,
  objKeys,
  apiName,
  apiAxios,
  completion,
  progressData
) => {
  let formData = new FormData();
  for (let i in objValues) {
    formData.append(objKeys[i], objValues[i]);
  }
  formData.append(
    "ws_token",
    (await AsyncStorageDefault.getItem("ws_token")) === null
      ? ""
      : await AsyncStorageDefault.getItem("ws_token")
  );
  formData._parts.sort();
  var checkSumString = "";
  var objectAlreadyPresent = "";
  for (let i in formData._parts) {
    if (!(typeof formData._parts[i][1] === "object")) {
      checkSumString = checkSumString.concat(
        formData._parts[i][0] + "=" + formData._parts[i][1].toString()
      );
    } else {
      if (objectAlreadyPresent == formData._parts[i][0]) {
        console.log("objectAlreadyPresent---->", objectAlreadyPresent);
      } else {
        checkSumString = checkSumString.concat(
          formData._parts[i][0].replace("[", "").replace("]", "") + "=" + ""
        );
        objectAlreadyPresent = formData._parts[i][0];
        console.log("objectAlreadyPresent---->", objectAlreadyPresent);
      }
    }
  }
  // console.log('checkSumString', checkSumString)

  if (
    checkSumString == "ws_token=" ||
    (await AsyncStorageDefault.getItem("ws_token")) === null
  ) {
    reGenerateTokenAndCallApi(
      "",
      apiName,
      formData,
      apiAxios,
      completion,
      objValues,
      objKeys,
      progressData
    );
  } else {
    Aes.sha1(checkSumString).then(async (hash) => {
      let formData1 = new FormData();

      if (objValues.length > 0) {
        for (let i in objValues) {
          var encryptText = objValues[i];
          if (!(typeof encryptText === "object")) {
            if (encryptText != "") {
              Aes.encrypt(
                encryptText.toString(),
                encryptionKey,
                initializationVector
              ).then(async (cipher) => {
                formData1.append(objKeys[i], cipher);
                if (i == objValues.length - 1) {
                  formData1.append(
                    "ws_token",
                    (await AsyncStorageDefault.getItem("ws_token")) === null
                      ? ""
                      : await AsyncStorageDefault.getItem("ws_token")
                  );
                  formData1.append("ws_checksum", hash);
                  // console.log("FORM DATA FOR FIRST TIME--->",formData1)
                  callApiWithResponse(
                    apiName,
                    formData1,
                    apiAxios,
                    completion,
                    objValues,
                    objKeys,
                    progressData
                  );
                }
              });
            } else {
              formData1.append(objKeys[i], encryptText);
              if (i == objValues.length - 1) {
                formData1.append(
                  "ws_token",
                  (await AsyncStorageDefault.getItem("ws_token")) === null
                    ? ""
                    : await AsyncStorageDefault.getItem("ws_token")
                );
                formData1.append("ws_checksum", hash);
                //console.log("FORM DATA FOR FIRST TIME--->",formData1)
                callApiWithResponse(
                  apiName,
                  formData1,
                  apiAxios,
                  completion,
                  objValues,
                  objKeys,
                  progressData
                );
              }
            }
          } else {
            formData1.append(objKeys[i], encryptText);
            if (i == objValues.length - 1) {
              formData1.append(
                "ws_token",
                (await AsyncStorageDefault.getItem("ws_token")) === null
                  ? ""
                  : await AsyncStorageDefault.getItem("ws_token")
              );
              formData1.append("ws_checksum", hash);
              console.log("FORM DATA FOR FIRST TIME--->", formData1);
              callApiWithResponse(
                apiName,
                formData1,
                apiAxios,
                completion,
                objValues,
                objKeys,
                progressData
              );
            }
          }
        }
      } else {
        formData1.append(
          "ws_token",
          (await AsyncStorageDefault.getItem("ws_token")) === null
            ? ""
            : await AsyncStorageDefault.getItem("ws_token")
        );
        formData1.append("ws_checksum", hash);
        callApiWithResponse(
          apiName,
          formData1,
          apiAxios,
          completion,
          objValues,
          objKeys,
          progressData
        );
      }
    });
  }
};

export default class WSCall extends Component {
  static async getResponse(
    apiName = PropTypes.string,
    params = PropTypes.object,
    requestType = "get",
    completion = PropTypes.func,
    progressData = PropTypes.func,
    files = null,
    fileKey = null
  ) {
    let apiAxios = axiosInstance.get;
    if (requestType === "post") {
      apiAxios = axiosInstance.post;
    }
    console.log("start");
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
      try {
        if (requestType === "post") {
          let objValues = [];
          let objKeys = [];

          let tempObjValues = [];
          let tempObjKeys = [];
          console.log("innerpost");

          if (params) {
            if (params == undefined) {
              // objKeys.push("device_token")
              // objValues.push(deviceUniqueId)
            } else {
              tempObjValues = Object.values(params);
              tempObjKeys = Object.keys(params);
              if (Object.keys(params).includes("device_token")) {
                // objValues = Object.values(params)
                // objKeys = Object.keys(params)
                for (let i in tempObjValues) {
                  if (Array.isArray(tempObjValues[i])) {
                    for (let j in tempObjValues[i]) {
                      if (!(typeof tempObjValues[i][j] === "object")) {
                        objValues.push(tempObjValues[i]);
                        objKeys.push(tempObjKeys[i]);
                      } else {
                        objValues.push(tempObjValues[i][j]);
                        objKeys.push(tempObjKeys[i]);
                      }
                    }
                  } else {
                    objValues.push(tempObjValues[i]);
                    objKeys.push(tempObjKeys[i]);
                  }
                }
              } else {
                for (let i in tempObjValues) {
                  if (Array.isArray(tempObjValues[i])) {
                    for (let j in tempObjValues[i]) {
                      console.log(
                        "outer_tempObjValues[i][j]--->",
                        tempObjValues[i]
                      );
                      if (!(typeof tempObjValues[i][j] === "object")) {
                        objValues.push(tempObjValues[i]);
                        objKeys.push(tempObjKeys[i]);
                      } else {
                        objValues.push(tempObjValues[i][j]);
                        objKeys.push(tempObjKeys[i]);
                      }
                    }
                  } else {
                    console.log("tempObjValues[i--->", tempObjValues[i]);
                    console.log("tempObjKeys[i--->", tempObjKeys[i]);
                    objValues.push(tempObjValues[i]);
                    objKeys.push(tempObjKeys[i]);
                  }
                }
                console.log("objKeys[i][j]--->", objKeys);
                console.log("objValues[i][j]--->", objValues);
                //"third_party_platform": "VendorMobile",
                // objKeys.push("device_token")
                // objValues.push(deviceUniqueId)
                objKeys.push("third_party_platform");
                objValues.push("VendorMobile");
              }
            }
          } else {
            // objKeys.push("device_token")
            // objValues.push(deviceUniqueId)
          }
          console.log("objKeys & objValues", objKeys, objValues);
          if (enableCheckSum && enableToken && enableEncryption) {
            console.log("1", enableCheckSum && enableToken && enableEncryption);
            callApiWithCheckSumAndTokenAndEncryption(
              objValues,
              objKeys,
              apiName,
              apiAxios,
              completion,
              progressData
            );
          } else if (enableCheckSum && enableToken) {
            console.log("2", enableCheckSum && enableToken);
            callApiWithCheckSumAndToken(
              objValues,
              objKeys,
              apiName,
              apiAxios,
              completion,
              progressData
            );
          } else if (enableCheckSum && enableEncryption) {
            console.log("3", enableCheckSum && enableEncryption);
            callApiWithCheckSumAndEncryption(
              objValues,
              objKeys,
              apiName,
              apiAxios,
              completion,
              progressData
            );
          } else if (enableToken && enableEncryption) {
            console.log("4", enableToken && enableEncryption);
            callApiWithTokenAndEncryption(
              objValues,
              objKeys,
              apiName,
              apiAxios,
              completion,
              progressData
            );
          } else if (enableCheckSum) {
            console.log("5", enableCheckSum);
            callApiWithCheckSum(
              objValues,
              objKeys,
              apiName,
              apiAxios,
              completion,
              progressData
            );
          } else if (enableToken) {
            console.log("6", enableToken);
            callApiWithToken(
              objValues,
              objKeys,
              apiName,
              apiAxios,
              completion,
              progressData
            );
          } else if (enableEncryption) {
            console.log("7", enableToken);
            callApiWithEncryption(
              objValues,
              objKeys,
              apiName,
              apiAxios,
              completion,
              progressData
            );
          } else {
            if (objValues.length > 0) {
              let formData = new FormData();
              for (let i in objValues) {
                formData.append(objKeys[i], objValues[i]);
              }
              if (files && files.length > 0) {
                if (files.length == 1) {
                  formData.append(fileKey, files[0]);
                } else {
                  files.forEach((element) => {
                    formData.append(fileKey + "[]", element);
                  });
                }
              }
              console.log("api change", JSON.stringify(formData));
              callApiWithResponse(
                apiName,
                formData,
                apiAxios,
                completion,
                [],
                [],
                progressData
              );
            } else {
              const response = await apiAxios(apiName, {
                params,
              });
              completion(response.data, null);
            }
          }
        } else {
          console.log(
            "axiosInstance.defaults.baseURL, apiName, params,",
            axiosInstance.defaults.baseURL,
            apiName,
            params,
            "get"
          );
          const response = await apiAxios(apiName, {
            params,
          });
          completion(response.data, null);
        }
      } catch (error) {
        console.log("WSError===>", error.message);
        if (completion) {
          completion(null, error);
        }
      }
    } else {
      console.log("Network Error===> Network not available.");
      if (completion) {
        completion(null, {
          name: strings.networkErrorTitle,
          message: strings.networkErrorMsg,
        });
      }
      //Alert.simpleAlert('', strings.networkErrorMsg)
      Alert.alertWithAction("", strings.networkErrorMsg, "", "Ok", () => {
        // RNRestart.Restart();
      });
    }
  }

  static async getMultiFormDataResponse(
    apiName = PropTypes.string,
    params = PropTypes.object,
    fileName = PropTypes.array,
    fileKey = PropTypes.string,
    completion = PropTypes.func
  ) {
    let apiAxios = axiosInstance.post;
    let objValues = [];
    let objKeys = [];
    if (params) {
      objValues = Object.values(params);
      objKeys = Object.keys(params);
    }
    let formData = new FormData();
    for (let i in objValues) {
      formData.append(objKeys[i], objValues[i]);
    }
    if (fileName.length > 0) {
      if (fileName.length == 1) {
        formData.append(fileKey, fileName[0]);
      } else {
        fileName.forEach((element) => {
          formData.append(fileKey + "[]", element);
        });
      }
    }
    console.log("getMultiFormDataResponse--->", JSON.stringify(formData));
    const isConnected = await NetworkUtils.isNetworkAvailable();
    if (isConnected) {
      try {
        const response = await apiAxios(apiName, formData);
        completion(response.data, null);
      } catch (error) {
        console.log("WSError===>", error);
        if (completion) {
          completion(null, error);
        }
      }
    } else {
      console.log("Network Error===> Network not available.");
      if (completion) {
        completion(null, {
          name: strings.networkErrorTitle,
          message: strings.networkErrorMsg,
        });
      }
    }
  }
}
