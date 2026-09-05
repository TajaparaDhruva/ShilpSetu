import React, { useRef, useEffect } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { AppHeader } from '../../components/ui/AppHeader';
import { ChatBubble } from '../../components/ui/ChatBubble';
import { MessageComposer } from '../../components/ui/MessageComposer';
import { ShilpColors, Spacing } from '../../constants/theme';
import { useApp } from '../../context/AppContext';
import { ErrorState } from '../../components/ui/ErrorState';

export default function IndividualChatScreen() {
  const { id } = useLocalSearchParams<{ id: string }>();
  const router = useRouter();
  const { conversations, messages, sendMessage } = useApp();
  const scrollViewRef = useRef<ScrollView>(null);

  const conversation = conversations.find((c) => c.id === id);
  const conversationMessages = messages[id || ''] || [];

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [conversationMessages]);

  if (!conversation) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <AppHeader showBack title="Chat" />
        <View style={styles.padding}>
          <ErrorState
            title="Conversation Not Found"
            message="The requested chat thread could not be found."
            onRetry={() => router.back()}
          />
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader
        showBack
        title={conversation.artisanName}
        subtitle={conversation.artisanCraft}
      />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.messagesContainer}
          onContentSizeChange={() => scrollViewRef.current?.scrollToEnd({ animated: true })}>
          {conversationMessages.map((msg) => (
            <ChatBubble key={msg.id} message={msg} />
          ))}
        </ScrollView>

        <MessageComposer
          onSend={(text) => sendMessage(conversation.id, text)}
          placeholder={`Message ${conversation.artisanName}...`}
        />
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: ShilpColors.background,
  },
  container: {
    flex: 1,
  },
  padding: {
    padding: Spacing.md,
  },
  messagesContainer: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
  },
});
