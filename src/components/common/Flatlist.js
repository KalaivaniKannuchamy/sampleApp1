/* eslint-disable react/jsx-key */
/** 
 * Created by Eswar Sairam on 19/10/20
 **/

import React, { Component } from 'react';
import View from './View';
import Text from './Text';
import { FlatList as ReactList, ScrollView, StyleSheet, RefreshControl, ActivityIndicator, TouchableHighlight, TouchableWithoutFeedback } from 'react-native';
import PropTypes from 'prop-types';
import strings from '../../lib/AppStrings';
import { COMPLETED_CLR, PRIMARY, PRIMARY_BUTTON } from '../../lib/colors';
import Swipeable from 'react-native-swipeable';

class FlatList extends Component {

    constructor() {
        super();
        this.state = {
            showFooter: false,
            loadingDone: true,
            isSwiping: false,
            onEndReachedCalledDuringMomentum: false,
        }
    }

    static propTypes = {
        data: PropTypes.array,
        NoDataComponent: PropTypes.element,
        enableRefresh: PropTypes.bool,
        enablePaging: PropTypes.bool,
        refreshing: PropTypes.bool,
        onRefresh: PropTypes.func,
        onPaging: PropTypes.func,
        renderItem: PropTypes.func,
        rightButtons: PropTypes.array,
        enableSwipeDelete: PropTypes.bool,
        onDelete: PropTypes.func,
        didSelectRow: PropTypes.func,
        horizontal: PropTypes.bool,
        numColumns: PropTypes.number,
    }

    static defaultProps = {
        data: [],
        NoDataComponent: <View><Text style={{ textAlign: 'center' }}>{strings.noDataLabel}</Text></View>,
        enableRefresh: false,
        onRefresh: () => { },
        enablePaging: false,
        rightButtons: [],
        horizontal: false,
        numColumns: 0,
    }

    handleScroll = () => {
        // let yOffset = event.nativeEvent.contentOffset.y
        // let contentHeight = event.nativeEvent.contentSize.height
        // let value = yOffset / contentHeight
        // // console.log("ScrollValue====", value)
        // if (value > 0.4) {
        //     if (this.props.onPaging, this.props.enablePaging) {
        //         if (this.state.loadingDone == null) {
        //             this.setState({ loadingDone: true })
        //         }
        //         if (this.state.loadingDone) {
        //             // console.log(value)
        //             this.setState({ showFooter: true, loadingDone: false })
        //             this.props.onPaging()
        //         }
        //     } else {
        //         this.setState({ showFooter: false })
        //     }
        // }
        console.log("handleScroll", this.props.loadingDone)
        if (this.props.onPaging, this.props.enablePaging) {
            // if (this.state.loadingDone == null) {
            //     this.setState({ loadingDone: true })
            // }
            // if (this.state.loadingDone) {
            //     // console.log(value)
            //     this.setState({ showFooter: true, loadingDone: false })
            //     this.props.onPaging()
            // }
            this.setState({ showFooter: true, loadingDone: false })
            this.props.onPaging()
            // console.log("this.state.loadingDone ===", this.state.loadingDone)
        } else {
            this.setState({ showFooter: false })
        }
    }

    onPagingEnd = () => {
        this.setState({ showFooter: false, loadingDone: true })
    }

    onScrollToItem = (index) => {
        this.inputRef.scrollToIndex({ animated: true, index: index })
    }
    onScrollToItemWithAnimation = (index, animation) => {
        this.inputRef.scrollToIndex({ animated: animation, index: index })
    }

    onScrollToEnd = (boolean) => {
        this.inputRef.scrollToEnd({ animated: boolean })
    }
    onScrollToTop = (boolean) => {
        this.inputRef.scrollToOffset({ animated: true, offset: 0 });
    }
   
