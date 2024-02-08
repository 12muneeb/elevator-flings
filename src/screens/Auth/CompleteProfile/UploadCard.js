import React, { Component } from 'react';
import {
  Dimensions,
  ImageBackground,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import DocumentPicker from 'react-native-document-picker';
import { appIcons } from '../../../assets';
import Img from '../../../components/Img';
import { colors, family, size } from '../../../utils';
const {width, height} = Dimensions.get('window');

class UploadCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      galleryDocuments: [],
      documentCount: 1,
    };
  }

  pickDocument = async () => {
    try {
      const result = await DocumentPicker.pick({
        type: [DocumentPicker.types.allFiles],
      });

      const documentObject = {
        uri: result.uri,
        name: result.name || `IMG${this.state.documentCount}`,
        id: this.state.documentCount,
      };

      this.setState(prevState => ({
        galleryDocuments: [...prevState.galleryDocuments, documentObject],
        documentCount: prevState.documentCount + 1,
      }));
    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        // User cancelled the document picker
      } else {
        // Handle other errors
      }
    }
  };

  removeDocument = documentId => {
    this.setState(prevState => ({
      galleryDocuments: prevState.galleryDocuments.filter(
        document => document.id !== documentId,
      ),
    }));
  };

  render() {
    const {galleryDocuments} = this.state;

    return (
      <>
       
        <View>
          <TouchableOpacity style={styles.imageBtn} onPress={this.pickDocument}>
            <ImageBackground style={styles.propertyImage} resizeMode="cover">
              <Img
                local={true}
                src={appIcons.up}
                style={styles.up}
                tintColor={colors.red}
              />
              <Text
                style={[
                  styles.carettext,
                  {color: colors.red, textAlign: 'center'},
                ]}>
                Identification Government Card {'\n'} or Business Sales License
              </Text>
            </ImageBackground>
          </TouchableOpacity>
        </View>

        {galleryDocuments?.length > 0 ? (
        <View style={{height:60}}>
          <ScrollView
            style={styles.mainCont}
            horizontal={true}
            showsHorizontalScrollIndicator={false}>
            {galleryDocuments?.map((document, index) => {
              return (
                <View key={index + 1}>
                  <TouchableOpacity activeOpacity={0.9} >
                    <View style={styles.documentContainer}>
                      <Text style={styles.documentText}>{document.name}</Text>
                      <TouchableOpacity
                        style={styles.closeIconCont}
                        onPress={() => this.removeDocument(document.id)}>
                        <Img
                          local
                          src={appIcons.cross}
                          resizeMode={'contain'}
                          style={{width: 8, height: 8}}
                          tintColor={colors.white}
                        />
                      </TouchableOpacity>
                    </View>
                  </TouchableOpacity>
                </View>
              );
            })}
          </ScrollView>
        </View>
        ) : null}
      </>
    );
  }
}

const styles = StyleSheet.create({
  mainCont: {
    width: '90%',
  },
  documentContainer: {
    width: 85,
    height: 45,
    borderRadius: 30,
    backgroundColor: colors.green,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginLeft: 5,
  },
  documentText: {
    fontSize: 16,
  },
  closeIconCont: {
    backgroundColor: colors.red,
    borderRadius: 50,
    width: 20,
    height: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: size.xxsmall,
  },
  imageBtn: {
    width: 350,
    height: 130,
    borderColor: colors.red,
    borderStyle: 'dashed',
    borderWidth: 1.5,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    backgroundColor: colors.lightYellow,
    overflow: 'hidden',
    marginTop: 18,
  },
  propertyImage: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  up: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
    tintColor: colors.red,
  },
  carettext: {
    fontSize: size.medium,
    fontFamily: family.RedHatDisplay_Medium,
    marginTop: 5,
  },
});

export default UploadCard;
