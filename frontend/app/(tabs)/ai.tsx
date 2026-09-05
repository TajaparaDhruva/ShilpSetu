import React, { useState, useRef, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Pressable,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useRouter } from 'expo-router';
import { AppHeader } from '../../components/ui/AppHeader';
import { MessageComposer } from '../../components/ui/MessageComposer';
import { IconSymbol } from '../../components/ui/icon-symbol';
import { ShilpColors, Typography, Spacing, BorderRadius } from '../../constants/theme';

interface AIMessage {
  id: string;
  sender: 'ai' | 'user';
  text: string;
  timestamp: string;
  recommendationType?: 'product' | 'artisan' | 'rfq';
  recommendationId?: string;
}

const SUGGESTED_PROMPTS = [
  '🏺 Recommend terracotta home decor under ₹2,000',
  '🧵 Find authentic Banarasi saree weavers',
  '📦 Help me draft a custom brass gift order',
  '✨ What regional crafts are famous in Rajasthan?',
];

export default function AIAssistantScreen() {
  const router = useRouter();
  const scrollViewRef = useRef<ScrollView>(null);

  const [aiMessages, setAiMessages] = useState<AIMessage[]>([
    {
      id: 'ai-1',
      sender: 'ai',
      text: 'Namaste! I am ShilpSetu AI Assistant. How can I assist your artisan craft discovery today?',
      timestamp: 'Just now',
    },
  ]);

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [aiMessages]);

  const handleSendPrompt = (promptText: string) => {
    const userMsg: AIMessage = {
      id: `msg-${Date.now()}`,
      sender: 'user',
      text: promptText,
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setAiMessages((prev) => [...prev, userMsg]);

    // Simulated intelligent craft response
    setTimeout(() => {
      let replyText = 'I found great authentic Indian craft recommendations matching your request!';
      let recType: 'product' | 'artisan' | 'rfq' | undefined;
      let recId: string | undefined;

      const lower = promptText.toLowerCase();
      if (lower.includes('terracotta') || lower.includes('vase')) {
        replyText =
          'I recommend checking out master artisan Ramprasad Kumbhar from Khurja! His Hand-Painted Royal Terracotta Vase is rated 4.9 stars and priced at ₹1,850.';
        recType = 'product';
        recId = 'prod-1';
      } else if (lower.includes('banarasi') || lower.includes('saree') || lower.includes('weaver')) {
        replyText =
          'Sunita Devi is an award-winning Banarasi handloom weaver from Varanasi with 18+ years experience. Check out her Royal Zari Silk Saree!';
        recType = 'artisan';
        recId = 'art-2';
      } else if (lower.includes('draft') || lower.includes('brass') || lower.includes('custom')) {
        replyText =
          'I can help you post a Requirement for custom brassware! Jitendra Vishwakarma in Moradabad specializes in engraved brass gift boxes.';
        recType = 'rfq';
      }

      const aiReply: AIMessage = {
        id: `ai-${Date.now()}`,
        sender: 'ai',
        text: replyText,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        recommendationType: recType,
        recommendationId: recId,
      };

      setAiMessages((prev) => [...prev, aiReply]);
    }, 800);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <AppHeader title="ShilpSetu AI Assistant" subtitle="AI Craft Recommendation & Requirement Builder" />

      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 90 : 0}>
        <ScrollView
          ref={scrollViewRef}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.scrollContent}>
          {/* AI Info Banner */}
          <View style={styles.aiBanner}>
            <View style={styles.sparkleCircle}>
              <IconSymbol name="sparkles" size={20} color={ShilpColors.white} />
            </View>
            <View style={styles.aiBannerText}>
              <Text style={styles.aiBannerTitle}>Smart Craft Discovery</Text>
              <Text style={styles.aiBannerSub}>
                Ask me to find products, discover artisans, or draft custom RFQs.
              </Text>
            </View>
          </View>

          {/* Quick Prompts */}
          <Text style={styles.promptsHeader}>Suggested Prompts:</Text>
          <View style={styles.promptsContainer}>
            {SUGGESTED_PROMPTS.map((prompt, idx) => (
              <Pressable
                key={idx}
                style={styles.promptChip}
                onPress={() => handleSendPrompt(prompt)}>
                <Text style={styles.promptText}>{prompt}</Text>
              </Pressable>
            ))}
          </View>

          {/* Chat Trajectory */}
          {aiMessages.map((msg) => (
            <View
              key={msg.id}
              style={[
                styles.bubbleWrapper,
                msg.sender === 'user' ? styles.userWrapper : styles.aiWrapper,
              ]}>
              <View
                style={[
                  styles.bubble,
                  msg.sender === 'user' ? styles.userBubble : styles.aiBubble,
                ]}>
                {msg.sender === 'ai' && (
                  <View style={styles.aiHeaderRow}>
                    <IconSymbol name="sparkles" size={14} color={ShilpColors.primary} />
                    <Text style={styles.aiHeaderTitle}>ShilpSetu AI</Text>
                  </View>
                )}
                <Text
                  style={[
                    styles.messageText,
                    msg.sender === 'user' ? styles.userMessageText : styles.aiMessageText,
                  ]}>
                  {msg.text}
                </Text>

                {/* Recommendation CTA button */}
                {msg.recommendationType && (
                  <Pressable
                    style={styles.recButton}
                    onPress={() => {
                      if (msg.recommendationType === 'product' && msg.recommendationId) {
                        router.push(`/product/${msg.recommendationId}`);
                      } else if (msg.recommendationType === 'artisan' && msg.recommendationId) {
                        router.push(`/artisan/${msg.recommendationId}`);
                      } else {
                        router.push('/rfq/create');
                      }
                    }}>
                    <Text style={styles.recButtonText}>
                      {msg.recommendationType === 'product'
                        ? 'View Recommended Product →'
                        : msg.recommendationType === 'artisan'
                        ? 'View Artisan Profile →'
                        : 'Create Custom RFQ →'}
                    </Text>
                  </Pressable>
                )}

                <Text
                  style={[
                    styles.timeText,
                    msg.sender === 'user' ? styles.userTimeText : styles.aiTimeText,
                  ]}>
                  {msg.timestamp}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <MessageComposer
          onSend={handleSendPrompt}
          placeholder="Ask AI assistant for craft ideas..."
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
  scrollContent: {
    padding: Spacing.md,
    paddingBottom: Spacing.lg,
  },
  aiBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: ShilpColors.primary,
    padding: Spacing.md,
    borderRadius: BorderRadius.card,
    marginBottom: Spacing.md,
  },
  sparkleCircle: {
    width: 38,
    height: 38,
    borderRadius: BorderRadius.pill,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: Spacing.md,
  },
  aiBannerText: {
    flex: 1,
  },
  aiBannerTitle: {
    ...Typography.heading3,
    color: ShilpColors.white,
    fontSize: 15,
  },
  aiBannerSub: {
    ...Typography.caption,
    color: ShilpColors.softPeach,
  },
  promptsHeader: {
    ...Typography.caption,
    fontWeight: '700',
    color: ShilpColors.textMuted,
    marginBottom: Spacing.xs,
  },
  promptsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: Spacing.xs,
    marginBottom: Spacing.lg,
  },
  promptChip: {
    backgroundColor: ShilpColors.surfaceCard,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.pill,
  },
  promptText: {
    ...Typography.bodySmall,
    color: ShilpColors.textPrimary,
    fontSize: 13,
  },
  bubbleWrapper: {
    marginVertical: 6,
    width: '100%',
    flexDirection: 'row',
  },
  userWrapper: {
    justifyContent: 'flex-end',
  },
  aiWrapper: {
    justifyContent: 'flex-start',
  },
  bubble: {
    maxWidth: '82%',
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.sm + 2,
    borderRadius: BorderRadius.large,
  },
  userBubble: {
    backgroundColor: ShilpColors.primary,
    borderBottomRightRadius: 2,
  },
  aiBubble: {
    backgroundColor: ShilpColors.surfaceCard,
    borderWidth: 1,
    borderColor: ShilpColors.border,
    borderBottomLeftRadius: 2,
  },
  aiHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 4,
  },
  aiHeaderTitle: {
    ...Typography.caption,
    fontWeight: '700',
    color: ShilpColors.primary,
  },
  messageText: {
    ...Typography.body,
    fontSize: 15,
  },
  userMessageText: {
    color: ShilpColors.white,
  },
  aiMessageText: {
    color: ShilpColors.textPrimary,
  },
  recButton: {
    marginTop: Spacing.sm,
    backgroundColor: ShilpColors.softPeach,
    paddingHorizontal: Spacing.md,
    paddingVertical: Spacing.xs + 2,
    borderRadius: BorderRadius.pill,
    alignSelf: 'flex-start',
  },
  recButtonText: {
    ...Typography.caption,
    fontWeight: '700',
    color: ShilpColors.primary,
  },
  timeText: {
    ...Typography.caption,
    fontSize: 10,
    marginTop: 4,
    alignSelf: 'flex-end',
  },
  userTimeText: {
    color: 'rgba(255, 255, 255, 0.75)',
  },
  aiTimeText: {
    color: ShilpColors.textMuted,
  },
});
