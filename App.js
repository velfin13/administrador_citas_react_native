import React, {useState} from 'react';
import {Text, StyleSheet, View, FlatList} from 'react-native';

import Cita from './components/Cita';

const App = () => {
  const [citas, setCitas] = useState([
    {
      id: '1',
      paciente: 'hook',
      propietario: 'velfin',
      sintomas: 'No come',
    },
    {
      id: '2',
      paciente: 'redux',
      propietario: 'velfin',
      sintomas: 'No come',
    },
    {
      id: '3',
      paciente: 'angular',
      propietario: 'velfin',
      sintomas: 'No come',
    },
  ]);

  const eliminarCita = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  return (
    <View style={style.contenedor}>
      <Text style={style.titulo}>Administrador de Citas</Text>
      <Text style={style.titulo}>
        {citas.length > 0 ? 'Administra tus Recetas' : 'Crea un Cita'}
      </Text>
      <FlatList
        data={citas}
        keyExtractor={cita => cita.id}
        renderItem={({item}) => (
          <Cita eliminarCita={eliminarCita} cita={item} />
        )}
      />
    </View>
  );
};

const style = StyleSheet.create({
  contenedor: {
    backgroundColor: '#aa076b',
    flex: 1,
  },
  titulo: {
    marginTop: 40,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default App;
