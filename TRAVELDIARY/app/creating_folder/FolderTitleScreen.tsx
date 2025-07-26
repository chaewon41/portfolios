import CustomMediumText from '@/components/CustomMediumText';
import { colors } from '@/constants/Colors';
import { Stack, useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, StyleSheet, TextInput, TouchableOpacity, View } from 'react-native';
import BottomTabBar from '../../components/BottomTabBar';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import { useFolderFormStore } from '../../store/FolderFormStore';
import { useFolderListStore } from '../../store/FolderListStore';

export default function FolderTitleScreen() {
  const [name, setName] = useState('');
  const router = useRouter();
  const setTitleStore = useFolderFormStore(state => state.setTitle);
  const startDate = useFolderFormStore(state => state.startDate);
  const endDate = useFolderFormStore(state => state.endDate);
  const resetAll = useFolderFormStore(state => state.resetAll);
  const addFolder = useFolderListStore(state => state.addFolder);

  const handleNameChange = (text: string) => {
    setName(text);
  };

  const handleCreate = () => {
    if (name.trim() && startDate) {
      setTitleStore(name.trim());
      
      // 폴더 스토어에 새 폴더 추가
      addFolder({
        title: name.trim(),
        startDate: startDate,
        endDate: endDate,
      });
      
      // folderCreateStore 초기화
      resetAll();
      
      router.push('./EmptyFolderScreen');
    }
  };

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.mainContainer}>
        <Header/>
        <View style={styles.container}>
          <CustomMediumText style={styles.title}>이 다이어리에 이름을 붙여주세요</CustomMediumText>
          
          {/* 폴더 이미지 */}
          <View style={styles.diaryIcon}>
            <Image 
              source={require('../../assets/images/folder.png')} 
              style={styles.folderImage}
              resizeMode="contain"
            />
          </View>

          {/* 입력 필드 */}
          <View style={styles.inputContainer}>
            <TextInput
              style={styles.input}
              placeholder=""
              maxLength={15}
              value={name}
              onChangeText={handleNameChange}
            />
            <CustomText style={styles.charLimit}>15자 이내</CustomText>
          </View>

          {/* 생성하기 버튼 */}
          <TouchableOpacity 
            style={[
              styles.createButton,
              name.trim() ? styles.createButtonActive : styles.createButtonInactive
            ]}
            onPress={handleCreate}
            disabled={!name.trim()}
          >
            <CustomMediumText style={styles.createButtonText}>생성하기</CustomMediumText>
          </TouchableOpacity>
        </View>
        <BottomTabBar activeTab="diary"/>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: colors.WHITE,
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingBottom: 100,
  },
  title: {
    fontSize: 22,
    marginBottom: 30,
    textAlign: 'center',
    lineHeight: 28,
    color: colors.DARK_GRAY,
  },
  diaryIcon: {
    width: 130,
    height: 130,
    marginBottom: 48,
    alignItems: 'center',
    justifyContent: 'center',
  },
  folderImage: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    width: '100%',
    marginBottom: 48,
    alignItems: 'center',
  },
  input: {
    width: '100%',
    fontSize: 18,
    paddingVertical: 16,
    color: colors.BLACK,
    textAlign: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.BLACK,
    marginBottom: 8,
  },
  charLimit: {
    fontSize: 14,
    color: colors.MID_GRAY,
    textAlign: 'right',
    alignSelf: 'flex-end',
  },
  createButton: {
    width: '100%',
    borderRadius: 24,
    paddingVertical: 14,
    alignItems: 'center',
  },
  createButtonActive: {
    backgroundColor: colors.BLUE,
  },
  createButtonInactive: {
    backgroundColor: colors.GRAY_200,
  },
  createButtonText: {
    color: colors.WHITE,
    fontSize: 18,
  },
}); 