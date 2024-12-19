import { useState, useEffect } from 'react';
import { StyleSheet, View, KeyboardAvoidingView, Platform } from 'react-native';
import { GiftedChat, Bubble, InputToolbar } from "react-native-gifted-chat";

const Chat = ({route, navigation, isConnected}) => {

    // const { name, backgroundColor } = route.params;
    const [ messages, setMessages ] = useState([]);
    const { name, backgroundColor, userID } = route.params;
    const onSend = (newMessages) => {
        setMessages(previousMessages => 
        GiftedChat.append(previousMessages, newMessages))
    };

  const renderInputToolbar = (props) => {
    if (isConnected) {
      return (
        <InputToolbar
          {...props}
          containerStyle={styles.inputToolbar}
          textInputStyle={styles.textInput}
          textInputProps={{
            placeholder: "Type a message...",
          }}
        />
      );
    } else {
      return null;
    }
  };

    const renderBubble = (props) => {
      return <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: "#7fb5b0"
          },
          left: {
            backgroundColor: "#d3d3d3"
          },
        }}
        textStyle={{
          right: {
            color: "#02314d",
          },
        }}
        timeTextStyle={{
          right: {
            color: "#05313d",
          },
        }} 
      />
    }    

    useEffect(() => {
    setMessages([
      {
        _id: 1,
        text: "Hello developer",
        createdAt: new Date(),
        user: {
          _id: 2,
          name: "React Native",
          avatar: "https://placeimg.com/140/140/any",
        },
      },
      {
        _id: 2,
        text: 'Welcome to the chat!',
        createdAt: new Date(),
        system: true,
      },      
    ]);
  }, []);

 return (
    // Pass selected background color from start screen
    <View style={[styles.container, { backgroundColor }]}>
      <GiftedChat
        // accessiblity features
        accessible={true}
        accessibilityLabel="Message input field"
        accessibilityHint="Type your message here and then press enter"
        accessibilityRole="message-input"
        // displays message bubbles
        messages={messages}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: userID,
          name: name,
        }}
    />
      {/* Stops keyboard from hiding message input field for android */}
      {Platform.OS === "android" ? (
        <KeyboardAvoidingView behavior="height" />
      ) : null}
      {/* and ios
      {Platform.OS === "ios" ? (
        <KeyboardAvoidingView behavior="padding" />
      ) : null} */}
</View>
 )
};

const styles = StyleSheet.create({
 container: {
   flex: 1,
  },
  inputToolbar: {
    borderTopWidth: 1,
    borderTopColor: "#E8E8E8",
    backgroundColor: "#FFF",
  },
  textInput: {
    color: "#000",
    backgroundColor: "#FFF",
    paddingHorizontal: 10,
    paddingVertical: 5,
    fontSize: 16,
  },
});

export default Chat;
