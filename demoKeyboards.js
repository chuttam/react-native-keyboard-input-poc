import React, {Component} from 'react';
import PropTypes from 'prop-types';
import {Text, TouchableOpacity, ScrollView, StyleSheet, Image} from 'react-native';
import CameraRoll from '@react-native-community/cameraroll';
import {KeyboardRegistry} from 'react-native-keyboard-input';

class KeyboardView extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  onButtonPress() {
    KeyboardRegistry.onItemSelected('KeyboardView', {
      message: 'item selected from KeyboardView',
    });
  }

  render() {
    return (
      <ScrollView contentContainerStyle={[styles.keyboardContainer, {backgroundColor: 'purple'}]}>
        <Text style={{color: 'white'}}>HELOOOO!!!</Text>
        <Text style={{color: 'white'}}>{this.props.title}</Text>
        <TouchableOpacity
          testID={'click-me'}
          style={{padding: 20, marginTop: 30, backgroundColor: 'white'}}
          onPress={() => this.onButtonPress()}
        >
          <Text>
            Click Me!
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

class AnotherKeyboardView extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  onButtonPress() {
    KeyboardRegistry.toggleExpandedKeyboard('AnotherKeyboardView');
  }

  render() {
    return (
      <ScrollView contentContainerStyle={[styles.keyboardContainer, {backgroundColor: 'orange'}]}>
        <Text>*** ANOTHER ONE ***</Text>
        <Text>{this.props.title}</Text>
        <TouchableOpacity
          testID={'toggle-fs'}
          style={{padding: 20, marginTop: 30, backgroundColor: 'white'}}
          onPress={() => this.onButtonPress()}
        >
          <Text>
            Toggle Full-Screen!
          </Text>
        </TouchableOpacity>
      </ScrollView>
    );
  }
}

class CameraRollView extends Component {
  static propTypes = {
    title: PropTypes.string,
  };

  state = {
    showPhotoGallery: false,
    photoArray: [],
  };

  onButtonPress() {
    KeyboardRegistry.toggleExpandedKeyboard('CameraRollView');
  }

  getGallery() {
    CameraRoll.getPhotos({first: 10})
      .then(res => {
        this.setState({showPhotoGallery: true, photoArray: res.edges});
      });
  }

  render() {
    if (!this.state.showPhotoGallery) {
      return (
        <ScrollView contentContainerStyle={[styles.keyboardContainer, {}]}>
          <Text>{this.props.title}</Text>
          <TouchableOpacity
            style={{padding: 20, marginTop: 30, backgroundColor: 'green'}}
            onPress={() => this.getGallery()}
          />
        </ScrollView>
      );
    }

    return (
      <ScrollView horizontal={true} contentContainerStyle={[styles.cameraRollContainer, {}]}>
        {this.state.photoArray.map((photo, index) => {
          return (
            <Image
              key={index}
              style={{
                width: 100,
                height: 100,
                margin: 10,
              }}
              source={{uri: photo.node.image.uri}}
            />
          );
        })}
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  keyboardContainer: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
  },
  cameraRollContainer: {
    flex: 1,
    flexDirection: 'row',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
});

KeyboardRegistry.registerKeyboard('KeyboardView', () => KeyboardView);
KeyboardRegistry.registerKeyboard('AnotherKeyboardView', () => AnotherKeyboardView);
KeyboardRegistry.registerKeyboard('CameraRollView', () => CameraRollView);
