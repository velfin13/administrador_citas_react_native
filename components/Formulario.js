import React, {useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  Button,
  TouchableHighlight,
  TouchableWithoutFeedback,
  Keyboard,
  Alert,
  ScrollView,
} from 'react-native';
import DateTimePickerModal from 'react-native-modal-datetime-picker';
import shortid from 'shortid';

const Formulario = props => {
  const {citas, setCitas, guardarMostrarForm} = props;

  const [paciente, guardarPaciente] = useState('');
  const [propietario, guardarPropietario] = useState('');
  const [telefono, guardarTelefono] = useState('');
  const [sintomas, guardarSintomas] = useState('');
  const [fecha, guardarFecha] = useState('');
  const [hora, guardarHora] = useState('');

  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [isTimePickerVisible, setTimePickerVisibility] = useState(false);

  /* Fechas */
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirmDate = date => {
    const opciones = {
      year: 'numeric',
      month: 'long',
      day: '2-digit',
    };
    guardarFecha(date.toLocaleDateString('es-Es', opciones));

    hideDatePicker();
    return;
  };

  /* Horas */
  const showTimePicker = () => {
    setTimePickerVisibility(true);
  };

  const hideTimePicker = () => {
    setTimePickerVisibility(false);
  };

  const handleConfirmTime = hora => {
    const opciones = {
      hour: 'numeric',
      minute: '2-digit',
    };
    guardarHora(hora.toLocaleString('es-ES', opciones));
    hideTimePicker();
  };

  /* crear cita */
  const crearNuevaCita = () => {
    if (
      propietario.trim() === '' ||
      paciente.trim() === '' ||
      telefono.trim() === '' ||
      sintomas.trim() === '' ||
      fecha.trim() === '' ||
      hora.trim() === ''
    ) {
      /* algo fallo */
      mostrarAlerta();
      return;
    }

    /* Crear cita */
    const cita = {propietario, paciente, telefono, sintomas, fecha, hora};
    cita.id = shortid.generate();
    const nuevaCita = [...citas, cita];
    setCitas(nuevaCita);
    guardarMostrarForm(false);
  };

  /* Muentra mensajes de errores */
  const mostrarAlerta = () => {
    Alert.alert('Error', 'Todos los campos son Obligatorios', [{text: 'Ok'}]);
  };

  const cerrarTeclado = () => {
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={() => cerrarTeclado()}>
      <ScrollView style={styles.formulario}>
        <View>
          <Text style={styles.label}>Paciente:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarPaciente(texto)}
            autoCompleteType="off"
          />
        </View>

        <View>
          <Text style={styles.label}>Dueño:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarPropietario(texto)}
            autoCompleteType="off"
          />
        </View>

        <View>
          <Text style={styles.label}>Télefono:</Text>
          <TextInput
            style={styles.input}
            onChangeText={texto => guardarTelefono(texto)}
            autoCompleteType="off"
            keyboardType="numeric"
          />
        </View>

        <View>
          <Text style={styles.label}>Fecha:</Text>
          <Button title="Seleccionar Fecha" onPress={showDatePicker} />
          <DateTimePickerModal
            isVisible={isDatePickerVisible}
            mode="date"
            onConfirm={handleConfirmDate}
            onCancel={hideDatePicker}
            locale="es_Es"
          />
        </View>

        <View>
          <Text style={styles.label}>Hora:</Text>
          <Button title="Seleccionar Hora" onPress={showTimePicker} />
          <DateTimePickerModal
            isVisible={isTimePickerVisible}
            mode="time"
            onConfirm={handleConfirmTime}
            onCancel={hideTimePicker}
            locale="es_Es"
          />
        </View>

        <View>
          <Text style={styles.label}>Sintomas:</Text>
          <TextInput
            multiline
            style={styles.input}
            onChangeText={texto => guardarSintomas(texto)}
            autoCompleteType="off"
          />
        </View>

        <View>
          <TouchableHighlight
            style={styles.btnSubmit}
            onPress={() => crearNuevaCita()}>
            <Text style={styles.textoSubmit}>Crear</Text>
          </TouchableHighlight>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  formulario: {
    borderRadius: 5,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  label: {
    fontWeight: 'bold',
    fontSize: 18,
    marginTop: 20,
  },
  input: {
    marginTop: 10,
    height: 50,
    borderColor: '#e1e1e1',
    borderWidth: 1,
    borderStyle: 'solid',
  },
  btnSubmit: {
    marginBottom: 40,
    padding: 10,
    backgroundColor: '#7d024e',
    marginVertical: 10,
    borderRadius: 10,
  },
  textoSubmit: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default Formulario;
