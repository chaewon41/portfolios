import CustomMediumText from "@/components/CustomMediumText";
import CustomText from "@/components/CustomText";
import { useFonts } from "expo-font";
import { useLocalSearchParams, useRouter } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    StyleSheet,
    View
} from "react-native";
import Header from '../../components/Header';
import { colors } from '../../constants/Colors';
import { useDiaryCreateStorev2 } from '../../store/DiaryCreateStorev2';

SplashScreen.preventAutoHideAsync();

export default function LoadingScreen() {
  const [fontsLoaded] = useFonts({
    NotoSansKR: require("../../assets/fonts/NotoSansKR-Regular.ttf"),
  });

  const [loadingMessage, setLoadingMessage] = useState("데이터를 준비하고 있습니다...");
  const router = useRouter();
  const params = useLocalSearchParams();
  const folderId = params.folderId as string;
  
  const { 
    images, 
    visibility, 
    date, 
    emotions,
    reset 
  } = useDiaryCreateStorev2();

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  useEffect(() => {
    // 컴포넌트 마운트 시 백엔드로 데이터 전송 시작
    sendDataToBackend();
  }, []);

  const sendDataToBackend = async () => {
    try {
      // 1단계: 데이터 준비
      setLoadingMessage("데이터를 준비하고 있습니다...");
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 2단계: 이미지 파일들을 FormData로 준비
      setLoadingMessage("이미지를 준비하고 있습니다...");
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 이미지 파일들을 FormData에 추가
      const formData = new FormData();
      
      // 이미지 URI들을 실제 파일로 변환
      const imageFiles = await Promise.all(
        Array.from(images).map(async (imageUri, index) => {
          return {
            uri: imageUri,
            type: 'image/jpeg',
            name: `image_${index}.jpg`
          };
        })
      );

      // FormData에 이미지 파일들 추가
      imageFiles.forEach((file, index) => {
        formData.append('images', file as any);
      });

      // 나머지 데이터를 JSON으로 추가
      const diaryData = {
        folderId: folderId,
        date: date,
        visibility: visibility,
        emotions: emotions,
        createdAt: new Date().toISOString(),
      };

      // FormData에 JSON 데이터 추가
      formData.append('data', JSON.stringify(diaryData));

      console.log("전송할 데이터:", diaryData);
      console.log("이미지 파일 수:", imageFiles.length);

      // 3단계: 실제 API 호출 (백엔드 엔드포인트에 맞게 수정)
      setLoadingMessage("다이어리를 저장하고 있습니다...");
      await new Promise(resolve => setTimeout(resolve, 2000));

      // TODO: 실제 API 호출로 교체
      // const response = await fetch('YOUR_API_ENDPOINT/diary', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'multipart/form-data',
      //     'Authorization': 'Bearer YOUR_TOKEN'
      //   },
      //   body: formData
      // });

      // if (!response.ok) {
      //   throw new Error('Failed to save diary');
      // }

      // 4단계: 성공 메시지
      setLoadingMessage("완료되었습니다!");
      await new Promise(resolve => setTimeout(resolve, 1000));

      // 5단계: 스토어 초기화 및 다음 화면으로 이동
      reset();
      router.replace("./CompleteScreen"); // 또는 성공 화면으로 이동

    } catch (error) {
      console.error("다이어리 저장 실패:", error);
      setLoadingMessage("오류가 발생했습니다. 다시 시도해주세요.");
      
      // 에러 발생 시 3초 후 이전 화면으로 돌아가기
      setTimeout(() => {
        router.back();
      }, 3000);
    }
  };

  if (!fontsLoaded) {
    return null;
  }

  return (
    <View style={styles.safeArea}>
      <Header />
      
      <View style={styles.container}>
        {/* 로딩 스피너 */}
        <View style={styles.loadingContainer}>
          <ActivityIndicator 
            size="large" 
            color={colors.BLUE} 
            style={styles.spinner}
          />
          
          {/* 로딩 메시지 */}
          <CustomMediumText style={styles.loadingText}>
            {loadingMessage}
          </CustomMediumText>
          
          {/* 진행 상태 표시 */}
          <CustomText style={styles.statusText}>
            잠시만 기다려주세요...
          </CustomText>
        </View>

        {/* 데이터 미리보기 (개발용) */}
        <View style={styles.debugContainer}>
          <CustomText style={styles.debugTitle}>전송할 데이터:</CustomText>
          <CustomText style={styles.debugText}>폴더 ID: {folderId}</CustomText>
          <CustomText style={styles.debugText}>날짜: {date}</CustomText>
          <CustomText style={styles.debugText}>공개 범위: {visibility}</CustomText>
          <CustomText style={styles.debugText}>감정: {emotions.join(', ')}</CustomText>
          <CustomText style={styles.debugText}>이미지 수: {images.size}개</CustomText>
        </View>
      </View>
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
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  spinner: {
    marginBottom: 20,
  },
  loadingText: {
    fontSize: 18,
    color: colors.BLACK,
    textAlign: 'center',
    marginBottom: 8,
  },
  statusText: {
    fontSize: 14,
    color: colors.DARK_GRAY,
    textAlign: 'center',
  },
  debugContainer: {
    backgroundColor: colors.LIGHT_GRAY,
    padding: 16,
    borderRadius: 8,
    width: '100%',
    maxWidth: 300,
  },
  debugTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: colors.BLACK,
    marginBottom: 8,
  },
  debugText: {
    fontSize: 12,
    color: colors.DARK_GRAY,
    marginBottom: 4,
  },
});

export const options = {
  headerShown: false,
}; 