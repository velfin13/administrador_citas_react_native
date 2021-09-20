import React, {useState} from 'react';
import {
  Text,
  StyleSheet,
  View,
  FlatList,
  TouchableHighlight,
  Platform,
} from 'react-native';

import Cita from './components/Cita';
import Formulario from './components/Formulario';

const App = () => {
  const [mostrarForm, guardarMostrarForm] = useState(true);

  const [citas, setCitas] = useState([]);

  const eliminarCita = id => {
    setCitas(citasActuales => {
      return citasActuales.filter(cita => cita.id !== id);
    });
  };

  const mostrarFormulario = () => {
    guardarMostrarForm(!mostrarForm);
  };

  return (
    <View style={style.contenedor}>
      <Text style={style.titulo}>Administrador de Citas</Text>

      <View>
        <TouchableHighlight
          style={style.btnFormulario}
          onPress={() => mostrarFormulario()}>
          <Text style={style.textoFormulario}>
            {mostrarForm ? 'Cerrar' : 'Crear Cita'}
          </Text>
        </TouchableHighlight>
      </View>

      <View style={style.contenido}>
        {mostrarForm ? (
          <Formulario
            citas={citas}
            setCitas={setCitas}
            guardarMostrarForm={guardarMostrarForm}
          />
        ) : (
          <>
            <Text style={style.titulo}>
              {citas.length > 0 ? 'Administra tus Recetas' : 'Crea un Cita'}
            </Text>
            <FlatList
              style={style.listado}
              data={citas}
              keyExtractor={cita => cita.id}
              renderItem={({item}) => (
                <Cita eliminarCita={eliminarCita} cita={item} />
              )}
            />
          </>
        )}
      </View>
    </View>
  );
};

const style = StyleSheet.create({
  contenedor: {
    backgroundColor: '#aa076b',
    flex: 1,
  },
  titulo: {
    marginTop: Platform.OS === 'ios' ? 40 : 20,
    marginBottom: 10,
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  contenido: {
    marginHorizontal: '2.5%',
    flex: 1,
  },
  listado: {
    flex: 1,
    borderRadius: 5,
  },
  btnFormulario: {
    marginBottom: 40,
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
    borderRadius: 10,
  },
  textoFormulario: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default App;
