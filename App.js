import * as React from 'react';
import { Text, View, StyleSheet, TouchableOpacity } from 'react-native';

export default class App extends React.Component {

  state={
    resultado:" ",
    calculo:""
  }

  operaciones = ['DEL', '+','-','x','/'];

  botonPresionado(texto){
    if(texto == '=' && this.validacion()){

      this.setState({resultado: eval(this.state.resultado)});
    }

    this.setState({resultado: this.state.resultado + texto});
  }

  validacion(){
    let ultimo = this.state.resultado.split('').pop();
    switch(ultimo){
      case '+':
      case '-':
      case 'x':
      case '/':
      case '.':
        return false;
    }
    return true;
  }


  operacionPresionada(operacion){
    switch(operacion){
      case 'DEL':
        let texto = this.state.resultado.split('');
        texto.pop();
        this.setState({resultado:texto.join('')});
        break;
      case '+':
      case '-':
      case 'x':
      case '/':
        let ultimo = this.state.resultado.split('').pop();
        if(this.operaciones.indexOf(ultimo) >0) return;
        if(this.state.resultado == "") return;

        this.setState({resultado: this.state.resultado + operacion});
    }
  }

  render() {

    let renglones = [];
    let numeros = [[1,2,3], [4,5,6],[7,8,9],['.',0,'=']]
    for(let i = 0; i<4; i++){//For1
      let renglon = [];
      for(let j=0; j<3; j++){//For2
        renglon.push(
          <TouchableOpacity style={styles.boton} onPress={() => this.botonPresionado(numeros[i][j])}>
            <Text style={{fontSize:30}}>{numeros[i][j]}</Text>
          </TouchableOpacity>
        );
      }//For1
      renglones.push(<View style={styles.renglon}>{renglon}</View>);
    }//For2

    let ops=[];
    for(let i=0;i<5;i++){
      ops.push(
        <TouchableOpacity style={styles.boton} onPress={() => this.operacionPresionada(this.operaciones[i])}>
          <Text style={{fontSize:30}}>{this.operaciones[i]}</Text>
        </TouchableOpacity>
      );
    }

    return (
      <View style={{flex:1}}>
      <View style={styles.resultado}>
        <Text style={{fontSize:25, fontWeight:'bold'}}>{this.state.resultado}</Text>
      </View>

      <View></View>
      <View style={styles.botones}>
        <View style={styles.numeros}>{renglones}</View>
        <View style={styles.operaciones}>{ops}</View>
      </View>
    </View>
    );
  }
}

const styles = StyleSheet.create({
  resultado:{
    flex:3,
    alignItems: 'flex-end', 
    justifyContent:'flex-end', 
    margin:10
  },
  botones:{
    flex:7,
    flexDirection:'row'
  },
  boton:{
    flex:1,
    alignItems:'center',
    justifyContent: 'center'
  }, 
  renglon:{
    flex:1,
    flexDirection:'row',
  }, 
  numeros:{
    flex:3,
    backgroundColor:'rgba(130,134,140,0.5)'
  },
  operaciones:{
    flex:1,
    backgroundColor:'rgba(184,186,188,0.5)'
  }
});
