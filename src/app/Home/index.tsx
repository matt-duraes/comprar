import { Image, View, Text, TouchableOpacity, ScrollView, FlatList, Alert } from "react-native";
import { useEffect, useState } from "react";

import { Button } from "@/components/Button";
import { Input } from "@/components/Input";
import { Filter } from "@/components/Filter";
import { Item } from "@/components/Item";

import { styles } from "./styles";
import { FilterStatus } from "@/types/FilterStatus";
import { itemsStorage, ItemStorage} from "@/storage/itemsStorage"

const FILTER_STATUS: FilterStatus[] = [FilterStatus.PENDING, FilterStatus.DONE];

export const Home = () => {
  const [filter, setFilter] = useState(FilterStatus.PENDING);
  const [description, setDescription] = useState("");
  const [items, setItems] = useState<ItemStorage[]>([]);
  
  const filteredItems = filter === FilterStatus.ALL 
    ? items 
    : items.filter((item: ItemStorage) => item.status === filter);
  
  async function itemsByStatus() {
    try {
      let response;
      if (filter === FilterStatus.ALL) {
        response = await itemsStorage.get();
      } else {
        response = await itemsStorage.getByStatus(filter);
      }
      setItems(response)
    } catch (error) {
      Alert.alert("erro", "não foi possível encontrar os itens.")
    }
  }

  async function handleAdd() {
    if(!description.trim()) {
      return Alert.alert("Atenção", "Informe a descrição do item.");
    }

    const newItem = {
      id: Math.random().toString(36).substring(2),
      description,
      status: FilterStatus.PENDING
    }

    await itemsStorage.add(newItem)
    await itemsByStatus()
    setFilter(FilterStatus.PENDING)
    setDescription("");
    Alert.alert('Adicionado', "Seu item foi adicionado com sucesso!")
  }

  async function handleToggleStatus(idSelected: string) {
    try {
      const allItems = await itemsStorage.get();
      
      const updatedItems = allItems.map((item: ItemStorage) => {
        if (item.id === idSelected) {
          const newStatus = item.status === FilterStatus.PENDING 
            ? FilterStatus.DONE 
            : FilterStatus.PENDING;
          return { ...item, status: newStatus };
        }
        return item;
      });
      
      await itemsStorage.save(updatedItems);
      
      await itemsByStatus();
    } catch (error) {
      console.log(error);
      Alert.alert('Erro', 'Não foi possível alterar o status do item');
    }
  }

  async function handleRemove(idSelected: string) {
    try {
      await itemsStorage.remove(idSelected)
      await itemsByStatus()

    } catch (error) {
      console.log(error)
      Alert.alert('Remover', 'Não foi possível remover o item selecionado')
    }
  }

  function handleClearItems() {
    setFilter(FilterStatus.ALL);
  }

  useEffect(() => {
    itemsByStatus()
  }, [filter])

  return (
    <View style={styles.container}>
      <Image 
        source={require('@assets/logo.png')} 
        style={styles.logo}
      />
      <View style={styles.form}>
        <Input 
          placeholder="O que você precisa comprar?"
          value={description}
          onChangeText={setDescription}
        />
        <Button title="Adicionar" onPress={handleAdd}/>
      </View>
      <View style={styles.content}>
        <View style={styles.header}>
          {FILTER_STATUS.map((status) => (
            <Filter 
              key={status}
              status={status}
              isActive={status === filter}
              onPress={() => {
                setFilter(status)
              }}
            />
          ))}
          <TouchableOpacity style={styles.clearButton} onPress={handleClearItems}>
            <Text style={styles.clearText}>Limpar</Text>
          </TouchableOpacity>
        </View>
        <FlatList 
          data={filteredItems}
          keyExtractor={(item) =>item.id}
          renderItem={({ item }) => (
            <Item 
              data={item}
              onStatus={() => handleToggleStatus(item.id)}
              onRemove={() => handleRemove(item.id)}
            />
          )}
          showsVerticalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={styles.separator} />}
          contentContainerStyle={styles.listContent}
          ListEmptyComponent={() => <Text style={styles.empty}>Nenhum item adicionado</Text>}
        />
      </View>
    </View>
  );
} 