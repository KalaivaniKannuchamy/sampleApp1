/** 
 * Created by Eswar Sairam on 21/09/20
 **/

import { PropTypes } from 'prop-types';
import React, { PureComponent } from 'react';
import { Platform, StyleSheet, ViewPropTypes } from 'react-native';
import { TextInput as PaperInput, withTheme } from 'react-native-paper';
import { APP_WHITE, INPUT, INPUT_BG_COLOR, BLACK, PLACEHOLDER, RED, INPUT_TITTLE_COLOR, CURRENT_CLR, COMPLETED_CLR, GREY_TEXT_COLOR } from '../../lib/colors';
import { BOLD, REGULAR } from '../../lib/FontFamily';
import { camelize, DynamicFontSize } from '../../lib/globalFunctions';
import Icon from 'react-native-vector-icons/MaterialIcons';

// import Text from './Text';
import View from './View';
import Text from './Text';

class Input extends PureComponent {
    constructor() {
        super();
        this.state = {
            showError: false,
            showErrorMsg: false,
            value: ""
        }
    }

    componentDidMount() {
        this.setState({ value: this.props.value })
    }

    static defaultProps = {
        containerStyle: null,
        InputStyle: null,
        inputViewStyle: null,
        label: "",
        placeholder: "",
        value: "",
        disable: true,
        errorMessage: "",
        secureTextEntry: false,
        selectionColor: 'rgba(5, 62, 225, 0.3)',
        mode: "flat",
        type: "",
        isLastFeild: false,
        multiline: false,
        onChangeText: null,
        // onFocus : ,
        onEndEditing: null,
        onSubmitEditing: null,
        isRequired: true,
        regExpression: "",
        textRef: null,
        fontWeight: REGULAR,
        password1Label: "",
        password1Value: "",
        checkForErrorToShow: true,
        labelStyle: null,
        minChar: 3,
        maxChar: 25,
        noAutoCapital: false,
        donotShowTitle: false,
        compulsary: false,
        titleView: null,
        removeDataSpace: null
    }

    static propTypes = {
        containerStyle: ViewPropTypes.style,
        InputStyle: ViewPropTypes.style,
        label: PropTypes.string,
        placeholder: PropTypes.string,
        value: PropTypes.string,
        disable: PropTypes.bool,
        errorMessage: PropTypes.string,
        secureTextEntry: PropTypes.bool,
        selectionColor: PropTypes.string,
        mode: PropTypes.string,
        type: PropTypes.string,
        isLastFeild: PropTypes.bool,
        multiline: PropTypes.bool,
        onChangeText: PropTypes.func,
        onEndEditing: PropTypes.func,
        onSubmitEditing: PropTypes.func,
        isRequired: PropTypes.bool,
        regExpression: PropTypes.any,
        textRef: PropTypes.any,
        fontWeight: PropTypes.string,
        theme: PropTypes.object,
        password1Label: PropTypes.string,
        password1Value: PropTypes.string,
        rightIcon: PropTypes.element,
        leftIcon: PropTypes.element,
        checkForErrorToShow: PropTypes.bool,
        labelStyle: ViewPropTypes.style,
        donotShowTitle: PropTypes.bool,
        compulsary: PropTypes.bool,
        onFocus: PropTypes.func,
        textView: ViewPropTypes.style,
        removeDataSpace: PropTypes.string
    }

    customizeStyle() {
        let finalStyle = this.props.InputStyle
        if (finalStyle && finalStyle.fontSize) {
            finalStyle.fontSize = DynamicFontSize(finalStyle.fontSize)
        }
        return finalStyle
    }

    getkeyboardType() {
        if (this.props.type == "email") {
            return "email-address"
        } else if (this.props.type == "mobile") {
            return "phone-pad"
        }
        else if (this.props.type == "number") {
            return "numeric"
        }
        else if (this.props.type == "year") {
            return "number-pad"
        }
        else if (this.props.type == "numberCompare") {
            return "number-pad"
        }
        return "ascii-capable"
    }