    render() {
        const {
            data,
            enableRefresh,
            refreshing,
            onRefresh,
            renderItem,
            rightButtons,
            enableSwipeDelete,
            onDelete,
            didSelectRow,
            horizontal,
            numColumns,
            ...rest } = this.props

        const { currentlyOpenSwipeable } = this.state;

        const onOpen = (event, gestureState, swipeable) => {
            if (currentlyOpenSwipeable && currentlyOpenSwipeable !== swipeable) {
                currentlyOpenSwipeable.recenter();
            }

            this.setState({ currentlyOpenSwipeable: swipeable });
        };

        const onClose = () => currentlyOpenSwipeable.recenter();

        return (

            <>
                {data.length > 0 ? (
                    // <View style={styles.container}>
                    <ReactList
                    
                        ref={ref => { this.inputRef = ref; }}
                        showsVerticalScrollIndicator={false}
                        showsHorizontalScrollIndicator={false}
                        horizontal={horizontal}
                        numColumns={numColumns}
                        
                        // style={{ width: '100%', height: '100%' }}
                        scrollEnabled={!this.state.isSwiping}
                        onScrollBeginDrag={() => {
                            if (this.state.currentlyOpenSwipeable) {
                                this.state.currentlyOpenSwipeable.recenter()
                            }
                        }}
                        onEndReachedThreshold={0.1}
                        // onMomentumScrollBegin={() => { this.state.onEndReachedCalledDuringMomentum = false; }}
                        onEndReached={({ distanceFromEnd }) => {
                            this.handleScroll();
                            // console.log('on end reached ', distanceFromEnd, this.state.loadingDone)
                        }}
                        // onScroll={this.handleScroll}
                        ListFooterComponent={this.state.showFooter ?
                            <View style={styles.vwLoaderTxt}>
                                <ActivityIndicator color={PRIMARY_BUTTON} />
                                <Text style={styles.loaderTxt}>Loading...</Text>
                            </View> : null}
                        refreshControl={
                            enableRefresh ? (
                                <RefreshControl
                                    colors={[PRIMARY_BUTTON, COMPLETED_CLR]}
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            ) : null
                        }
                        data={data}
                        renderItem={(props) => {
                            let FinalrightButtons = []
                            if (enableSwipeDelete) {
                                const deleteBtn = (
                                    <TouchableHighlight style={styles.deleteBtnVw}
                                        onPress={() => {
                                            this.state.currentlyOpenSwipeable.recenter()
                                            if (onDelete) {
                                                onDelete(props.index)
                                            }
                                        }}>
                                        <Text style={styles.txtDelete}>Delete</Text>
                                    </TouchableHighlight>
                                )
                                FinalrightButtons.push(deleteBtn)
                            }
                            if (rightButtons.length > 0) {
                                FinalrightButtons.push(...rightButtons)
                            }

                            let Item = (<TouchableWithoutFeedback onPress={() => {
                                if (this.state.currentlyOpenSwipeable) {
                                    this.state.currentlyOpenSwipeable.recenter()
                                }
                                if (didSelectRow) {
                                    didSelectRow(props)
                                }
                            }}>
                                {renderItem(props)}
                            </TouchableWithoutFeedback>)
                            if (FinalrightButtons.length > 0 && !horizontal && numColumns == 0) {
                                Item = <Swipeable
                                    onSwipeStart={() => this.setState({ isSwiping: true })}
                                    onSwipeRelease={() => this.setState({ isSwiping: false })}
                                    onRightButtonsOpenRelease={onOpen}
                                    onRightButtonsCloseRelease={onClose}
                                    onRef={ref => this.swipeable = ref} rightButtons={FinalrightButtons}>
                                    {Item}
                                </Swipeable>
                            }
                            return (
                                Item
                            )
                        }}
                        {...rest}
                    />
                    //     <View>

                    //     </View>
                    // </View>
                ) :
                    <ScrollView
                        // style={{ marginTop: 20 }}
                        refreshControl={
                            enableRefresh ? (
                                <RefreshControl
                                colors={[PRIMARY_BUTTON, COMPLETED_CLR]}
                                    refreshing={refreshing}
                                    onRefresh={onRefresh}
                                />
                            ) : null
                        }
                    >
                        {
                            this.props.NoDataComponent
                        }
                    </ScrollView>

                }
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row'
    },
    vwLoaderTxt: {
        marginBottom: 70,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: 10
    },
    loaderTxt: {
        marginLeft: 10
    },
    deleteBtnVw: {
        flex: 1,
        backgroundColor: 'red',
        justifyContent: 'center',
    },
    txtDelete: {
        // textAlign: 'center'
        marginLeft: 15
    },
    noDataTxt: {
        textAlign: 'center'
    },
});

export default FlatList;