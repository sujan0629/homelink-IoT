import React from 'react';
import { View, Text, TouchableOpacity, ScrollView } from 'react-native';

interface RoomTabsProps {
  selectedRoom: string;
  onSelectRoom: (room: string) => void;
}

const rooms = ['LIVING ROOM', 'GARDEN', 'KITCHEN', 'BEDROOM'];

export const RoomTabs: React.FC<RoomTabsProps> = ({ selectedRoom, onSelectRoom }) => {
  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      className="mb-4"
    >
      <View className="flex-row gap-3">
        {rooms.map((room) => (
          <TouchableOpacity
            key={room}
            onPress={() => onSelectRoom(room)}
            className={`px-4 py-2 rounded-lg ${
              selectedRoom === room ? 'bg-white border' : 'bg-transparent'
            }`}
            style={selectedRoom === room ? { borderColor: '#EDEDED' } : undefined}
          >
            <Text
              className={`text-xs font-semibold ${
                selectedRoom === room ? 'text-dark' : 'text-gray-400'
              }`}
            >
              {room}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </ScrollView>
  );
};