    checkForError() {
        let isInValid = false
        if (this.props.isRequired) {
            let emailReg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            let phoneRegEx = /^[0-9]{9,15}$/;
            // let passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{10,}$/
            let passwordRegex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{6,})/
            let defaultErrorMsg = `Please enter ${(this.props.label).replace("Please enter your ", '').replace("Enter ", '').replace("enter ", "") || 'value'}`
            if (this.props.value) {
                if (this.props.type == 'email') {
                    const finalRegex = this.props.regExpression || emailReg
                    if (finalRegex.test(this.props.value) == false) {
                        isInValid = true
                        defaultErrorMsg = `Please enter valid ${(this.props.label).replace("Please enter your ", '').replace("Enter ", '').replace("enter ", "") || 'email'}`
                    }

                } else if (this.props.type == 'mobile') {
                    const finalRegex = this.props.regExpression || phoneRegEx
                    if (finalRegex.test(this.props.value) == false) {
                        isInValid = true
                        defaultErrorMsg = `Please enter valid ${(this.props.label).replace("Please enter your ", '').replace("Enter ", '').replace("enter ", "") || 'mobile number'}`
                    }
                }
                else if (this.props.type == 'year') {
                    if ((this.props.value.length < 4 || this.props.value.length > 4)) {
                        isInValid = true
                        defaultErrorMsg = `Please enter valid ${(this.props.label).replace("Please enter your ", '').replace("Enter ", '').replace("enter ", "") || 'year'}`
                    }
                }
                else if (this.props.type == 'password') {
                    const finalRegex = this.props.regExpression || passwordRegex
                    if (finalRegex.test(this.props.value) == false) {
                        isInValid = true
                        defaultErrorMsg = 'Password should contain minimum of 6 characters with at least one uppercase letter, one special character and one number'
                    }
                    // if ((this.props.value.length < 10 || this.props.value.length > 15)) {
                    //     isInValid = true
                    //     defaultErrorMsg = 'Password length should be minimum of 10 characters and maximum of 15 characters.' one lowercase letter
                    // }
                }
                else if (this.props.type == 'name') {
                    if (!(this.props.value.length > 2 && this.props.value.length < 26)) {
                        isInValid = true
                        defaultErrorMsg = `Please enter  ${(this.props.label)} characters in between 3 to 25`
                    }

                }
                else if (this.props.type == 'comparePassword' || this.props.type == 'numberCompare') {
                    const password1 = this.props.password1Value
                    const password2 = this.props.value
                    if (!(password1 === password2)) {
                        isInValid = true
                        defaultErrorMsg = `${(this.props.password1Label).replace('*', '') || 'Password'} and ${(this.props.label).replace('*', '') || 'Confirm Password'} should be same`
                    }


                } else if (this.props.regExpression && (this.props.regExpression.test(this.props.value) == false)) {
                    isInValid = true
                    defaultErrorMsg = `Please enter valid ${(this.props.label).replace("Please enter your ", '').replace("Enter ", '').replace("enter ", "") || 'value'}`
                }
            } else {
                isInValid = true
            }
            if (this.props.type == 'title') {
                defaultErrorMsg = `Please enter title`
            } else if (this.props.type == 'message') {
                defaultErrorMsg = `Please type message`
            }
            else if (this.props.type == 'number') {
                defaultErrorMsg = `Please enter ${this.props.label}`
            }
            this.setState({ showError: isInValid, showErrorMsg: (this.props.errorMessage).replace('*', '') || camelize(defaultErrorMsg.replace('*', '')) })
        }
        return isInValid
    }

    getReturnKey() {
        const {
            type,
            isLastFeild,
            multiline,
        } = this.props;
        if (multiline) {
            return "default"
        } else if ((type == 'mobile' || type == 'number' || type == 'numberCompare') && Platform.OS === 'ios') {
            return "done"
        }
        else if (isLastFeild) {
            return "done"
        }
        return "next"
    }

    focus() {
        this.inputRef.focus()
    }

    blur() {
        this.inputRef.blur()
    }

    reset() {
        setTimeout(() => {
            this.setState({ showError: "", showErrorMsg: "" })
        }, 10)
    }

    render() {

        const {
            textRef,
            label,
            disable,
            placeholder,
            containerStyle,
            mode,
            multiline,
            onChangeText,
            onEndEditing,
            selectionColor,
            onSubmitEditing,
            value,
            secureTextEntry,
            theme,
            fontWeight,
            maxLength,
            rightIcon,
            leftIcon,
            checkForErrorToShow,
            labelStyle,
            compulsary,
            titleIcon,
            onFocus,
            onBlur,
            noAutoCapital,
            donotShowTitle,
            titleView,
            inputViewStyle,
            removeDataSpace
        } = this.props;

        return (
            <View ref={textRef} style={[styles.defaultContainerStyle, containerStyle]}>
                {
                    !donotShowTitle ?

                        <View style={[styles.titleView, titleView]}>
                            {/* "person", lock */}
                            {titleIcon ? <Icon name={titleIcon} size={22} color={PLACEHOLDER} /> : null}
                            <Text fontWeight={REGULAR} style={[styles.labelStyle, labelStyle]}>{label}<Text style={[styles.labelStyle, labelStyle, { color: RED }]}>{compulsary ? "*" : ''}</Text></Text>

                        </View>
                        :
                        null
                }
                {/* <View style={[styles.inputContainer]}> */}
                {/* {leftIcon ? <View>
                         <View style={{ height: ((this.customizeStyle() && this.customizeStyle.height) || styles.defaultInputStyle.height) - 2.5, justifyContent: 'center', top: 10, marginHorizontal: 10 }}>
                             {leftIcon}
                         </View>
                         <View style={{ height: this.state.focused ? 2 : 1, backgroundColor: this.state.showError ? RED : (this.state.focused ? BLACK : PLACEHOLDER) }} />
                     </View> : null} */}
                <View style={[
                    {
                        borderRadius: 3,
                        height: 46,
                        borderWidth: 1,
                        borderColor: this.state.focused ? COMPLETED_CLR : this.state.showError ? COMPLETED_CLR : INPUT_BG_COLOR,
                        backgroundColor: '#F3F3F3',
                        flex: 1,
                    }, inputViewStyle]}
                >
                    <PaperInput
                        right={rightIcon}
                        left={leftIcon}
                        ref={ref => { this.inputRef = ref; }}
                        secureTextEntry={secureTextEntry}
                        label={''}
                        value={value}
                        autoCorrect={false}
                        autoCapitalize={'none'}
                        placeholder={placeholder ? placeholder : `Enter ${label}`}
                        placeholderTextColor={PLACEHOLDER}
                        dense={true}
                        editable={disable /* || true */}
                        underlineColor={'transparent'}
                        selectionColor={selectionColor}
                        // selectTextOnFocus={true}
                        mode={mode || "outlined"}
                        style={[styles.defaultInputStyle, this.customizeStyle(), /* this.props.theme.fonts[this.props.fontWeight] */  theme.fonts[fontWeight]]}
                        clearButtonMode='never'
                        keyboardType={this.getkeyboardType()}
                        returnKeyType={this.getReturnKey()}
                        multiline={multiline || false}
                        error={this.state.showError}
                        onChangeText={(text) => {
                            this.setState({ value: text, showError: false })
                            if (onChangeText) {
                                onChangeText(text)
                            }
                        }}
                        onEndEditing={() => {
                            this.setState({ focused: false })
                            if (checkForErrorToShow) {
                                if (!this.checkForError()) {
                                    if (onEndEditing) {
                                        onEndEditing()
                                    }
                                }
                            } else {
                                if (onEndEditing) {
                                    onEndEditing()
                                }
                            }


                        }}
                        onFocus={() => {
                            this.setState({ focused: true })
                            if (onFocus) {
                                onFocus(this.state.showError)
                            }

                        }}
                        onBlur={() => {
                            if (onFocus) {
                                console.log('this.state.showError-->', this.state.showError)
                                onFocus(this.state.showError)
                            }
                            if (onBlur) {
                                onBlur()
                            }

                        }}
                        onSubmitEditing={() => {
                            if (checkForErrorToShow) {
                                if (!this.checkForError()) {
                                    if (onSubmitEditing) {
                                        onSubmitEditing()
                                    }
                                }
                            } else {
                                if (onSubmitEditing) {
                                    onSubmitEditing()
                                }
                            }


                        }}
                        maxLength={maxLength || 250}
                        theme={{ colors: { text: INPUT, primary: 'transparent', error: 'transparent', background: 'transparent', placeholder: PLACEHOLDER } }}
                    />
                </View>
                {/* {rightIcon ? <View>
                         <View style={{ height: ((this.customizeStyle() && this.customizeStyle.height) || styles.defaultInputStyle.height) - 2.5, justifyContent: 'center', top: 10, marginHorizontal: 10 }}>
                             {rightIcon}</View>
                         <View style={{ height: this.state.focused ? 2 : 1, backgroundColor: this.state.showError ? RED : (this.state.focused ? BLACK : PLACEHOLDER) }} />
                     </View> : null}  */}


                {/* </View> */}
                {this.state.showError ? (
                    <Text
                        fontWeight={REGULAR}
                        dynamicLines={true}
                        style={styles.errorMsg}>{this.state.showErrorMsg}</Text>
                ) : removeDataSpace ? <View style={{ height: 10 }} /> : <View style={{ marginTop: 5 }} />}
            </View>
        )
    }

}

const styles = StyleSheet.create({
    defaultContainerStyle: {
        //marginHorizontal: 10,
        // marginTop: 10
        //backgroundColor :'red'
    },
    defaultInputStyle: {
        fontSize: 15,
        textAlignVertical: 'center',
        color: INPUT,
        paddingVertical: 0,
        marginBottom: 0,
        borderRadius: 5,
        borderWidth: 0,
        borderColor: 'transparent',
        backgroundColor: '#F3F3F3',
        //Changes By abhi
        //paddingHorizontal: 20,
        height: 44,
        flex: 1,
        overflow: 'hidden',
    },
    errorMsg: {
        color: RED,
        fontSize: 12,
        marginTop: 5
    },
    inputContainer: {
        alignItems: 'center',
        justifyContent: 'flex-start',
        flexDirection: 'row',
    },
    labelStyle: {
        //    marginBottom: 8,
        marginLeft: 5,
        color: INPUT_TITTLE_COLOR,
        fontSize: 15,
    },
    titleView: {
        marginBottom: 8,
        flexDirection: 'row',
        alignItems: 'center'
    }
})

export default withTheme(Input);
