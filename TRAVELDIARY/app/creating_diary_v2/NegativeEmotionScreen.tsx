import CustomMediumText from "@/components/CustomMediumText";
import CustomText from "@/components/CustomText";
import { useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React from "react";
import {
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    View
} from "react-native";
import Header from '../../components/Header';
import { colors } from '../../constants/Colors';
import { useDiaryCreateStorev2 } from '../../store/DiaryCreateStorev2';

SplashScreen.preventAutoHideAsync();

export default function NegativeEmotionScreen() {
  const router = useRouter();
  const { emotions, toggleEmotion} = useDiaryCreateStorev2();

  // 부정적 감정 데이터
  const negativeEmotions = [
    { emoji: '😢', label: '슬픔' },
    { emoji: '😰', label: '불안' },
    { emoji: '😴', label: '지침' },
    { emoji: '😟', label: '걱정' },
    { emoji: '😤', label: '짜증' },
    { emoji: '😑', label: '허무' },
    { emoji: '😅', label: '어색' },
    { emoji: '😵', label: '답답함' },
    { emoji: '😐', label: '멍함' },
    { emoji: '😠', label: '분노' },
    { emoji: '😵‍💫', label: '혼란' },
    { emoji: '😰', label: '초조함' },
  ];

  const handleEmotionSelect = (emotion: string) => {
    toggleEmotion(emotion);
  };

  const handleNext = () => {
    if (emotions.length > 0) {
      // 선택된 감정들을 스토어에 저장하고 로딩 화면으로 이동
      router.push("./LoadingScreen");
    }
  };

  return (
    <View style={styles.safeArea}>
      <Header />
      
      <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
        {/* Progress Bar */}
        <View style={styles.progressRow}>
          <View style={styles.progressBarBackground}>
            <View style={[styles.progressBarFill, { width: "100%" }]} />
          </View>
          <CustomText style={styles.progressText}>3/3</CustomText>
        </View>

        {/* Main Content */}
        <View style={styles.mainContent}>
          {/* Question */}
          <CustomMediumText style={styles.question}>
            그날의 감정은 어땠나요?
          </CustomMediumText>

          {/* Emotion Grid */}
          <View style={styles.emotionGrid}>
            {negativeEmotions.map((emotion, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.emotionItem,
                  emotions.includes(emotion.label) && styles.selectedEmotionItem
                ]}
                onPress={() => handleEmotionSelect(emotion.label)}
                activeOpacity={0.8}
              >
                <CustomText style={styles.emotionEmoji}>{emotion.emoji}</CustomText>
                <CustomText style={[
                  styles.emotionLabel,
                  emotions.includes(emotion.label) && styles.selectedEmotionLabel
                ]}>
                  {emotion.label}
                </CustomText>
              </TouchableOpacity>
            ))}
          </View>

          {/* Next Button */}
          {emotions.length > 0 && (
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNext}
            >
              <CustomMediumText style={styles.nextButtonText}>다음</CustomMediumText>
            </TouchableOpacity>
          )}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.WHITE_RGB,
  },
  container: {
    flex: 1,
    backgroundColor: colors.WHITE_RGB,
    paddingHorizontal: 20,
  },
  progressRow: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 24,
    marginTop: 8,
  },
  progressText: {
    color: colors.DARK_GRAY,
    fontWeight: "bold",
    fontSize: 14,
    minWidth: 36,
    textAlign: "right",
  },
  progressBarBackground: {
    flex: 1,
    height: 6,
    backgroundColor: colors.LIGHT_GRAY,
    borderRadius: 4,
    marginRight: 12,
    overflow: "hidden",
  },
  progressBarFill: {
    height: 6,
    backgroundColor: colors.BLUE,
    borderRadius: 4,
  },
  mainContent: {
    backgroundColor: colors.WHITE_RGB,
    paddingHorizontal: 24,
    paddingTop: 40,
    paddingBottom: 40,
    flex: 1,
  },
  question: {
    fontSize: 20,
    color: colors.BLACK,
    textAlign: "center",
    marginBottom: 40,
    lineHeight: 28,
  },
  emotionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  emotionItem: {
    width: '30%',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 8,
    borderRadius: 12,
    marginBottom: 16,
  },
  selectedEmotionItem: {
    backgroundColor: colors.LIGHT_BLUE,
    borderWidth: 2,
    borderColor: colors.BLUE,
  },
  emotionEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  emotionLabel: {
    fontSize: 12,
    color: colors.DARK_GRAY,
    textAlign: 'center',
    fontWeight: '500',
  },
  selectedEmotionLabel: {
    color: colors.BLUE,
    fontWeight: 'bold',
  },
  nextButton: {
    backgroundColor: colors.BLUE,
    borderRadius: 40,
    width: '100%',
    height: 56,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginTop: 20,
    elevation: 4,
  },
  nextButtonText: {
    color: colors.WHITE_RGB,
    fontWeight: 'bold',
    fontSize: 18,
  },
});

export const options = {
  headerShown: false,
};
