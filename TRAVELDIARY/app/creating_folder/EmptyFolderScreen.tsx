import CustomMediumText from '@/components/CustomMediumText';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useRouter } from 'expo-router';
import React from 'react';
import { FlatList, StyleSheet, TouchableOpacity, View } from 'react-native';
import BottomTabBar from '../../components/BottomTabBar';
import CustomText from '../../components/CustomText';
import Header from '../../components/Header';
import { colors } from '../../constants/Colors';
import { useFolderFormStore } from '../../store/FolderFormStore';
import { useFolderListStore } from '../../store/FolderListStore';

export default function EmptyFolderScreen() {
  const router = useRouter();
  const title = useFolderFormStore(state => state.title);
  const startDate = useFolderFormStore(state => state.startDate);
  const endDate = useFolderFormStore(state => state.endDate);
  const folders = useFolderListStore(state => state.folders);

  const handleCreateDiary = () => {
    router.push('./TripDateScreen');
  };

  const handleCreateNewFolder = () => {
    router.push('./TripDateScreen');
  };

  // 날짜 형식 변환 함수
  const formatDateRange = (startDate: string, endDate: string | null) => {
    if (startDate && endDate) {
      const start = new Date(startDate);
      const end = new Date(endDate);
      const startFormatted = start.toISOString().split('T')[0].replace(/-/g, '-');
      const endFormatted = end.toISOString().split('T')[0].replace(/-/g, '-');
      return `${startFormatted} ~ ${endFormatted}`;
    } else if (startDate) {
      const start = new Date(startDate);
      const startFormatted = start.toISOString().split('T')[0].replace(/-/g, '-');
      return `${startFormatted}`;
    }
    return '날짜를 선택해주세요';
  };

  const renderFolderItem = ({ item }: { item: any }) => (
    <TouchableOpacity 
      style={styles.folderCard} 
      activeOpacity={0.8} 
      onPress={() => {
        console.log("폴더 클릭됨:", item);
        console.log("폴더 ID:", item.id);
        router.push(`../creating_diary_v2/TripDetailsScreen?folderId=${item.id}`);
      }}
    >
      <View style={styles.cardTopSection}>
        <View style={styles.plusIconContainer}>
          <View style={styles.plusIcon}>
            <Ionicons name="add" size={32} color={colors.WHITE} />
          </View>
        </View>
      </View>
      
      <View style={styles.cardBottomSection}>
        <CustomMediumText style={styles.folderTitle}>
          {item.title}
        </CustomMediumText>
        
        <CustomText style={styles.dateRange}>
          {formatDateRange(item.startDate, item.endDate)}
        </CustomText>
      </View>
    </TouchableOpacity>
  );

  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <View style={styles.mainContainer}>
        <Header />
        <View style={styles.container}>
          <CustomMediumText style={styles.title}>
            이번 여행, 어떤 이야기로 채워질까요?
          </CustomMediumText>
          
          {/* 폴더 목록 */}
          <View style={styles.folderListContainer}>
            <FlatList
              data={folders}
              renderItem={renderFolderItem}
              keyExtractor={(item) => item.id}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.folderList}
            />
          </View>
        </View>
        <BottomTabBar activeTab="diary" />
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
    paddingHorizontal: 24,
    paddingTop: 30,
  },
  title: {
    fontSize: 20,
    color: colors.DARK_GRAY,
    marginBottom: 24,
    textAlign: 'center',
  },
  folderCard: {
    width: '100%',
    borderRadius: 16,
    alignItems: 'center',
    elevation: 4,
    overflow: 'hidden',
    marginBottom: 30,
  },
  cardTopSection: {
    width: '100%',
    backgroundColor: colors.GRAY_300,
    alignItems: 'center',
    paddingTop: 24,
  },
  cardBottomSection: {
    width: '100%',
    backgroundColor: colors.LIGHT_BLUE,
    alignItems: 'center',
    paddingTop: 24,
    paddingBottom: 24,
    paddingHorizontal: 24,
  },
  plusIconContainer: {
    marginBottom: 16,
  },
  plusIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.BLUE,
    alignItems: 'center',
    justifyContent: 'center',
  },
  plusText: {
    color: colors.WHITE,
    fontSize: 32,
  },
  folderTitle: {
    fontSize: 18,
    color: colors.BLACK,
    marginBottom: 8,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  dateRange: {
    fontSize: 14,
    color: colors.BLACK,
    textAlign: 'left',
    alignSelf: 'flex-start',
  },
  folderListContainer: {
    flex: 1,
    marginBottom: 80,
  },
  folderList: {
    paddingBottom: 20,
  },
  addFolderButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.BLUE,
    borderRadius: 24,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginTop: 16,
  },
  addFolderButtonText: {
    color: colors.WHITE,
    fontSize: 16,
    marginLeft: 8,
  },
});
