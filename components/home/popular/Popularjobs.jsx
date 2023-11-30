import React, { useState } from 'react'
import { View, Text, TouchableOpacity, ActivityIndicator, FlatList } from 'react-native'
import { useRouter } from 'expo-router'
import { COLORS, SIZES } from '../../../constants'
import styles from './popularjobs.style'
import PopularJobCard from '../../common/cards/popular/PopularJobCard'
import useFetch from  '../../../hooks/useFetch'

const Popularjobs = () => {
  const router = useRouter();
  const { data, isLoading, error } = useFetch(
    'search', {
      query: 'React Developer',
      num_pages: 1
  })
  const [selectedJob, setSelectedJob] = useState('')
  const handleCardPress = () => {}
  
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}> Popular Jobs </Text>
        <TouchableOpacity>
          <Text style={styles.headerBtn}>Show all</Text>
        </TouchableOpacity>
      </View>
      <View style = {styles.cardsContainer}>
        {isLoading ? (
          <ActivityIndicator size="large" color={COLORS.primary} />
        ): error ? (
      <Text>Something went wrong</Text>
      ) : (
        <FlatList
          data = {data}
          renderItem={({item}) => (
            <PopularJobCard 
              item={item} 
              selectedJob={selectedJob}
              handleCardPress={handleCardPress}/>
          )}
          keyExtractor={item => item?.job_id}
          contentContainerStyle={{columnGap: SIZES.medium}}
          horizontal
          /> 
      )
      }
      </View>
    </View>
  )
}

export default Popularjobs